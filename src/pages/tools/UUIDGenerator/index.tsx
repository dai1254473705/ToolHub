/**
 * UUID 生成器
 */
import React, { useState, useCallback } from 'react';
import { Card, Row, Col, Typography, Input, Button, message, Space, Radio } from 'antd';
import { CopyOutlined, ThunderboltOutlined } from '@ant-design/icons';
import './index.less';

const { Title, Text } = Typography;
const { TextArea } = Input;

const UUIDGenerator: React.FC = () => {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(1);
  const [version, setVersion] = useState<'v4'>('v4');

  // 生成 UUID v4
  const generateUUIDv4 = useCallback(() => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }, []);

  // 生成多个 UUID
  const handleGenerate = () => {
    const newUuids = Array.from({ length: count }, () => generateUUIDv4());
    setUuids(newUuids);
    message.success(`已生成 ${count} 个 UUID`);
  };

  // 复制单个 UUID
  const handleCopyOne = (uuid: string) => {
    navigator.clipboard.writeText(uuid);
    message.success('已复制到剪贴板');
  };

  // 复制所有 UUID
  const handleCopyAll = () => {
    if (uuids.length === 0) {
      message.warning('请先生成 UUID');
      return;
    }
    const text = uuids.join('\n');
    navigator.clipboard.writeText(text);
    message.success(`已复制 ${uuids.length} 个 UUID 到剪贴板`);
  };

  // 清空
  const handleClear = () => {
    setUuids([]);
  };

  return (
    <div className="uuid-generator">
      <Title level={2}>UUID 生成器</Title>
      <Text type="secondary">生成随机 UUID（通用唯一识别码）</Text>

      <Card className="tool-card" bordered={false}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={8}>
            <div className="control-section">
              <Text strong>UUID 版本</Text>
              <Radio.Group value={version} onChange={(e) => setVersion(e.target.value)} style={{ marginTop: 8 }}>
                <Radio value="v4">UUID v4 (随机)</Radio>
              </Radio.Group>
            </div>
          </Col>

          <Col xs={24} sm={8}>
            <div className="control-section">
              <Text strong>生成数量</Text>
              <Input
                type="number"
                min={1}
                max={100}
                value={count}
                onChange={(e) => setCount(Math.max(1, Math.min(100, Number(e.target.value) || 1)))}
                style={{ marginTop: 8 }}
              />
            </div>
          </Col>

          <Col xs={24} sm={8}>
            <Space>
              <Button type="primary" icon={<ThunderboltOutlined />} onClick={handleGenerate}>
                生成
              </Button>
              <Button icon={<CopyOutlined />} onClick={handleCopyAll}>
                复制全部
              </Button>
              <Button onClick={handleClear}>
                清空
              </Button>
            </Space>
          </Col>
        </Row>

        {uuids.length > 0 && (
          <div className="results-section">
            <div className="results-header">
              <Text strong>生成结果 ({uuids.length})</Text>
            </div>
            <div className="results-list">
              {uuids.map((uuid, index) => (
                <div key={index} className="uuid-item">
                  <Text code copyable={{ text: uuid }}>
                    {uuid}
                  </Text>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>

      <Card className="info-card" bordered={false}>
        <Title level={4}>什么是 UUID？</Title>
        <Text>
          UUID（Universally Unique Identifier）是通用唯一识别码，是一个 128 位的标识符。
          在软件开发中，UUID 通常用作唯一的标识符，用于数据库主键、分布式系统中的唯一 ID 等场景。
        </Text>
        <Title level={4} style={{ marginTop: 16 }}>
          UUID 版本
        </Title>
        <ul>
          <li>
            <Text strong>UUID v4:</Text> 基于随机数生成，是最常用的版本。
            它使用 122 位随机数和 6 位固定位，几乎不可能重复。
          </li>
          <li>
            <Text strong>UUID v1:</Text> 基于时间戳和 MAC 地址生成（已弃用，存在隐私问题）。
          </li>
        </ul>
        <Title level={4} style={{ marginTop: 16 }}>
          使用场景
        </Title>
        <ul>
          <li>数据库主键</li>
          <li>分布式系统中的唯一 ID</li>
          <li>会话标识符</li>
          <li>临时文件名</li>
          <li>关联不同系统的数据</li>
        </ul>
      </Card>
    </div>
  );
};

export default UUIDGenerator;
