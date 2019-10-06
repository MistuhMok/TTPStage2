import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { fetchTransactions } from '../reducers/index';

class Transactions extends Component {
  constructor() {
    super();
    this.state = { currPrices: [] };
  }

  componentDidMount() {
    this.props.fetchTransactions();
  }

  render() {
    const { transactions, displayAmt } = this.props;
    // console.log(this.props, 'portfolio');
    // console.log(this.state);

    return (
      <div>
        <h2>Portfolio</h2>
        {transactions ? (
          transactions.map((item, index) => (
            <div key={index} className="portfolioLine">
              <div>Ticker: {item.ticker}</div>
              <div>Quantity: {item.quantity}</div>
              <div>Price: {displayAmt(item.price)}</div>
            </div>
          ))
        ) : (
          <div>No transactions yet</div>
        )}
      </div>
    );
  }
}

const mapState = state => {
  return {
    transactions: state.transactions,
  };
};

const mapDispatch = dispatch => ({
  fetchTransactions: () => dispatch(fetchTransactions()),
});

export default connect(
  mapState,
  mapDispatch
)(Transactions);
