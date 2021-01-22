import React from 'react';
import NoteSearch from './NoteSearch';
import SettingsMenu from './SettingsMenu';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <>
      <NoteSearch />
      <SettingsMenu />
    </>
  );
};

export default Footer;
