import React, { FormEvent, useContext, useState } from 'react';
import NotesContext from '../../context/notes';
import Logout from './Logout';
import { useHistory } from 'react-router-dom';
import './Footer.css';
import 'antd/dist/antd.css'; // TODO add to the higher component to utilize antd styles
import { AutoComplete } from 'antd';

const Footer: React.FC = () => {
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
    <div>
      <div className="footer">
        <div className="search">
          <form onSubmit={handleSearchSubmit}>
            <AutoComplete
              style={{ width: 300, order: 2 }}
              placeholder="Search note..."
              value={search}
              options={options}
              filterOption={true}
              onChange={(value) => setSearch(value)}
              onSelect={handleSearchSelect}
            />
            <input
              className="material-icons icon"
              style={{
                fontWeight: 'bold',
                fontSize: '1.4rem',
                order: 1,
              }}
              type="button"
              value="search"
            />
          </form>
        </div>
        <div>
          <Logout />
        </div>
      </div>
    </div>
  );
};

export default Footer;
