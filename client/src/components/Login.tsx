import React, { useState } from 'react';
import { Alert, Button, Form, Input } from 'antd';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { ILoginFields } from '../types';

const Login: React.FC = () => {
  const { isLogged, login } = useAuth();
  const history = useHistory();
  const [form] = Form.useForm();
  const [error, setError] = useState({ status: false, message: '' });

  const handleFinish = async (fields: ILoginFields) => {
    if (isLogged) history.push('/dashboard');
    const { email, password } = fields;

    // Login the user
    const user = await login(email, password);
    if (!user) return setError({ status: true, message: 'Log in error' });
    history.push('/');
  };

  return (
    <div className="form-container">
      <h1>Log in</h1>
      {error.status && (
        <Alert
          type="error"
          message={error.message}
          showIcon
          style={{ width: 'inherit', marginBottom: '15px' }}
        />
      )}
      <Form form={form} name="login" onFinish={handleFinish}>
        <Form.Item name="email" rules={[{ required: true }, { type: 'email' }]}>
          <Input
            prefix={<span className="prefix-icon material-icons">email</span>}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true }]}>
          <Input
            type="password"
            prefix={<span className="prefix-icon material-icons">lock</span>}
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Log in
          </Button>
        </Form.Item>
        Or <a href="/register">Sign up</a>
      </Form>
    </div>
  );
};

export default Login;
