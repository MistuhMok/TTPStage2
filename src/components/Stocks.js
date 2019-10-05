import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchData, transactStock } from '../reducers/index';

const defaultState = { ticker: '', quantity: 0 };

class Stocks extends Component {
  constructor() {
    super();
    this.state = defaultState;
  }

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  transactStockSubmit = evt => {
    evt.preventDefault();

    const { ticker, quantity } = this.state;

    const transaction = {
      ticker: ticker.toUpperCase(),
      quantity,
      price: (+this.props.stock['05. price']).toFixed(2) * 100,
      type: 'buy',
    };
    this.props.transactStock(transaction);
  };

  render() {
    const { checkPrice, error, stock, user } = this.props;
    let display = false;
    let maxShares = 0;

    if (stock['05. price']) {
      display = true;
      maxShares = Math.floor((user.funds / +stock['05. price']) * 0.01);
    }

    return (
      <div>
        {display ? (
          <h4>
            Current: {stock['01. symbol']} ${(+stock['05. price']).toFixed(2)} $
            {(+stock['09. change']).toFixed(2)} ({stock['10. change percent']})
            Max: {maxShares} shares
          </h4>
        ) : (
          <h4>Stocks</h4>
        )}
        <form onSubmit={checkPrice}>
          <input
            name="ticker"
            type="text"
            placeholder="Ticker"
            onChange={this.handleChange}
          />
          <button
            className="submit"
            type="submit"
            disabled={this.state.ticker.length < 1}
          >
            Check Price
          </button>
          {error && error.response && (
            <div className="error"> {error.response.data} </div>
          )}
        </form>

        <form onSubmit={this.transactStockSubmit}>
          <input
            name="quantity"
            type="number"
            min="0"
            max={display ? maxShares : ''}
            placeholder="Quantity"
            onChange={this.handleChange}
          />
          <button
            type="submit"
            disabled={this.state.ticker.length < 1 || this.state.quantity < 1}
          >
            Purchase
          </button>
        </form>
      </div>
    );
  }
}

const mapState = state => {
  return {
    user: state.user,
    stock: state.stock,
    error: state.stock.error,
  };
};

const mapDispatch = dispatch => {
  return {
    checkPrice(evt) {
      evt.preventDefault();
      const ticker = evt.target.ticker.value;
      dispatch(fetchData(ticker));
    },
    transactStock(transaction) {
      dispatch(transactStock(transaction));
    },
  };
};

export default connect(
  mapState,
  mapDispatch
)(Stocks);
