import React from 'react';
import { PageHeader, Tabs } from 'antd';
import { useHistory } from 'react-router-dom';
import Profile from './sections/Profile';
import Account from './sections/Account';
import { useAuth } from '../../context/auth';

const Settings: React.FC = () => {
  const { user } = useAuth();
  const history = useHistory();

  const style1 = {
    backgroundColor: '#f8f8f8',
    margin: '0 auto',
    width: '80%',
    height: '100%',
    padding: '20px',
  };

  return (
    <div style={style1}>
      <PageHeader
        title="Settings"
        onBack={() => history.goBack()}
        style={{ padding: '10px 24px' }}
      />
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
