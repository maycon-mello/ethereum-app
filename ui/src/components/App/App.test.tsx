import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import App from './App';

describe('Components: App', () => {
  const children = <div className="test-children"></div>;
  const appProps = {
    toggleMenu: spy(),
    onPathChange: spy(),
    currentPath: '/test',
    menuCollapsed: true,
  }

  let wrapper = shallow(
    <App {...appProps}>
      { children }
    </App>  
  );

  it('expect to mount component', () => {
    expect(wrapper.find('.app-container')).to.have.lengthOf(1);
    expect(wrapper.find('.header')).to.have.lengthOf(1);
    expect(wrapper.find('Connect(ExchangeRateDrawer)')).to.have.lengthOf(1);
  });

  it('expect to render children', () => {
    expect(wrapper.find('.test-children')).to.have.lengthOf(1);
  });

  it('expect to toggleMenu', () => {
    wrapper.find('.toggle-menu').simulate('click');
    expect(appProps.toggleMenu).to.be.calledOnce;
  });

  it('expect to render AppMenu', () => {
    const appMenu = wrapper.find('AppMenu');
    expect(appMenu).to.have.lengthOf(1);
    expect(appMenu.get(0).props.currentPath).to.be.equal(appProps.currentPath);
  });

  it('expect to Sider to be collapsed', () => {
    const sider = wrapper.find('Sider');
    expect(sider.get(0).props.collapsed).to.be.true;
  });

  it('expect to Sider to not be collapsed', () => {
    wrapper = shallow(<App {...appProps} menuCollapsed={false}/>);
    const sider = wrapper.find('Sider');
    expect(sider.get(0).props.collapsed).to.be.false;
  });

});
