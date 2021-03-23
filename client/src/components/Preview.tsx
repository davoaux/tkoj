import React, { useEffect } from 'react';
import marked from 'marked';
import DOMPurify from 'dompurify';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

interface PreviewProps {
  input: string;
}

const Preview: React.FC<PreviewProps> = ({ input }: PreviewProps) => {
  useEffect(() => {
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      pedantic: false,
      sanitizer: (html) => DOMPurify.sanitize(html),
      smartLists: true,
      highlight: (code) => hljs.highlightAuto(code).value,
    });
  }, []);

  const value =
    typeof input === 'undefined' || input === null
      ? { __html: '' }
      : { __html: marked(input) + '<br>' };

  return <div className="preview" dangerouslySetInnerHTML={value} />;
};

export default Preview;
