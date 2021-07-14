import { Note, User } from '../types';

export class ApiRequests {
  private readonly token: string | null;
  private readonly user: User | null;
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

  async getNotes(): Promise<Note[]> {
    const response = await fetch(`/api/users/${this.user?._id}/notes`, {
      method: 'GET',
      headers: this.defaulHeaders,
    });

    return await response.json();
  }

  async getUserByUsername(username: string): Promise<User | null> {
    const response = await fetch(`/api/users/username/${username}`, {
      method: 'GET',
      headers: this.defaulHeaders,
    });

    return response.ok ? await response.json() : null;
  }

  async createNote(note: Note): Promise<Note | null> {
    const response = await fetch('/api/notes', {
      method: 'POST',
      headers: this.defaulHeaders,
      body: JSON.stringify(note),
    });

    return response.ok ? await response.json() : null;
  }

  async updateNote(note: Note): Promise<Note | null> {
    const response = await fetch('/api/notes', {
      method: 'PUT',
      headers: this.defaulHeaders,
      body: JSON.stringify(note),
    });

    return response.ok ? await response.json() : null;
  }

  async updateUser(user: User): Promise<User | null> {
    const response = await fetch(`/api/users/${user._id}`, {
      method: 'PUT',
      headers: this.defaulHeaders,
      body: JSON.stringify(user),
    });

    return response.ok ? await response.json() : null;
  }

  async deleteNote(note: Note): Promise<boolean> {
    const response = await fetch(`/api/notes/${note._id}`, {
      method: 'DELETE',
      headers: this.defaulHeaders,
      body: JSON.stringify(note),
    });

    return response.ok;
  }

  async deleteUser(id: string): Promise<boolean> {
    const response = await fetch(`/api/users/${id}`, {
      method: 'DELETE',
      headers: this.defaulHeaders,
    });

    return response.ok;
  }
}
