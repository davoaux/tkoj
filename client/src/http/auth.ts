import { IRegisterFields } from '../types';

export async function apiRegister(data: IRegisterFields): Promise<Response> {
  const { name, username, password } = data;
  const response = await fetch('/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, username, password }),
  });

  return response;
}

export async function apiLogin(username: string, password: string): Promise<Response> {
  const response = await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  return response;
}

export async function apiChangePassword(password: string, id: string): Promise<boolean> {
  const response = await fetch('/api/change_password', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
    body: JSON.stringify({ password, id }),
  });

  return response.ok;
}
