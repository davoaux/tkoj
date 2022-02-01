import { Col, notification, Row } from 'antd';
import React from 'react';
import { ApiRequests } from '../http/requests';
import { Note, TagAction } from '../types';
import Editor from './Editor';
import Preview from './Preview';

interface Props {
  note: Note;
  loadNotes: Function;
  setNote: Function;
}

const Dashboard: React.FC<Props> = ({ note, loadNotes, setNote }) => {
  const handleNoteChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;

    setNote({ ...note, [name]: value });
  };

  const handleTagAction = (tag: string, action: TagAction) => {
    const tags = note.tags ?? [];

    if (action == 'CREATE') tags?.push(tag);
    else if (action == 'DELETE') tags?.splice(tags.indexOf(tag), 1);

    setNote({ ...note, tags });
  };

  const handleSubmit = async (note: Note): Promise<void> => {
    const response = await new ApiRequests().updateNote(note);

    if (!response) {
      return notification['error']({ message: 'Error saving note' });
    }

    notification['success']({ message: 'Note saved' });
  };

  const handleNoteDelete = async (note: Note) => {
    const deleted = await new ApiRequests().deleteNote(note);

    if (!deleted) {
      notification['error']({ message: 'Error deleting note' });
      return;
    }

    loadNotes();
    setNote({} as Note);
  };

  return (
    <Row style={{ height: '100%' }}>
      <Col xs={24} sm={24} md={12}>
        <Editor
          note={note}
          handleNoteChange={handleNoteChange}
          handleTagAction={handleTagAction}
          onSubmit={handleSubmit}
          handleNoteDelete={handleNoteDelete}
        />
      </Col>
      <Col xs={0} sm={0} md={12} id="preview-container">
        <Preview note={note} />
      </Col>
    </Row>
  );
};

export default Dashboard;
