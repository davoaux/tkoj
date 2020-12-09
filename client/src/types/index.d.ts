interface IRegisterData {
  name: string;
  email: string;
  password: string;
}

interface IAuthContext {
  isLogged: boolean;
  setIsLogged: (active: boolean) => void;
  user: IUser | null;
  setUser: (user: IUser) => void;
  register: (registerData: IRegisterData) => Promise<boolean>;
  login: (email: string, password: string) => Promise<IUser | null>;
  logout: () => void;
}

export interface IUser {
  _v: number;
  _id: string;
  name: string;
  email: string;
  active: boolean;
  creation: Date;
}

export interface INote {
  links: Array<string>;
  category: Array<string>;
  _id: string;
  title: string;
  content: string;
  userId: string;
  _v: number;
}
