/* istanbul ignore file */
import connect from '../../redux/lib/connect';
import IdentityForm from './IdentityForm';

export default connect(({ dispatch, get }: ConnectProps) => ({
  properties: {
    contract: get('addContract/contract'),
    formValidation: get('addContract/formValidation'),
  },
  methods: {
    onChange: (path: string, value: any) => dispatch('addContract/setField', { path, value }),
  },
}))(IdentityForm);

