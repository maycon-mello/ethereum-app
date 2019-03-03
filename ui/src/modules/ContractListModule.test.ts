import { expect } from 'chai';
import { spy } from 'sinon';
import ContractListModule, { setService } from './ContractListModule';
import { createSagaMock, resolveGenerator } from '../redux/lib/testUtils';

const module = new ContractListModule();

describe('Modules ContractlistModule', () => {
  describe('Reducers', () => {
    it('expect to set contract list', () => {
      const contracts = [1, 2, 3];
      const state = module.reducers.setContracts({}, { contracts });
      expect(state.contracts).to.deep.equal(contracts);
    });

    it('expect to remove contract from list', () => {
      const contracts = [{ id: 1 }, { id: 2}];
      const state = module.reducers.removeContract({ contracts }, { contractId: 1 });
      expect(state.contracts).to.deep.equal([{ id: 2 }]);
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
    describe('initialize', () => {
      const contracts = [1, 2, 3];
      const sagaMock = createSagaMock();
      const gen = module.sagas.initialize(sagaMock);
      const mockService = {
        findContracts: spy(() => contracts),
      };
      
      before(async () => {
        setService(mockService);
        resolveGenerator(gen);
      });

      it('expect to start loading', () => {
        expect(sagaMock.put).calledWith('startLoading');
      });

      it('expect to fetch contracts', () => {
        expect(mockService.findContracts).to.be.calledOnce;
      });

      it('expect to set contracts', () => {
        expect(sagaMock.put).calledWith('setContracts', { contracts });
      });

      it('expect to stop loading', () => {
        expect(sagaMock.put).calledWith('stopLoading');
      });
    });
  });
});

