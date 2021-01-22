import React from 'react';
import { Divider, Input } from 'antd';
import { INote } from '../../types';
import { DeleteOutlined, SaveOutlined } from '@ant-design/icons';
// import './Editor.css';

interface EditorProps {
  note?: INote | undefined;
  onContentChange: (content: string) => void;
  onTitleChange: (title: string) => void;
  onSubmit: (note: INote) => Promise<void>;
  onDeleteNote: (note: INote) => Promise<void>;
}

const Editor: React.FC<EditorProps> = (props: EditorProps) => {
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    props.onTitleChange(e.target.value);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    props.onContentChange(e.target.value);

  function saveNote() {
    if (!props.note?.title || props.note.title == '')
      return console.log('TODO title required');

    props.onSubmit(props.note);
  }

  function deleteNote() {
    if (props.note !== undefined) props.onDeleteNote(props.note);
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          padding: '22px',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            justifyContent: 'space-between',
          }}
        >
          <Input
            bordered={false}
            value={props.note?.title || ''}
            onChange={handleTitleChange}
            style={{ fontSize: '1.4rem' }}
          />
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              fontSize: '1.15rem',
            }}
          >
            <SaveOutlined onClick={saveNote} style={{ margin: '5px' }} />
            <DeleteOutlined onClick={deleteNote} style={{ margin: '5px' }} />
          </div>
        </div>
        <Divider />
        <textarea
          className="content"
          name="content"
          value={props.note?.content || ''}
          onChange={handleContentChange}
          style={{
            height: 'inherit',
            border: 'none',
            resize: 'none',
            backgroundColor: 'transparent',
            fontFamily: 'Courier New',
          }}
        />
      </div>
    </>
  );
};

export default Editor;
