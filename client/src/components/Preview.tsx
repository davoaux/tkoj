import DOMPurify from 'dompurify';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import marked from 'marked';
import React, { useEffect } from 'react';
import { Note } from '../types';

interface PreviewProps {
  note: Note;
}

const Preview: React.FC<PreviewProps> = ({ note }: PreviewProps) => {
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

  const html = { __html: marked(`# ${note.title || ''}\n${note.content || ''}`) };

  return <div className="preview" dangerouslySetInnerHTML={html} />;
};

export default Preview;
