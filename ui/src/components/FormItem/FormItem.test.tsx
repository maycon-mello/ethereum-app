import React from 'react';
import { expect } from 'chai';
import { shallow, ShallowWrapper } from 'enzyme';
import FormItem, { FieldProps } from './FormItem';

describe('Components: FormItem', () => {
  const componentProps: FieldProps = {
    validation: undefined,
    layout: {},
    label: 'test',
    children: <span className="test-children">test</span>,
  };

  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(
      <FormItem {...componentProps} />  
    );
  })

  it('expected to render children', () => {
    expect(wrapper.find('span.test-children')).to.have.lengthOf(1); 
  });
});
