import React from 'react';
import { Card, Button, Popconfirm, Tag, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined, LinkOutlined } from '@ant-design/icons';
import type { WebsiteBookmark } from '../../types/website';

interface WebsiteBookmarkCardProps {
  website: WebsiteBookmark;
  onEdit: (website: WebsiteBookmark) => void;
  onDelete: (id: string) => void;
  onDragStart?: React.DragEventHandler<HTMLDivElement>;
  onDragOver?: React.DragEventHandler<HTMLDivElement>;
  onDrop?: React.DragEventHandler<HTMLDivElement>;
}

const WebsiteBookmarkCard: React.FC<WebsiteBookmarkCardProps> = ({
  website,
  onEdit,
  onDelete,
  onDragStart,
  onDragOver,
  onDrop
}) => {
  // 打开网站链接
  const openWebsite = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(website.url, '_blank');
  };

  // 编辑网站收藏
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(website);
  };

  // 删除网站收藏
  const handleDelete = () => {
    onDelete(website.id);
  };

  // 处理拖拽开始
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    if (onDragStart) {
      e.dataTransfer.setData('application/reactflow', website.id);
      onDragStart(e);
    }
  };

  return (
    <Card
      className="website-bookmark-card"
      hoverable
      onClick={openWebsite}
      actions={[
        <Tooltip key="edit" title="编辑">
          <Button icon={<EditOutlined />} type="text" onClick={handleEdit} />
        </Tooltip>,
        <Popconfirm
          key="delete"
          title="确定要删除这个网站收藏吗？"
          onConfirm={handleDelete}
          okText="确定"
          cancelText="取消"
        >
          <Button icon={<DeleteOutlined />} type="text" danger />
        </Popconfirm>
      ]}
      extra={<LinkOutlined />}
      style={{ cursor: 'pointer' }}
      draggable={!!onDragStart}
      onDragStart={handleDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <div className="website-bookmark-content">
        <div className="website-bookmark-logo">
          {website.logoUrl ? (
            <img 
              src={website.logoUrl} 
              alt={`${website.title} logo`} 
              onError={(e) => {
                // 如果图片加载失败，使用默认图标
                const target = e.target as HTMLImageElement;
                target.src = 'https://via.placeholder.com/40';
              }}
            />
          ) : (
            <div className="website-bookmark-default-logo">
              {website.title.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="website-bookmark-info">
          <h3 className="website-bookmark-title">{website.title}</h3>
          <p className="website-bookmark-url">{new URL(website.url).hostname}</p>
          <Tag color="blue">{website.category}</Tag>
        </div>
      </div>
    </Card>
  );
};

export default WebsiteBookmarkCard;