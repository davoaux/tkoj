import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { Switch } from 'react-router-dom';
import NotesContext from '../context/notes';
import { Note } from '../types';
import UserRoute from '../utils/UserRoute';
import Dashboard from '../components/Dashboard';
import SideBar from '../components/SideBar';
import Footer from '../components/Footer';
import { ApiRequests } from '../http/requests';

const Application: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  function updateNotesState(note: Note) {
    const updatedNotes = notes.map((n) => {
      if (n._id === note._id) n = note;
      return n;
    });
    setNotes(updatedNotes);
  }

  async function loadNotes() {
    const notes = await new ApiRequests().getNotes();
    setNotes(notes);
  }

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <NotesContext.Provider value={notes}>
      <Layout style={{ height: '100%' }}>
        <Layout.Sider width="var(--sidebar-size)" breakpoint="md" collapsedWidth="0" theme="light">
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
