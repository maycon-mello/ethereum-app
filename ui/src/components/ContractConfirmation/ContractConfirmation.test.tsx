import React from 'react';
import { expect } from 'chai';
import { shallow, ShallowWrapper } from 'enzyme';
import ContractConfirmation, { getDeployPrice } from './ContractConfirmation';
import Contract from '../../model/Contract';

describe('Components: ContractConfirmation', () => {
  const contract: Contract = {
    id: 'id',
    deployPriceInUsd: 2,
    user: {
      name: 'test',
      email: 'test@test.com',
    },
    config: {},
    type: 'lottery',
  };

  const componentProps = {
    isLoading: false,
    contract,
  };

  let wrapper: ShallowWrapper;

  it('expect to render Loader', () => {
    wrapper = shallow(
      <ContractConfirmation {...componentProps} isLoading={true} />  
    );
    expect(wrapper.find('Loader')).to.have.lengthOf(1);
  });

  it('expect to render confirmation message', () => {
    wrapper = shallow(
      <ContractConfirmation {...componentProps} />  
    );
    expect(wrapper.find('.confirmation-message')).to.have.lengthOf(1);
  });

  it('expect to get deploy price', () => {
    expect(getDeployPrice({ ...contract, deployPriceInUsd: 2 })).to.be.equal('2.000');
    expect(getDeployPrice({ ...contract, deployPriceInUsd: undefined })).to.be.equal('0.000');
    expect(getDeployPrice({ ...contract, deployPriceInUsd: 0.006 })).to.be.equal('0.006');
  });
});
