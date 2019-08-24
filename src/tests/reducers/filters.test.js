import filterReducer from '../../reducers/filters';
import moment from 'moment';

test('should setup default filter values', () => {
    const state = filterReducer(undefined, { type: '@@INIT' })
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test('should setup filter by text', () => {
    const text = 'test';
    const action = {
        type: 'SET_TEXT_FILTER',
        text
    }
    const state = filterReducer(undefined, action);
    expect(state.text).toBe('test')
});

test('should set sort by to amount', () => {
    const state = filterReducer(undefined, { type: 'SORT_BY_AMOUNT' });
    expect(state.sortBy).toBe('amount')
});

test('should set sort by to date', () => {
    const currentState = {
        text: '',
        sortBy: 'amount',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    };
    const state = filterReducer(currentState, { type: 'SORT_BY_DATE' });
    expect(state.sortBy).toBe('date')
});

test('should set start date filter', () => {
    const startDate = moment(0)
    const action = {
        type: 'SET_START_DATE',
        startDate
    };
    const state = filterReducer(undefined, action)
    expect(state.startDate).toEqual(startDate);
});

test('should set endDate filter', () => {
    const endDate = moment(0)
    const action = {
        type: 'SET_END_DATE',
        endDate
    };
    const state = filterReducer(undefined, action)
    expect(state.endDate).toEqual(endDate);
});