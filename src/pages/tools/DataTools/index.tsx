import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const DataTools: React.FC = () => {
  return (
    <div className="page-transition">
      <Title level={2}>数据处理工具</Title>
      <div className="text-gray-500">数据处理工具集合，包括JSON解析、格式化、比对等功能</div>
    </div>
  );
};

export default DataTools;