import { expect } from 'chai';
import { spy } from 'sinon';
import EditContractModule, { setService } from './EditContractModule';
import { createSagaMock, resolveGenerator } from '../redux/lib/testUtils';

const module = new EditContractModule();

describe('Modules EditContractModule', () => {
  describe('Reducers', () => {
    it('expect to set contract', () => {
      const contract = { id: "1" };
      const state = module.reducers.setContract({}, { contract });
      expect(state.contract).to.deep.equal(contract);
    });

    it('expect to set contract prop', () => {
      const contract = [{
        id: "1",
        user: {
          name: 'Maycon',
        }
      }];

      const state = module.reducers.setContractProp({ contract }, { path: 'user.name', value: 'test' });

      expect(state.contract.user.name).to.deep.equal('test');
    });

    it('expect to set state property', () => {
      const testValue = Date.now();
      const state = module.reducers.setState({}, { testValue });
      expect(state.testValue).to.be.equal(testValue);
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
      const contract = {
        id: '1,' 
      };
      const sagaMock = createSagaMock();
      const gen = module.sagas.initialize(sagaMock, { id: contract.id });
      const mockService = {
        getById: spy(() => contract),
      };
      
      before(async () => {
        setService(mockService);
        resolveGenerator(gen);
      });

      it('expect to start loading', () => {
        expect(sagaMock.put).calledWith('startLoading');
      });

      it('expect to fetch contract', () => {
        expect(mockService.getById).to.be.calledWith(contract.id);
      });

      it('expect to set contracts', () => {
        expect(sagaMock.put).calledWith('setContract', { contract });
      });

      it('expect to stop loading', () => {
        expect(sagaMock.put).calledWith('stopLoading');
      });
    });
  });
});

