import React, { useState } from 'react';
import { Input, Menu, Modal, notification } from 'antd';
import { useHistory } from 'react-router-dom';
import { FileTextOutlined, PlusOutlined } from '@ant-design/icons';
import { useAuth } from '../context/auth';
import NotesContext from '../context/notes';
import { INote } from '../types';
import { ApiRequests } from '../http/requests';

const SideBar: React.FC = () => {
  const [title, setTitle] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalError, setModalError] = useState(false);
  const history = useHistory();
  const { user } = useAuth();
  const { Item, SubMenu } = Menu;

  const hideModal = () => {
    setIsModalVisible(false);
    setModalError(false);
  };
  const showModal = () => setIsModalVisible(true);

  async function handleCreateNote() {
    if (!title) return setModalError(true);
    const api = new ApiRequests();
    const note = await api.createNote({ title, userId: user?._id } as INote);
    if (!note) {
      return notification['error']({ message: 'Error creating a new note' });
    }
    history.push(`/n/${note?._id}`);
    window.location.reload();
  }

  return (
    <NotesContext.Consumer>
      {(notes) => (
        <Menu mode="inline" defaultOpenKeys={['notes']} style={{ height: '100%' }}>
          <Item id="sb-item-create" title="Create note" onClick={showModal}>
            <PlusOutlined />
            Create note
          </Item>
          <Modal
            title="Create note"
            visible={isModalVisible}
            onOk={handleCreateNote}
            onCancel={hideModal}
          >
            {modalError && <p style={{ color: '#ff4d4f' }}>Title required</p>}
            <Input
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              onPressEnter={handleCreateNote}
            />
          </Modal>
          <div id="sidebar-sep"></div>
          <SubMenu key="notes" title="Notes" icon={<FileTextOutlined />}>
            {notes.map((note) => (
              <Item key={note._id} onClick={({ key }) => history.push(`/n/${key}`)}>
                {note.title}
              </Item>
            ))}
          </SubMenu>
        </Menu>
      )}
    </NotesContext.Consumer>
  );
};

export default SideBar;
