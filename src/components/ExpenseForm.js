import React from 'react';
import moment from 'moment';
import { SingleDatePicker, DateRangePicker } from 'react-dates';
import 'react-dates/initialize';


export default class ExpenseForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? props.expense.amount : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            focused: false,
            error: ''
        };
    };

    onDescriptionChance = (e) => {
        const description = e.target.value
        this.setState(() => ({ description }));
    };

    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({ note }));
    };

    onAmountChange = (e) => {
        const amount = e.target.value

        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/) || amount.match(/^\d{1,}(\.\d{0,2}\$)ֿ?$/) || amount.match(/^\d{1,}(\$)ֿ?$/)) {
            this.setState(() => ({ amount }))
        }
    };

    onDateChange = (createdAt) => {
        if (createdAt) {
            this.setState(() => ({ createdAt }))
        }
    };

    onFocusChange = ({ focused }) => {
        this.setState(() => ({ focused }))
    };

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.description && this.state.amount) {
            this.setState(() => ({ error: '' }));
            this.props.onSubmit({
                description: this.state.description,
                note: this.state.note,
                amount: this.state.amount.includes('$') ? parseFloat(this.state.amount) * 3.5 : this.state.amount,
                createdAt: this.state.createdAt.valueOf()
            })
        }
        else {
            this.setState(() => ({ error: 'Please provide description and amount.' }))
        }
    }

    render() {
        return (
            <div>
                { this.state.error && <p>{ this.state.error }</p> }
                <form
                    onSubmit={ this.onSubmit }
                >
                    <input
                        type="text"
                        placeholder='description'
                        autoFocus
                        value={ this.state.description }
                        onChange={ this.onDescriptionChance }
                    />
                    <input
                        type="text"
                        placeholder='amount'
                        value={ this.state.amount }
                        onChange={ this.onAmountChange }
                    />
                    <SingleDatePicker
                        date={ this.state.createdAt } // momentPropTypes.momentObj or null
                        onDateChange={ this.onDateChange } // PropTypes.func.isRequired
                        focused={ this.state.focused } // PropTypes.bool
                        onFocusChange={ this.onFocusChange } // PropTypes.func.isRequired
                        isOutsideRange={ () => false }
                        numberOfMonths={ 1 }
                    />
                    <textarea
                        value={ this.state.note }
                        onChange={ this.onNoteChange }
                        placeholder='Add a note for your expense (optional)'
                    ></textarea>
                    <button>
                        Add expense
                    </button>
                </form>
            </div>
        );
    };
};