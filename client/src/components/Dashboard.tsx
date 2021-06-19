import React, { useEffect, useState } from 'react';
import { Col, notification, Row } from 'antd';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { Note, TagAction } from '../types';
import Editor from './Editor';
import Preview from './Preview';
import { ApiRequests } from '../http/requests';

interface Props {
  note?: Note;
  updateNotesState: Function;
}

const Dashboard: React.FC<Props> = (props: Props) => {
  const [note, setNote] = useState<Note>({} as Note);
  const history = useHistory();
  const { user } = useAuth();

  useEffect(() => {
    if (props.note) setNote(props.note);
    else setNote({ user_id: user?._id } as Note);
  }, [props.note]);

  const handleContentChange = (content: string) => setNote({ ...note, content });

  const handleTitleChange = (title: string) => setNote({ ...note, title });

  const handleTagChange = (tag: string, action: TagAction) => {
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
    props.updateNotesState(note);
  };

  const handleDeleteNote = async (note: Note): Promise<void> => {
    const deleted = await new ApiRequests().deleteNote(note);

    if (!deleted) {
      return notification['error']({ message: 'Error deleting note' });
    }

    history.push('/');
    window.location.reload();
  };

  return (
    <Row style={{ height: '100%' }}>
      <Col xs={24} sm={24} md={12}>
        <Editor
          note={note}
          onTitleChange={handleTitleChange}
          onContentChange={handleContentChange}
          onTagChange={handleTagChange}
          onSubmit={handleSubmit}
          onDeleteNote={handleDeleteNote}
        />
      </Col>
      <Col xs={0} sm={0} md={12} id="preview-container">
        <Preview input={`# ${note.title || ''}\n${note.content || ''}`} />
      </Col>
    </Row>
  );
};

export default Dashboard;
