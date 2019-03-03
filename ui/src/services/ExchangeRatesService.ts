import * as R from 'ramda';
import axios from 'axios';

export interface ExchangeRate {
  price: number;
  period: string;
}

function formatPeriod(timestamp: string): string {
  const date: Date = new Date(timestamp);

  return `${date.getHours()}:${date.getMinutes()}`;
}

class ExchangeRatesService {
  static instance: ExchangeRatesService;

  async getRates(): Promise<Array<ExchangeRate>> {
    const { data } = await axios.get(`/exchange-rate`);

    const result = data.map((item: any) => ({
      price: item.price_close,
      period: formatPeriod(item.time_close),
    })).slice(0, 10);

    return result;
  }

  async getRate(baseCurrency = 'ETH', quoteCurrency = 'USD'): Promise<ExchangeRate>  {
    const url = `/exchange-rate/${baseCurrency}/${quoteCurrency}`;
    const { data } = await axios.get(url);

    return {
      price: data.rate,
      period: data.time,
    }; 
  }

  // Prevent unnecessary request to the server
  // You already have the possibility to call getRate directly
  getRateCached = R.memoizeWith(R.identity, ExchangeRatesService.prototype.getRate);
  getRatesCached = R.memoizeWith(R.identity, ExchangeRatesService.prototype.getRates);


  static getInstance(): ExchangeRatesService {
    if (!ExchangeRatesService.instance)  {
      ExchangeRatesService.instance = new ExchangeRatesService();
    }

    return ExchangeRatesService.instance;
  }

}

export default ExchangeRatesService;
