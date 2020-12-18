import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { INote } from '../../../types';
import './SideBar.css';

interface SideBarProps {
  notes: INote[];
}

const SideBar: React.FC<SideBarProps> = ({ notes }: SideBarProps) => {
  const history = useHistory();

  const handleClick = () => history.push('/');

  return (
    <div className="sideBar">
      <button onClick={handleClick}>New note</button>
      <br />
      {notes.map((note) => (
        <Link to={`/n/${note._id}`} key={note._id} className="tags">
          [{note.title}]
        </Link>
      ))}
    </div>
  );
};

export default SideBar;
