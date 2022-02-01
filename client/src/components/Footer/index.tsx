import React from 'react';
import { Note } from '../../types';
import NoteSearch from './NoteSearch';
import SettingsMenu from './SettingsMenu';

interface Props {
  notes: Note[];
  setNote: Function;
}

const Footer: React.FC<Props> = ({ notes, setNote }) => (
  <>
    <NoteSearch notes={notes} setNote={setNote} />
    <SettingsMenu />
  </>
);

export default Footer;
