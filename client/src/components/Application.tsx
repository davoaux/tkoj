import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { Switch } from 'react-router-dom';
import NotesContext from '../context/notes';
import { ApiService } from '../services/apiService';
import { INote } from '../types';
import UserRoute from '../utils/UserRoute';
import Dashboard from './Dashboard';
import SideBar from './SideBar';
import Footer from './Footer';

const Application: React.FC = () => {
  const [notes, setNotes] = useState<INote[]>([]);

  function updateNotesState(note: INote) {
    const updatedNotes = notes.map((n) => {
      if (n._id === note._id) n = note;
      return n;
    });
    setNotes(updatedNotes);
  }

  async function loadNotes() {
    const notes = await new ApiService().getNotes();
    setNotes(notes);
  }

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <NotesContext.Provider value={notes}>
      <Layout style={{ height: '100%' }}>
        <Layout.Sider width="var(--sidebar-size)">
          <SideBar />
        </Layout.Sider>
        <Layout>
          <Layout.Content className="app-main-container">
            <Switch>
              <UserRoute
                exact
                path="/n/:id"
                render={({ match }) => (
                  <Dashboard
                    note={notes?.find((note) => note._id === match.params.id)}
                    updateNotesState={updateNotesState}
                  />
                )}
              />
              <UserRoute
                exact
                path="/*"
                render={() => <Dashboard updateNotesState={updateNotesState} />}
              />
            </Switch>
          </Layout.Content>
          <Layout.Footer id="footer">
            <Footer />
          </Layout.Footer>
        </Layout>
      </Layout>
    </NotesContext.Provider>
  );
};

export default Application;
