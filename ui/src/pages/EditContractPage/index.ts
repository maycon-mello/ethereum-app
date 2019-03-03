/* istanbul ignore file */

import connect from '../../redux/lib/connect';
import EditContractPage from './EditContractPage';

export default connect(({ dispatch, get, props }: ConnectProps) => ({
  init: () => dispatch('editContract/initialize', { id: props.contractId }),
  properties: {
    contract: get('editContract/contract'),
    isLoading: get('editContract/isLoading'),
    canSave: get('editContract/canSave'),
  },
  methods: {
    onBack: () => dispatch('router/goTo', { route: '/contracts' }),
    onSave: () => dispatch('editContract/saveContract'),
    onRemove: () => dispatch('editContract/removeContract'),
    setContractProp: (path: string, value: any) => dispatch('editContract/setContractProp', { path, value }),
  },
}))(EditContractPage);

