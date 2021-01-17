import React, { createContext, useContext, useState } from 'react';
import { AuthService } from '../services/authService';
import { IUser, IAuthContext, IRegisterFields } from '../types';

interface ProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const useAuth = (): IAuthContext => useContext(AuthContext);

const AuthProvider: React.FC<ProviderProps> = ({ children }: ProviderProps) => {
  const [isLogged, setIsLogged] = useState<boolean>(() => {
    return localStorage.getItem('token') ? true : false;
  });

  const [user, setUser] = useState<IUser | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const service = new AuthService();

  async function register(registerFields: IRegisterFields): Promise<boolean> {
    const response = await service.register(registerFields);
    if (!response.ok) return false;

    return true;
  }

  async function login(email: string, password: string): Promise<IUser | null> {
    const response = await service.login(email, password);
    if (!response.ok) return null;
    const data = await response.json();

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
