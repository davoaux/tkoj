import { createContext } from 'react';
import { Note } from '../types';

export const NotesContext = createContext({} as Note[]);

export default NotesContext;
