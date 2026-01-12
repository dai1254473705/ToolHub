/**
 * 快捷入口组件
 */
import React, { useEffect } from 'react';
import { Card, Row, Col, Empty } from 'antd';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { getToolById } from '@/constants/tools';
import { recentStore } from '@/store';
import type { Tool } from '@/constants/tools';
import './index.less';

interface QuickAccessProps {
  tools?: string[]; // 工具 ID 列表，如果为空则显示最近使用
  title?: string;
  emptyText?: string;
}

const QuickAccess: React.FC<QuickAccessProps> = ({
  tools,
  title = '快捷入口',
  emptyText = '暂无最近使用的工具',
}) => {
  const [recentTools, setRecentTools] = React.useState<string[]>([]);

  useEffect(() => {
    // 加载最近使用的工具
    const loadRecentTools = async () => {
      await recentStore.loadRecent();
      setRecentTools(recentStore.recentTools);
    };
    loadRecentTools();
  }, []);

  // 如果没有传入 tools，则使用最近使用
  const displayTools = tools || recentTools;

  // 获取工具详情
  const toolsToShow = displayTools
    .map((id) => getToolById(id))
    .filter((tool) => tool !== undefined) as Tool[];

  if (toolsToShow.length === 0) {
    return (
      <Card className="quick-access-card">
        <Empty description={emptyText} image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </Card>
    );
  }

  return (
    <div className="quick-access">
      <h2 className="quick-access-title">{title}</h2>
      <Row gutter={[16, 16]} className="quick-access-grid">
        {toolsToShow.map((tool) => (
          <Col xs={12} sm={8} md={6} lg={4} xl={3} key={tool.id}>
            <div className="quick-access-item">
              <Link to={tool.path} className="quick-access-link">
                <div
                  className="quick-access-icon"
                  style={{
                    background: `linear-gradient(135deg, ${tool.iconColor || '#1677ff'}15 0%, ${
                      tool.iconColor || '#52c41a'
                    }15 100%)`,
                    color: tool.iconColor || '#1677ff',
                  }}
                >
                  {tool.name.charAt(0)}
                </div>
                <span className="quick-access-name">{tool.name}</span>
              </Link>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default observer(QuickAccess);
