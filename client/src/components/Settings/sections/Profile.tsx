import React, { useEffect, useState } from 'react';
import { Alert, Button, Input } from 'antd';
import { ApiService } from '../../../services/apiService';
import { IUser } from '../../../types';

interface ISettingsSection {
  user?: IUser | null;
}

const Profile: React.FC<ISettingsSection> = ({ user }: ISettingsSection) => {
  const [editedUser, setEditedUser] = useState({} as IUser);
  const [error, setError] = useState({ status: false, message: '' });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user != null) setEditedUser(user);
  }, [user]);

  const userUpdate = async () => {
    if (editedUser === user) return;
    const updatedUser = await new ApiService().updateUser(editedUser);
    if (!updatedUser) {
      setError({ status: true, message: 'Error updating user profile' });
    } else {
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setSuccess(true);
    }
  };

  return (
    <div style={{ padding: '5px 15px 15px 15px' }}>
      <h2>Edit profile</h2>
      {error.status && (
        <Alert
          type="error"
          message={error.message}
          showIcon
          style={{ width: 'inherit', marginBottom: '15px' }}
        />
      )}
      {success && (
        <Alert
          type="success"
          message="Profile updated correctly"
          showIcon
          style={{ width: 'inherit', marginBottom: '15px' }}
        />
      )}
      <label>Name</label>
      <Input
        value={editedUser.name}
        onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
      />
      <br />
      <br />
      <Button onClick={userUpdate}>Update profile</Button>
    </div>
  );
};

export default Profile;
