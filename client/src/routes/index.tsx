import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../components/auth/Login/Login';
import Register from '../components/auth/Register/Register';
import Home from '../pages/Home';
import Notes from '../pages/Notes';
import UserRoute from './UserRoute';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <UserRoute exact path="/" component={Home} />
      <UserRoute exact path="/notes" component={Notes} />
    </Switch>
  );
};

export default Routes;
