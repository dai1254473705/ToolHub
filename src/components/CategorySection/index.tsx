/**
 * 分类区块组件
 */
import React from 'react';
import { Row, Col, Typography, Divider, Space } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { getToolsByCategory } from '@/constants/tools';
import type { Category } from '@/constants/categories';
import ToolCard from '@/components/ToolCard';
import './index.less';

const { Title, Text } = Typography;

interface CategorySectionProps {
  category: Category;
  showAll?: boolean;
  maxTools?: number;
}

const CategorySection: React.FC<CategorySectionProps> = ({
  category,
  showAll = false,
  maxTools = 6,
}) => {
  const { t } = useTranslation();
  const tools = getToolsByCategory(category.id);
  const displayTools = showAll ? tools : tools.slice(0, maxTools);
  const hasMore = tools.length > maxTools;

  return (
    <div className="category-section">
      <div className="category-header">
        <Space align="center">
          <div
            className="category-icon"
            style={{ backgroundColor: `${category.color}15`, color: category.color }}
          >
            {/* 这里应该根据 icon 名称渲染对应的图标组件 */}
            <LinkOutlined />
          </div>
          <Title level={3} className="category-title">
            {t(`nav.categories.${category.id}`)}
          </Title>
          <Text type="secondary" className="category-count">
            ({tools.length} {t('common.toolsCount')})
          </Text>
        </Space>
        <Text type="secondary" className="category-description">
          {t(`nav.categories.desc.${category.id}`)}
        </Text>
      </div>

      <Divider className="category-divider" />

      <Row gutter={[16, 16]} className="category-tools">
        {displayTools.map((tool) => (
          <Col xs={24} sm={12} md={8} lg={6} xl={4} key={tool.id}>
            <ToolCard tool={tool} />
          </Col>
        ))}
      </Row>

      {hasMore && !showAll && (
        <div className="category-footer">
          <LinkOutlined /> {t('common.moreTools', { count: tools.length - maxTools, defaultValue: `还有 ${tools.length - maxTools} 个工具...` })}
        </div>
      )}
    </div>
  );
};

export default CategorySection;
