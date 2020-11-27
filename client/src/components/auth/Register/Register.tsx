import React, { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../../context/auth';
import './Register.css';

const Register: React.FC = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const history = useHistory();
  const { isLogged, setIsLogged } = useContext(AuthContext);

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

    // Register new user
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
        password: userData.password,
      }),
    });
    if (!response.ok) return console.log('Sign up error');

    // Login
    const loginResponse = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
      }),
    });
    if (!response.ok) return console.log('Login error');
    const loginData = await loginResponse.json();
    localStorage.setItem('token', loginData.token);
    setIsLogged(true);
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
