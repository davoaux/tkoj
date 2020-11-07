import React, { useEffect, useState } from 'react';
import './Notes.css';

const notes = [
  {
    links: [],
    category: ['testing', 'js'],
    _id: '5fa19d5816841792c00910ad',
    title: 'Note without content',
    content: '',
    userId: '5f9488456d7942f072626df9',
    __v: 0,
  },
  {
    links: [],
    category: ['general'],
    _id: '5fa19dc316841792c00910ae',
    title: 'whitespaced title',
    content: 'title should be trimed',
    userId: '5f9488456d7942f072626df9',
    __v: 0,
  },
  {
    links: [],
    category: ['general'],
    _id: '5fa19e0916841792c00910af',
    title: 'foo',
    content: 'foo content',
    userId: '5f9488456d7942f072626df9',
    __v: 0,
  },
];

interface Props {
  title: string;
  content?: string;
}

const Note: React.FC<Props> = ({ title, content }: Props) => {
  return (
    <div className="Note">
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
};

const Notes: React.FC = () => {
  // const [notes, setNotes] = useState([]);

  // useEffect(async () => {
  //   const data = await getNotes();
  //   setNotes(data);
  // }, []);

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
