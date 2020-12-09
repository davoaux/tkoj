import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import { INote } from '../types';
import Editor from './Editor';
import NavBar from './layout/NavBar';
import SideBar from './layout/SideBar';

const Dashboard: React.FC = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams<{ id: string }>();
  const [notes, setNotes] = useState<INote[]>([]);
  const [note, setNote] = useState({} as INote);

  const styles = {
    marginLeft: '160px',
    position: 'absolute',
  } as React.CSSProperties;

  async function getNotes(): Promise<void> {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (typeof storedUser === 'string') {
      const user = JSON.parse(storedUser);
      const response = await fetch(`/api/user/${user._id}/notes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      const notes = await response.json();
      setNotes(notes);
    }
  }

  useEffect(() => {
    getNotes();
  }, []);

  useEffect(() => {
    const note = notes.filter((note) => note['_id'].startsWith(id))[0];
    setNote(note);
  }, [notes]);

  return (
    <>
      <NavBar />
      <SideBar notes={notes} />
      <div style={styles}>
        {id === undefined ? (
          <h1>Welcome {user?.name}</h1>
        ) : (
          <>
            <Editor note={note} />
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
