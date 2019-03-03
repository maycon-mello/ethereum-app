import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Currency, { formatValue } from './Currency';

describe('Components: Currency', () => {
  it('expect to render loader', () => {
    const wrapper = shallow(
      <Currency value={1} isLoading={true} />
    );

    expect(wrapper.find('Loader')).to.have.lengthOf(1);
  });

  it('expect to render value', () => {
    const wrapper = shallow(
      <Currency value={2} isLoading={false} />
    );

    expect(wrapper.find('Loader')).to.have.lengthOf(0);
    expect(wrapper.find('Fragment').text()).to.be.equal('$2.00');
  });

  it('expect to formatValue', () => {
    expect(formatValue(1)).to.be.equal('1.00');
    expect(formatValue(0.5)).to.be.equal('0.50');
    expect(formatValue('2')).to.be.equal('2.00');
    expect(formatValue('2.5')).to.be.equal('2.50');
  })
});
