/* istanbul ignore file */
import connect from '../../redux/lib/connect';
import ContractConfigForm from './ContractConfigForm';

export default connect(({ dispatch, get }: ConnectProps) => ({
  properties: {
    contract: get('addContract/contract'),
    formValidation: get('addContract/formValidation'),
  },
  methods: {
    onChange: (path: string, value: any) => dispatch('addContract/setField', { path, value }),
  },
}))(ContractConfigForm);

