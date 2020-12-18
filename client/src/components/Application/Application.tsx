import React, { useEffect, useState } from 'react';
import { Switch } from 'react-router-dom';
import UserRoute from '../../routes/UserRoute';
import { ApiService } from '../../services/apiService';
import { INote } from '../../types';
import Dashboard from '../Dashboard/Dashboard';
import NavBar from '../layout/NavBar/NavBar';
import SideBar from '../layout/SideBar/SideBar';
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
    <div className="main">
      <NavBar />
      <SideBar notes={notes} />
      <Switch>
        <UserRoute
          exact
          path="/n/:id"
          render={({ match }) => (
            <Dashboard
              note={notes.find((note) => note._id === match.params.id)}
            />
          )}
        />
        <UserRoute exact path="/*" render={() => <Dashboard />} />
      </Switch>
    </div>
  );
};

export default Application;
