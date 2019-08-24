import React from 'react';
import { ExpenseList } from '../../components/ExpenseList';
import { shallow } from 'enzyme';
import expenses from '../fixtures/expenses';

test('should render ExpenseList with expense', () => {
    const wrapper = shallow(<ExpenseList expenses={ expenses } />);
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseList with no expenses', () => {
    const wrapper = shallow(<ExpenseList expenses={ [] } />);
    expect(wrapper).toMatchSnapshot();
});
