import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Signin, Register, UserHome, Transactions } from './components';

import { withRouter, Switch, Route } from 'react-router-dom';
import { me } from './reducers';

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <Switch>
        <Route path="/signin" component={Signin} />
        <Route path="/register" component={Register} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
            <Route path="/transactions" component={Transactions} />
          </Switch>
        )}
        <Route component={Signin} />
      </Switch>
    );
  }
}

const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined as having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
  };
};

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(Routes)
);
