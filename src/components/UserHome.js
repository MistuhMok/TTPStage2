import React from 'react';
import { connect } from 'react-redux';

export const UserHome = props => {
  const { email, funds, name } = props;

  return (
    <div>
      <h3>
        Welcome, {name} {email}
      </h3>
      <h3>Cash (${funds})</h3>
    </div>
  );
};

const mapState = state => {
  return {
    email: state.user.email,
    funds: state.user.funds,
    name: state.user.name,
  };
};

export default connect(mapState)(UserHome);
