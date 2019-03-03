import { Saga, Reducer, ReduxModule } from '../redux/lib/decorators';
import web3Getter from '../core/web3';
import SmartContracts from '../contracts';
import Web3Contract from 'web3/eth/contract';
import { TransactionObject } from 'web3/eth/types';

let getWeb3 = web3Getter;

export function setWeb3Instance(instance: any) {
  getWeb3 = () => instance;
}

export type Web3Status = 'not-found' | 'not-logged-in' | 'ready';

type State = {
  status: Web3Status | string,
  isLoading: boolean,
  accounts: string[],
  preparedTransaction?: TransactionObject<Web3Contract>,
  transactionPriceInUsd: number,
  estimatedGas: number,
};

class Web3Module extends ReduxModule<State> {  
  state = {
    status: 'not-found',
    isLoading: true,
    accounts: [],
    transactionPriceInUsd: 0,
    estimatedGas: 0,
  }

  @Reducer()
  setStatus(state: State, props: any) {
    return {
      ...state,
      status: props.status,
    }
  }

  @Reducer()
  setAccounts(state: State, props: any) {
    return {
      ...state,
      accounts: props.accounts,
    }
  }

  @Reducer()
  setPreparedTransaction(state: State, props: SetPreparedTransactionAction) {
    return {
      ...state,
      preparedTransaction: props.transaction,
      transactionPriceInUsd: props.price,
      estimatedGas: props.estimatedGas,
    };
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
  private * initialize(saga: SideEffects) {
    yield saga.put('startLoading');
    let status: Web3Status = 'not-found';

    let web3 = yield getWeb3();

    if (web3) {
      const accounts = yield web3.eth.getAccounts();
      status = accounts.length > 0 ? 'ready' : 'not-logged-in';

      yield saga.put('setAccounts', { accounts });
    }
    
    yield saga.put('setStatus', { status });
    yield saga.put('stopLoading');
  }

  @Saga('prepareTransaction')
  private * prepareTransaction(saga: SideEffects) {
    const isLoading = yield saga.select('isLoading');

    if (isLoading) {
      yield saga.take(['stopLoading']);
    }

    const web3 = yield getWeb3();
    const accounts = yield saga.select('accounts');

    if (!web3 || accounts.length === 0) {
      yield saga.put('setPreparedTransaction', {
        price: 0,
        transaction: undefined,
        estimatedGas: 0,
      });
      return;
    }

    // TODO: Contract type is hardcoded
    // Need to pick up the type for the contract and setup the transaction for each type
    const web3Contract = new web3.eth.Contract(SmartContracts.getInterface());
    const transaction = web3Contract.deploy({
      data: '0x' + SmartContracts.getBytecode(),
      arguments: [],
    });

    let estimatedGas = yield transaction.estimateGas({
      from: accounts[0],
    });

    // TODO: Refactor on this code, too much information here and hard to test
    let gasPrice = yield web3.eth.getGasPrice();
    let priceInWei = estimatedGas * parseInt(gasPrice);
    let priceInEther = web3.utils.fromWei(`${priceInWei}`);
    let currentUsdRate = yield saga.rootSelect('exchangeRates/currentRate');
    let priceInUsd = parseFloat(priceInEther) * currentUsdRate;

    yield saga.put('setPreparedTransaction', {
      transaction: transaction,
      price: priceInUsd,
      estimatedGas: estimatedGas,
    });
  }

  @Saga('sendTransaction')
  private * sendTransaction(saga: SideEffects) {
    const status = yield saga.select('status');

    if (status !== 'ready') {
      yield saga.put('transactionFailed');
      return;
    }

    const transaction: TransactionObject<Web3Contract> = yield saga.select('preparedTransaction');
    const estimatedGas: number = yield saga.select('estimatedGas');
    const [account] = yield saga.select('accounts');

    const web3Contract: Web3Contract = yield transaction.send({
      gas: `${estimatedGas}`,
      from: account,
    });

    yield saga.put('transactionComplete', {
      address: web3Contract.options.address,
    });
  }
}

export type SetPreparedTransactionAction = {
  transaction: any,
  price: number,
  estimatedGas: number,
}

export type TransactionCompleteAction = {
  address: string,
}

export default Web3Module;