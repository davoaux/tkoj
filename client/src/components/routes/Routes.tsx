import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../auth/Login/Login';
import Register from '../auth/Register/Register';
import Home from '../pages/Home';
import AuthRoute from './AuthRoute';

// Notes won't render yet because I have yet to setup the token handling
// so this is a temp component to render
const TestComponent: React.FC = () => <p>test component</p>;

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <AuthRoute exact path="/" component={Home} />
      <AuthRoute exact path="/notes" component={TestComponent} />
    </Switch>
  );
};

export default Routes;
