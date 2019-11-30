import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';
import RemoveExpenseModal from './RemoveExpenseModal';

export class EditExpensePage extends React.Component {
  state = {
    removeExpenseModal: undefined
  }
  onSubmit = (expense) => {
    this.props.startEditExpense(this.props.expense.id, expense);
    this.props.history.push('/');
  };
  handelRemoveExpense = () => {
    this.setState(() => ({
      removeExpenseModal: undefined
    }));
    this.props.startRemoveExpense({ id: this.props.expense.id });
    this.props.history.push('/');
  };
  onOpenRemoveModal = () => {
    this.setState(() => ({
      removeExpenseModal : this.props.expense.description
    }));
  };

  handelCloseModal = () => {
    this.setState(() => ({
      removeExpenseModal: undefined
    }));
    this.props.history.push('/');
  };

  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1
              className="page-header__title">
              Edit Expense
            </h1>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm
          expense={this.props.expense}
          onSubmit={this.onSubmit}
          />
          <div>
            <RemoveExpenseModal
              openRemoveExpenseModal={ this.state.removeExpenseModal }
              handelRemoveExpense={ this.handelRemoveExpense }
              handelCloseModal={ this.handelCloseModal}/>
          <button
            className="button button--secondary"
            onClick={ this.onOpenRemoveModal }>
            Remove Expense
          </button>
          </div>
          </div>
      </div>
    );
  }
};

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find((expense) => expense.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch, props) => ({
  startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
  startRemoveExpense: (data) => dispatch(startRemoveExpense(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
