import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { fetchPortfolio } from '../reducers/index';

class Portfolio extends Component {
  constructor() {
    super();
    this.state = { currPrices: [] };
  }

  componentDidMount() {
    this.props.fetchPortfolio();
  }

  async componentDidUpdate(prevProps) {
    if (this.props.portfolio !== prevProps.portfolio) {
      const portfolioArray = [];
      const currPrices = [];
      const openingPrices = [];

      this.props.portfolio.forEach(stock => {
        portfolioArray.push(axios.get(`/stocks/${stock.ticker}`));
      });

      const data = await axios.all(portfolioArray);
      console.log(data, 'DATA');
      for (let i = 0; i < data.length; i++) {
        if (!data[i].data['Global Quote']) {
          break;
        } else {
          currPrices.push(
            (+data[i].data['Global Quote']['05. price']).toFixed(2)
          );
          openingPrices.push(
            (+data[i].data['Global Quote']['02. open']).toFixed(2)
          );
        }
      }

      this.setState({ currPrices, openingPrices });
    }
  }

  calculateChange = index => {
    if (this.state.currPrices.length)
      return this.state.currPrices[index] - this.state.openingPrices[index];

    return 0;
  };

  render() {
    const { portfolio, displayAmt } = this.props;
    const { currPrices, openingPrices } = this.state;
    // console.log(this.props, 'portfolio');
    // console.log(this.state);
    console.log(currPrices, openingPrices, 'CURR AND OPENING');

    return (
      <div>
        <h2>Portfolio</h2>
        {portfolio
          ? portfolio.map((item, index) => (
              <div key={index} className="transactionLine">
                <div data-change={this.calculateChange(index)}>
                  Ticker: {item.ticker}
                </div>
                <div>Quantity: {item.quantity}</div>
                <div>Price: {displayAmt(item.price)}</div>
                {currPrices.length !== 0 ? (
                  <div data-change={this.calculateChange(index)}>
                    <div>Current Price: ${currPrices[index]}</div>
                    <div>Opening Price: ${openingPrices[index]}</div>
                  </div>
                ) : (
                  <div>Loading...</div>
                )}
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
