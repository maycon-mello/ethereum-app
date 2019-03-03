import React from 'react';
import { expect } from 'chai';
import { mount, ReactWrapper } from 'enzyme';
import Loader from './Loader';

describe('Components: ChartUtils', () => {
  let wrapper: ReactWrapper;
  const componentProps = {
    size: 2,
  };

  beforeEach(() => {
    wrapper = mount(
      <Loader {...componentProps} />  
    );
  })


  it('expected to render Spin', () => {
    expect(wrapper.find('Spin')).to.have.lengthOf(1);
  });
});
