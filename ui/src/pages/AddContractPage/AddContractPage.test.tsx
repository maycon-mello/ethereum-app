// TODO: Need to test Steps Component

import React from 'react';
import { expect } from 'chai';
import { shallow, ShallowWrapper } from 'enzyme';
import { spy } from 'sinon';

import AddContractPage from './AddContractPage';
import { Step } from '../../modules/AddContractModule/addContractState';

describe('Pages: AddContractPage', () => {
  const currentStep: Step = 'identity';
  const appProps = {
    canGoNext: true,
    canGoBack: true,
    onNextStep: spy(),
    onPreviousStep: spy(),
    currentStep: currentStep,
    shouldConfirm: false,
    onConfirm: spy(),
  };

  let wrapper: ShallowWrapper = shallow(<AddContractPage {...appProps} />);

  it('expect to mount component', () => {
    expect(wrapper.find('.add-contract-page')).to.have.lengthOf(1);  
  });

  it('expected to render MetamaskStatus', () => {
    expect(wrapper.find('.metamask-status')).to.have.lengthOf(1);  
  });

  it('expected to render next button enabled', () => {
    const btn = wrapper.find('Button.next-step-btn');
    expect(btn).to.have.lengthOf(1);
    expect(btn.get(0).props.disabled).to.be.false;
  });

  it('expected to render previous enabled', () => {
    const btn = wrapper.find('Button.previous-step-btn');
    expect(btn).to.have.lengthOf(1);
    expect(btn.get(0).props.disabled).to.be.false;
  });

  it('expected to render IdentityForm component', () => {
    expect(wrapper.find('Connect(IdentityForm)')).to.have.lengthOf(1);
  });

  it('expected to render ContractTypeForm component', () => {
    const wrapper = shallow(<AddContractPage {...appProps} currentStep="contractType" />)
    expect(wrapper.find('Connect(ContractTypeForm)')).to.have.lengthOf(1);
  });

  it('expected to render ContractConfigForm component', () => {
    const wrapper = shallow(<AddContractPage {...appProps} currentStep="transaction" />)
    expect(wrapper.find('Connect(ContractConfigForm)')).to.have.lengthOf(1);
  });

  it('expected to render ContractConfirmation component', () => {
    const wrapper = shallow(<AddContractPage {...appProps} currentStep="confirmation" />)
    expect(wrapper.find('Connect(ContractConfirmation)')).to.have.lengthOf(1);
  });

  it('expected to render ContractCreated component', () => {
    const wrapper = shallow(<AddContractPage {...appProps} currentStep="done" />)
    expect(wrapper.find('Connect(ContractCreated)')).to.have.lengthOf(1);
  });
});
