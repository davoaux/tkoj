export interface IRegisterFields {
  name: string;
  username: string;
  password: string;
}

export interface ILoginFields {
  username: string;
  password: string;
}

export interface IAuthContext {
  isLogged: boolean;
  setIsLogged: (active: boolean) => void;
  user: IUser | null;
  setUser: (user: IUser) => void;
  register: (registerData: IRegisterData) => Promise<IUser | string>;
  login: (username: string, password: string) => Promise<IUser | string>;
  logout: () => void;
}

export type User = {
  _id: string;
  name: string;
  username: string;
  password_digest: string;
  active: boolean;
  created_at: Date;
}

export type Note = {
  _id?: string;
  title: string;
  content: string;
  tags: Array<string>;
  user_id: string;
}

export type TagAction = 'CREATE' | 'DELETE';
