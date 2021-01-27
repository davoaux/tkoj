import React from 'react';
import { Divider, Input, notification } from 'antd';
import { INote } from '../types';
import { DeleteOutlined, SaveOutlined } from '@ant-design/icons';

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
      return notification['error']({
        message: 'Error saving note',
        description: 'Title required',
      });

    props.onSubmit(props.note);
  }

  function deleteNote() {
    if (props.note !== undefined) props.onDeleteNote(props.note);
  }

  return (
    <>
      <div className="editor">
        <div className="editor-header">
          <Input
            bordered={false}
            value={props.note?.title || ''}
            onChange={handleTitleChange}
          />
          <div id="editor-header-icons">
            <SaveOutlined onClick={saveNote} />
            <DeleteOutlined onClick={deleteNote} />
          </div>
        </div>
        <Divider />
        <textarea
          className="content"
          name="content"
          value={props.note?.content || ''}
          onChange={handleContentChange}
        />
      </div>
    </>
  );
};

export default Editor;
