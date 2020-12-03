import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
import INote from '../../types/Note';
import NavBar from '../layout/NavBar/NavBar';
import SideBar from '../layout/SideBar/SideBar';
import './Dashboard.css';

interface EditorProps {
  content: string;
}

const Editor: React.FC<EditorProps> = (props: EditorProps) => {
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    setContent(props.content);
  }, [props.content]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value);

  return (
    <textarea value={content} cols={80} rows={20} onChange={handleChange} />
  );
};

const Dashboard: React.FC = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams<{ id: string }>();
  const [notes, setNotes] = useState<INote[]>([]); // Working on
  const [note, setNote] = useState({} as INote); // Prev

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
      <div className="Dashboard">
        <h1>Welcome {user?.name}</h1>
        <br />
        <h1>{note?.title}</h1>
        <Editor content={note?.content} />
      </div>
    </>
  );
};

export default Dashboard;
