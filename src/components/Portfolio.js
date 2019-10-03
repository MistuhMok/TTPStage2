import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPortfolio } from '../reducers/index';

class Portfolio extends Component {
  componentDidMount() {
    this.props.fetchPortfolio();
  }

  render() {
    const { portfolio } = this.props;
    console.log(this.props, 'portfolio');

    return (
      <div>
        <h2>Portfolio</h2>
        {portfolio
          ? portfolio.map(item => (
              <div key={item.id}>
                <div>Ticker: {item.ticker}</div>
                <div>Quantity: {item.quantity}</div>
                <div>Price: {item.price}</div>
              </div>
            ))
          : ''}
      </div>
    );
  }
}

const mapState = state => {
  return {
    portfolio: state.portfolio,
  };
};

const mapDispatch = dispatch => ({
  fetchPortfolio: () => dispatch(fetchPortfolio()),
});

export default connect(
  mapState,
  mapDispatch
)(Portfolio);
