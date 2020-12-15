import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { INote } from '../../types';

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

interface SideBarProps {
  notes: INote[];
}

const SideBar: React.FC<SideBarProps> = ({ notes }: SideBarProps) => {
  const history = useHistory();

  const handleClick = () => history.push('/');

  return (
    <div style={styles.sideBar as React.CSSProperties}>
      <button onClick={handleClick}>New note</button>
      <br />
      {notes.map((note) => (
        <Link to={`/n/${note._id}`} key={note._id} style={styles.tags}>
          [{note.title}]
        </Link>
      ))}
    </div>
  );
};

export default SideBar;
