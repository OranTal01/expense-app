import React from 'react';
import selectExpensesTotal  from '../selectors/expenses-total';
import { connect } from 'react-redux'
import selectExpenses from '../selectors/expenses';
import numeral from "numeral";

if (numeral.locales["user-locale"] === undefined) {
    numeral.register("locale", "user-locale", {
        delimiters: {
        thousands: ",",
        decimal: "."
        },
        abbreviations: {
        thousand: "k",
        million: "m",
        billion: "b",
        trillion: "t"
        },
        currency: {
        symbol: "₪"
        }
    });
    numeral.locale("user-locale");
    }

export const ExpensesSummery = (props) => {
    const expenseTotal = selectExpensesTotal(props.expenses);
    const convertExpenseTotal = numeral(expenseTotal / 100).format("$0,0.00");
    const expenseAmount = props.expenses.length
    return (
        <div>
            { props.expenses.length > 0 ? <p> Viewing { expenseAmount } expenses totalling
            { convertExpenseTotal }</p> : '' }
        </div>
    )
};

const mapStateToProps = (state) => ({
    expenses: selectExpenses(state.expenses, state.filters)
})

export default connect(mapStateToProps)(ExpensesSummery);
