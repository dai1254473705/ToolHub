/**
 * Unicode 转换工具
 */
import React, { useState, useMemo } from 'react';
import { Card, Row, Col, Typography, Input, Button, message, Space, Tabs } from 'antd';
import { CopyOutlined, SwapOutlined, ClearOutlined } from '@ant-design/icons';
import './index.less';

const { Title, Text } = Typography;
const { TextArea } = Input;

const Unicode: React.FC = () => {
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
      return '解码失败：无效的 Unicode 格式';
    }
  }, [input]);

  const output = mode === 'encode' ? encoded : decoded;

  const handleCopy = () => {
    if (!output) {
      message.warning('没有可复制的内容');
      return;
    }
    navigator.clipboard.writeText(output);
    message.success('已复制到剪贴板');
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
      <Title level={2}>Unicode 转换</Title>
      <Text type="secondary">中文和 Unicode 编码互相转换</Text>

      <Card className="tool-card" bordered={false}>
        <Tabs
          activeKey={mode}
          onChange={(key) => setMode(key as 'encode' | 'decode')}
          items={[
            {
              key: 'encode',
              label: '编码（中文 → Unicode）',
            },
            {
              key: 'decode',
              label: '解码（Unicode → 中文）',
            },
          ]}
        />

        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <div className="input-section">
              <div className="section-header">
                <Text strong>输入内容</Text>
                <Button size="small" icon={<ClearOutlined />} onClick={handleClear}>
                  清空
                </Button>
              </div>
              <TextArea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  mode === 'encode'
                    ? '请输入要编码的中文或文本'
                    : '请输入 Unicode 编码，如：\\u4f60\\u597d'
                }
                rows={10}
                allowClear
              />
            </div>
          </Col>

          <Col xs={24} md={12}>
            <div className="output-section">
              <div className="section-header">
                <Text strong>转换结果</Text>
                <Space>
                  <Button size="small" icon={<SwapOutlined />} onClick={handleSwap}>
                    交换
                  </Button>
                  <Button size="small" icon={<CopyOutlined />} onClick={handleCopy}>
                    复制
                  </Button>
                </Space>
              </div>
              <TextArea
                value={output}
                readOnly
                placeholder={mode === 'encode' ? 'Unicode 编码结果' : '解码结果'}
                rows={10}
                className="unicode-output"
              />
            </div>
          </Col>
        </Row>

        {input && mode === 'encode' && (
          <div className="char-info">
            <Text strong>字符分析：</Text>
            {input.split('').map((char, index) => (
              <span key={index} className="char-item">
                "{char}" = \\u{(char.codePointAt(0) || 0).toString(16).padStart(4, '0')} (十进制: {char.codePointAt(0) || 0})
              </span>
            ))}
          </div>
        )}
      </Card>

      <Card className="info-card" bordered={false}>
        <Title level={4}>什么是 Unicode？</Title>
        <Text>
          Unicode 是一种字符编码标准，为世界上的每种语言中的每个字符都设定了统一并且唯一的二进制编码。
          Unicode 编码通常使用 \u 开头，后跟 4 位十六进制数。
        </Text>
        <Title level={4} style={{ marginTop: 16 }}>
          编码示例
        </Title>
        <ul>
          <li>"你" → \u4f60</li>
          <li>"好" → \u597d</li>
          <li>"Hello" → \u0048\u0065\u006c\u006c\u006f</li>
          <li>"😊" → \ud83d\ude0a</li>
        </ul>
        <Title level={4} style={{ marginTop: 16 }}>
          使用场景
        </Title>
        <ul>
          <li>JavaScript 字符串中显示中文</li>
          <li>处理包含中文的配置文件</li>
          <li>调试编码问题</li>
          <li>数据传输和存储</li>
          <li>防止乱码</li>
        </ul>
      </Card>
    </div>
  );
};

export default Unicode;
