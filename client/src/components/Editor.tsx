import React, { FormEvent, useEffect, useState } from 'react';
import { ApiService } from '../services/apiService';
import { INote } from '../types';

interface EditorProps {
  note: INote | undefined;
}

const Editor: React.FC<EditorProps> = (props: EditorProps) => {
  const [note, setNote] = useState<INote>({} as INote);
  const api = new ApiService();

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
  }, [props.note]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (note.title == '' || note.content == '')
      return console.log('Missing fields');

    // TODO if editing existing note
    const response = await api.updateNote(note);
    if (!response) return console.log('update failed');

    return console.log('update went ok');
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
      </form>
    </>
  );
};

export default Editor;
