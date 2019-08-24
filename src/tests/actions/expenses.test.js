import { addExpense, removeExpense, editExpense } from '../../actions/expenses';

test('should setup remove expense action object', () => {
    const action = removeExpense({ id: 'test' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: 'test'
    });
});

test('should setup tp edit expense action object', () => {
    const action = editExpense('test', { note: 'New note value' })
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: 'test',
        updates: {
            note: 'New note value'
        }
    });
});

test('should setup add expense action object with provided values', () => {
    const expenseDate = {
        description: 'description test',
        note: 'note test',
        amount: 1,
        createdAt: 1
    };
    const action = addExpense(expenseDate)
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            ...expenseDate
        }
    });
})

test('should setup add expense action object with default values', () => {
    const expenseDate = {
        description: '',
        note: '',
        amount: 0,
        createdAt: 0
    }
    const action = addExpense()
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            ...expenseDate
        }
    })
})