import React from 'react';

// temp tags
const tempTags = ['music', 'vim', 'health', 'programming', 'design', 'art'];

const SideBar: React.FC = () => {
  return (
    <div>
      {tempTags.map((tag, index) => (
        <a key={index} href={tag}>
          {tag}
        </a>
      ))}
    </div>
  );
};

export default SideBar;
