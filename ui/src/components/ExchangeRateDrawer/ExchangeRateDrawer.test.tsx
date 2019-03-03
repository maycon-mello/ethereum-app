import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow, ShallowWrapper } from 'enzyme';
import ExchangeRateDrawer from './ExchangeRateDrawer';

describe('Components: ExchangeRateDrawer', () => {
  const componentProps = {
    rates: [],
    isLoading: false,
    visible: true,
    toggleDrawer: spy(),
    currentRate: 2,
  };

  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(
      <ExchangeRateDrawer {...componentProps} />  
    );
  })

  it('expected render current rate button', () => {
    expect(wrapper.find('Button.current-rate-button')).to.have.lengthOf(1);
  });

  it('expected to fire toggleDrawer event', () => {
    wrapper.find('Button.current-rate-button').simulate('click');
    expect(componentProps.toggleDrawer).calledOnce;
  });

  it('expected to render ExchangeRateChart', () => {
    expect(wrapper.find('ExchangeRateChart')).to.have.lengthOf(1);
  });

  it('expected to render loader', () => {
    wrapper = shallow(
      <ExchangeRateDrawer {...componentProps} isLoading={true}/>  
    );

    expect(wrapper.find('Loader')).to.have.lengthOf(1);
  })
});
