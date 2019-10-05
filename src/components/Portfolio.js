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

      this.props.portfolio.forEach(stock => {
        portfolioArray.push(axios.get(`/stocks/${stock.ticker}`));
      });

      const data = await axios.all(portfolioArray);
      data.forEach(stock => {
        currPrices.push(stock.data['Global Quote']['05. price']);
      });
      this.setState({ currPrices: currPrices });
    }
  }

  render() {
    const { portfolio, displayAmt } = this.props;
    console.log(this.props, 'portfolio');
    // console.log(this.state);

    return (
      <div>
        <h2>Portfolio</h2>
        {portfolio
          ? portfolio.map((item, index) => (
              <div key={index} className="portfolioLine">
                <div>Ticker: {item.ticker}</div>
                <div>Quantity: {item.quantity}</div>
                <div>Price: {displayAmt(item.price)}</div>
                <div>
                  Current Price: ${(+this.state.currPrices[index]).toFixed(2)}
                </div>
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
