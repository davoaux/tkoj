interface IUserService {
  register: Function;
  login: Function;
}

interface IUserData {
  name: string;
  email: string;
  password: string;
}

export class UserService implements IUserService {
  async register(userData: IUserData): Promise<Response> {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
        password: userData.password,
      }),
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
