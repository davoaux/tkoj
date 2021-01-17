import { Dropdown, Menu } from 'antd';
import MenuItem from 'antd/lib/menu/MenuItem';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../context/auth';

const SettingsMenu: React.FC = () => {
  const { logout } = useAuth();
  const history = useHistory();

  const handleSignOut = () => {
    logout();
    history.push('/');
  };

  const menu = (
    <Menu>
      <MenuItem>
        <a href="/settings">Settings</a>
      </MenuItem>
      <MenuItem>
        <a onClick={handleSignOut}>Sign out</a>
      </MenuItem>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} placement="topCenter" trigger={['click']}>
      <button className="material-icons icon">settings</button>
    </Dropdown>
  );
};

export default SettingsMenu;
