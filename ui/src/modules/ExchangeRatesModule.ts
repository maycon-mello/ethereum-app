import { Saga, Reducer, ReduxModule } from '../redux/lib/decorators';
import ExchangeRatesService, { ExchangeRate } from '../services/ExchangeRatesService';

type State = {
  showDrawer: boolean,
  isLoading: boolean,
  rates?: Array<ExchangeRate>,
  currentRate?: number,
};

let service = ExchangeRatesService.getInstance();

export function setService(customService: any) {
  service = customService;
}

class ExchangeRatesModule extends ReduxModule<State> {
  state = {
    isLoading: true,
    showDrawer: false,
    rates: undefined,
    currentRate: undefined,
  }

  @Reducer()
  toggleDrawer(state: State) {
    return {
      ...state,
      showDrawer: !state.showDrawer,
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

  @Reducer()
  setRates(state: State, { rates, currentRate }: any) {
    return {
      ...state,
      rates: rates,
      currentRate: currentRate,
    }
  }

  @Saga('initialize')
  private * initialize(saga: SideEffects) {
    yield saga.put('startLoading');
    let currentRate = 0;

    const rates: Array<ExchangeRate> = yield saga.call(service.getRatesCached);

    try {
      const rate: ExchangeRate = yield saga.call(service.getRateCached, 'ETH', 'USD');
      currentRate = rate.price;
    } catch(err) {
      console.error(err);
      currentRate = 0;
    }

    yield saga.put('setRates', { rates, currentRate });
    yield saga.put('stopLoading');
  }
}

export default ExchangeRatesModule;
