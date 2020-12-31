import React, { FormEvent } from 'react';
import { INote } from '../../types';
import './Editor.css';

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!props.note?.title || props.note.title == '')
      return console.log('TODO title required');

    props.onSubmit(props.note);
  };

  const handleDeleteNote = () => {
    if (props.note !== undefined) props.onDeleteNote(props.note);
  };

  return (
    <>
      <form className="editor" onSubmit={handleSubmit}>
        <div className="editor-header">
          <input
            className="title"
            name="title"
            type="text"
            value={props.note?.title || ''}
            onChange={handleTitleChange}
          />
          <input className="btn" type="submit" value="Save note" />
          <input
            className="btn"
            type="button"
            value="Delete note"
            onClick={handleDeleteNote}
          />
        </div>
        <textarea
          className="content"
          name="content"
          value={props.note?.content || ''}
          onChange={handleContentChange}
        />
      </form>
    </>
  );
};

export default Editor;
