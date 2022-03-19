/* eslint-disable react/no-danger */
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import React, { useEffect } from 'react';
import { Note } from '../types';

interface Props {
  note: Note;
}

export const Preview: React.FC<Props> = ({ note: { title, content } }) => {
  useEffect(() => {
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      pedantic: false,
      sanitizer: (html) => DOMPurify.sanitize(html),
      smartLists: true
    });
  }, []);

  return (
    <div className="basis-1/2 font-markdown">
      <div
        dangerouslySetInnerHTML={{ __html: marked.parse(`# ${title || ''}\n${content || ''}`) }}
      />
    </div>
  );
};
