import React from 'react';
import { shallow } from 'enzyme';
import {ExpensesSummery} from '../../components/ExpensesSummery';
import expenses from '../fixtures/expenses';

test('should render ExpensesSummery with 3 expenses', () => {
    const wrapper = shallow(<ExpensesSummery expenses={expenses} />);
    expect(wrapper).toMatchSnapshot();
});
    

test('should render ExpensesSummery with 1 expense', () => {
    const wrapper = shallow(<ExpensesSummery expenses={[expenses[0]]} />);
    expect(wrapper).toMatchSnapshot();
});