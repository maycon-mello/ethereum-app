import React from 'react';
import * as R from 'ramda';
import { expect } from 'chai';
import { mount, shallow, ShallowWrapper } from 'enzyme';
import { spy } from 'sinon';

import EditContractPage, { Props } from './EditContractPage';

describe('Pages: EditContractPage', () => {
  const appProps: Props = {
    contract: {
      id: 'test',
      user: {
        name: 'test',
        email: 'tester',
        surname: 'tester',
      },
      config: {},
      type: 'donation',
    },
    isLoading: false,
    canSave: true,
    onSave: spy(),
    onRemove: spy(),
    setContractProp: spy(),
    onBack: spy(),
  };

  let wrapper: ShallowWrapper = shallow(<EditContractPage {...appProps} />);

  it('expect to mount component', () => {
    expect(wrapper.find('.edit-contract-page')).to.have.lengthOf(1);  
  });

  it('expect to fire onRemove event', () => {
    const wrapper = mount(<EditContractPage {...appProps} />);

    wrapper.find('.remove-contract-btn').first().simulate('click');
    const yesButton = wrapper.find('.ant-popover-buttons .ant-btn-primary');
    yesButton.simulate('click');
    expect(appProps.onRemove).calledOnce;
  });

  it('expect to fire onSave event', () => {
    wrapper.find('.save-contract-btn').simulate('click');
    expect(appProps.onSave).calledOnce;
  });

  it('expect to fire onBack event', () => {
    wrapper.find('.back-btn').simulate('click');
    expect(appProps.onBack).calledOnce;
  });

  it('expected to render fields', () => {
    ['user.name', 'user.email', 'user.surname'].forEach((fieldName) => {
      const field = wrapper.find(`Input[name="${fieldName}"]`);
      const propValue = R.view(R.lensPath(fieldName.split('.')), appProps.contract);
      expect(field.get(0).props.value).to.be.equal(propValue);
    });
  });

  it('expected to edit contract properties field', () => {
    ['user.name', 'user.email', 'user.surname'].forEach((fieldName) => {
      const value = `${Math.random()}`;
      wrapper.find(`Input[name="${fieldName}"]`).simulate('change', {
        target: {
          name: fieldName,
          value: value,
        },
      });

      expect(appProps.setContractProp).to.be.calledWith(fieldName, value);
    });
  });

  it('expect to render loader', () => {
    const wrapper = shallow(<EditContractPage {...appProps} isLoading={true} />);
    expect(wrapper.find('Loader')).to.have.lengthOf(1);
  });
});
