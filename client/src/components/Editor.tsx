import React, { ChangeEvent } from 'react';
import * as Icon from 'react-feather';
import { Note } from '../types';

interface Props {
  note: Note;
  setNote: (note: Note) => void;
}

export const Editor: React.FC<Props> = ({ note, setNote }) => {
  const { title, content } = note;

  const handleNoteChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;
    setNote({ ...note, [name]: value });
  };

  return (
    <div className="basis-1/2 border-r border-black">
      <div className="flex pl-4 h-20 border-b border-black">
        <input
          className="w-3/4 text-2xl font-medium focus:outline-none"
          type="text"
          name="title"
          value={title ?? ''}
          onChange={handleNoteChange}
        />
        <div className="grow inline-flex items-center justify-evenly">
          <div className="hover:bg-neutral-100 hover:rounded p-2">
            <Icon.Tag size={18} />
          </div>
          <div className="hover:bg-neutral-100 hover:rounded p-2">
            <Icon.Save size={18} />
          </div>
          <div className="hover:bg-neutral-100 hover:rounded p-2">
            <Icon.Download size={18} />
          </div>
          <div className="hover:bg-neutral-100 hover:rounded p-2">
            <Icon.Trash size={18} />
          </div>
        </div>
      </div>
      <textarea
        className="font-mono p-4 text-sm w-full h-full resize-none focus:outline-none"
        name="content"
        value={content ?? ''}
        onChange={handleNoteChange}
      />
    </div>
  );
};
