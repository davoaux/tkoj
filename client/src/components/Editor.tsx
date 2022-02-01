import { DeleteOutlined, DownloadOutlined, SaveOutlined, TagOutlined } from '@ant-design/icons';
import { Divider, Input, Popconfirm, Tag, Tooltip } from 'antd';
import React, { useRef, useState } from 'react';
import { Note, TagAction } from '../types';

interface Props {
  note?: Note;
  handleTagAction: (tag: string, action: TagAction) => void;
  onSubmit: (note: Note) => Promise<void>;
  handleNoteChange: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleNoteDelete: (note: Note) => Promise<void>;
}

const Editor: React.FC<Props> = ({
  note,
  handleTagAction,
  handleNoteChange,
  onSubmit,
  handleNoteDelete,
}) => {
  const [showTags, setShowTags] = useState(false);
  const [newTag, setNewTag] = useState('');
  const exportRef = useRef<HTMLAnchorElement>(null);

  const handleAddTag = () => {
    handleTagAction(newTag, 'CREATE');
    setNewTag('');
  };

  const handleCloseTag = (tag: string) => handleTagAction(tag, 'DELETE');

  const downloadNote = () => {
    if (!note?.title) return;

    const content = `# ${note?.title}\n\n${note?.content}`;
    const fileName = `${note?.title.trim().replaceAll(' ', '-')}.md`;
    const blob = new Blob([content], { type: 'text/markdown' });
    const fileDownloadUrl = URL.createObjectURL(blob);

    if (null != exportRef.current) {
      exportRef.current.href = fileDownloadUrl;
      exportRef.current.download = fileName;
      exportRef.current.click();
    }

    URL.revokeObjectURL(fileDownloadUrl);
  };

  const saveNote = () => {
    if (!note?.title) return;

    onSubmit(note);
  };

  const deleteNote = () => {
    if (note !== undefined && note.title) {
      handleNoteDelete(note);
    }
  };

  return (
    <>
      <div className="editor">
        <div className="editor-header">
          <Input
            bordered={false}
            autoComplete="off"
            name="title"
            value={note?.title || ''}
            onChange={handleNoteChange}
          />
          <div id="editor-header-icons">
            <Tooltip title="Tags">
              <TagOutlined onClick={() => setShowTags(!showTags)} />
            </Tooltip>
            <Tooltip title="Save">
              <SaveOutlined onClick={saveNote} />
            </Tooltip>
            <Tooltip title="Download">
              <DownloadOutlined onClick={downloadNote} />
            </Tooltip>
            <Tooltip title="Delete">
              <Popconfirm title="Are you sure?" onConfirm={deleteNote}>
                <DeleteOutlined />
              </Popconfirm>
            </Tooltip>
          </div>
        </div>
        <a style={{ display: 'none' }} href="" download ref={exportRef}>
          note export
        </a>
        <div id="tags" className={showTags ? '' : 'hidden'}>
          {note?.tags?.map((tag, i) => (
            <Tag key={i} visible closable onClose={() => handleCloseTag(tag)}>
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
          value={note?.content || ''}
          onChange={handleNoteChange}
        />
      </div>
    </>
  );
};

export default Editor;
