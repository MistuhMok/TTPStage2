import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { fetchPortfolio } from '../reducers/index';

class Portfolio extends Component {
  constructor() {
    super();
    this.state = { currPrices: [], portfolioTotal: 0 };
  }

  componentDidMount() {
    this.props.fetchPortfolio();
  }

  async componentDidUpdate(prevProps) {
    if (this.props.portfolio !== prevProps.portfolio) {
      const portfolioArray = [];
      const currPrices = [];
      const openingPrices = [];
      let portfolioTotal = 0;

      this.props.portfolio.forEach(stock => {
        portfolioArray.push(axios.get(`/stocks/${stock.ticker}`));
      });

      const data = await axios.all(portfolioArray);
      for (let i = 0; i < data.length; i++) {
        if (!data[i].data['Global Quote']) {
          currPrices.push('--.--');
          openingPrices.push('--.--');
        } else {
          portfolioTotal +=
            +(+data[i].data['Global Quote']['05. price']).toFixed(2) *
            this.props.portfolio[i].quantity;

          currPrices.push(
            (+data[i].data['Global Quote']['05. price']).toFixed(2)
          );
          openingPrices.push(
            (+data[i].data['Global Quote']['02. open']).toFixed(2)
          );
        }
      }

      this.setState({ currPrices, openingPrices, portfolioTotal });
    }
  }

  calculateChange = index => {
    const { currPrices, openingPrices } = this.state;
    if (currPrices[index] && openingPrices[index])
      return currPrices[index] - openingPrices[index];

    return 0;
  };

  render() {
    const { portfolio } = this.props;
    const { currPrices, portfolioTotal } = this.state;

    return (
      <div className="portfolio">
        <h2>{`Portfolio ($${portfolioTotal})`}</h2>
        {portfolio
          ? portfolio.map((item, index) => (
              <div key={index} className="transactionLine">
                <div className="ticker">
                  <div data-change={this.calculateChange(index)}>
                    {item.ticker}
                  </div>
                </div>
                {currPrices.length !== 0 ? (
                  <React.Fragment>
                    <div className="currentPrice">
                      {item.quantity} Shares @
                      <div data-change={this.calculateChange(index)}>
                        {' '}
                        ${currPrices[index]}
                      </div>
                    </div>

                    <div>
                      $
                      {currPrices[index] === '--.--'
                        ? '--.--'
                        : (currPrices[index] * item.quantity).toFixed(2)}
                    </div>
                  </React.Fragment>
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
