import { useState } from 'react';
import { Editor } from '../components/Editor';
import { Nav } from '../components/Nav';
import { Preview } from '../components/Preview';
import { Sidebar } from '../components/Sidebar';
import { Note } from '../types';

export const App = () => {
  const [note, setNote] = useState({} as Note);

  return (
    <div className="h-screen flex flex-row overflow-hidden font-sans">
      <Sidebar />
      <div className="w-full flex flex-col">
        <div className="h-full flex flex-row mb-auto">
          <Editor note={note} setNote={setNote} />
          <Preview note={note} />
        </div>
        <Nav />
      </div>
    </div>
  );
};
