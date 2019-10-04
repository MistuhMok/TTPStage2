import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchData } from '../reducers/index';

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

  render() {
    const { handleSubmit, error, stock, user } = this.props;
    let display = false;
    let maxShares = 0;

    if (stock['05. price']) {
      display = true;
      maxShares = Math.floor((user.funds / +stock['05. price']) * 0.1);
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
        <form onSubmit={handleSubmit}>
          <input
            name="ticker"
            type="text"
            placeholder="Ticker"
            onChange={this.handleChange}
          />
          <input
            name="quantity"
            type="number"
            min="0"
            max={display ? maxShares : ''}
            placeholder="Quantity"
            onChange={this.handleChange}
          />
          <button className="submit" type="submit">
            Submit
          </button>
          {error && error.response && (
            <div className="error"> {error.response.data} </div>
          )}
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
    handleSubmit(evt) {
      evt.preventDefault();
      const ticker = evt.target.ticker.value;
      dispatch(fetchData(ticker));
    },
  };
};

export default connect(
  mapState,
  mapDispatch
)(Stocks);
