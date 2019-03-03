/* istanbul ignore file */
import connect from '../../redux/lib/connect';
import ExchangeRateDrawer from './ExchangeRateDrawer';

export default connect(({ dispatch, get, props }: ConnectProps) => ({
  init: () => dispatch('exchangeRates/initialize', props),
  properties: {
    isLoading: get('exchangeRates/isLoading'),
    visible: get('exchangeRates/showDrawer'),
    rates: get('exchangeRates/rates'),
    currentRate: get('exchangeRates/currentRate'),
  },
  methods: {
    toggleDrawer: () => dispatch('exchangeRates/toggleDrawer'),
  },
}))(ExchangeRateDrawer);

