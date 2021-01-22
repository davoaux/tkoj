import React, { FormEvent, useContext, useState } from 'react';
import { AutoComplete } from 'antd';
import { useHistory } from 'react-router-dom';
import NotesContext from '../../context/notes';
import { SearchOutlined } from '@ant-design/icons';

const NoteSearch: React.FC = () => {
  const [search, setSearch] = useState('');
  const notes = useContext(NotesContext);
  const history = useHistory();

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(search);
    const id = notes.find((note) => note.title == search)?._id;
    if (id) history.push(`/n/${id}`);
  };

  const handleSearchSelect = (value: string) => {
    const id = notes.find((note) => note.title == value)?._id;
    if (id) history.push(`/n/${id}`);
  };

  const options = notes.map((note) => {
    const nObj = {} as { value: string };
    nObj['value'] = note.title;
    return nObj;
  });

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center' }}>
      <AutoComplete
        style={{ width: 300, order: 2 }}
        placeholder="Search note..."
        bordered={false}
        value={search}
        options={options}
        filterOption={true}
        onChange={(value) => setSearch(value)}
        onSelect={handleSearchSelect}
      />
      <SearchOutlined
        style={{ fontSize: '1.4rem' }}
        onClick={handleSearchSubmit}
      />
    </div>
  );
};

export default NoteSearch;
