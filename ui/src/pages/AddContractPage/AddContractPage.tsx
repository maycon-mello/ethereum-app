/* istanbul ignore file */

import React from 'react';
import { Steps, Icon, Button } from 'antd';
import IdentityForm from '../../components/IdentityForm';
import './AddContractPage.scss';
import { Step } from '../../modules/AddContractModule/addContractState';
import ContractTypeForm from '../../components/ContractTypeForm';
import ContractConfigForm from '../../components/ContractConfigForm';
import ContractConfirmation from '../../components/ContractConfirmation';
import ContractCreated from '../../components/ContractCreated';
import MetamaskStatus from '../../components/MetamaskStatus';

interface Props {
  canGoNext: boolean,
  canGoBack: boolean,
  onNextStep: () => void,
  onPreviousStep: () => void,
  currentStep: Step,
  shouldConfirm: boolean,
  onConfirm: () => void,
}

const StepFormMapping:any = {
  'identity': IdentityForm,
  'contractType': ContractTypeForm,
  'transaction': ContractConfigForm,
  'confirmation': ContractConfirmation,
  'done': ContractCreated,
}

const stepIdx = {
  'identity': 0,
  'contractType': 1,
  'transaction': 2,
  'confirmation': 3,
  'done': 4,
}

class AddContractPage extends React.Component<Props, any> {

  render() {
    const { canGoNext, canGoBack, onNextStep, onPreviousStep, currentStep, onConfirm } = this.props;

    const StepComponent = StepFormMapping[currentStep];

    return (
      <div className="add-contract-page">
        <MetamaskStatus className="metamask-status"/>
        <h1>Let's create your contract!</h1>
        <Steps>
          <Steps.Step status={stepIdx[currentStep] > 0 ? 'finish' : 'wait'} title="Identification" icon={<Icon type="user" />} />
          <Steps.Step status={stepIdx[currentStep] > 1 ? 'finish' : 'wait'} title="Contract Type" icon={<Icon type="solution" />} />
          <Steps.Step status={stepIdx[currentStep] > 2 ? 'finish' : 'wait'} title="Transaction" icon={<Icon type="upload" />} />
          <Steps.Step status={stepIdx[currentStep] > 3 ? 'finish' : 'wait'} title="Confirmation" icon={<Icon type="upload" />} />
          <Steps.Step status={stepIdx[currentStep] === 3 ? 'finish' : 'wait'} title="Done" icon={<Icon type={canGoNext ? 'smile-o' : 'frown'} />} />
        </Steps>
        <div className="step-content">
          <StepComponent />
        </div>
        { currentStep !== 'done' && <div className="step-actions">
          <Button.Group>
            <Button type="primary" size='large' disabled={!canGoBack} onClick={onPreviousStep} className="previous-step-btn">
              Previous
            </Button>
            { currentStep === 'confirmation'
              ? <Button type="primary" size='large' disabled={!canGoNext} onClick={onConfirm} className="next-step-btn confirm-btn">
                  Confirm
                </Button>
              : <Button type="primary" size='large' disabled={!canGoNext} onClick={onNextStep} className="next-step-btn">
                  Next Step
                </Button>
            }
          </Button.Group>
          </div> }
      </div>
    );
  }
}

export default AddContractPage;