import { FileTextOutlined, PlusOutlined } from '@ant-design/icons';
import { Input, Menu, Modal, notification } from 'antd';
import React, { useState } from 'react';
import { useAuth } from '../context/auth';
import { ApiRequests } from '../http/requests';
import { Note } from '../types';

interface Props {
  notes: Note[];
  setNote: Function;
  loadNotes: Function;
}

const SideBar: React.FC<Props> = ({ notes, setNote, loadNotes }) => {
  const [title, setTitle] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalError, setModalError] = useState(false);

  const { user } = useAuth();

  const { Item, SubMenu } = Menu;

  const hideModal = () => {
    setIsModalVisible(false);
    setModalError(false);
    setTitle('');
  };

  const showModal = () => setIsModalVisible(true);

  const handleCreateNote = async () => {
    if (!title) {
      return setModalError(true);
    }

    const note = await new ApiRequests().createNote({
      title,
      user_id: user._id,
    } as Note);

    if (!note) {
      return notification['error']({ message: 'Error creating a new note' });
    }

    setNote(note);
    hideModal();
    loadNotes();
  };

  return (
    <Menu mode="inline" defaultOpenKeys={['notes']} style={{ height: '100%' }}>
      <Item id="sb-item-create" title="Create note" onClick={showModal}>
        <PlusOutlined /> Create note
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onPressEnter={handleCreateNote}
        />
      </Modal>
      <div id="sidebar-sep"></div>
      <SubMenu key="notes" title="Notes" icon={<FileTextOutlined />}>
        {notes.map((note, i) => (
          <Item key={i} onClick={() => setNote(note)}>
            {note.title}
          </Item>
        ))}
      </SubMenu>
    </Menu>
  );
};

export default SideBar;
