import App from '../src/components/App';
import Nav from '../src/components/Nav';
import React from 'react';
import { shallow } from 'enzyme';

describe('App', () => {
	test('should match snapshot', () => {
		const wrapper = shallow(<App />);
		expect(wrapper.find('h1').text()).toBe('Welcome to My Starter App');
		expect(wrapper).toMatchSnapshot;
	})
})

describe('Nav', () => {
	test('should render', () => {
		const wrapper = shallow(<Nav />);
		expect(wrapper).contains('div');
		expet(wrapper).toMatchSnapshot;
	})
})