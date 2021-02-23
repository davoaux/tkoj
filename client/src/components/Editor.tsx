import React, { useState } from 'react';
import { Divider, Input, notification, Tag } from 'antd';
import { INote } from '../types';
import { DeleteOutlined, SaveOutlined, TagOutlined } from '@ant-design/icons';

interface Props {
  note?: INote;
  onTitleChange: (title: string) => void;
  onContentChange: (content: string) => void;
  onTagChange: (tag: string, add: boolean) => void;
  onSubmit: (note: INote) => Promise<void>;
  onDeleteNote: (note: INote) => Promise<void>;
}

const Editor: React.FC<Props> = (props: Props) => {
  const [tagDivHidden, setTagDivHidden] = useState(true);
  const [newTag, setNewTag] = useState('');
  const { note } = props;

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    props.onTitleChange(e.target.value);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    props.onContentChange(e.target.value);

  const handleAddTag = () => {
    props.onTagChange(newTag, true);
    setNewTag('');
  };

  const handleCloseTag = (tag: string) => props.onTagChange(tag, false);

  function saveNote() {
    if (!note?.title || note.title == '')
      return notification['error']({
        message: 'Error saving note',
        description: 'Title required',
      });
    props.onSubmit(note);
  }

  function deleteNote() {
    if (note !== undefined) props.onDeleteNote(note);
  }

  const toggleTagsDisplay = () => setTagDivHidden(!tagDivHidden);

  return (
    <>
      <div className="editor">
        <div className="editor-header">
          <Input
            bordered={false}
            value={note?.title || ''}
            onChange={handleTitleChange}
          />
          <div id="editor-header-icons">
            <TagOutlined onClick={toggleTagsDisplay} />
            <SaveOutlined onClick={saveNote} />
            <DeleteOutlined onClick={deleteNote} />
          </div>
        </div>
        <div id="tags" className={tagDivHidden ? 'hidden' : ''}>
          {note?.tags?.map((tag, index) => (
            <Tag
              key={index}
              color="#838383"
              closable
              onClose={() => handleCloseTag(tag)}
            >
              {tag}
            </Tag>
          ))}
          <Input
            size="small"
            className="tag-input"
            placeholder="add tag..."
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onPressEnter={handleAddTag}
          />
        </div>
        <Divider />
        <textarea
          className="content"
          name="content"
          value={props.note?.content || ''}
          onChange={handleContentChange}
        />
      </div>
    </>
  );
};

export default Editor;
