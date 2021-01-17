import React from 'react';
import Search from './Search';
import './Footer.css';
import SettingsMenu from './SettingsMenu';

const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="search">
        <Search />
      </div>
      <div>
        <SettingsMenu />
      </div>
    </div>
  );
};

export default Footer;
