import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import {history} from '../routers/AppRouter';


export default class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: props.expense ? props.expense.description : '',
      note: props.expense ? props.expense.note : '',
      amount: props.expense ? (props.expense.amount / 100).toString() : '',
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calendarFocused: false,
      error: '',
      payments: '1'
    };
  }
  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  };
  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  };
  onAmountChange = (e) => {
    const amount = e.target.value;

    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  };
  onDateChange = (createdAt) => {
    if (createdAt) {
      this.setState(() => ({ createdAt }));
    }
  };
  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };
  onSubmit = (e) => {
    e.preventDefault();

    if (!this.state.description || !this.state.amount) {
      this.setState(() => ({ error: 'Please provide description and amount.' }));
    }
    else if (this.state.payments > 1) {
      const userPayments = this.state.payments
      this.setState(() => ({ error: '' }));
      for (let index = userPayments; index >= 1; index--) {
        this.props.onSubmit({
          description: this.state.description,
          amount: (parseFloat(this.state.amount, 10) * 100) / (parseFloat(userPayments,10)),
          createdAt: index === userPayments ? this.state.createdAt.valueOf() : this.state.createdAt.add(1, 'months').valueOf(),
          note: this.state.note
        });
      }
    }
    else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10) * 100,
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note
      });
    }
  };

  toggleAddEditExpense = () => {
    if (history.location.pathname === '/create') {
      return true
    } else {
      return false
    }
  };

  onChangePayments = (e) => {
    const userPayments = e.target.value;
    this.setState(() => ({
      payments: userPayments
    }));
  };

  render() {
    return (
      <form
      className="form"
        onSubmit={ this.onSubmit }>
        {this.state.error && <p className="form__error">{this.state.error}</p>}
      <input
      className="text-input"
      type="text"
      placeholder="Description"
      autoFocus
      value={this.state.description}
      onChange={this.onDescriptionChange}
  />
  <input
    className="text-input"
    type="text"
    placeholder="Amount"
    value={this.state.amount}
    onChange={this.onAmountChange}
  />
  <SingleDatePicker
    date={this.state.createdAt}
    onDateChange={this.onDateChange}
    focused={this.state.calendarFocused}
    onFocusChange={this.onFocusChange}
    numberOfMonths={1}
    isOutsideRange={() => false}
  />
  <textarea
    className="textarea"
    placeholder="Add a note for your expense (optional)"
    value={this.state.note}
    onChange={this.onNoteChange}
  >
  </textarea>
  <div>
    <select
        className="select"
        value={this.state.payments}
        onChange={ this.onChangePayments }>
        <option value="1">Payments: 1</option>
        <option value="2">Payments: 2</option>
        <option value="3">Payments: 3</option>
        <option value="4">Payments: 4</option>
        <option value="5">Payments: 5</option>
        <option value="6">Payments: 6</option>
        <option value="7">Payments: 7</option>
        <option value="8">Payments: 8</option>
        <option value="9">Payments: 9</option>
        <option value="10">Payments: 10</option>
        <option value="11">Payments: 11</option>
        <option value="12">Payments: 12</option>
        <option value="13">Payments: 13</option>
        <option value="14">Payments: 14</option>
        <option value="15">Payments: 15</option>
        <option value="16">Payments: 16</option>
        <option value="17">Payments: 17</option>
        <option value="18">Payments: 18</option>
        <option value="19">Payments: 19</option>
        <option value="20">Payments: 20</option>
        <option value="21">Payments: 21</option>          
        <option value="22">Payments: 22</option>
        <option value="23">Payments: 23</option>
        <option value="24">Payments: 24</option>
      </select>
      </div>
      <div>
        { this.toggleAddEditExpense()
        ?
        <button className="button">Save Expense</button>
        :
        <button className="button">Save Edit Expense</button> }
      </div>
      </form>      
    )
  }
}
