import React from 'react';
import marked from 'marked';
import DOMPurify from 'dompurify';
import './Preview.css';

interface PreviewProps {
  content: string;
}

const Preview: React.FC<PreviewProps> = ({ content }: PreviewProps) => {
  const value =
    typeof content === 'undefined' || content === null
      ? { __html: '' }
      : { __html: DOMPurify.sanitize(marked(content)) };

  return <div className="preview" dangerouslySetInnerHTML={value} />;
};

export default Preview;
