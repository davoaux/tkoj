import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

// TODO
const isAuthenticated = false;

const AuthRoute: React.FC<RouteProps> = (props: RouteProps) => {
  return isAuthenticated ? <Route {...props} /> : <Redirect to="/login" />;
};

export default AuthRoute;
