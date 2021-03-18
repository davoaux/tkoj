import React, { useState } from 'react';
import { Alert, Button, Form, Input } from 'antd';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { ILoginFields } from '../types';
import { LockOutlined, MailOutlined } from '@ant-design/icons';

const Login: React.FC = () => {
  const { isLogged, login } = useAuth();
  const history = useHistory();
  const [form] = Form.useForm();
  const [error, setError] = useState('');

  const handleFinish = async (fields: ILoginFields) => {
    if (isLogged) history.push('/dashboard');
    const { username, password } = fields;

    // Login the user
    const res = await login(username, password);
    if (typeof res === 'string') return setError(res);
    history.push('/');
  };

  const { Item } = Form;

  return (
    <div className="form-container">
      <h1>Log in</h1>
      {error && <Alert type="error" className="form-error" message={error} showIcon />}
      <Form form={form} name="login" onFinish={handleFinish}>
        <Item name="username" rules={[{ required: true }]}>
          <Input prefix={<MailOutlined />} placeholder="Username" />
        </Item>
        <Item name="password" rules={[{ required: true }]}>
          <Input type="password" prefix={<LockOutlined />} placeholder="Password" />
        </Item>
        <Item>
          <Button type="primary" htmlType="submit">
            Log in
          </Button>
        </Item>
        Or <a href="/register">Sign up</a>
      </Form>
    </div>
  );
};

export default Login;
