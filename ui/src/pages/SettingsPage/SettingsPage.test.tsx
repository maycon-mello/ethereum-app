import React from 'react';
import { expect } from 'chai';
import { shallow, ShallowWrapper } from 'enzyme';
import SettingsPage, { Props } from './SettingsPage';

describe('Pages: SettingsPage', () => {
  const appProps: Props = {
    isLoading: false
  };

  let wrapper: ShallowWrapper = shallow(<SettingsPage {...appProps} />);

  it('expect to mount component', () => {
    expect(wrapper.find('.settings-page')).to.have.lengthOf(1);  
  });

  it('expect to render Loader', () => {
    let wrapper: ShallowWrapper = shallow(<SettingsPage {...appProps} isLoading={true}/>);
    expect(wrapper.find('Loader')).to.have.lengthOf(1);
  });
});
