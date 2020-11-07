import React, { useEffect, useState } from 'react';
import getNotes from '../../services/noteService';
import './Notes.css';

function Note({ title, content }) {
  return (
    <div className="Note">
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
}

export default function Notes() {
  const [notes, setNotes] = useState([]);

  useEffect(async () => {
    const data = await getNotes();
    setNotes(data);
  }, []);

  return (
    <div className="Notes">
      <h1>Notes</h1>
      <div>
        {notes.map((note) => <Note title={note.title} content={note.content} />)}
      </div>
    </div>
  );
}
