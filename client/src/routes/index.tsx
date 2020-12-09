import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../components/auth/Login/Login';
import Register from '../components/auth/Register/Register';
import Dashboard from '../components/Dashboard';
import UserRoute from './UserRoute';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <UserRoute exact path="/" component={Dashboard} />
      <UserRoute exact path="/note/:id" component={Dashboard} />
      <UserRoute exact path="/note/new" component={Dashboard} />
    </Switch>
  );
};

export default Routes;
