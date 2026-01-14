/**
 * URL 编解码工具
 */
import React, { useState } from 'react';
import { Card, Row, Col, Typography, Input, Button, message, Space, Tabs } from 'antd';
import { CopyOutlined, SwapOutlined, ClearOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import './index.less';

const { Title, Text } = Typography;
const { TextArea } = Input;

const URLEncode: React.FC = () => {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  // URL 编码
  const handleEncode = () => {
    if (!input.trim()) {
      message.warning('请输入要编码的内容');
      return;
    }

    try {
      const encoded = encodeURIComponent(input);
      setOutput(encoded);
      message.success('编码成功');
    } catch (error) {
      message.error('编码失败');
    }
  };

  // URL 解码
  const handleDecode = () => {
    if (!input.trim()) {
      message.warning('请输入要解码的内容');
      return;
    }

    try {
      const decoded = decodeURIComponent(input);
      setOutput(decoded);
      message.success('解码成功');
    } catch (error) {
      message.error('解码失败，请确保输入的是有效的 URL 编码字符串');
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
      message.warning('没有可复制的内容');
      return;
    }
    navigator.clipboard.writeText(output);
    message.success('已复制到剪贴板');
  };

  // 交换输入输出
  const handleSwap = () => {
    setInput(output);
    setOutput('');
    setMode(mode === 'encode' ? 'decode' : 'encode');
  };

  // 执行当前模式
  const handleProcess = () => {
    if (mode === 'encode') {
      handleEncode();
    } else {
      handleDecode();
    }
  };

  return (
    <div className="url-encode-tool">
      <Title level={2}>{t('tools.urlEncode.title')}</Title>
      <Text type="secondary">{t('tools.urlEncode.description')}</Text>

      <Card className="tool-card" bordered={false}>
        <Tabs
          activeKey={mode}
          onChange={(key) => setMode(key as 'encode' | 'decode')}
          items={[
            {
              key: 'encode',
              label: t('tools.urlEncode.encode'),
            },
            {
              key: 'decode',
              label: t('tools.urlEncode.decode'),
            },
          ]}
        />

        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <div className="input-section">
              <div className="section-header">
                <Text strong>{t('tools.urlEncode.input')}</Text>
                <Button size="small" icon={<ClearOutlined />} onClick={handleClear}>
                  {t('common.clear')}
                </Button>
              </div>
              <TextArea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={mode === 'encode' ? t('tools.urlEncode.inputPlaceholder.encode') : t('tools.urlEncode.inputPlaceholder.decode')}
                rows={10}
                allowClear
              />
            </div>
          </Col>

          <Col xs={24} md={12}>
            <div className="output-section">
              <div className="section-header">
                <Text strong>{t('tools.urlEncode.output')}</Text>
                <Space>
                  <Button size="small" icon={<SwapOutlined />} onClick={handleSwap}>
                    {t('common.swap')}
                  </Button>
                  <Button size="small" icon={<CopyOutlined />} onClick={handleCopy}>
                    {t('common.copy')}
                  </Button>
                </Space>
              </div>
              <TextArea
                value={output}
                readOnly
                placeholder={mode === 'encode' ? t('tools.urlEncode.outputPlaceholder.encode') : t('tools.urlEncode.outputPlaceholder.decode')}
                rows={10}
                className="url-output"
              />
            </div>
          </Col>
        </Row>

        <div className="action-section">
          <Button type="primary" size="large" onClick={handleProcess} block>
            {mode === 'encode' ? t('tools.urlEncode.encode') : t('tools.urlEncode.decode')}
          </Button>
        </div>
      </Card>

      <Card className="info-card" bordered={false}>
        <Title level={4}>{t('tools.urlEncode.info.what.title')}</Title>
        <Text>
          {t('tools.urlEncode.info.what.content')}
        </Text>
        <Title level={4} style={{ marginTop: 16 }}>
          {t('tools.urlEncode.info.why.title')}
        </Title>
        <ul>
          <li>{t('tools.urlEncode.info.why.list.0')}</li>
          <li>{t('tools.urlEncode.info.why.list.1')}</li>
          <li>{t('tools.urlEncode.info.why.list.2')}</li>
        </ul>
        <Title level={4} style={{ marginTop: 16 }}>
          {t('tools.urlEncode.info.examples.title')}
        </Title>
        <ul>
          <li>{t('tools.urlEncode.info.examples.list.0')}</li>
          <li>{t('tools.urlEncode.info.examples.list.1')}</li>
          <li>{t('tools.urlEncode.info.examples.list.2')}</li>
          <li>{t('tools.urlEncode.info.examples.list.3')}</li>
          <li>{t('tools.urlEncode.info.examples.list.4')}</li>
        </ul>
        <Title level={4} style={{ marginTop: 16 }}>
          {t('tools.urlEncode.info.usage.title')}
        </Title>
        <ul>
          <li>{t('tools.urlEncode.info.usage.list.0')}</li>
          <li>{t('tools.urlEncode.info.usage.list.1')}</li>
          <li>{t('tools.urlEncode.info.usage.list.2')}</li>
          <li>{t('tools.urlEncode.info.usage.list.3')}</li>
        </ul>
      </Card>
    </div>
  );
};

export default URLEncode;
