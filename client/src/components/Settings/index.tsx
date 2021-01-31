import React from 'react';
import { PageHeader, Tabs } from 'antd';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import Account from './sections/Account';
import Profile from './sections/Profile';

const Settings: React.FC = () => {
  const { user } = useAuth();
  const history = useHistory();

  return (
    <div className="settings">
      <PageHeader title="Settings" onBack={() => history.goBack()} />
      <Tabs>
        <Tabs.TabPane tab="Profile" key="1">
          <Profile user={user} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Account" key="2">
          <Account user={user} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default Settings;
