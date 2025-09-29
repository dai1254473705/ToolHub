import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const DevTools: React.FC = () => {
  return (
    <div className="page-transition">
      <Title level={2}>开发辅助工具</Title>
      <div className="text-gray-500">开发辅助工具集合，包括颜色转换、时间戳转换等功能</div>
    </div>
  );
};

export default DevTools;