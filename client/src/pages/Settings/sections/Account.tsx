import React, { useState } from 'react';
import { Button, Form, Input, Modal, notification, Popconfirm } from 'antd';
import { useAuth } from '../../../context/auth';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { ApiRequests } from '../../../http/requests';
import { apiChangePassword } from '../../../http/auth';

interface IPasswordFields {
  password: string;
  confirmPassword: string;
}

type Modal = 'USERNAME' | 'PASSWORD';

const Account: React.FC = () => {
  const { logout, user, setUser } = useAuth();
  const [usernameModalVisible, setUsernameModalVisible] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [username, setUsername] = useState(user?.username || '');
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const [passwordForm] = Form.useForm();

  const showModal = (modal: Modal, value: boolean) => {
    switch (modal) {
      case 'USERNAME':
        setUsernameModalVisible(value);
        break;
      case 'PASSWORD':
        setPasswordModalVisible(value);
        break;
      default:
        break;
    }
  };

  async function handleChangePassword({ password }: IPasswordFields) {
    const errorMsg = 'The password could not be updated. Try again';
    if (!user?._id) {
      notification['error']({ message: errorMsg });
      return showModal('PASSWORD', false);
    }
    const updated = await apiChangePassword(password, user._id);
    if (!updated) {
      notification['error']({ message: errorMsg });
    } else {
      notification['success']({ message: 'Password updated' });
    }

    return showModal('PASSWORD', false);
  }

  async function handleDeleteAccount() {
    const deleted = await new ApiRequests().deleteUser(user?._id || '');
    if (!deleted) {
      return notification['error']({ message: 'Error deleting user' });
    }
    logout();
  }

  async function handleChangeUsername() {
    if (username === user?.username) return;
    const service = new ApiRequests();
    if (await service.getUserByUsername(username || '')) {
      return setUsernameAvailable(false);
    }
    const updated = user;
    if (updated) {
      updated.username = username;
      const finalUser = await service.updateUser(updated);
      if (!finalUser)
        notification['error']({
          message: 'The username could not be updated. Try again',
        });
      else {
        setUser(finalUser);
        notification['success']({ message: 'Username updated correctly' });
      }
    }
    showModal('USERNAME', false);
  }

  return (
    <div className="tab-panel-container">
      <div className="tab-panel-container-setting">
        <label>Username</label>
        <Button onClick={() => showModal('USERNAME', true)}>Change username</Button>
        <Modal
          title="Change your username"
          visible={usernameModalVisible}
          onCancel={() => showModal('USERNAME', false)}
          onOk={handleChangeUsername}
        >
          {!usernameAvailable && <p className="input-error-message">Username not available</p>}
          <Input
            className={!usernameAvailable ? 'input-error' : ''}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Modal>
      </div>
      <div className="tab-panel-container-setting">
        <label>Password</label>
        <Button onClick={() => showModal('PASSWORD', true)}>Change password</Button>
        <Modal
          title="Change your password"
          visible={passwordModalVisible}
          destroyOnClose
          footer={null}
          closable={false}
        >
          <Form form={passwordForm} name="changePassword" onFinish={handleChangePassword}>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please, insert a new password' }]}
              hasFeedback
            >
              <Input.Password placeholder="New password" />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              dependencies={['password']}
              hasFeedback
              rules={[
                { required: true, message: 'Please, confirm the new password' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject('The two passwords do not match');
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm password" />
            </Form.Item>
            <Form.Item style={{ textAlignLast: 'right', marginBottom: 0 }}>
              <Button onClick={() => showModal('PASSWORD', false)}>Cancel</Button>
              <Button type="primary" htmlType="submit" style={{ marginLeft: '10px' }}>
                Update
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <div className="tab-panel-container-setting">
        <h2 id="danger">Delete account️</h2>
        <p>
          Deleting your account is irreversible. Your account, alongside your notes will be deleted.
        </p>
        <Popconfirm
          title="Are you sure?"
          placement="right"
          onConfirm={handleDeleteAccount}
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          okText="Yes"
          cancelText="No"
        >
          <Button danger style={{ marginTop: '5px' }}>
            Delete account
          </Button>
        </Popconfirm>
      </div>
    </div>
  );
};

export default Account;
