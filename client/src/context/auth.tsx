import React, { createContext, useState } from 'react';

interface IAuthContext {
  isLogged: boolean;
  setIsLogged: (active: boolean) => void;
  user: IUser | null;
  setUser: (user: IUser) => void;
  register: (userData: {
    name: string;
    email: string;
    password: string;
  }) => Promise<boolean>;
  login: (email: string, password: string) => Promise<IUser | null>;
  logout: () => void;
}

interface IUser {
  _v: number;
  _id: string;
  name: string;
  email: string;
  active: boolean;
  creation: Date;
}

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
  // const [user, setUser] = useState<IUser>({} as IUser);

  /*
   * TODO useAuth hook
   */

  const register = async (userData: {
    name: string;
    email: string;
    password: string;
  }): Promise<boolean> => {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
        password: userData.password,
      }),
    });
    if (!response.ok) return false;

    return true;
  };

  const login = async (
    email: string,
    password: string
  ): Promise<IUser | null> => {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
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
