import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

export const ExpenseList = (props) => (
  <div>
    <h1>Expense List</h1>
    {
      props.expenses.length === 0 ? (<p>No Expenses</p>) :
        (props.expenses.map((expense) => {
          return <ExpenseListItem key={ expense.id } { ...expense } />
        }))
    }
    <h3>Total Amount:{ props.expenses.reduce((a, b) => parseFloat(a) + parseFloat(b.amount), 0).toFixed(2) }</h3>
  </div>
);

const mapStateToProps = (state) => {
  return {
    expenses: selectExpenses(state.expenses, state.filters)
  };
};

export default connect(mapStateToProps)(ExpenseList);