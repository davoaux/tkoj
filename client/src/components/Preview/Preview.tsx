import React from 'react';
import marked from 'marked';
import DOMPurify from 'dompurify';
// import './Preview.css';

interface PreviewProps {
  input: string;
}

const Preview: React.FC<PreviewProps> = ({ input }: PreviewProps) => {
  const value =
    typeof input === 'undefined' || input === null
      ? { __html: '' }
      : { __html: DOMPurify.sanitize(marked(input)) };

  return (
    <div
      className="preview"
      dangerouslySetInnerHTML={value}
      style={{ height: '100px', padding: '22px' }}
    />
  );
};

export default Preview;
