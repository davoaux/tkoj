import React, { useEffect, useState } from 'react';
import { Switch } from 'react-router-dom';
import NotesContext from '../../context/notes';
import { ApiService } from '../../services/apiService';
import { INote } from '../../types';
import UserRoute from '../../utils/UserRoute';
import Dashboard from '../Dashboard/Dashboard';
import SideBar from '../SideBar/SideBar';
import './Application.css';

const Application: React.FC = () => {
  const [notes, setNotes] = useState<INote[]>([]);

  async function loadNotes() {
    const notes = await new ApiService().getNotes();
    setNotes(notes);
  }

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <NotesContext.Provider value={notes}>
      <div className="main">
        <SideBar />
        <Switch>
          <UserRoute
            exact
            path="/n/:id"
            render={({ match }) => (
              <Dashboard
                note={notes?.find((note) => note._id === match.params.id)}
              />
            )}
          />
          <UserRoute exact path="/*" render={() => <Dashboard />} />
        </Switch>
      </div>
    </NotesContext.Provider>
  );
};

export default Application;
