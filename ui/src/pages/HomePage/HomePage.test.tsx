import React from 'react';
import { expect } from 'chai';
import { shallow, ShallowWrapper } from 'enzyme';
import HomePage, { Props } from './HomePage';

describe('Pages: HomePage', () => {
  const appProps: Props = {
    isLoading: false
  };

  let wrapper: ShallowWrapper = shallow(<HomePage {...appProps} />);

  it('expect to mount component', () => {
    expect(wrapper.find('.home-page')).to.have.lengthOf(1);  
  });

  it('expect to render Loader', () => {
    let wrapper: ShallowWrapper = shallow(<HomePage {...appProps} isLoading={true}/>);
    expect(wrapper.find('Loader')).to.have.lengthOf(1);
  });
});
