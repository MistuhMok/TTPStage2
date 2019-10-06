import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTransactions } from '../reducers/index';

class Transactions extends Component {
  componentDidMount() {
    this.props.fetchTransactions();
  }

  displayFunds = amount => {
    const stringAmount = amount.toString();
    return `$${stringAmount.slice(
      0,
      stringAmount.length - 2
    )}.${stringAmount.slice(-2)}`;
  };

  render() {
    const { transactions } = this.props;
    console.log(this.props, 'transactions');
    // console.log(this.state);

    return (
      <div>
        <h2>Transactions</h2>
        {transactions ? (
          transactions.map((item, index) => (
            <div key={index} className="transactionLine">
              {+item.quantity > 0 ? <div>BUY</div> : <div>SELL</div>}
              <div>({item.ticker}) - </div>
              <div>{Math.abs(item.quantity)} Shares</div>
              <div>@ {this.displayFunds(item.price)}</div>
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
