import { IRegisterFields } from '../types';

interface IAuthService {
  register: Function;
  login: Function;
}

export class AuthService implements IAuthService {
  async register(registerData: IRegisterFields): Promise<Response> {
    const { name, email, password } = registerData;
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    return response;
  }

  async login(email: string, password: string): Promise<Response> {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    return response;
  }
}
