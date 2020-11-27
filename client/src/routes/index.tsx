import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../components/auth/Login/Login';
import Register from '../components/auth/Register/Register';
import Home from '../pages/Home';
import UserRoute from './UserRoute';

// Notes won't render yet because I have yet to setup the token handling
// so this is a temp component to render
const TestComponent: React.FC = () => <p>test component</p>;

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <UserRoute exact path="/" component={Home} />
      <UserRoute exact path="/notes" component={TestComponent} />
    </Switch>
  );
};

export default Routes;
