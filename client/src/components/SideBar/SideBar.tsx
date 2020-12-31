import React, { FormEvent, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { ApiService } from '../../services/apiService';
import { INote } from '../../types';
import './SideBar.css';

interface SideBarProps {
  notes: INote[];
}

const SideBar: React.FC<SideBarProps> = ({ notes }: SideBarProps) => {
  const [title, setTitle] = useState('');
  const history = useHistory();
  const { user } = useAuth();

  // TODO redirect to the created note
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const api = new ApiService();
    const note = await api.createNote({
      title,
      userId: user?._id,
    } as INote);
    if (!note) console.log('Error creating note');
    else console.log('Note saved');

    history.push(`/n/${note?._id}`);
    window.location.reload();
    // history.push('/');
  };

  return (
    <div className="sideBar">
      <div className="sidebar-menu">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="input-transparent input-new-note"
            placeholder="Create new note"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input className="submit-new-note" type="submit" value="+" />
        </form>
      </div>
      <div className="tags">
        {notes.map((note) => (
          <NavLink
            to={`/n/${note._id}`}
            key={note._id}
            className="tagItem"
            activeClassName="activeTag"
          >
            {note.title}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
