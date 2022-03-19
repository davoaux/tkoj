import { useState } from 'react';
import { api } from '../lib/api';

export const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function signIn() {
    const res = await api.post('login', {}, { auth: true }).then((r) => r.json());
    // eslint-disable-next-line no-console
    console.log(res);
  }

  return (
    <div className="flex justify-center font-sans bg-neutral-50">
      <div className="h-screen flex-col w-1/3 p-5 bg-black text-white">
        <h1 className="text-4xl font-medium mb-5">Log in</h1>
        <div className="flex flex-row mb-2">
          <label className="w-1/3" htmlFor="email">
            Email
          </label>
          <input
            className="text-black"
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-row mb-2">
          <label className="w-1/3" htmlFor="password">
            Password
          </label>
          <input
            className="text-black"
            type="password"
            name="password"
            id="pw"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="my-6">
          <button
            className="bg-white text-black p-2 w-32 hover:bg-neutral-200"
            type="button"
            onClick={signIn}
          >
            Send
          </button>
        </div>
        <p>
          Not registered? Sign up{' '}
          <a className="underline" href="signup">
            here
          </a>
        </p>
      </div>
    </div>
  );
};
