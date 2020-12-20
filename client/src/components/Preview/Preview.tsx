import React from 'react';
import marked from 'marked';

interface PreviewProps {
  content: string;
}

const Preview: React.FC<PreviewProps> = ({ content }: PreviewProps) => {
  const value =
    typeof content === 'undefined' || content === null
      ? { __html: '' }
      : { __html: marked(content) };

  return (
    <div
      className="content"
      style={{ height: '751px', width: '600px' }}
      dangerouslySetInnerHTML={value}
    />
  );
};

export default Preview;
