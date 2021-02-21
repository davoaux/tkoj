import React, { useState } from 'react';
import { Divider, Input, notification, Tag } from 'antd';
import { INote } from '../types';
import { DeleteOutlined, SaveOutlined, TagOutlined } from '@ant-design/icons';

interface Props {
  note?: INote;
  onTitleChange: (title: string) => void;
  onContentChange: (content: string) => void;
  onAddTag: (tag: string) => void;
  onCloseTag: (tag: string) => void;
  onSubmit: (note: INote) => Promise<void>;
  onDeleteNote: (note: INote) => Promise<void>;
}

const Editor: React.FC<Props> = (props: Props) => {
  const [tagDivStatus, setTagDisplayStatus] = useState('none');
  const [newTag, setNewTag] = useState('');
  const { note } = props;

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    props.onTitleChange(e.target.value);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    props.onContentChange(e.target.value);

  const handleAddTag = () => {
    props.onAddTag(newTag);
    setNewTag('');
  };

  const handleCloseTag = (tag: string) => {
    props.onCloseTag(tag);
  };

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

  const toggleTagsDisplay = () =>
    setTagDisplayStatus(tagDivStatus != 'none' ? 'none' : '');

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
        <div id="tags" style={{ display: tagDivStatus, marginTop: '15px' }}>
          {note?.tags?.map((tag, index) => (
            <Tag
              key={index}
              color="#262626"
              closable
              onClose={() => handleCloseTag(tag)}
            >
              {tag}
            </Tag>
          ))}
          <Input
            size="small"
            placeholder="add tag..."
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            style={{ maxWidth: '90px', fontSize: '12px', lineHeight: '20px' }}
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
