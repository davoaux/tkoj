import jwtDecode, { JwtPayload } from 'jwt-decode';
import React, { createContext, useContext, useState } from 'react';
import { apiLogin, apiRegister } from '../http/auth';
import { IUser, IAuthContext, IRegisterFields } from '../types';

interface ProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const useAuth = (): IAuthContext => useContext(AuthContext);

const AuthProvider: React.FC<ProviderProps> = ({ children }: ProviderProps) => {
  // https://stackoverflow.com/questions/52304171/how-can-you-verify-if-a-jwt-is-still-valid/52304215#52304215
  const isTokenValid = (token: string | null) => {
    if (token && jwtDecode(token)) {
      const expiry = jwtDecode<JwtPayload>(token).exp;
      const now = new Date();
      return expiry ? now.getTime() < expiry * 1000 : false; // return true if token hasn't expired
    }
    return false;
  };

  const [isLogged, setIsLogged] = useState<boolean>(() => {
    return isTokenValid(localStorage.getItem('token') || null);
  });

  const [user, setUser] = useState<IUser | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  async function register(registerFields: IRegisterFields): Promise<IUser | string> {
    const response = await apiRegister(registerFields);
    const data = await response.json();
    if (!response.ok) return data.message;

    return data.user;
  }

  async function login(username: string, password: string): Promise<IUser | string> {
    const response = await apiLogin(username, password);
    const data = await response.json();
    if (!response.ok) return data.message;

    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    setIsLogged(true);
    setUser(data.user);

    return data.user;
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
