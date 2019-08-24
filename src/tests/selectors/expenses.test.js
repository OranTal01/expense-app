import selectExpense from '../../selectors/expenses';
import moment from 'moment';
import expenses from '../fixtures/expenses';

test('should filter by text filter value', () => {
    const filters = {
        text: '1',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    };
    const result = selectExpense(expenses, filters);
    expect(result).toEqual([
        expenses[0]
    ]);
});

test('should filter by start date filter', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: moment(0),
        endDate: undefined
    };
    const result = selectExpense(expenses, filters);
    expect(result).toEqual([
        expenses[2], expenses[0]
    ]);
});

test('should filter by end date filter', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: moment(0)
    };
    const result = selectExpense(expenses, filters);
    expect(result).toEqual([
        expenses[0], expenses[1]
    ]);
});

test('should sort by date', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    };
    const result = selectExpense(expenses, filters);
    expect(result).toEqual([
        expenses[2], expenses[0], expenses[1]
    ]);
});

test('should sort by amount', () => {
    const filters = {
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    };
    const result = selectExpense(expenses, filters);
    expect(result).toEqual([
        expenses[0], expenses[2], expenses[1]
    ]);
});