import { Saga, Reducer, ReduxModule } from '../redux/lib/decorators';
import ContractService from '../services/ContractService';
import Contract from '../model/Contract';

type State = {
  isLoading: boolean,
  contracts?: Array<Contract>,
};

let service = ContractService.getInstance();

export function setService(customService: any) {
  service = customService;
}

class ContractListModule extends ReduxModule<State> {  
  state = {
    isLoading: true,
    contracts: undefined,
  }

  @Reducer()
  setContracts(state: State, props: any) {
    return {
      ...state,
      contracts: props.contracts,
    };
  }

  @Reducer()
  removeContract(state: State, props: any) {
    return {
      ...state,
      contracts: (state.contracts || []).filter((c: Contract) => c.id !== props.contractId),
      // TODO
      // It should work as a optimistic response, need to show to the user
      // That we are still waiting for the delete request on the api
    }
  }

  @Saga('removeContract')
  private * removeContractSaga(_saga: SideEffects, props: any) {
    yield service.removeContract(props.contractId);
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
  private * initialize(saga: any) {
    yield saga.put('startLoading');
    const contracts = yield saga.call(service.findContracts);
    yield saga.put('setContracts', { contracts });
    yield saga.put('stopLoading');
  }
}

export type InitializeAction = {
};

export default ContractListModule;