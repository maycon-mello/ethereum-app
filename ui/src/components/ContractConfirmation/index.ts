/* istanbul ignore file */
import connect from '../../redux/lib/connect';
import ContractConfirmation from './ContractConfirmation';

export default connect(({ dispatch, get }: ConnectProps) => ({
  properties: {
    contract: get('addContract/contract'),
    formValidation: get('addContract/formValidation'),
    isLoading: get('addContract/isLoading'),
    loadingDetails: get('addContract/loadingDetails'),
  },
  methods: {
    onChange: (path: string, value: any) => dispatch('addContract/setField', { path, value }),
  },
}))(ContractConfirmation);

