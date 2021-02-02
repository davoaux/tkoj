import React from 'react';
import NoteSearch from './NoteSearch';
import SettingsMenu from './SettingsMenu';

const Footer: React.FC = () => {
  return (
    <>
      <NoteSearch />
      <SettingsMenu />
    </>
  );
};

export default Footer;
