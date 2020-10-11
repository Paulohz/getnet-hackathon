import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Login} />
    <Route path="/signup" exact component={SignUp} />
    <Route path="/home" exact component={Home} />


  </Switch>
);

export default Routes;