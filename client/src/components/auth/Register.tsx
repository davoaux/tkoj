import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../context/auth';

const Register: React.FC = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const history = useHistory();
  const { isLogged, register, login } = useAuth();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setUserData({
      ...userData,
      [e.target.name]: value,
    });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isLogged) history.push('/');

    const response = await register(userData);
    if (!response) return console.log('Sign up error');

    const user = await login(userData.email, userData.password);
    if (!user) return console.log('Login error');
    history.push('/');
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
        </label>
        <input type="submit" value="Create account" />
      </form>
    </div>
  );
};

export default Register;
