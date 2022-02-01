import jwtDecode, { JwtPayload } from 'jwt-decode';
import React, { createContext, useContext, useState } from 'react';
import { apiLogin, apiRegister } from '../http/auth';
import { User, IAuthContext, IRegisterFields } from '../types';

interface ProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const useAuth = (): IAuthContext => useContext(AuthContext);

const AuthProvider: React.FC<ProviderProps> = ({ children }: ProviderProps) => {
  const isTokenValid = (token: string | null) => {
    if (token && jwtDecode(token)) {
      const expiry = jwtDecode<JwtPayload>(token).exp;
      const now = new Date();
      return expiry ? now.getTime() < expiry * 1000 : false;
    }
    return false;
  };

  const [isLogged, setIsLogged] = useState<boolean>(() => {
    return isTokenValid(localStorage.getItem('token') || null);
  });

  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  async function register(registerFields: IRegisterFields): Promise<User | string> {
    const response = await apiRegister(registerFields);
    const data = await response.json();
    const { error, user } = data;
    if (!response.ok) return error;

    return user;
  }

  async function login(username: string, password: string): Promise<User | string> {
    const response = await apiLogin(username, password);
    const data = await response.json();
    const { error, token, user } = data;

    if (!response.ok) return error;

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    setIsLogged(true);
    setUser(user);

    return user;
  }

  function logout(): void {
    localStorage.clear();
    setIsLogged(false);
    setUser(null);
  }

  const value = {
    isLogged,
    setIsLogged,
    user,
    setUser,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { useAuth, AuthProvider };
