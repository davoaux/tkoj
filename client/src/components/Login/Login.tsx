import React from 'react';
import './Login.css';

const Login: React.FC = () => {
  function handleSubmit() {
    // TODO
  }

  function handleChange() {
    // TODO
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input type="email" value="" onChange={handleChange} />
        </label>
        <label>
          Password
          <input type="password" value="" onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Login;
