import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow, ShallowWrapper } from 'enzyme';
import IdentityForm from './IdentityForm';
import Contract from '../../model/Contract';

describe('Components: IdentityForm', () => {
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

  const props = {
    onChange: spy(),
    formValidation: new Map(),
    contract,
  };

  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(
      <IdentityForm {...props} />  
    );
  })

  it('expected to render name field', () => {
    const field = wrapper.find('Input[name="user.name"]')
    expect(field).to.have.lengthOf(1);
    expect(field.get(0).props.value).to.be.equal(props.contract.user.name);
  });


  it('expected to render surname field', () => {
    const field = wrapper.find('Input[name="user.surname"]')
    expect(field).to.have.lengthOf(1);
    expect(field.get(0).props.value).to.be.equal(props.contract.user.surname);
  });

  it('expected to render email field', () => {
    const field = wrapper.find('Input[name="user.email"]')
    expect(field).to.have.lengthOf(1);
    expect(field.get(0).props.value).to.be.equal(props.contract.user.email);
  });

  it('expected to fire onChange event on input change', () => {
    ['name', 'surname', 'email'].forEach((fieldName) => {
      const name = `user.${fieldName}`;
      const value = `${Date.now()}`;
      const field = wrapper.find(`Input[name="${name}"]`);

      field.simulate('change', {
        target: {
          name,
          value,
        },
      });

      expect(props.onChange).to.be.calledWith(name, value);
    }); 
  });
});
