import { Saga, Reducer, ReduxModule } from '../redux/lib/decorators';
import ContractService from '../services/ContractService';
import Contract from '../model/Contract';
import * as R from 'ramda';

type State = {
  isLoading: boolean,
  contract?: Contract,
  canSave: boolean,
};

let service = ContractService.getInstance();

export function setService(customService: any) {
  service = customService;
}

class EditContractModule extends ReduxModule<State> {  
  state = {
    isLoading: true,
    contract: undefined,
    canSave: false,
  }

  @Reducer()
  setContract(state: State, props: any) {
    return {
      ...state,
      contract: props.contract,
    };
  }

  @Reducer()
  setContractProp(state: State, props: any) {
    return R.compose(
      R.set(R.lensPath(['contract', ...props.path.split('.')]), props.value),
      R.set(R.lensProp('canSave'), true),
    )(state)
  }

  @Reducer()
  setState(state: State, props: any) {
    return {
      ...state,
      ...props,
    }   
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

  @Saga('saveContract')
  private * save(saga: SideEffects) {
    yield saga.put('startLoading');

    const contract = yield saga.select('contract');

    yield service.updateContract(contract.id, contract);
    yield saga.put('setState', {
      canSave: false,
    });
    yield saga.put('stopLoading');
    yield saga.rootPut('message/success', {
      content: 'Contract successful updated',
    });
  }

  @Saga('removeContract')
  private * removeContractSaga(saga: SideEffects) {
    const contract = yield saga.select('contract');
    yield saga.rootPut('contractList/removeContract', { contractId: contract.id });
    yield saga.rootPut('router/goTo', { route: '/contracts'});
  }

  @Saga('initialize')
  private * initialize(saga: any, props: InitializeAction) {
    yield saga.put('startLoading');
    const contract = yield saga.call(service.getById, props.id);
    yield saga.put('setContract', { contract });
    yield saga.put('stopLoading');
  }

  
}

export type InitializeAction = {
  id: string,
};

export default EditContractModule;