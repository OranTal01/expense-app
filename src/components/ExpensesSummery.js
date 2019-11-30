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

export class ExpensesSummery extends React.Component {
    
    state = {
        toggle: false
    }
    onToggle = () => {
        this.setState((prevState) => ({
            toggle: !prevState.toggle
        }));
    };
    render() {
        return (
            <div className="page-header">
                <div className="content-container">
                    {this.state.toggle &&
                        
                            
                                <h3 className="page-header__title">Viewing Total Expenses<span>{ this.props.totalExpenses.length }</span> { this.props.totalExpenses.length > 1 ? 'expenses' : 'expense' } totalling: <span>{ numeral(selectExpensesTotal(this.props.totalExpenses) / 100).format("$0,0.00") }</span>
                                </h3>
                        }
                    { 
                        <h1 className="page-header__title">Viewing <span>{ this.props.expenses.length }</span> { this.props.expenses.length > 1 ? 'expenses' : 'expense' } totalling: <span>{ numeral(selectExpensesTotal(this.props.expenses) / 100).format("$0,0.00") }</span>
                        </h1>}
                    <div className="page-header__actions">
                        <Link className="button" to="/create">
                            Add Expense
                        </Link>
                        <button
                            onClick={ this.onToggle }
                            className="button" >
                            Total Expenses
                        </button>
                    </div>
                </div>
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    expenses: selectExpenses(state.expenses, state.filters),
    totalExpenses: state.expenses
})

export default connect(mapStateToProps)(ExpensesSummery);
