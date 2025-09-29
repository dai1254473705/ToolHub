import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const EncryptionTools: React.FC = () => {
  return (
    <div className="page-transition">
      <Title level={2}>编码加密工具</Title>
      <div className="text-gray-500">编码加密工具集合，包括常见编码转换、哈希计算等功能</div>
    </div>
  );
};

export default EncryptionTools;