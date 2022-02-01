import { Layout } from 'antd';
import React, { useEffect, useState } from 'react';
import Dashboard from '../components/Dashboard';
import Footer from '../components/Footer';
import SideBar from '../components/SideBar';
import { ApiRequests } from '../http/requests';
import { Note } from '../types';

const Application: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [note, setNote] = useState<Note>({} as Note);

  async function loadNotes() {
    const notes = await new ApiRequests().getNotes();
    setNotes(notes);
  }

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <Layout style={{ height: '100%' }}>
      <Layout.Sider width="var(--sidebar-size)" breakpoint="md" collapsedWidth="0" theme="light">
        <SideBar notes={notes} setNote={setNote} loadNotes={loadNotes} />
      </Layout.Sider>
      <Layout>
        <Layout.Content className="app-main-container">
          <Dashboard note={note} loadNotes={loadNotes} setNote={setNote} />
        </Layout.Content>
        <Layout.Footer id="footer">
          <Footer notes={notes} setNote={setNote} />
        </Layout.Footer>
      </Layout>
    </Layout>
  );
};

export default Application;
