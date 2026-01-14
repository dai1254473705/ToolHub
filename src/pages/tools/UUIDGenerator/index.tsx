/**
 * UUID 生成器
 */
import React, { useState, useCallback } from 'react';
import { Card, Row, Col, Typography, Input, Button, message, Space, Radio } from 'antd';
import { CopyOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import './index.less';

const { Title, Text } = Typography;

const UUIDGenerator: React.FC = () => {
  const { t } = useTranslation();
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
    message.success(t('tools.uuidGenerator.messages.generated', { count }));
  };

  // 复制所有 UUID
  const handleCopyAll = () => {
    if (uuids.length === 0) {
      message.warning(t('tools.uuidGenerator.messages.empty'));
      return;
    }
    const text = uuids.join('\n');
    navigator.clipboard.writeText(text);
    message.success(t('tools.uuidGenerator.messages.copySuccess', { count: uuids.length }));
  };

  // 清空
  const handleClear = () => {
    setUuids([]);
  };

  return (
    <div className="uuid-generator">
      <Title level={2}>{t('tools.uuidGenerator.title')}</Title>
      <Text type="secondary">{t('tools.uuidGenerator.description')}</Text>

      <Card className="tool-card" bordered={false}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={8}>
            <div className="control-section">
              <Text strong>{t('tools.uuidGenerator.version')}</Text>
              <Radio.Group value={version} onChange={(e) => setVersion(e.target.value)} style={{ marginTop: 8 }}>
                <Radio value="v4">UUID v4 (随机)</Radio>
              </Radio.Group>
            </div>
          </Col>

          <Col xs={24} sm={8}>
            <div className="control-section">
              <Text strong>{t('tools.uuidGenerator.count')}</Text>
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
                {t('tools.uuidGenerator.generate')}
              </Button>
              <Button icon={<CopyOutlined />} onClick={handleCopyAll}>
                {t('tools.uuidGenerator.copyAll')}
              </Button>
              <Button onClick={handleClear}>
                {t('common.clear')}
              </Button>
            </Space>
          </Col>
        </Row>

        {uuids.length > 0 && (
          <div className="results-section">
            <div className="results-header">
              <Text strong>{t('tools.uuidGenerator.results')} ({uuids.length})</Text>
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
        <Title level={4}>{t('tools.uuidGenerator.info.what.title')}</Title>
        <Text>
          {t('tools.uuidGenerator.info.what.content')}
        </Text>
        <Title level={4} style={{ marginTop: 16 }}>
          {t('tools.uuidGenerator.info.versions.title')}
        </Title>
        <ul>
          <li>
            <Text strong>{t('tools.uuidGenerator.info.versions.v4').split(':')[0]}:</Text> {t('tools.uuidGenerator.info.versions.v4').split(':')[1]}
          </li>
          <li>
            <Text strong>{t('tools.uuidGenerator.info.versions.v1').split(':')[0]}:</Text> {t('tools.uuidGenerator.info.versions.v1').split(':')[1]}
          </li>
        </ul>
        <Title level={4} style={{ marginTop: 16 }}>
          {t('tools.uuidGenerator.info.usage.title')}
        </Title>
        <ul>
          <li>{t('tools.uuidGenerator.info.usage.list.0')}</li>
          <li>{t('tools.uuidGenerator.info.usage.list.1')}</li>
          <li>{t('tools.uuidGenerator.info.usage.list.2')}</li>
          <li>{t('tools.uuidGenerator.info.usage.list.3')}</li>
          <li>{t('tools.uuidGenerator.info.usage.list.4')}</li>
        </ul>
      </Card>
    </div>
  );
};

export default UUIDGenerator;
