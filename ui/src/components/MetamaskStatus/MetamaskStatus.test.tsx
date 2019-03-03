import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import MetamaskStatus, { Props } from './MetamaskStatus';

describe('Components: MetamaskStatus', () => {
  const componentProps:Props = {
    status: 'not-found',
    isLoading: false,
    className: 'test-class',
  };


  it('expected to render null, since this is loading', () => {
    const wrapper = shallow(
      <MetamaskStatus {...componentProps} isLoading={true} />  
    );

    expect(wrapper.find('Alert')).to.have.lengthOf(0);
  });

  it('expected to render null, since there are no problema with MetaMask', () => {
    const wrapper = shallow(
      <MetamaskStatus {...componentProps} status="ready"/>  
    );

    expect(wrapper.find('Alert')).to.have.lengthOf(0);
  });

  it('expected to render Alert for not-found status', () => {
    const wrapper = shallow(
      <MetamaskStatus {...componentProps} status="not-found"/>  
    );

    expect(wrapper.find('Alert')).to.have.lengthOf(1);
  });

  it('expected to render Alert for not-logged-in status', () => {
    const wrapper = shallow(
      <MetamaskStatus {...componentProps} status="not-logged-in"/>  
    );

    expect(wrapper.find('Alert')).to.have.lengthOf(1);
  });
});
