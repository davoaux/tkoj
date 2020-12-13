import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuth } from '../context/auth';

const UserRoute: React.FC<RouteProps> = (props: RouteProps) => {
  const { isLogged } = useAuth();

  return isLogged ? <Route {...props} /> : <Redirect to="/login" />;
};

export default UserRoute;
