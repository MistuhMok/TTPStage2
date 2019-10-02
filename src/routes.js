import React from 'react';
import { Login, Signup } from './components';

import { Switch, Route } from 'react-router-dom';

const Routes = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route component={Login} />
    </Switch>
  );
};

export default Routes;
