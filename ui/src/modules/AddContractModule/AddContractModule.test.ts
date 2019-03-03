import { expect } from 'chai';
import { spy } from 'sinon';
import AddContractModule, { setService } from './AddContractModule';
import { Step, getEmptyContract } from './addContractState';
import { createSagaMock, resolveGenerator } from '../../redux/lib/testUtils';

const reduxModule = new AddContractModule();

describe('Modules: AddContractModule', () => {
  describe('Reducers', () => {
    it('expected to set contract property', () => {
      const value = `${Date.now()}`;
      let state = reduxModule.reducers.initialize({});
      state = reduxModule.reducers.setContractProp(state, { path: 'user.name', value });
      expect(state.contract.user.name).to.be.equal(value);
    });

    it('expected to set any state property', () => {
      const value = `${Date.now()}`;
      const state = reduxModule.reducers.setState({}, { testProp: value });
      expect(state.testProp).to.be.equal(value);
    });

    it('expected to set form validation', () => {
      const formValidation = {
        fields: [],
        isValid: true,
      };

      const state = reduxModule.reducers.setFormValidation({}, formValidation);

      expect(state.formValidation).to.be.equal(formValidation.fields);
      expect(state.canGoNext).to.be.equal(formValidation.isValid);
    });

    describe('onNextStep', () => {
      it('expected to move to next step', () => {
        const currentStep: Step = 'identity';
        const expectedNextStep: Step = 'contractType';

        let state = {
          currentStep,
          contract: {
            user: {
              name: 'test',
              email: 'test@tester.com',
              surname: 'test',
            },
          },
        };

        state = reduxModule.reducers.onNextStep(state);
        expect(state.currentStep).to.be.equal(expectedNextStep);
      });

      it('expected to not move to next step when form is invalid', () => {
        const currentStep: Step = 'identity';

        let state = {
          currentStep,
          contract: {
            user: {
              name: '',
              email: 'test@tester.com',
              surname: 'test',
            },
          },
        };

        state = reduxModule.reducers.onNextStep(state);
        expect(state.currentStep).to.be.equal(currentStep);
      });

      it('expected to not move to next step when this is not permitted', () => {
        const currentStep: Step = 'done';

        let state = {
          currentStep,
        };

        state = reduxModule.reducers.onNextStep(state);
        expect(state.currentStep).to.be.equal(currentStep);
      });
    });

    describe('onPreviousStep', () => {
      it('expected to move to previous step', () => {
        const currentStep: Step = 'contractType';
        const expectedPreviousStep: Step = 'identity';

        let state = {
          currentStep,
        };

        state = reduxModule.reducers.onPreviousStep(state);
        expect(state.currentStep).to.be.equal(expectedPreviousStep);
      });

      it('expected to not move to previous step when this is not permitted', () => {
        const currentStep: Step = 'identity';

        let state = {
          currentStep,
        };

        state = reduxModule.reducers.onPreviousStep(state);
        expect(state.currentStep).to.be.equal(currentStep);
      });
    });

    it('expected to reset contract', () => {
      const contract = {
        user: {
          name: '',
        },
      };

      const state = reduxModule.reducers.resetContract({ contract });

      expect(state.contract.user.name).to.be.empty;
      expect(state.contract).deep.equal(getEmptyContract());
    });

    it('expected to start loading', () => {
      const state = reduxModule.reducers.startLoading({ isLoading: false });
      expect(state.isLoading).to.be.true;
    });

    it('expected to stop loading', () => {
      const state = reduxModule.reducers.stopLoading({ isLoading: true });
      expect(state.isLoading).to.be.false;
    });
  });

  describe('Sagas', () => {
    describe('initialize', () => {
      let sagaMock: any;

      beforeEach(() => {
        sagaMock = createSagaMock();
        const gen = reduxModule.sagas.initialize(sagaMock);
        resolveGenerator(gen);
      });

      it('expected to reset contract', () => {
        expect(sagaMock.put).to.be.calledWith('resetContract');
      });

      it('expected to stop loading', () => {
        expect(sagaMock.put).to.be.calledWith('stopLoading');
      });
    });

    describe('setField', () => {
      let sagaMock: any;
      let props: any;

      beforeEach(() => {
        sagaMock = createSagaMock();
        props = 'props';
        const gen = reduxModule.sagas.setField(sagaMock, props);
        resolveGenerator(gen);
      });

      it('expected to validate', () => {
        expect(sagaMock.put).to.be.calledWith('doValidate');
      });
    });

    describe('validate', () => {
      let sagaMock: any;
      let state: any;

      beforeEach(() => {
        state = {
          contract: {
            user: {
              name: 'maycon',
              email: 'test@tester.com',
              surname: 'tester',
            },
            type: 'donation',
          },
          currentStep: 'identity',
        };

        sagaMock = createSagaMock(state);
        const gen = reduxModule.sagas.validate(sagaMock);
        resolveGenerator(gen);
      });

      it('expected to set form validation', () => {
        expect(sagaMock.put).to.be.calledWith('setFormValidation');
      });

      it('expected to not prepare transaction', () => {
        expect(sagaMock.rootTake).to.not.be.calledWith(['web3/setPreparedTransaction']);
      });

      describe('confirmation step', () => {
        beforeEach(() => {
          state = {
            ...state,
            currentStep: 'confirmation',
          };
          sagaMock = createSagaMock(state);
          const gen = reduxModule.sagas.validate(sagaMock);
          resolveGenerator(gen);
        });
  
        it('expected to invoke prepareTransaction saga', () => {
          expect(sagaMock.put).to.be.calledWith('prepareTransaction');
        });
      });
    });

    describe('prepareTransaction', () => {
      let sagaMock: any;
      let state: any;
      let price: number = 2;

      beforeEach(() => {
        state = {
          contract: {
            user: {
              name: 'maycon',
              email: 'test@tester.com',
              surname: 'tester',
            },
            type: 'donation',
          },
        };

        sagaMock = createSagaMock(state);
        sagaMock.rootTake = spy(() => ({ price }));
        const gen = reduxModule.sagas.prepareTransaction(sagaMock);
        resolveGenerator(gen);
      });

      it('expected to start loading', () => {
        expect(sagaMock.put).calledWith('startLoading');
      });

      it('expected to enable canGoNext and canGoBack ', () => {
        // TODO: Could check the state when the saga is complete, but would need to change the library
        expect(sagaMock.put).calledWith('setState', {
          canGoNext: true,
          canGoBack: true,
        });
      });

      it('expected to invoke prepareTransaction saga from web3 module', () => {
        expect(sagaMock.rootPut).calledWith('web3/prepareTransaction', { contract: state.contract });
      });

      it('expected to wait for prepareTransaction to be finished, in order to get the transaction price', () => {
        expect(sagaMock.rootTake).calledWith(['web3/setPreparedTransaction']);
      });

      it('expected to setContractProp with the deployPriceInUsd returned from prepareTransaction', () => {
        expect(sagaMock.put).calledWith('setContractProp', {
          path: 'deployPriceInUsd',
          value: price,
        });
      });

      it('expected to stop loading', () => {
        expect(sagaMock.put).calledWith('stopLoading');
      });
    });

    describe('onConfirm', () => {
      let sagaMock: any;
      let state: any;
      const address = 'transaction-address';
      let service: any;

      beforeEach(() => {
        state = {
          contract: {
            user: {
              name: 'maycon',
              email: 'test@tester.com',
              surname: 'tester',
            },
            type: 'donation',
          },
        };
        service = {
          createContract: spy(),
        }
        sagaMock = createSagaMock(state);
        sagaMock.rootTake = spy(() => ({ address }));

        const gen = reduxModule.sagas.onConfirm(sagaMock);

        setService(service);
        resolveGenerator(gen);
      });

      it('expected to start loading', () => {
        expect(sagaMock.put).to.be.calledWith('startLoading');
      });

      it('expected to wait for transaction complete event', () => {
        expect(sagaMock.rootTake).to.be.calledWith(['web3/transactionComplete', 'web3/transactionFailed']);
      });

      it('expected to create contract using ContractService', () => {
        expect(service.createContract).calledOnce;
        expect(service.createContract).calledWith({
          ...state.contract,
          address: address,
          balance: 0,
        });
      });
    });
  });
});