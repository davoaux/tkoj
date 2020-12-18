import React, { FormEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { ApiService } from '../../services/apiService';
import { INote } from '../../types';
import './Editor.css';

interface EditorProps {
  note?: INote | undefined;
  onContentChange: (content: string) => void;
  onTitleChange: (title: string) => void;
}

const Editor: React.FC<EditorProps> = (props: EditorProps) => {
  const [note, setNote] = useState<INote>({} as INote);
  const history = useHistory();
  const { user } = useAuth();

  useEffect(() => {
    if (props.note) setNote(props.note);
    else setNote({ userId: user?._id } as INote);
  }, [props.note]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    props.onTitleChange(e.target.value);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    props.onContentChange(e.target.value);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (note.title == '') return console.log('TODO title required');

    const api = new ApiService();
    const response = !note._id
      ? await api.createNote(note)
      : await api.updateNote(note);

    if (!response) console.log('update failed');
    else console.log('note saved');

    // TODO Once created a new note, redirect to the route of the new note
    // ie /n/:id

    window.location.reload();
  }

  async function handleDeleteNote() {
    // TODO ask for confirmation

    const deleted = await new ApiService().deleteNote(note);
    if (!deleted) return console.log('Error deleting note');

    console.log('Note deleted');
    history.push('/');
  }

  return (
    <>
      <form className="editor" onSubmit={handleSubmit}>
        <div className="editor-header">
          <input
            className="title"
            name="title"
            type="text"
            value={note?.title || ''}
            onChange={handleTitleChange}
          />
          <input type="submit" value="Save note" />
          <input type="button" value="Delete note" onClick={handleDeleteNote} />
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
