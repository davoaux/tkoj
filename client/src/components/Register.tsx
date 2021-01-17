import React, { useState } from 'react';
import { Alert, Button, Form, Input } from 'antd';
import { useAuth } from '../context/auth';
import { useHistory } from 'react-router-dom';
import { IRegisterFields } from '../types';

const Register: React.FC = () => {
  const { isLogged, register, login } = useAuth();
  const history = useHistory();
  const [form] = Form.useForm();
  const [error, setError] = useState({ status: false, message: '' });

  const handleFinish = async (fields: IRegisterFields) => {
    if (isLogged) history.push('/dashboard');

    // Register the user
    const response = await register(fields);
    /* if (!response) return console.log('Sign up error'); */
    if (!response) return setError({ status: true, message: 'Sign up error' });

    // Login the user
    await login(fields.email, fields.password);
    history.push('/');
  };

  return (
    <div className="form-container">
      <h1>Sign up</h1>
      {error.status && (
        <Alert
          type="error"
          message={error.message}
          showIcon
          style={{ width: 'inherit', marginBottom: '15px' }}
        />
      )}
      <Form form={form} name="register" onFinish={handleFinish}>
        <Form.Item name="name" rules={[{ required: true }]}>
          <Input
            prefix={
              <span className="prefix-icon material-icons">account_box</span>
            }
            placeholder="Name"
          />
        </Form.Item>
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
            Create account
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
