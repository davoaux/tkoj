import React, { useEffect, useState } from 'react';
import INote from '../../../types/Note';
import './SideBar.css';

interface NotesProps {
  notes: INote[];
}

const Notes: React.FC<NotesProps> = (props: NotesProps) => {
  const [notes, setNotes] = useState<INote[]>([]);

  useEffect(() => {
    setNotes(props.notes);
  }, [props.notes]);

  return (
    <>
      {notes.map((note) => (
        <a key={note._id} href={'/note/' + note._id} className="Tags">
          [{note.title}]
        </a>
      ))}
    </>
  );
};

interface SideBarProps {
  notes: INote[];
}

const SideBar: React.FC<SideBarProps> = ({ notes }: SideBarProps) => {
  return (
    <div className="SideBar">
      <Notes notes={notes} />
    </div>
  );
};

export default SideBar;
