/* istanbul ignore file */

import connect from '../../redux/lib/connect';
import AddContractPage from './AddContractPage';

export default connect(({ dispatch, get }: ConnectProps) => ({
  init: () => dispatch('addContract/initialize'),
  properties: {
    canGoNext: get('addContract/canGoNext'),
    canGoBack: get('addContract/canGoBack'),
    currentStep: get('addContract/currentStep'),
  },
  methods: {
    onNextStep: () => dispatch('addContract/onNextStep'),
    onPreviousStep: () => dispatch('addContract/onPreviousStep'),
    onConfirm: () => dispatch('addContract/onConfirm'),
  },
}))(AddContractPage);

