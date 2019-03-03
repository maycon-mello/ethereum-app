/* istanbul ignore file */
import connect from '../../redux/lib/connect';
import MetamaskStatus from './MetamaskStatus';

export default connect(({ dispatch, get }: ConnectProps) => ({
  init: () => dispatch('web3/initialize'),
  properties: {
    status: get('web3/status'),
    isLoading: get('web3/isLoading'),
  },
  methods: {
  },
}))(MetamaskStatus);

