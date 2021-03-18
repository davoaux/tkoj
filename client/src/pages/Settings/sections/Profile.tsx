import React, { useEffect, useState } from 'react';
import { Alert, Button, Input, notification } from 'antd';
import { IUser } from '../../../types';
import { useAuth } from '../../../context/auth';
import { ApiRequests } from '../../../http/requests';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [editedUser, setEditedUser] = useState({} as IUser);
  const [error, setError] = useState({ status: false, message: '' });

  useEffect(() => {
    if (user != null) setEditedUser(user);
  }, [user]);

  const userUpdate = async () => {
    if (editedUser === user) return;
    const updatedUser = await new ApiRequests().updateUser(editedUser);
    if (!updatedUser) {
      setError({ status: true, message: 'Error updating user profile' });
    } else {
      localStorage.setItem('user', JSON.stringify(updatedUser));
      notification['success']({ message: 'Profile updated correctly' });
    }
  };

  return (
    <div className="tab-panel-container">
      <h2>Edit profile</h2>
      {error.status && (
        <Alert
          type="error"
          message={error.message}
          showIcon
          style={{ width: 'inherit', marginBottom: '15px' }}
        />
      )}
      <div className="tab-panel-container-setting">
        <label>Name</label>
        <Input
          value={editedUser.name}
          onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
        />
      </div>
      <div className="tab-panel-container-setting">
        <Button onClick={userUpdate}>Update profile</Button>
      </div>
    </div>
  );
};

export default Profile;
