import { expect } from 'chai';
import ExchangeRatesService from './ExchangeRatesService';
import axiosMock from '../core/axiosMock';

const rates = [{
    price_close: 1,
    time_close: Date.now(),
  }, {
    price_close: 2,
    time_close: Date.now(),
  },
];

const currentUsdRate = {
  rate: 2,
  time: Date.now(),
};

axiosMock.onGet('/exchange-rate').reply(200, rates);
axiosMock.onGet('/exchange-rate/ETH/USD').reply(200, currentUsdRate);


describe('Services', () => {
  describe('ExchangeRatesService', () => {
    let service: ExchangeRatesService;

    beforeEach(() => {
      service = ExchangeRatesService.getInstance();
    });

    it('expect to create service instance', () => {
      expect(service).to.exist;
    });

    it('expect to get exchange rates', async () => {
      const data = await service.getRates();
      expect(data.length).to.equal(rates.length);
    });

    it('expect to get current ETH/USD rate', async () => {
      const data = await service.getRate('ETH', 'USD');
      expect(data.price).to.deep.equal(currentUsdRate.rate);
      expect(data.period).to.deep.equal(currentUsdRate.time);
    });
  });
});