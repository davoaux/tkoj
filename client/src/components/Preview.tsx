import React from 'react';
import marked from 'marked';
import DOMPurify from 'dompurify';

interface PreviewProps {
  input: string;
}

const Preview: React.FC<PreviewProps> = ({ input }: PreviewProps) => {
  const value =
    typeof input === 'undefined' || input === null
      ? { __html: '' }
      : { __html: DOMPurify.sanitize(marked(input)) + '<br>' };

  return <div className="preview" dangerouslySetInnerHTML={value} />;
};

export default Preview;
