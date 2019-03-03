import * as R from 'ramda';
import { State, getInitialState, getEmptyContract, getPermittedSteps, Step } from './addContractState';
import { Saga, Reducer, ReduxModule, Debounce } from '../../redux/lib/decorators';
import { validate } from '../../core/Validation';
import validationRules from './contractValidationRules';
import ContractService from '../../services/ContractService';;

let service = ContractService.getInstance();

export const setService = (newService: any) => {
  service = newService;
}

export const setCurrentStep = (step: Step) => {
  const newStep = getPermittedSteps(step);

  return R.compose(
    R.set(R.lensProp('currentStep'), step),
    R.set(R.lensProp('canGoNext'), !!newStep.next),
    R.set(R.lensProp('canGoBack'), !!newStep.previous)
  )
}

export const isValid = (state: State) => {
  const rules = validationRules.get(state.currentStep);

  if (!rules) {
    return true;
  }

  const validationResult = validate(rules, state.contract);
  return validationResult.isValid;
}

class AddContract extends ReduxModule<State> {  
  state = getInitialState();

  @Reducer()
  initialize() {
    return getInitialState()
  }

  @Reducer()
  setContractProp(state: State, props: any) {
    return R.set(R.lensPath(['contract', ...props.path.split('.')]), props.value)(state)
  }

  @Reducer()
  setField(state: State, props: any) {
    return AddContract.prototype.setContractProp(state, props);
  }

  @Reducer()
  setState(state: State, props: any) {
    return {
      ...state,
      ...props,
    }
  }

  @Reducer()
  setFormValidation(state: State, props: any) {
    return R.compose(
      R.set(R.lensProp('formValidation'), props.fields),
      R.set(R.lensProp('canGoNext'), props.isValid),
    )(state)
  }

  @Reducer()
  onNextStep(state: State) {
    const { next } = getPermittedSteps(state.currentStep);

    if (!next || !isValid(state)) {
      return state;
    }

    return setCurrentStep(next)(state)
  }

  @Reducer()
  onPreviousStep(state: State) {
    const { previous } = getPermittedSteps(state.currentStep);

    if (!previous) {
      return state;
    }

    return setCurrentStep(previous)(state)
  }

  @Reducer()
  resetContract(state: State) {
    return R.set(R.lensProp('contract'), getEmptyContract())(state);
  }

  @Reducer()
  startLoading(state: State) {
    return {
      ...state,
      isLoading: true,
    }
  }

  @Reducer()
  stopLoading(state: State) {
    return {
      ...state,
      isLoading: false,
    }
  }

  @Saga('initialize')
  private * _initialize(saga: SideEffects) {
    yield saga.put('resetContract');
    yield saga.put('stopLoading');
  }

  @Saga('setField')
  private * _setField(saga: SideEffects) {
    yield saga.put('doValidate');
  }

  @Saga('doValidate')
  @Debounce(100)
  private * doValidate(saga: SideEffects) {
    yield saga.put('validate');
  }

  @Saga('prepareTransaction')
  private * prepareTransaction(saga: SideEffects) {
    // @ts-ignore
    const contract = yield saga.select('contract');

    yield saga.put('startLoading');
    yield saga.put('setState', {
      canGoNext: false,
      canGoBack: false,
    });
    yield saga.rootPut('web3/prepareTransaction', { contract })

    const { price } = yield saga.rootTake(['web3/setPreparedTransaction']);

    yield saga.put('setContractProp', {
      path: 'deployPriceInUsd',
      value: price,
    });
    
    yield saga.put('setState', {
      canGoNext: true,
      canGoBack: true,
    });

    yield saga.put('stopLoading');
  }

  @Saga([
    'onPreviousStep',
    'onNextStep',
    'validate',
  ])
  private * validateStep(saga: SideEffects) {
    // @ts-ignore
    const { contract, currentStep } = yield saga.select(R.pick(['contract', 'currentStep']));

    if (currentStep === 'confirmation') {
      yield saga.put('prepareTransaction');
    }

    const rules = validationRules.get(currentStep);

    if (!rules) {
      return;
    }

    const validation = validate(rules, contract);
    yield saga.put('setFormValidation', validation);
  }

  @Saga('onConfirm')
  private * onConfirm(saga: SideEffects) {
    yield saga.put('startLoading');
    yield saga.rootPut('web3/sendTransaction');

    // Wait for transaction to be finished
    // @ts-ignore
    const { address } = yield saga.rootTake(['web3/transactionComplete', 'web3/transactionFailed']);
    const contract = yield saga.select('contract');
    
    contract.address = address;
    contract.balance = 0;
    contract.date = Date.now(); // TODO: Generate the Date in the server

    yield service.createContract(contract);

    yield saga.put('setState', {
      contract: contract,
      currentStep: 'done',
    });

    yield saga.put('stopLoading');
  }
}

export default AddContract;