import React, { FormEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { ApiService } from '../services/apiService';
import { INote } from '../types';

interface EditorProps {
  note?: INote | undefined;
}

const Editor: React.FC<EditorProps> = (props: EditorProps) => {
  const [note, setNote] = useState<INote>({} as INote);
  const history = useHistory();
  const { user } = useAuth();

  const styles = {
    editor: {
      display: 'inline-grid',
    },
    textarea: {
      border: '2px solid #000',
      borderRadius: 0,
      resize: 'none',
    } as React.CSSProperties,
    title: {
      fontSize: '2.5rem',
    },
  };

  useEffect(() => {
    if (props.note !== undefined) setNote(props.note);
    else setNote({ userId: user?._id } as INote);
  }, [props.note]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

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
      <form style={styles.editor} onSubmit={handleSubmit}>
        <input
          name="title"
          type="text"
          value={note?.title || ''}
          onChange={handleChange}
          style={styles.title}
        />
        <textarea
          name="content"
          value={note?.content || ''}
          cols={80}
          rows={20}
          onChange={handleChange}
          style={styles.textarea}
        />
        <input
          name="category"
          type="text"
          value={note?.category || ''}
          readOnly
        />
        <input name="tags" type="text" value="tags here..." readOnly />
        <input type="submit" value="Save note" />
        <input type="button" value="Delete note" onClick={handleDeleteNote} />
      </form>
    </>
  );
};

export default Editor;
