import React, { useEffect, useState } from 'react';
import getNotes from '../../services/noteService';
import './Notes.css';

interface NoteProps {
  title: string;
  content?: string;
}

interface INotes {
  links: Array<string>;
  category: Array<string>;
  _id: string;
  title: string;
  content: string;
  userId: string;
  _v: number;
}

const Note: React.FC<NoteProps> = ({ title, content }: NoteProps) => {
  return (
    <div className="Note">
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
};

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<INotes[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getNotes();
      setNotes(res);
    };
    fetchData();
  }, []);

  return (
    <div className="Notes">
      <h1>Notes</h1>
      {notes.map((note) => (
        <Note key={note._id} title={note.title} content={note.content} />
      ))}
    </div>
  );
};

export default Notes;
