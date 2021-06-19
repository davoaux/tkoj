import React, { useRef, useState } from 'react';
import { Divider, Input, Popconfirm, Tag, Tooltip } from 'antd';
import { Note, TagAction } from '../types';
import { DeleteOutlined, DownloadOutlined, SaveOutlined, TagOutlined } from '@ant-design/icons';

interface Props {
  note?: Note;
  onTitleChange: (title: string) => void;
  onContentChange: (content: string) => void;
  onTagChange: (tag: string, action: TagAction) => void;
  onSubmit: (note: Note) => Promise<void>;
  onDeleteNote: (note: Note) => Promise<void>;
}

const Editor: React.FC<Props> = (props: Props) => {
  const [tagDivHidden, setTagDivHidden] = useState(true);
  const [newTag, setNewTag] = useState('');
  const exportAnchorRef = useRef<HTMLAnchorElement>(null);
  const { note } = props;

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    props.onTitleChange(e.target.value);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    props.onContentChange(e.target.value);

  const handleAddTag = () => {
    props.onTagChange(newTag, 'CREATE');
    setNewTag('');
  };

  const handleCloseTag = (tag: string) => props.onTagChange(tag, 'DELETE');

  function downloadNote() {
    if (!note?.title) return;

    const content = `# ${note?.title}\n\n${note?.content}`;
    const fileName = `${note?.title.replaceAll(' ', '-')}.md`;
    const blob = new Blob([content], { type: 'text/markdown' });
    const fileDownloadUrl = URL.createObjectURL(blob);

    if (null != exportAnchorRef.current) {
      exportAnchorRef.current.href = fileDownloadUrl;
      exportAnchorRef.current.download = fileName;
      exportAnchorRef.current.click();
    }

    URL.revokeObjectURL(fileDownloadUrl);
  }

  function saveNote() {
    if (!note?.title) return;

    props.onSubmit(note);
  }

  function deleteNote() {
    if (note !== undefined && note.title) props.onDeleteNote(note);
  }

  const toggleTagsDisplay = () => setTagDivHidden(!tagDivHidden);

  return (
    <>
      <div className="editor">
        <div className="editor-header">
          <Input bordered={false} value={note?.title || ''} onChange={handleTitleChange} />
          <div id="editor-header-icons">
            <Tooltip title="Tags">
              <TagOutlined onClick={toggleTagsDisplay} />
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
        <a style={{ display: 'none' }} href="" download ref={exportAnchorRef}>
          note export
        </a>
        <div id="tags" className={tagDivHidden ? 'hidden' : ''}>
          {note?.tags?.map((tag, index) => (
            <Tag key={index} visible closable onClose={() => handleCloseTag(tag)}>
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
