import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { ApiService } from '../services/apiService';
import { INote } from '../types';
import Editor from './Editor';
import Preview from './Preview';

interface DashboardProps {
  note?: INote;
}

const Dashboard: React.FC<DashboardProps> = (props: DashboardProps) => {
  const [note, setNote] = useState<INote>({} as INote);
  const history = useHistory();
  const { user } = useAuth();

  useEffect(() => {
    if (props.note) setNote(props.note);
    else setNote({ userId: user?._id } as INote);
  }, [props.note]);

  const handleContentChange = (content: string): void =>
    setNote({ ...note, content });

  const handleTitleChange = (title: string): void =>
    setNote({ ...note, title });

  const handleSubmit = async (note: INote): Promise<void> => {
    const api = new ApiService();
    const response = await api.updateNote(note);

    if (!response) console.log('save failed');
    else console.log('note saved');

    window.location.reload();
  };

  const handleDeleteNote = async (note: INote): Promise<void> => {
    const deleted = await new ApiService().deleteNote(note);
    if (!deleted) {
      return console.log('Error deleting note');
    } else {
      console.log('Note deleted');

      history.push('/');
      window.location.reload();
    }
  };

  return (
    <Row style={{ height: '100%' }}>
      <Col span={12}>
        <Editor
          note={note}
          onTitleChange={handleTitleChange}
          onContentChange={handleContentChange}
          onSubmit={handleSubmit}
          onDeleteNote={handleDeleteNote}
        />
      </Col>
      <Col span={12} style={{ backgroundColor: 'white' }}>
        <Preview input={`# ${note.title}\n${note.content}`} />
      </Col>
    </Row>
  );
};

export default Dashboard;
