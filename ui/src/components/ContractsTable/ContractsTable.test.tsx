import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { mount, ReactWrapper } from 'enzyme';
import ContractsTable from './ContractsTable';
import Contract from '../../model/Contract';

describe('Components: ContractsTable', () => {
  const contracts: Contract[] = [{
    id: 'contract-id',
    user: {
      name: 'test',
      surname: 'tester',
      email: 'test@test.com',
    },
    config: {},
    type: 'lottery',
  }];

  const componentProps = {
    onRemove: spy(),
    onEdit: spy(),
    contracts,
  };

  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(
      <ContractsTable {...componentProps} />  
    );
  })

  it('expect to render action anchors', () => {
    expect(wrapper.find('a.remove-item')).to.have.lengthOf(1);
    expect(wrapper.find('a.edit-item')).to.have.lengthOf(1);
  });

  it('expect to fire onEdit event', () => {
    wrapper.find('a.edit-item').simulate('click');
    expect(componentProps.onEdit).to.be.calledWith(contracts[0].id);  
  });

  it('expect to show popup before removing item', () => {
    wrapper.find('a.remove-item').simulate('click');
    expect(wrapper.find('.ant-popover-buttons')).to.have.lengthOf(1);
  });

  it('expect to fire onRemove event', () => {
    wrapper.find('a.remove-item').simulate('click');
    const yesButton = wrapper.find('.ant-popover-buttons .ant-btn-primary');
    yesButton.simulate('click');
    expect(componentProps.onRemove).to.be.calledWith(contracts[0].id);  
  });
});
