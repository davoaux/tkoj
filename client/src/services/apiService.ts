import { INote } from '../types';

interface IApiService {
  updateNote: Function;
}

export class ApiService implements IApiService {
  async createNote(note: INote): Promise<INote | null> {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/notes', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(note),
    });
    if (!response.ok) return null;
    const data = await response.json();

    return data.note;
  }

  async updateNote(note: INote): Promise<boolean> {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/notes', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(note),
    });
    if (!response.ok) return false;

    return true;
  }
}
