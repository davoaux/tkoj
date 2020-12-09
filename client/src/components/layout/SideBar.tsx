import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { INote } from '../../types';

interface NotesProps {
  notes: INote[];
}

const styles = {
  sideBar: {
    height: '100%',
    width: '160px',
    position: 'fixed',
    zIndex: -1,
    top: 0,
    left: 0,
    overflowX: 'hidden',
    paddingTop: '90px',
    backgroundColor: '#eee',
  },
  tags: {
    padding: '6px 8px 6px 16px',
    display: 'block',
  },
};

const Notes: React.FC<NotesProps> = (props: NotesProps) => {
  const [notes, setNotes] = useState<INote[]>([]);

  useEffect(() => {
    setNotes(props.notes);
  }, [props.notes]);

  return (
    <>
      {notes.map((note) => (
        <a key={note._id} href={'/note/' + note._id} style={styles.tags}>
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
  const history = useHistory();

  const handleClick = () => history.push('/note/new');

  return (
    <div style={styles.sideBar as React.CSSProperties}>
      <button onClick={handleClick}>New note</button>
      <br />
      <Notes notes={notes} />
    </div>
  );
};

export default SideBar;
