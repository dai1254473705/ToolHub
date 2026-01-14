/**
 * 哈希计算工具
 */
import React, { useState } from 'react';
import { Card, Row, Col, Typography, Input, Button, message, Space, Select } from 'antd';
import { CopyOutlined, ThunderboltOutlined, ClearOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import './index.less';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

type HashAlgorithm = 'md5' | 'sha-1' | 'sha-256' | 'sha-512';

const HashTool: React.FC = () => {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [algorithm, setAlgorithm] = useState<HashAlgorithm>('sha-256');

  // 计算哈希值
  const handleHash = async () => {
    if (!input.trim()) {
      message.warning(t('tools.hash.messages.inputEmpty'));
      return;
    }

    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(input);
      const hashBuffer = await crypto.subtle.digest(algorithm, data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
      setOutput(hashHex);
      message.success(t('tools.hash.messages.success'));
    } catch (error) {
      message.error(t('tools.hash.messages.error'));
    }
  };

  // 清空
  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  // 复制
  const handleCopy = () => {
    if (!output) {
      message.warning(t('tools.hash.messages.copyEmpty'));
      return;
    }
    navigator.clipboard.writeText(output);
    message.success(t('tools.hash.messages.copySuccess'));
  };

  return (
    <div className="hash-tool">
      <Title level={2}>{t('tools.hash.title')}</Title>
      <Text type="secondary">{t('tools.hash.description')}</Text>

      <Card className="tool-card" bordered={false}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Text strong>{t('tools.hash.algorithm')}</Text>
            <Select
              value={algorithm}
              onChange={setAlgorithm}
              style={{ width: '100%', marginTop: 8 }}
              size="large"
            >
              <Option value="md5">MD5 (128 位)</Option>
              <Option value="sha-1">SHA-1 (160 位)</Option>
              <Option value="sha-256">SHA-256 (256 位)</Option>
              <Option value="sha-512">SHA-512 (512 位)</Option>
            </Select>
          </div>

          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <div className="input-section">
                <div className="section-header">
                  <Text strong>{t('tools.hash.input')}</Text>
                  <Button size="small" icon={<ClearOutlined />} onClick={handleClear}>
                    {t('common.clear')}
                  </Button>
                </div>
                <TextArea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t('tools.hash.inputPlaceholder')}
                  rows={10}
                  allowClear
                />
              </div>
            </Col>

            <Col xs={24} md={12}>
              <div className="output-section">
                <div className="section-header">
                  <Text strong>{t('tools.hash.output')}</Text>
                  <Button size="small" icon={<CopyOutlined />} onClick={handleCopy}>
                    {t('common.copy')}
                  </Button>
                </div>
                <TextArea
                  value={output}
                  readOnly
                  placeholder={t('tools.hash.outputPlaceholder')}
                  rows={10}
                  className="hash-output"
                />
              </div>
            </Col>
          </Row>

          <Button type="primary" size="large" onClick={handleHash} block icon={<ThunderboltOutlined />}>
            {t('tools.hash.calculate')}
          </Button>
        </Space>
      </Card>

      <Card className="info-card" bordered={false}>
        <Title level={4}>{t('tools.hash.info.what.title')}</Title>
        <Text>
          {t('tools.hash.info.what.content')}
        </Text>
        <ul>
          <li>
            <Text strong>{t('tools.hash.info.features.0').split('：')[0]}：</Text>{t('tools.hash.info.features.0').split('：')[1]}
          </li>
          <li>
            <Text strong>{t('tools.hash.info.features.1').split('：')[0]}：</Text>{t('tools.hash.info.features.1').split('：')[1]}
          </li>
          <li>
            <Text strong>{t('tools.hash.info.features.2').split('：')[0]}：</Text>{t('tools.hash.info.features.2').split('：')[1]}
          </li>
          <li>
            <Text strong>{t('tools.hash.info.features.3').split('：')[0]}：</Text>{t('tools.hash.info.features.3').split('：')[1]}
          </li>
          <li>
            <Text strong>{t('tools.hash.info.features.4').split('：')[0]}：</Text>{t('tools.hash.info.features.4').split('：')[1]}
          </li>
        </ul>
        <Title level={4} style={{ marginTop: 16 }}>
          {t('tools.hash.info.algorithms.title')}
        </Title>
        <ul>
          <li>{t('tools.hash.info.algorithms.0')}</li>
          <li>{t('tools.hash.info.algorithms.1')}</li>
          <li>{t('tools.hash.info.algorithms.2')}</li>
          <li>{t('tools.hash.info.algorithms.3')}</li>
        </ul>
        <Title level={4} style={{ marginTop: 16 }}>
          {t('tools.hash.info.usage.title')}
        </Title>
        <ul>
          <li>{t('tools.hash.info.usage.list.0')}</li>
          <li>{t('tools.hash.info.usage.list.1')}</li>
          <li>{t('tools.hash.info.usage.list.2')}</li>
          <li>{t('tools.hash.info.usage.list.3')}</li>
          <li>{t('tools.hash.info.usage.list.4')}</li>
        </ul>
      </Card>
    </div>
  );
};

export default HashTool;
