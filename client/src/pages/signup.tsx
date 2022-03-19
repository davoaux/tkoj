import { useState } from 'react';
import { api } from '../lib/api';

export const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function signUp() {
    const res = await api
      .post('signup', { name, email, password }, { auth: true })
      .then((r) => r.json());
    // eslint-disable-next-line no-console
    console.log(res);
  }

  return (
    <div className="flex justify-center font-sans bg-neutral-50">
      <div className="h-screen flex-col w-1/3 p-5 bg-black text-white">
        <h1 className="text-4xl font-medium mb-5">Sign up</h1>
        <div className="flex flex-row mb-2">
          <label className="w-1/3" htmlFor="email">
            Name
          </label>
          <input
            className="text-black"
            type="name"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
            onClick={signUp}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
