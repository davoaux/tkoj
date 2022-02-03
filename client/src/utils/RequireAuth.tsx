import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/auth';

const RequireAuth: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { isLogged } = useAuth();

  return isLogged ? children : <Navigate to="/login" />;
};

export default RequireAuth;
