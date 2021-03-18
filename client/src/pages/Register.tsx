import React, { useState } from 'react';
import { Alert, Button, Form, Input } from 'antd';
import { useAuth } from '../context/auth';
import { useHistory } from 'react-router-dom';
import { IRegisterFields } from '../types';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';

const Register: React.FC = () => {
  const { isLogged, register, login } = useAuth();
  const history = useHistory();
  const [form] = Form.useForm();
  const [error, setError] = useState('');

  const handleFinish = async (fields: IRegisterFields) => {
    if (isLogged) history.push('/dashboard');

    // Register the user
    const res = await register(fields);
    if (typeof res === 'string') return setError(res);

    // Login the user
    await login(fields.username, fields.password);
    history.push('/');
  };

  const { Item } = Form;

  return (
    <div className="form-container">
      <h1>Sign up</h1>
      {error && <Alert className="form-error" type="error" message={error} showIcon />}
      <Form form={form} name="register" onFinish={handleFinish}>
        <Item name="name" rules={[{ required: true }]}>
          <Input prefix={<UserOutlined />} placeholder="Name" />
        </Item>
        <Item name="username" rules={[{ required: true }, { min: 5 }]}>
          <Input prefix={<MailOutlined />} placeholder="Username" />
        </Item>
        <Item name="password" rules={[{ required: true }]}>
          <Input type="password" prefix={<LockOutlined />} placeholder="Password" />
        </Item>
        <Item>
          <Button type="primary" htmlType="submit">
            Create account
          </Button>
        </Item>
      </Form>
    </div>
  );
};

export default Register;
