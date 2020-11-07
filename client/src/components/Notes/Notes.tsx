import React, { useEffect, useState } from 'react';
import getNotes from '../../services/noteService';
import './Notes.css';

// const notes = [
//   {
//     links: [],
//     category: ['testing', 'js'],
//     _id: '5fa19d5816841792c00910ad',
//     title: 'Note without content',
//     content: '',
//     userId: '5f9488456d7942f072626df9',
//     __v: 0,
//   },
//   {
//     links: [],
//     category: ['general'],
//     _id: '5fa19dc316841792c00910ae',
//     title: 'whitespaced title',
//     content: 'title should be trimed',
//     userId: '5f9488456d7942f072626df9',
//     __v: 0,
//   },
//   {
//     links: [],
//     category: ['general'],
//     _id: '5fa19e0916841792c00910af',
//     title: 'fetchData',
//     content: 'fetchData content',
//     userId: '5f9488456d7942f072626df9',
//     __v: 0,
//   },
// ];

interface NoteProps {
  title: string;
  content?: string;
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
  const [notes, setNotes] = useState([]);

  // useEffect(() => {
  //   async function fetchData() {
  //     const data = await getNotes();
  //     setNotes(data);
  //   }
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   getNotes().then((data) => {
  //     setNotes(data);
  //     console.log(data);
  //     console.log(notes);
  //   });
  // }, []);

  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await fetch('http://localhost:3001/api/notes');
  //     const data = await response.json();
  //     setNotes(data);
  //   }
  //   fetchData();
  // }, []);

  /**
   * The previous example proves that the problem must be in the useState
   * method. Research about the use of useState on TS to retrieve data from
   * an API.
   */

  return (
    <div className="Notes">
      <h1>Notes</h1>
      {/* {notes.map((note) => ( */}
      {/*   <Note key={note._id} title={note.title} content={note.content} /> */}
      {/* ))} */}
    </div>
  );
};

export default Notes;
