import React, { FormEvent, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../../context/auth';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const { isLogged, login } = useContext(AuthContext);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isLogged) history.push('/');

    const user = await login(email, password);
    if (!user) return console.log('Login error');
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
