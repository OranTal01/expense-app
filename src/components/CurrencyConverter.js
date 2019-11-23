import React, { Component } from "react";

class CurrencyConverter extends React.Component {
    state = {currencies:["CAD","HKD","ISK","PHP","DKK","HUF","CZK","GBP","RON","SEK","IDR","INR","BRL","RUB","HRK","JPY",
"THB","CHF","EUR","MYR","BGN","TRY","CNY","NOK","NZD","ZAR","USD","MXN","SGD","AUD","ILS","KRW","PLN"],
        base: "USD",
        amount: "",
        convertTo: "ILS",
        result: "",
        date: "",
        error: "",
        amountConverter: ""
    };
    onCurrencyConverter = (e) => {
        e.preventDefault();
        const amount = this.state.amount;
        if (!amount) {
            this.setState(() => ({
                error: 'Please provide amount to converter.'
            }))
        } else {
            fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`)
            .then(res => res.json())
            .then(data => {
                const date = data.date;
                const result = (data.rates[this.state.convertTo] * amount).toFixed(2);
                const amountConverter = data.rates[this.state.convertTo];
                this.setState({
                    date,
                    result,
                    amountConverter
                });
            });
        }
    };
    
    handleInput = (e) => {
        const amount = e.target.value
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ amount }));
        }
    }
    onBaseCurrencyChange = (e) => {
        const base = e.target.value;
        this.setState(()=>({base}))
    };
    onConvertCurrencyChange = (e) => {
        const convertTo = e.target.value;
        this.setState(()=>({convertTo}))
    };

    onSwapCurrency = () => {
        const tempBase = this.state.base;
        const tempConvertTo = this.state.convertTo;
        this.setState(() => ({
            base: tempConvertTo,
            convertTo: tempBase,
            amount: "",
            result: "",
            date: "",
            amountConverter: ""
        }));
    };

    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onCurrencyConverter}>
                    <div>
                    Base Currency:
                    <input type="text"
                            value={ this.state.amount }
                            onChange={ this.handleInput}/>
                        <select
                        value={ this.state.base }
                        onChange={this.onBaseCurrencyChange}>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="ILS">ILS</option>
                            <option value="GBP">GBP</option>
                            <option value="CAD">CAD</option>
                            <option value="HKD">HKD</option>
                            <option value="ISK">ISK</option>
                            <option value="PHP">PHP</option>
                            <option value="DKK">DKK</option>
                            <option value="HUF">HUF</option>
                            <option value="CZK">CZK</option>
                            <option value="RON">RON</option>
                            <option value="SEK">SEK</option>
                            <option value="IDR">IDR</option>
                            <option value="INR">INR</option>
                            <option value="BRL">BRL</option>
                            <option value="RUB">RUB</option>
                            <option value="HRK">HRK</option>
                            <option value="JPY">JPY</option>
                            <option value="THB">THB</option>
                            <option value="CHF">CHF</option>
                            <option value="MYR">MYR</option>
                            <option value="BGN">BGN</option>
                            <option value="TRY">TRY</option>
                            <option value="CNY">CNY</option>
                            <option value="NOK">NOK</option>
                            <option value="NZD">NZD</option>
                            <option value="ZAR">ZAR</option>
                            <option value="MXN">MXN</option>
                            <option value="SGD">SGD</option>
                            <option value="AUD">AUD</option>
                            <option value="KRW">KRW</option>
                            <option value="PLN">PLN</option>
                    </select>
                    </div>
                    <div>
                    Convert To:
                        <select
                        value={ this.state.convertTo }
                        onChange={this.onConvertCurrencyChange}>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="ILS">ILS</option>
                        <option value="GBP">GBP</option>
                        <option value="CAD">CAD</option>
                        <option value="HKD">HKD</option>
                        <option value="ISK">ISK</option>
                        <option value="PHP">PHP</option>
                        <option value="DKK">DKK</option>
                        <option value="HUF">HUF</option>
                        <option value="CZK">CZK</option>
                        <option value="RON">RON</option>
                        <option value="SEK">SEK</option>
                        <option value="IDR">IDR</option>
                        <option value="INR">INR</option>
                        <option value="BRL">BRL</option>
                        <option value="RUB">RUB</option>
                        <option value="HRK">HRK</option>
                        <option value="JPY">JPY</option>
                        <option value="THB">THB</option>
                        <option value="CHF">CHF</option>
                        <option value="MYR">MYR</option>
                        <option value="BGN">BGN</option>
                        <option value="TRY">TRY</option>
                        <option value="CNY">CNY</option>
                        <option value="NOK">NOK</option>
                        <option value="NZD">NZD</option>
                        <option value="ZAR">ZAR</option>
                        <option value="MXN">MXN</option>
                        <option value="SGD">SGD</option>
                        <option value="AUD">AUD</option>
                        <option value="KRW">KRW</option>
                        <option value="PLN">PLN</option>
                        </select>
                        { this.state.amountConverter &&
                            <p>your Currency Converter is:
                        { this.state.amountConverter }</p> }
                    </div>
                    <button>
                        Start Converter
                    </button>
                </form>
                <button onClick={ this.onSwapCurrency }>
                Swap currency
                </button>
                { this.state.date && <p>Date of Currency Converter: { this.state.date }</p>}
                { this.state.result && <p>Convert To: { this.state.result } { this.state.convertTo }</p>}
            </div>
        )
    }
}

export default CurrencyConverter;