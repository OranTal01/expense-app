import React from 'react';
import { shallow } from 'enzyme';
import {ExpensesSummery} from '../../components/ExpensesSummery';
import expenses from '../fixtures/expenses';

test('should render ExpensesSummery with expenses', () => {
    const wrapper = shallow(<ExpensesSummery expenses={expenses} />);
    expect(wrapper).toMatchSnapshot();
});
    