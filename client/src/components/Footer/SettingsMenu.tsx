import { MoreOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';

const SettingsMenu: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const signOut = () => {
    logout();
    navigate('/login');
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <a href="/settings">Settings</a>
      </Menu.Item>
      <Menu.Item>
        <a onClick={signOut}>Sign out</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="footer-settings-section">
      <Dropdown overlay={menu} placement="topCenter" trigger={['click']}>
        <MoreOutlined style={{ fontSize: '1.4rem' }} />
      </Dropdown>
    </div>
  );
};

export default SettingsMenu;
