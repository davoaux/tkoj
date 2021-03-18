import { INote, IUser } from '../types';

interface IApiRequests {
  getNotes(): Promise<INote[]>;
  createNote(note: INote): Promise<INote | null>;
  updateNote(note: INote): Promise<INote | null>;
  updateUser(user: IUser): Promise<IUser | null>;
  deleteNote(note: INote): Promise<boolean>;
  deleteUser(id: string): Promise<boolean>;
}

export class ApiRequests implements IApiRequests {
  private readonly token: string | null;
  private readonly user: IUser | null;
  private readonly defaulHeaders = {};

  constructor() {
    this.token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    this.user = user !== null ? JSON.parse(user) : null;
    this.defaulHeaders = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    };
  }

  async getNotes(): Promise<INote[]> {
    const response = await fetch(`/api/users/${this.user?._id}/notes`, {
      method: 'GET',
      headers: this.defaulHeaders,
    });
    const data = await response.json();

    return data;
  }

  async getUserByUsername(username: string): Promise<IUser | null> {
    const response = await fetch(`/api/users/username/${username}`, {
      method: 'GET',
      headers: this.defaulHeaders,
    });
    if (!response.ok) return null;
    const user = await response.json();

    return user;
  }

  async createNote(note: INote): Promise<INote | null> {
    const response = await fetch('/api/notes', {
      method: 'POST',
      headers: this.defaulHeaders,
      body: JSON.stringify(note),
    });
    if (!response.ok) return null;
    const data = await response.json();

    return data.note;
  }

  async updateNote(note: INote): Promise<INote | null> {
    const response = await fetch('/api/notes', {
      method: 'PUT',
      headers: this.defaulHeaders,
      body: JSON.stringify(note),
    });
    if (!response.ok) return null;
    const data = await response.json();

    return data.note;
  }

  async updateUser(user: IUser): Promise<IUser | null> {
    const response = await fetch(`/api/users/${user._id}`, {
      method: 'PUT',
      headers: this.defaulHeaders,
      body: JSON.stringify(user),
    });
    if (!response.ok) return null;
    const data = await response.json();

    return data;
  }

  async deleteNote(note: INote): Promise<boolean> {
    const response = await fetch(`/api/notes/${note._id}`, {
      method: 'DELETE',
      headers: this.defaulHeaders,
      body: JSON.stringify(note),
    });

    return response.ok ? true : false;
  }

  async deleteUser(id: string): Promise<boolean> {
    const response = await fetch(`/api/users/${id}`, {
      method: 'DELETE',
      headers: this.defaulHeaders,
    });

    return response.ok ? true : false;
  }
}
