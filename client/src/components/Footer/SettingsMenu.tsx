import React from 'react';
import { MoreOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
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
      <Menu.Item>
        <a href="/settings">Settings</a>
      </Menu.Item>
      <Menu.Item>
        <a onClick={handleSignOut}>Sign out</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div style={{ marginRight: 'var(--sidebar-size)' }}>
      <Dropdown overlay={menu} placement="topCenter" trigger={['click']}>
        <MoreOutlined style={{ fontSize: '1.4rem' }} />
      </Dropdown>
    </div>
  );
};

export default SettingsMenu;
