import React, { useEffect } from 'react';
import marked from 'marked';
import DOMPurify from 'dompurify';

interface PreviewProps {
  input: string;
}

const Preview: React.FC<PreviewProps> = ({ input }: PreviewProps) => {
  useEffect(() => {
    marked.setOptions({
      gfm: true,
      pedantic: false,
      sanitizer: function (html) {
        return DOMPurify.sanitize(html);
      },
      smartLists: true,
    });
  }, []);

  const value =
    typeof input === 'undefined' || input === null
      ? { __html: '' }
      : { __html: marked(input) + '<br>' };

  return <div className="preview" dangerouslySetInnerHTML={value} />;
};

export default Preview;
