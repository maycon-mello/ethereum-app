/* istanbul ignore file */

import connect from '../../redux/lib/connect';
import ContractListPage from './ContractListPage';

export default connect(({ dispatch, get }: ConnectProps) => ({
  init: () => dispatch('contractList/initialize'),
  properties: {
    contracts: get('contractList/contracts'),
    isLoading: get('contractList/isLoading'),
  },
  methods: {
    onEdit: (contractId: string) => dispatch('router/goTo', { route: `/contracts/${contractId}` }),
    onRemove: (contractId: string) => dispatch('contractList/removeContract', { contractId }),
    onNewContract: () => dispatch('router/goTo', { route: '/contracts/new' }), 
  },
}))(ContractListPage);
