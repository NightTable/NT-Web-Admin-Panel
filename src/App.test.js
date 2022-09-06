// NightTable, LLC has been granted a license by John Nydam 
// to use this document and the information contained in it 
// for business objectives pertinent to the company. 
// It must not be copied, duplicated, or used in any manner, 
// or transmitted to others without the written consent of John Nydam. 
// It must be returned to John Nydam when its authorized use is terminated. 

import React from 'react';

import App from './App';

import { shallow } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({adapter: new Adapter()});


describe('Initial verification that the App.js component loads', () => {

  it('Should render the app.js component', () => {

    const wrapper = shallow(<App />);

    expect(wrapper.find('Routes')).toHaveLength(1);

  });

});
