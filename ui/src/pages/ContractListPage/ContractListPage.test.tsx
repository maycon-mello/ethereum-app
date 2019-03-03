import React from 'react';
import { expect } from 'chai';
import { shallow, ShallowWrapper } from 'enzyme';
import { spy } from 'sinon';

import ContractListPage from './ContractListPage';

describe('Pages: ContractListPage', () => {
  const appProps = {
    onEdit: spy(),
    onRemove: spy(),
    onNewContract: spy(),
    contracts: spy(),
    isLoading: false
  };

  let wrapper: ShallowWrapper = shallow(<ContractListPage {...appProps} />);

  it('expect to mount component', () => {
    expect(wrapper.find('.contract-list-page')).to.have.lengthOf(1);  
  });

  it('expect to render ContractsTable', () => {
    expect(wrapper.find('ContractsTable')).to.have.lengthOf(1);
  });

  it('expect to render AddContract button', () => {
    expect(wrapper.find('.add-contract-btn')).to.have.lengthOf(1);
  });

  it('expect to fire onNewContract event', () => {
    wrapper.find('.add-contract-btn').simulate('click');
    expect(appProps.onNewContract).calledOnce;
  });

  it('expect to render loader', () => {
    const wrapper = shallow(<ContractListPage {...appProps} isLoading={true} />);
    expect(wrapper.find('Loader')).to.have.lengthOf(1);
  });
});
