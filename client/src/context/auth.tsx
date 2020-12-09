import React, { createContext, useState } from 'react';
import { AuthService } from '../services/authService';
import { IUser, IAuthContext, IRegisterData } from '../types';

interface ProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC<ProviderProps> = ({ children }: ProviderProps) => {
  const [isLogged, setIsLogged] = useState<boolean>(() => {
    return localStorage.getItem('token') ? true : false;
  });
  const [user, setUser] = useState<IUser | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const service = new AuthService();

  /*
   * TODO useAuth hook
   */

  const register = async (registerData: IRegisterData): Promise<boolean> => {
    const response = await service.register(registerData);
    if (!response.ok) return false;

    return true;
  };

  const login = async (
    email: string,
    password: string
  ): Promise<IUser | null> => {
    const response = await service.login(email, password);
    if (!response.ok) return null;
    const data = await response.json();

    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    setIsLogged(true);
    setUser(data.user);

    return data.user;
  };

  const logout = (): void => {
    localStorage.clear();

    setIsLogged(false);
    setUser(null);
  };

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

export { AuthContext, AuthProvider };
