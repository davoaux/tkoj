import { SearchOutlined } from '@ant-design/icons';
import { AutoComplete } from 'antd';
import React, { useState } from 'react';
import { Note } from '../../types';

interface Props {
  notes: Note[];
  setNote: Function;
}

const NoteSearch: React.FC<Props> = ({ notes, setNote }) => {
  const [search, setSearch] = useState('');

  const selectNote = (value: string) => {
    const note = notes.find((note) => note.title == value);
    setNote(note);
  }

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center' }}>
      <AutoComplete
        style={{ width: 300, order: 2 }}
        placeholder="Search note..."
        bordered={false}
        value={search}
        options={notes.map((note) => ({ value: note.title }))}
        filterOption={true}
        onChange={(value) => setSearch(value)}
        onSelect={selectNote}
      />
      <SearchOutlined style={{ fontSize: '1.4rem' }} />
    </div>
  );
};

export default NoteSearch;
