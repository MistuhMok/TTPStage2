import React from 'react';
import { connect } from 'react-redux';
import Stocks from './Stocks';
import Portfolio from './Portfolio';

export const UserHome = props => {
  const { funds, name } = props;

  return (
    <div>
      <h3>Welcome, {name}</h3>

      <div className="userHome">
        <Portfolio displayAmt={displayFunds} />
        <div className="divider"></div>
        <div className="stocks">
          <h3>Cash: {displayFunds(funds)}</h3>
          <Stocks />
        </div>
      </div>
    </div>
  );
};

const displayFunds = amount => {
  const stringAmount = amount.toString();
  return `$${stringAmount.slice(
    0,
    stringAmount.length - 2
  )}.${stringAmount.slice(-2)}`;
};

const mapState = state => {
  return {
    email: state.user.email,
    funds: state.user.funds,
    name: state.user.name,
  };
};

export default connect(mapState)(UserHome);
