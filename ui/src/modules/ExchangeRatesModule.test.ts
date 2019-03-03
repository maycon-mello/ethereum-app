import { expect } from 'chai';
import { spy } from 'sinon';
import ExchangeRatesModule, { setService } from './ExchangeRatesModule';
import { createSagaMock, resolveGenerator } from '../redux/lib/testUtils';

const module = new ExchangeRatesModule();

describe('Modules ExchangeRatesModule', () => {
  describe('Reducers', () => {
    it('expect to set rates', () => {
      const rates = [{ value: 1 }];
      const currentRate = 1;

      const state = module.reducers.setRates({}, { rates, currentRate });

      expect(state.rates).to.deep.equal(rates);
      expect(state.currentRate).to.equal(currentRate);

    });

    it('expect to toggle drawer', () => {
      let state = module.reducers.toggleDrawer({ showDrawer: false }, { showDrawer: true });
      expect(state.showDrawer).to.be.equal(true);

      state = module.reducers.toggleDrawer({ showDrawer: true }, { showDrawer: false });
      expect(state.showDrawer).to.be.equal(false);
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
      const rates = [{
        price: 1,
      }, {
        price: 2,
      }];
      const currentRate = 2
      const sagaMock = createSagaMock();
      const gen = module.sagas.initialize(sagaMock);
      const mockService = {
        getRatesCached: spy(() => rates),
        getRateCached: spy(() => ({
          price: currentRate
        })),
      };
      
      before(async () => {
        setService(mockService);
        resolveGenerator(gen);
      });

      it('expect to start loading', () => {
        expect(sagaMock.put).calledWith('startLoading');
      });

      it('expect to fetch rates', () => {
        expect(mockService.getRatesCached).to.be.calledOnce;
      });

      it('expect to fetch current rate', () => {
        expect(mockService.getRateCached).to.be.calledWith('ETH', 'USD');
      });

      it('expect to set rate', () => {
        expect(sagaMock.put).calledWith('setRates', { rates, currentRate: currentRate });
      });

      it('expect to stop loading', () => {
        expect(sagaMock.put).calledWith('stopLoading');
      });
    });
  });
});

