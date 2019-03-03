import React from 'react';
import { expect } from 'chai';
import { shallow, ShallowWrapper } from 'enzyme';
import ExchangeRateChart, { Props } from './ExchangeRateChart';

describe('Components: ExchangeRateChart', () => {
  const componentProps:Props = {
    rates: [{
      period: '01-12',
      price: 1.0
    }],
    width: 200,
    height: 200,
  };

  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(
      <ExchangeRateChart {...componentProps} />  
    );
  })

  it('expect to render Line chart', () => {
    expect(wrapper.find('Line')).to.have.lengthOf(1);
  });
});
