import React, { useEffect, useState } from 'react';
import { INote } from '../../types';
import Editor from '../Editor/Editor';
import Preview from '../Preview/Preview';
import './Dashboard.css';

interface DashboardProps {
  note?: INote | undefined;
}

const Dashboard: React.FC<DashboardProps> = (props: DashboardProps) => {
  const [note, setNote] = useState<INote>({} as INote);

  useEffect(() => {
    if (props.note) setNote(props.note);
    else setNote({} as INote);
  }, [props.note]);

  const handleContentChange = (content: string): void =>
    setNote({ ...note, content });

  const handleTitleChange = (title: string): void =>
    setNote({ ...note, title });

  return (
    <div className="dashboard">
      <Editor
        note={note}
        onTitleChange={handleTitleChange}
        onContentChange={handleContentChange}
      />
      <Preview content={note.content} />
    </div>
  );
};

export default Dashboard;
