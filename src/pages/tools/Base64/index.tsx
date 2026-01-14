/**
 * Base64 编解码工具
 */
import React, { useState } from 'react';
import { Card, Row, Col, Typography, Input, Button, message, Tabs, Space } from 'antd';
import { CopyOutlined, SwapOutlined, ClearOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import './index.less';

const { Title, Text } = Typography;
const { TextArea } = Input;

const Base64: React.FC = () => {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  // 编码
  const handleEncode = () => {
    if (!input.trim()) {
      message.warning(t('tools.base64.messages.inputEmpty.encode'));
      return;
    }

    try {
      // 使用 TextEncoder 处理 Unicode 字符
      const encoder = new TextEncoder();
      const data = encoder.encode(input);
      const base64 = btoa(String.fromCharCode(...data));
      setOutput(base64);
      message.success(t('tools.base64.messages.encodeSuccess'));
    } catch (error) {
      message.error(t('tools.base64.messages.encodeError', { error: error instanceof Error ? error.message : '未知错误' }));
    }
  };

  // 解码
  const handleDecode = () => {
    if (!input.trim()) {
      message.warning(t('tools.base64.messages.inputEmpty.decode'));
      return;
    }

    try {
      // 使用 TextDecoder 处理 Unicode 字符
      const binaryString = atob(input);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const decoder = new TextDecoder();
      setOutput(decoder.decode(bytes));
      message.success(t('tools.base64.messages.decodeSuccess'));
    } catch (error) {
      message.error(t('tools.base64.messages.decodeError', { error: error instanceof Error ? error.message : t('tools.base64.messages.decodeErrorDefault') }));
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
      message.warning(t('tools.base64.messages.copyEmpty'));
      return;
    }

    navigator.clipboard.writeText(output).then(() => {
      message.success(t('tools.base64.messages.copySuccess'));
    });
  };

  // 交换输入输出
  const handleSwap = () => {
    setInput(output);
    setOutput('');
    setMode(mode === 'encode' ? 'decode' : 'encode');
  };

  // 实时处理
  const handleInputChange = (value: string) => {
    setInput(value);
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
    <div className="base64-tool">
      <Title level={2}>{t('tools.base64.title')}</Title>
      <Text type="secondary">{t('tools.base64.description')}</Text>

      <Card className="tool-card" bordered={false}>
        <Tabs
          activeKey={mode}
          onChange={(key) => setMode(key as 'encode' | 'decode')}
          items={[
            {
              key: 'encode',
              label: t('tools.base64.encode'),
            },
            {
              key: 'decode',
              label: t('tools.base64.decode'),
            },
          ]}
        />

        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <div className="input-section">
              <div className="section-header">
                <Text strong>{t('tools.base64.input')}</Text>
                <Button size="small" icon={<ClearOutlined />} onClick={handleClear}>
                  {t('common.clear')}
                </Button>
              </div>
              <TextArea
                value={input}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder={mode === 'encode' ? t('tools.base64.inputPlaceholder.encode') : t('tools.base64.inputPlaceholder.decode')}
                rows={10}
                allowClear
              />
            </div>
          </Col>

          <Col xs={24} md={12}>
            <div className="output-section">
              <div className="section-header">
                <Text strong>{t('tools.base64.output')}</Text>
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
                placeholder={mode === 'encode' ? t('tools.base64.outputPlaceholder.encode') : t('tools.base64.outputPlaceholder.decode')}
                rows={10}
              />
            </div>
          </Col>
        </Row>

        <div className="action-section">
          <Button type="primary" size="large" onClick={handleProcess} block>
            {mode === 'encode' ? t('tools.base64.encode') : t('tools.base64.decode')}
          </Button>
        </div>
      </Card>

      <Card className="info-card" bordered={false}>
        <Title level={4}>{t('tools.base64.info.what.title')}</Title>
        <Text>
          {t('tools.base64.info.what.content')}
        </Text>
        <Title level={4} style={{ marginTop: 16 }}>
          {t('tools.base64.info.features.title')}
        </Title>
        <ul>
          <li>{t('tools.base64.info.features.list.0')}</li>
          <li>{t('tools.base64.info.features.list.1')}</li>
          <li>{t('tools.base64.info.features.list.2')}</li>
          <li>{t('tools.base64.info.features.list.3')}</li>
        </ul>
      </Card>
    </div>
  );
};

export default Base64;
