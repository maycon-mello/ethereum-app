import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import AppMenu, { getPathKey } from './AppMenu';

describe('Components: AppMenu', () => {
  const appMenuProps = {
    currentPath: '/contracts',
    onItemClick: spy(),
  }

  let wrapper = shallow(
    <AppMenu {...appMenuProps} />  
  );

  it('expect to mount component', () => {
    expect(wrapper.find('Menu')).to.have.lengthOf(1);
    expect(wrapper.find('MenuItem')).to.have.lengthOf(3);
  });

  it('expect to set selected keys', () => {
    const menu = wrapper.find('Menu').get(0);
    expect(menu.props.selectedKeys).to.be.deep.equal(['contracts']);
  });

  it('expect to fire onItemClick event when clicking on HTMLAnchorElement', () => {
    const menuItem = wrapper.find('MenuItem > a').first();
    menuItem.simulate('click');
    expect(appMenuProps.onItemClick).calledWith('/home');
  });

  describe('getSelectedKey', () => {
    it('expect to generate key for home', () => {
      expect(getPathKey('')).to.be.equal('home');
      expect(getPathKey('/')).to.be.equal('home');
      expect(getPathKey('/home')).to.be.equal('home');
      expect(getPathKey('/home?test=2')).to.be.equal('home');
    });

    it('expect to generate key for contracts', () => {
      expect(getPathKey('/contracts')).to.be.equal('contracts');
      expect(getPathKey('/contracts?page=2')).to.be.equal('contracts');
      expect(getPathKey('/contracts?page=2&balane=lessThen(20)')).to.be.equal('contracts');
      expect(getPathKey('/contracts/123')).to.be.equal('contracts');
      expect(getPathKey('/contracts/new')).to.be.equal('contracts');
    });

    it('expect to generate key for settings', () => {
      expect(getPathKey('/settings')).to.be.equal('settings');
      expect(getPathKey('/settings/password')).to.be.equal('settings');
    });
  });
});
