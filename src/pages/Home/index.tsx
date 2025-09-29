import React from 'react';
import { Card, Row, Col, Typography } from 'antd';
import { DatabaseOutlined, LockOutlined, CodeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const Home: React.FC = () => {
  return (
    <div className="page-transition">
      <div className="mb-8">
        <Title level={1}>欢迎使用 ToolHub</Title>
        <Paragraph>一站式在线工具集合，为开发者和数据处理人员提供便捷服务</Paragraph>
      </div>
      
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Card className="tool-card h-full" bordered={false} hoverable>
            <div className="text-center">
              <DatabaseOutlined size={48} className="text-primary mb-4" />
              <Title level={3}>
                <Link to="/data-tools">数据处理</Link>
              </Title>
              <Paragraph>JSON解析、格式化、比对、转换等工具</Paragraph>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card className="tool-card h-full" bordered={false} hoverable>
            <div className="text-center">
              <LockOutlined size={48} className="text-primary mb-4" />
              <Title level={3}>
                <Link to="/encryption-tools">编码加密</Link>
              </Title>
              <Paragraph>编码转换、哈希计算、加密解密工具</Paragraph>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} offset={{ sm: 6, md: 4 }}>
          <Card className="tool-card h-full" bordered={false} hoverable>
            <div className="text-center">
              <CodeOutlined size={48} className="text-primary mb-4" />
              <Title level={3}>
                <Link to="/dev-tools">开发辅助</Link>
              </Title>
              <Paragraph>颜色转换、时间戳转换、UUID生成等工具</Paragraph>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;