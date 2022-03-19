import React from 'react';
import * as Icon from 'react-feather';

export const Sidebar: React.FC = () => (
  <div className="hidden sm:flex flex-col basis-60 border-r border-black">
    <div className="flex flex-row justify-between items-center min-h-[5rem] px-3 hover:bg-neutral-50 border-b border-black">
      <h1 className="text-2xl font-medium text-gray-600">Notes</h1>
      <Icon.Plus />
    </div>
    <div className="overflow-auto top-20 bottom-[0]">
      <ul>
        {[...Array(30).keys()].map((n) => (
          <li key={n} className="p-2 px-4 hover:bg-neutral-50">
            {`Title ${n + 1}`}
          </li>
        ))}
      </ul>
    </div>
  </div>
);
