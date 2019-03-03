import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow, ShallowWrapper } from 'enzyme';
import ContractTypeForm, { contractTypes } from './ContractTypeForm';
import Contract from '../../model/Contract';

describe('Components: ContractTypeForm', () => {
  const contract: Contract = {
    id: 'contract-id',
    user: {
      name: 'test',
      surname: 'tester',
      email: 'test@test.com',
    },
    config: {},
    type: 'lottery',
  };

  const componentProps = {
    onChange: spy(),
    contract,
  };

  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(
      <ContractTypeForm {...componentProps} />  
    );
  })

  it('expect to render container', () => {
    expect(wrapper.find('.contract-type')).to.have.lengthOf(1);
  });

  it('expect to render check mark on selected card ', () => {
    const selectedCard = wrapper.find(`Card.contract-card-${contract.type}`);
    expect(selectedCard.find('.check-mark')).to.have.lengthOf(1);
  });

  it('expect to fire onChange event when some cart is selected', () => {
    contractTypes.forEach((contractType, idx) => {
      wrapper.find('Card').at(idx).simulate('click');
      expect(componentProps.onChange).to.be.calledWith('type', contractType.type);
    })  
  });
});
