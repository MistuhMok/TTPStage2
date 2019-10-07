import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchData, transactStock } from '../reducers/index';

const defaultState = { ticker: '', quantity: '', stock: {} };

class Stocks extends Component {
  constructor() {
    super();
    this.state = defaultState;
  }

  componentDidUpdate(prevProps) {
    if (
      Object.keys(this.props.stock).length > 0 &&
      this.props.stock !== this.state.stock
    ) {
      console.log('component did update', this.props);
      this.setState({
        stock: this.props.stock,
        ticker: this.props.stock['01. symbol'],
      });
    }
  }

  checkPrice = evt => {
    evt.preventDefault();
    const ticker = evt.target.ticker.value;
    this.props.checkPrice(ticker);
    console.log(this.props.stock, ' CHECK PRICE SUBMIT');
  };

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
    console.log(this.state);
  };

  transactStockSubmit = evt => {
    evt.preventDefault();
    const { ticker, quantity } = this.state;
    const transaction = {
      ticker: ticker.toUpperCase(),
      quantity,
      price: Math.floor((+this.state.stock['05. price']).toFixed(2) * 100),
    };

    this.props.transactStock(transaction);
    this.setState(defaultState);
  };

  render() {
    const { error, user } = this.props;
    const { stock, quantity, ticker } = this.state;
    let display = false;
    let maxShares = 0;

    if (stock['05. price']) {
      display = true;
      maxShares = Math.floor((user.funds / +stock['05. price']) * 0.01);
    }
    // console.log(stock, 'this.state.stock');
    return (
      <div>
        {display ? (
          <h4>
            Selected: {stock['01. symbol']} ${(+stock['05. price']).toFixed(2)}{' '}
            Max: {maxShares} shares
          </h4>
        ) : (
          <h4>Stocks</h4>
        )}
        <form onSubmit={this.checkPrice}>
          <input
            name="ticker"
            type="text"
            placeholder="Ticker"
            value={ticker}
            onChange={this.handleChange}
          />
          <button className="submit" type="submit" disabled={ticker.length < 1}>
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
            max={display ? maxShares : ''}
            placeholder="Quantity"
            value={quantity}
            onChange={this.handleChange}
          />
          <button
            type="submit"
            disabled={!+quantity || Object.keys(stock).length < 1}
          >
            {quantity < 0 ? 'Sell' : 'Purchase'}
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
    checkPrice(ticker) {
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
