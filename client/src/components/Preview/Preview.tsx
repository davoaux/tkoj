import React from 'react';

interface PreviewProps {
  content: string;
}

const Preview: React.FC<PreviewProps> = (props: PreviewProps) => {
  return (
    <textarea
      className="content"
      name="content"
      value={props.content || ''}
      style={{ height: '751px', width: '600px' }}
      readOnly
    />
  );
};

export default Preview;
