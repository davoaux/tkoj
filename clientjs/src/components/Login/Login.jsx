import React from 'react';

export default function Login() {
  return (
    <div className="Login">
      <h1>Login</h1>
      <form>
        <p>Email</p>
        <input type="email" name="name" />
        <p>Password</p>
        <input type="password" name="password" />
        <br />
        <button type="submit">Submit</button>
      </form>
      <i>TODO</i>
    </div>
  );
}
