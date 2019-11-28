import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import selectExpensesTotal  from '../selectors/expenses-total';
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
    const expenseLength = props.expenses.length
    const expenseWord = props.expenses.length > 1 ? 'expenses' : 'expense'
    return (
        <div className="page-header">
            <div className="content-container">
            { props.expenses.length > 0 ?
            <h1 className="page-header__title">Viewing <span>{ expenseLength }</span> { expenseWord } totalling: <span>{ convertExpenseTotal }</span>
                    </h1> : '' }
                <div className="page-header__actions">
                    <Link className="button" to="/create">Add Expense</Link>
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => ({
    expenses: selectExpenses(state.expenses, state.filters)
})

export default connect(mapStateToProps)(ExpensesSummery);
