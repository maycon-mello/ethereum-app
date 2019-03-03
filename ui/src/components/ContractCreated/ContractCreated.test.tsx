import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow, ShallowWrapper } from 'enzyme';
import ContractCreated from './ContractCreated';
import Contract from '../../model/Contract';

describe('Components: ContractCreated', () => {
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
    goToContractList: spy(),
    contract,
  };

  let wrapper: ShallowWrapper = shallow(
    <ContractCreated {...componentProps} />  
  );

  it('expect to render contract list anchor', () => {
    expect(wrapper.find('a.contract-list-anchor')).to.have.lengthOf(1);
  });

  it('expect to render contract list anchor', () => {
    wrapper.find('a.contract-list-anchor').simulate('click');
    expect(componentProps.goToContractList).calledOnce;
  });
});
