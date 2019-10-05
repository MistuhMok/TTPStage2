import React from 'react';
import { connect } from 'react-redux';
import Stocks from './Stocks';
import Portfolio from './Portfolio';

export const UserHome = props => {
  const { email, funds, name } = props;

  return (
    <div>
      <h3>
        Welcome, {name} email:{email}
      </h3>
      <h3>Cash: {displayFunds(funds)}</h3>

      <Stocks />
      <Portfolio displayAmt={displayFunds} />
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
