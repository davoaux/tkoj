import { createContext } from 'react';
import { INote } from '../types';

export const NotesContext = createContext({} as INote[]);

export default NotesContext;
