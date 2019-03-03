/* istanbul ignore file */
import connect from '../../redux/lib/connect';
import ContractCreated from './ContractCreated';

export default connect(({ dispatch, get }: ConnectProps) => ({
  properties: {
    contract: get('addContract/contract'),
  },
  methods: {
    goToContractList: () => dispatch('router/goTo', { route: '/contracts' }),
  },
}))(ContractCreated);

