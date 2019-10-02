import React from 'react';
import { Signin, Register } from './components';

import { Switch, Route } from 'react-router-dom';

const Routes = () => {
  return (
    <Switch>
      <Route path="/signin" component={Signin} />
      <Route path="/register" component={Register} />
      <Route component={Signin} />
    </Switch>
  );
};

export default Routes;
