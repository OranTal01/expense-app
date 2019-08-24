import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters';
import { DateRangePicker } from 'react-dates';


class ExpenseListFilters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            focusedInput: null
        }
    }
    onDatesChange = ({ startDate, endDate }) => {
        this.props.dispatch(setStartDate(startDate));
        this.props.dispatch(setEndDate(endDate));
    }
    onFocusChange = (focusedInput) => {
        this.setState(() => ({ focusedInput }))
    }

    render() {
        return (
            <div>
                <input
                    type="text"
                    value={ this.props.filters.text }
                    onChange={ (e) => {
                        this.props.dispatch(setTextFilter(e.target.value));
                    } }
                />
                <select
                    value={ this.props.filters.sortBy }
                    onChange={ (e) => {
                        if (e.target.value === 'date') {
                            this.props.dispatch(sortByDate());
                        } else if (e.target.value === 'amount') {
                            this.props.dispatch(sortByAmount());
                        }
                    } }
                >
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                </select>
                <DateRangePicker
                    startDateId="MyDatePickerStart"
                    endDateId="MyDatePickerEnd"
                    startDate={ this.props.filters.startDate } // momentPropTypes.momentObj or null,
                    endDate={ this.props.filters.endDate } // momentPropTypes.momentObj or null,
                    onDatesChange={ this.onDatesChange }// PropTypes.func.isRequired,
                    focusedInput={ this.state.focusedInput } // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={ this.onFocusChange } // PropTypes.func.isRequired,
                    numberOfMonths={ 1 }
                    isOutsideRange={ () => false }
                    showClearDates={ true }
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        filters: state.filters
    };
};

export default connect(mapStateToProps)(ExpenseListFilters);
