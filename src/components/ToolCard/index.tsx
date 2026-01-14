/**
 * 工具卡片组件
 */
import React from 'react';
import { Card, Tag, Badge } from 'antd';
import { StarOutlined, StarFilled, FireOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import type { Tool } from '@/constants/tools';
import { favoriteStore } from '@/store';
import { toCamelCase } from '@/utils/string';
import './index.less';

interface ToolCardProps {
  tool: Tool;
  onFavoriteToggle?: (toolId: string) => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, onFavoriteToggle }) => {
  const { t } = useTranslation();
  const isFavorite = favoriteStore.isFavorite(tool.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    favoriteStore.toggleFavorite(tool.id);
    onFavoriteToggle?.(tool.id);
  };

  return (
    <Link to={tool.path} className="tool-card-link">
      <Badge
        count={
          tool.isHot ? (
            <FireOutlined style={{ color: '#ff4d4f' }} />
          ) : tool.isNew ? (
            <ThunderboltOutlined style={{ color: '#52c41a' }} />
          ) : 0
        }
        offset={[-10, 10]}
      >
        <Card
          hoverable
          className="tool-card"
          bordered
          onClick={() => {
            // 记录到最近使用
            import('@/store').then(({ recentStore }) => {
              recentStore.addRecent(tool.id);
            });
          }}
        >
          <div className="tool-card-header">
            <div className="tool-icon-wrapper" style={{ backgroundColor: `${tool.iconColor || '#1677ff'}15`, color: tool.iconColor || '#1677ff' }}>
              {/* 这里应该根据 icon 名称渲染对应的图标组件，暂时用文字代替 */}
              <span className="tool-icon-text">{t(`tools.${toCamelCase(tool.id)}.title`).charAt(0)}</span>
            </div>
            <button
              className={`favorite-btn ${isFavorite ? 'is-favorite' : ''}`}
              onClick={handleFavoriteClick}
            >
              {isFavorite ? <StarFilled /> : <StarOutlined />}
            </button>
          </div>

          <h3 className="tool-name">{t(`tools.${toCamelCase(tool.id)}.title`)}</h3>
          <p className="tool-description">{t(`tools.${toCamelCase(tool.id)}.description`)}</p>

          <div className="tool-tags">
            {tool.tags.slice(0, 3).map((tag) => (
              <Tag key={tag}>
                {tag}
              </Tag>
            ))}
          </div>
        </Card>
      </Badge>
    </Link>
  );
};

export default observer(ToolCard);
