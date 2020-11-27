import React, { FormEvent, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../../context/auth';
import './Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const { isLogged, setIsLogged } = useContext(AuthContext);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isLogged) history.push('/');
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (!response.ok) return console.log('Login error');
    const data = await response.json();
    localStorage.setItem('token', data.token);
    setIsLogged(true);
    history.push('/');
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <input type="submit" value="Login" />
      </form>
      <a href="/register">Sign up</a>
    </div>
  );
};

export default Login;
