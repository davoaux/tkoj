import React, { useEffect, useState } from 'react';
import './Notes.css';

interface INoteProps {
  title: string;
  content?: string;
}

const Note: React.FC<INoteProps> = ({ title, content }: INoteProps) => {
  return (
    <div className="Note">
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
};

interface INotes {
  links: Array<string>;
  category: Array<string>;
  _id: string;
  title: string;
  content: string;
  userId: string;
  _v: number;
}

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<INotes[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function loadNotes(): Promise<void> {
    const response = await fetch('/api/notes');
    const notes = await response.json();
    setNotes(notes);
  }

  useEffect(() => {
    loadNotes();
    setIsLoading(false);
  }, []);

  if (isLoading) return <p>Loading...</p>;

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
