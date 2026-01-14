/**
 * Unicode 转换工具
 */
import React, { useState, useMemo } from 'react';
import { Card, Row, Col, Typography, Input, Button, message, Space, Tabs } from 'antd';
import { CopyOutlined, SwapOutlined, ClearOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import './index.less';

const { Title, Text } = Typography;
const { TextArea } = Input;

const Unicode: React.FC = () => {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  // Unicode 编码
  const encoded = useMemo(() => {
    if (!input) return '';
    return input
      .split('')
      .map((char) => {
        const code = char.codePointAt(0) || 0;
        return `\\u${code.toString(16).padStart(4, '0')}`;
      })
      .join('');
  }, [input]);

  // Unicode 解码
  const decoded = useMemo(() => {
    if (!input) return '';
    try {
      return input.replace(/\\u[\dA-Fa-f]{4}/g, (match) => {
        const code = parseInt(match.slice(2), 16);
        return String.fromCodePoint(code);
      });
    } catch {
      return t('tools.unicode.messages.decodeError');
    }
  }, [input, t]);

  const output = mode === 'encode' ? encoded : decoded;

  const handleCopy = () => {
    if (!output) {
      message.warning(t('tools.unicode.messages.copyEmpty'));
      return;
    }
    navigator.clipboard.writeText(output);
    message.success(t('tools.unicode.messages.copySuccess'));
  };

  const handleClear = () => {
    setInput('');
  };

  const handleSwap = () => {
    setInput(output);
    setMode(mode === 'encode' ? 'decode' : 'encode');
  };

  return (
    <div className="unicode-tool">
      <Title level={2}>{t('tools.unicode.title')}</Title>
      <Text type="secondary">{t('tools.unicode.description')}</Text>

      <Card className="tool-card" bordered={false}>
        <Tabs
          activeKey={mode}
          onChange={(key) => setMode(key as 'encode' | 'decode')}
          items={[
            {
              key: 'encode',
              label: t('tools.unicode.tabs.encode'),
            },
            {
              key: 'decode',
              label: t('tools.unicode.tabs.decode'),
            },
          ]}
        />

        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <div className="input-section">
              <div className="section-header">
                <Text strong>{t('tools.unicode.input')}</Text>
                <Button size="small" icon={<ClearOutlined />} onClick={handleClear}>
                  {t('common.clear')}
                </Button>
              </div>
              <TextArea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  mode === 'encode'
                    ? t('tools.unicode.placeholders.encode')
                    : t('tools.unicode.placeholders.decode')
                }
                rows={10}
                allowClear
              />
            </div>
          </Col>

          <Col xs={24} md={12}>
            <div className="output-section">
              <div className="section-header">
                <Text strong>{t('tools.unicode.result')}</Text>
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
                placeholder={mode === 'encode' ? t('tools.unicode.placeholders.encodeResult') : t('tools.unicode.placeholders.decodeResult')}
                rows={10}
                className="unicode-output"
              />
            </div>
          </Col>
        </Row>

        {input && mode === 'encode' && (
          <div className="char-info">
            <Text strong>{t('tools.unicode.analysis')}</Text>
            {input.split('').map((char, index) => (
              <span key={index} className="char-item">
                "{char}" = \\u{(char.codePointAt(0) || 0).toString(16).padStart(4, '0')} (十进制: {char.codePointAt(0) || 0})
              </span>
            ))}
          </div>
        )}
      </Card>

      <Card className="info-card" bordered={false}>
        <Title level={4}>{t('tools.unicode.info.what.title')}</Title>
        <Text>
          {t('tools.unicode.info.what.content')}
        </Text>
        <Title level={4} style={{ marginTop: 16 }}>
          {t('tools.unicode.info.examples.title')}
        </Title>
        <ul>
          <li>"你" → \u4f60</li>
          <li>"好" → \u597d</li>
          <li>"Hello" → \u0048\u0065\u006c\u006c\u006f</li>
          <li>"😊" → \ud83d\ude0a</li>
        </ul>
        <Title level={4} style={{ marginTop: 16 }}>
          {t('tools.unicode.info.usage.title')}
        </Title>
        <ul>
          <li>{t('tools.unicode.info.usage.list.0')}</li>
          <li>{t('tools.unicode.info.usage.list.1')}</li>
          <li>{t('tools.unicode.info.usage.list.2')}</li>
          <li>{t('tools.unicode.info.usage.list.3')}</li>
          <li>{t('tools.unicode.info.usage.list.4')}</li>
        </ul>
      </Card>
    </div>
  );
};

export default Unicode;
