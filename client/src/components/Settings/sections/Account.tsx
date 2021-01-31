import React, { useState } from 'react';
import { Button, Form, Input, Modal, notification, Popconfirm } from 'antd';
import { useAuth } from '../../../context/auth';
import { ApiService } from '../../../services/apiService';
import { IUser } from '../../../types';
import { QuestionCircleOutlined } from '@ant-design/icons';

interface ISettingsSection {
  user: IUser | null;
}

interface IPasswordFields {
  password: string;
  confirmPassword: string;
}

type Modal = 'EMAIL' | 'PASSWORD';

const Account: React.FC<ISettingsSection> = () => {
  const { logout, user, setUser } = useAuth();
  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [email, setEmail] = useState(user?.email || '');
  const [emailAvailable, setEmailAvailable] = useState(true);
  const [passwordForm] = Form.useForm();

  const showModal = (modal: Modal, value: boolean) => {
    switch (modal) {
      case 'EMAIL':
        setEmailModalVisible(value);
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
    const service = new ApiService();
    const updated = await service.changePassword(password, user._id);
    if (!updated) {
      notification['error']({ message: errorMsg });
    } else {
      notification['success']({ message: 'Password updated' });
    }
    return showModal('PASSWORD', false);
  }

  async function handleDeleteAccount() {
    const deleted = await new ApiService().deleteUser(user?._id || '');
    if (!deleted) {
      return notification['error']({ message: 'Error deleting user' });
    }
    logout();
  }

  async function handleChangeEmail() {
    if (email === user?.email) return;
    const service = new ApiService();
    if (await service.getUserByEmail(email || '')) {
      return setEmailAvailable(false);
    }
    const updated = user;
    if (updated) {
      updated.email = email;
      const finalUser = await service.updateUser(updated);
      if (!finalUser)
        notification['error']({
          message: 'The email could not be updated. Try again',
        });
      else setUser(finalUser);
    }
    showModal('EMAIL', false);
  }

  return (
    <div className="tab-panel-container">
      <div className="tab-panel-container-setting">
        <label>Email</label>
        <Button onClick={() => showModal('EMAIL', true)}>Change email</Button>
        <Modal
          title="Change your email"
          visible={emailModalVisible}
          onCancel={() => showModal('EMAIL', false)}
          onOk={handleChangeEmail}
        >
          {!emailAvailable && (
            <p className="input-error-message">Email not available</p>
          )}
          <Input
            className={!emailAvailable ? 'input-error' : ''}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Modal>
      </div>
      <div className="tab-panel-container-setting">
        <label>Password</label>
        <Button onClick={() => showModal('PASSWORD', true)}>
          Change password
        </Button>
        <Modal
          title="Change your password"
          visible={passwordModalVisible}
          destroyOnClose
          footer={null}
          closable={false}
        >
          <Form
            form={passwordForm}
            name="changePassword"
            onFinish={handleChangePassword}
          >
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please, insert a new password' },
              ]}
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
              <Button onClick={() => showModal('PASSWORD', false)}>
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginLeft: '10px' }}
              >
                Update
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <div className="tab-panel-container-setting">
        <h2 id="danger">Delete account️</h2>
        <p>
          Deleting your account is irreversible. Your account, alongside your
          notes will be deleted.
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
