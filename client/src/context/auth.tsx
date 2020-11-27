import React, { createContext, useState } from 'react';

interface IAuthContext {
  isLogged: boolean;
  setIsLogged: (active: boolean) => void;
}

interface ProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC<ProviderProps> = ({ children }: ProviderProps) => {
  const [isLogged, setIsLogged] = useState<boolean>(() => {
    return localStorage.getItem('token') ? true : false;
  });

  /*
   * TODO add authentication related methods such as getCurrentUser, login,
   * register and logout
   * TODO look up pinned page on useAuth hook
   * TODO useCallback and useMemo? check concerns
   */

  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
