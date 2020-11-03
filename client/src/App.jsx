import React, { useEffect, useState } from 'react';
import './App.css';

function Note({ title, content }) {
  return (
    <div className="Note">
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
}

export default function App() {
  const [notes, setNotes] = useState([]);

  async function fetchNotes() {
    const response = await fetch('http://localhost:3001/api/notes/');
    const json = await response.json();
    setNotes(json);
  }

  useEffect(fetchNotes, []);

  return (
    <div className="App">
      <h1>Notes</h1>
      <div className="Notes">
        {notes.map((note) => <Note title={note.title} content={note.content} />)}
      </div>
    </div>
  );
}

// export default class extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { notes: [] };
//   }

//   async componentDidMount() {
//     const response = await fetch('http://localhost:3001/api/notes/');
//     const notes = await response.json();
//     this.setState({ notes });
//   }

//   render() {
//     const { notes } = this.state;
//     return (
//       <div className="App">
//         <h1>Notes</h1>
//         <div className="Notes">
//           {notes.map((note) => <Note title={note.title} content={note.content} />)}
//         </div>
//       </div>
//     );
//   }
// }
