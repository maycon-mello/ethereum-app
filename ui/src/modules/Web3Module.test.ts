import { expect } from 'chai';
import { spy } from 'sinon';
import * as R from 'ramda';
import Web3Module, { setWeb3Instance } from './Web3Module';
import { createSagaMock, resolveGenerator } from '../redux/lib/testUtils';

const withEmptyAccounts = R.set(R.lensPath(['eth', 'getAccounts']), spy(() => []));

const module = new Web3Module();

describe('Modules Web3Module', () => {
  describe('Reducers', () => {
    it('expect to set status', () => {
      const status = 'not-found';
      const state = module.reducers.setStatus({}, { status });
      expect(state.status).to.be.equal(status);
    });

    it('expect to set status', () => {
      const accounts = ['account1', 'account2'];
      const state = module.reducers.setAccounts({}, { accounts });
      expect(state.accounts).to.be.equal(accounts);
    });

    it('expect to set prepared transaction', () => {
      const action = {
        transaction: 'transaction-obj',
        price: 2,
        estimatedGas: 2,
      };

      const state = module.reducers.setPreparedTransaction({}, action);

      expect(state.preparedTransaction).to.be.equal(action.transaction);
      expect(state.transactionPriceInUsd).to.be.equal(action.price);
      expect(state.estimatedGas).to.be.equal(action.estimatedGas);
    });

    it('expect to start loading', () => {
      const state = module.reducers.startLoading({ isLoading: false });
      expect(state.isLoading).to.be.true;
    });

    it('expect to stop loading', () => {
      const state = module.reducers.stopLoading({ isLoading: true });
      expect(state.isLoading).to.be.false;
    });
  }); 

  describe('Sagas', () => {
    const accounts = ['ac1', 'ac2'];
    let sagaMock: any;
    const web3TransactionMock = {
      estimateGas: spy(),
      send: spy(),
    };

    let web3: any;
    const runSaga = () => {
      const gen = module.sagas.initialize(sagaMock);
      resolveGenerator(gen);
    }

    beforeEach(() => {
      sagaMock = createSagaMock();
      web3 = {
        utils: {
          fromWei: spy(),
        },
        eth: {
          getGasPrice: spy(() => 0),
          getAccounts: spy(() => accounts),
          Contract: function() {
            return {
              deploy: function() {
                return web3TransactionMock;
              },
            }
          },
        }
      }
      setWeb3Instance(web3);
    });

    describe('initialize', () => {
      describe('web3 found', () => {
        beforeEach(runSaga);

        it('expect to start loading', () => {
          expect(sagaMock.put).to.be.calledWith('startLoading');
        });

        it('expect to set accounts', () => {
          expect(sagaMock.put).to.be.calledWith('setAccounts', { accounts });
        });

        it('expect to set status to ready', () => {
          expect(sagaMock.put).to.be.calledWith('setStatus', { status: 'ready' });
        });

        it('expect to stop loading', () => {
          expect(sagaMock.put).to.be.calledWith('stopLoading');
        });
      });
      
      describe('web3 found but without accounts', () => {
        beforeEach(() => {
          setWeb3Instance(withEmptyAccounts(web3));
          runSaga();
        });

        it('expect to start loading', () => {
          expect(sagaMock.put).to.be.calledWith('startLoading');
        });
  
        it('expect to set accounts', () => {
          expect(sagaMock.put).to.be.calledWith('setAccounts', { accounts: [] });
        });

        it('expect to set status to not-logged-in', () => {
          expect(sagaMock.put).to.be.calledWith('setStatus', { status: 'not-logged-in' });
        });

        it('expect to stop loading', () => {
          expect(sagaMock.put).to.be.calledWith('stopLoading');
        });
      });

      describe('web3 not found', () => {
        beforeEach(() => {
          setWeb3Instance(undefined);  
          runSaga();
        });

        it('expect to start loading', () => {
          expect(sagaMock.put).to.be.calledWith('startLoading');
        });

        it('expect to set status to not-found', () => {
          expect(sagaMock.put).to.be.calledWith('setStatus', { status: 'not-found' });
        });

        it('expect to stop loading', () => {
          expect(sagaMock.put).to.be.calledWith('stopLoading');
        });
      });
    });

    describe('prepareTransaction', () => {
      const dummyTransaction = {
        price: 0,
        transaction: undefined,
        estimatedGas: 0,
      };

      const contract = {};

      const runSaga = (extraMocks: any = {}) => {
        const saga = {
          ...sagaMock,
          select: (key: any) => key === 'accounts' && accounts,
          ...extraMocks,
        };

        const props = {
          contract,
        };

        const gen = module.sagas.prepareTransaction(saga, props);
        resolveGenerator(gen);
      }

      it('must wait until the module is initialize saga is ready', () => {
        runSaga({
          ...sagaMock,
          select: (key: any) => key === 'isLoading' && true,
        });

        expect(sagaMock.take).to.be.calledWith(['stopLoading']);
      });

      it('if web3 is not defined must prepare a dummy transaction', () => {
        setWeb3Instance(undefined);
        runSaga();

        expect(sagaMock.put).to.be.calledWith('setPreparedTransaction', dummyTransaction);
      });

      it('if web3 has no accounts must prepare a dummy transaction', () => {
        runSaga({
          select: (key: any) => key === 'accounts' && [],
        });
  
        expect(sagaMock.put).to.be.calledWith('setPreparedTransaction', dummyTransaction);
      });

      it('expect to set prepared transaction', () => {
        runSaga();
  
        expect(sagaMock.put).to.be.calledWith('setPreparedTransaction', {
          transaction: web3TransactionMock,
          // TODO: Improve test here
          estimatedGas: undefined,
          price: NaN,
        });
      });
    });

    describe('sendTransaction', () => {
      const transaction = {
        options: {
          address: `${Date.now()}`,
        }
      }

      const preparedTransaction = {
        send: spy(() => transaction),
      };

      const state = {
        preparedTransaction: preparedTransaction,
        estimatedGas: 1,
        accounts: ['ac1', 'ac2'],
        status: 'ready',
      };

      it('expect to put transactionFailed reducer', () => {
        const saga = createSagaMock({
          ...state,
          status: 'not-found',
        });

        const gen = module.sagas.sendTransaction(saga);
        resolveGenerator(gen);

        expect(saga.put).calledWith('transactionFailed');
      });

      it('expect to call send method from Web3Transaction', () => {
        const saga = createSagaMock(state);
        const gen = module.sagas.sendTransaction(saga);
        resolveGenerator(gen);

        expect(preparedTransaction.send).to.be.calledOnce;
      });

      it('expect to put transactionComplete with transaction address', () => {
        const saga = createSagaMock(state);
        const gen = module.sagas.sendTransaction(saga);
        resolveGenerator(gen);

        expect(saga.put).calledWith('transactionComplete', {
          address: transaction.options.address,
        });
      });
    });
  }); 
});

