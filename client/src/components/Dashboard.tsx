import React, { useEffect, useState } from 'react';
import { Switch } from 'react-router-dom';
import UserRoute from '../routes/UserRoute';
import { ApiService } from '../services/apiService';
import { INote } from '../types';
import Editor from './Editor';
import NavBar from './layout/NavBar';
import SideBar from './layout/SideBar';

const Dashboard: React.FC = () => {
  const [notes, setNotes] = useState<INote[]>([]);

  async function loadNotes() {
    const notes = await new ApiService().getNotes();
    setNotes(notes);
  }

  useEffect(() => {
    loadNotes();
  }, []);

  const styles = {
    marginLeft: '160px',
    position: 'absolute',
  } as React.CSSProperties;

  return (
    <>
      <NavBar />
      <SideBar notes={notes} />
      <Switch>
        <UserRoute
          exact
          path="/n/:id"
          render={({ match }) => (
            <div style={styles}>
              <Editor
                note={notes.find((note) => note._id === match.params.id)}
              />
            </div>
          )}
        />
        <UserRoute
          exact
          path="/*"
          render={() => (
            <div style={styles}>
              <Editor />
            </div>
          )}
        />
      </Switch>
    </>
  );
};

export default Dashboard;
