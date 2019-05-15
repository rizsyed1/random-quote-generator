import React from 'react';
import Hello from './Hello'
import { shallow } from 'enzyme';

it('renders an <input> element', () => {
    const typeAttrib = shallow(<input/>);
    expect(typeAttrib.find.attr("type='button'"))
}