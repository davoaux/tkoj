import React, { useState } from 'react';
import { Input, Menu } from 'antd';
import { useHistory } from 'react-router-dom';
import { FileTextOutlined } from '@ant-design/icons';
import { useAuth } from '../context/auth';
import NotesContext from '../context/notes';
import { ApiService } from '../services/apiService';
import { INote } from '../types';

const SideBar: React.FC = () => {
  const [title, setTitle] = useState('');
  const history = useHistory();
  const { user } = useAuth();

  const handleCreateNote = async () => {
    const note = await new ApiService().createNote({
      title,
      userId: user?._id,
    } as INote);

    if (!note) console.log('Error creating note');
    else console.log('Note saved');

    history.push(`/n/${note?._id}`);
    window.location.reload();
  };

  return (
    <NotesContext.Consumer>
      {(notes) => (
        <>
          <div
            style={{
              backgroundColor: 'white',
              borderRight: '1px solid #F0F0F0',
            }}
          >
            <Input
              placeholder="Create new note"
              style={{
                margin: '10px 0 7px 5px',
                width: '180px',
                left: '4px',
                textAlign: 'center',
              }}
              onChange={(e) => setTitle(e.target.value)}
              onPressEnter={handleCreateNote}
            />
          </div>
          <Menu
            mode="inline"
            defaultOpenKeys={['notes']}
            style={{ height: '100%' }}
          >
            <Menu.SubMenu key="notes" title="Notes" icon={<FileTextOutlined />}>
              {notes.map((note) => (
                <Menu.Item
                  key={note._id}
                  onClick={({ key }) => history.push(`/n/${key}`)}
                >
                  {note.title}
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          </Menu>
        </>
      )}
    </NotesContext.Consumer>
  );
};

export default SideBar;
