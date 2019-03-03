import React from 'react';
import * as R from 'ramda';
import { expect } from 'chai';
import { shallow, ShallowWrapper } from 'enzyme';
import { spy } from 'sinon';
import ContractConfigForm from './ContractConfigForm';
import Contract from '../../model/Contract';
import { ValidationStatus } from '../../core/Validation';

const withContractConfig = (type:string , config: any) => R.compose(
  R.set(R.lensPath(['contract', 'type']), type),
  R.set(R.lensPath(['contract', 'config']), config),
);

describe('Components: ContractConfigForm', () => {
  const contract: Contract = {
    id: 'id',
    user: {
      name: 'test',
      email: 'test@test.com',
    },
    config: {

    },
    type: 'lottery',
  };

  const formValidation: Map<string, ValidationStatus> = new Map();
  const formProps = {
    onChange: spy(),
    contract,
    formValidation: formValidation,
  };

  let wrapper: ShallowWrapper = shallow(
    <ContractConfigForm {...formProps} />  
  );

  it('expect to render form', () => {
    expect(wrapper.find('Form.contract-config-form')).to.have.lengthOf(1);
  });

  it('expect to render contract type field', () => {
    expect(wrapper.find('Input[name="type"]')).to.have.lengthOf(1);
  });

  it('expect to render currency field', () => {
    expect(wrapper.find('Select.contract-currency-select')).to.have.lengthOf(1);
  });

  describe('Guess', () => {
    let props: any;
    let ticketPriceField: ShallowWrapper;
    let numberToGuessField: ShallowWrapper;

    beforeEach(() => {
      props = withContractConfig('guess', {
        numberToGuess: 123,
        ticketPrice: 2,
      })(formProps);

      wrapper = shallow(<ContractConfigForm {...props} />);
      ticketPriceField = wrapper.find('InputNumber[name="config.ticketPrice"]');
      numberToGuessField = wrapper.find('InputNumber[name="config.numberToGuess"]');
    });

    it('expect to render ticket price field', () => {
      expect(ticketPriceField).to.have.lengthOf(1);
      expect(ticketPriceField.get(0).props.value).to.be.equal(props.contract.config.ticketPrice);

    });

    it('expect to render number to guess field', () => {
      expect(numberToGuessField).to.have.lengthOf(1);
      expect(numberToGuessField.get(0).props.value).to.be.equal(props.contract.config.numberToGuess);
    });

    it('expect to fire onChange event on number to guess change', () => {
      const value = 12;
      numberToGuessField.simulate('change', value)
      expect(props.onChange).to.be.calledWith('config.numberToGuess', value);
    });

    it('expect to fire onChange event on ticket price change', () => {
      const value = 12;
      ticketPriceField.simulate('change', value)
      expect(props.onChange).to.be.calledWith('config.ticketPrice', value);
    });
  });

  describe('Donation', () => {
    let props: any;
    let minValueField: ShallowWrapper;

    beforeEach(() => {
      props = withContractConfig('donation', {
        minValue: 2,
      })(formProps);

      wrapper = shallow(<ContractConfigForm {...props} />);
      minValueField = wrapper.find('InputNumber[name="config.minValue"]')
    });

    it('expect to render minimum value field', () => {
      expect(minValueField).to.have.lengthOf(1);
      expect(minValueField.get(0).props.value).to.be.equal(props.contract.config.minValue);
    });

    it('expect to fire onChange event on min value change', () => {
      const value = 12;
      minValueField.simulate('change', value)
      expect(props.onChange).to.be.calledWith('config.minValue', value);
    });
  });

  describe('Lottery', () => {
    let props: any;
    let ticketPriceField: ShallowWrapper;

    beforeEach(() => {
      props = withContractConfig('lottery', {
        ticketPrice: 2,
      })(formProps);

      wrapper = shallow(<ContractConfigForm {...props} />);
      ticketPriceField = wrapper.find('InputNumber[name="config.ticketPrice"]');
    });

    it('expect to render ticket price field', () => {
      expect(ticketPriceField).to.have.lengthOf(1);
      expect(ticketPriceField.get(0).props.value).to.be.equal(props.contract.config.ticketPrice);
    });

    it('expect to fire onChange event on ticket price change', () => {
      const value = 12;
      ticketPriceField.simulate('change', value)
      expect(props.onChange).to.be.calledWith('config.ticketPrice', value);
    });
  });
});
