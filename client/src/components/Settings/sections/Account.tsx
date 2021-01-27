import React, { useState } from 'react';
import { Button, Input, Modal, notification, Popconfirm } from 'antd';
import { IUser } from '../../../types';
import { ApiService } from '../../../services/apiService';
import { useAuth } from '../../../context/auth';

interface ISettingsSection {
  user?: IUser | null;
}

const Account: React.FC<ISettingsSection> = ({ user }: ISettingsSection) => {
  const { logout } = useAuth();
  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const showEmailModal = () => setEmailModalVisible(true);
  const hideEmailModal = () => setEmailModalVisible(false);

  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const showPasswordModal = () => setPasswordModalVisible(true);
  const hidePasswordModal = () => setPasswordModalVisible(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

  const handleDeleteAccount = async () => {
    const deleted = await new ApiService().deleteUser(user?._id || '');
    if (!deleted) {
      return notification['error']({ message: 'Error deleting user' });
    }
    logout();
  };

  return (
    <div style={{ padding: '5px 15px 15px 15px' }}>
      <label>Email</label>
      <br />
      <Button onClick={() => showEmailModal()}>Change email</Button>
      <Modal
        title="Change your email"
        visible={emailModalVisible}
        onCancel={() => hideEmailModal()}
        onOk={() => hideEmailModal()}
      >
        <Input value={user?.email} readOnly />
      </Modal>
      <br />
      <br />
      <label>Password</label>
      <br />
      <Button onClick={() => showPasswordModal()}>Change password</Button>
      <Modal
        title="Change your password"
        visible={passwordModalVisible}
        onCancel={() => hidePasswordModal()}
        onOk={() => hidePasswordModal()}
      >
        <Input
          type="password"
          placeholder="Current password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <br />
        <br />
        <Input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Confirm password"
          value={newPasswordConfirm}
          onChange={(e) => setNewPasswordConfirm(e.target.value)}
        />
      </Modal>
      <br />
      <br />
      <br />
      <Popconfirm
        title="Are you sure you want to delete your account? All of your notes will be deleted aswell."
        placement="right"
        onConfirm={handleDeleteAccount}
      >
        <Button danger>Delete account</Button>
      </Popconfirm>
    </div>
  );
};

export default Account;
