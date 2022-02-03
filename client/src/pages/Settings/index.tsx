import { PageHeader, Tabs } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Account from './sections/Account';
import Profile from './sections/Profile';

const Settings: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="settings">
      <PageHeader title="Settings" onBack={() => navigate(-1)} />
      <Tabs>
        <Tabs.TabPane tab="Profile" key="1">
          <Profile />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Account" key="2">
          <Account />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default Settings;
