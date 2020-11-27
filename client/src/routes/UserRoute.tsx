import React, { useContext } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { AuthContext } from '../context/auth';

const UserRoute: React.FC<RouteProps> = (props: RouteProps) => {
  const { isLogged } = useContext(AuthContext);

  return isLogged ? <Route {...props} /> : <Redirect to="/login" />;
};

export default UserRoute;
