import React, { useState } from 'react';
import * as Icon from 'react-feather';

export const Nav: React.FC = () => {
  const [search, setSearch] = useState('');

  return (
    <div className="h-20 flex flex-row items-center border-t border-black">
      <Icon.Search size={20} className="ml-7 mr-5" />
      <input
        className="w-3/4 grow focus:outline-none"
        placeholder="Search note..."
        type="text"
        name="title"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="mx-7 hover:bg-neutral-100 hover:rounded p-2">
        <Icon.MoreVertical />
      </div>
    </div>
  );
};
