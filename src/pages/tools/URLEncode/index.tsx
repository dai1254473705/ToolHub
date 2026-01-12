/**
 * URL 编解码工具
 */
import React, { useState } from 'react';
import { Card, Row, Col, Typography, Input, Button, message, Space, Tabs } from 'antd';
import { CopyOutlined, SwapOutlined, ClearOutlined } from '@ant-design/icons';
import './index.less';

const { Title, Text } = Typography;
const { TextArea } = Input;

const URLEncode: React.FC = () => {
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
      <Title level={2}>URL 编解码</Title>
      <Text type="secondary">URL 编码和解码，处理特殊字符和中文</Text>

      <Card className="tool-card" bordered={false}>
        <Tabs
          activeKey={mode}
          onChange={(key) => setMode(key as 'encode' | 'decode')}
          items={[
            {
              key: 'encode',
              label: '编码',
            },
            {
              key: 'decode',
              label: '解码',
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
                placeholder={mode === 'encode' ? '请输入要编码的文本' : '请输入 URL 编码字符串'}
                rows={10}
                allowClear
              />
            </div>
          </Col>

          <Col xs={24} md={12}>
            <div className="output-section">
              <div className="section-header">
                <Text strong>输出结果</Text>
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
                placeholder={mode === 'encode' ? 'URL 编码结果' : '解码结果'}
                rows={10}
                className="url-output"
              />
            </div>
          </Col>
        </Row>

        <div className="action-section">
          <Button type="primary" size="large" onClick={handleProcess} block>
            {mode === 'encode' ? '编码' : '解码'}
          </Button>
        </div>
      </Card>

      <Card className="info-card" bordered={false}>
        <Title level={4}>什么是 URL 编码？</Title>
        <Text>
          URL 编码（URL Encoding）是一种将字符转换为 URL 安全格式的编码方式。
          它使用 % 后跟两位十六进制数来表示特殊字符。
        </Text>
        <Title level={4} style={{ marginTop: 16 }}>
          为什么需要 URL 编码？
        </Title>
        <ul>
          <li>URL 只能包含 ASCII 字符（0-127）</li>
          <li>某些字符在 URL 中有特殊含义（如 ?、&、= 等）</li>
          <li>中文等非 ASCII 字符需要编码才能在 URL 中传输</li>
        </ul>
        <Title level={4} style={{ marginTop: 16 }}>
          常见编码示例
        </Title>
        <ul>
          <li>空格 → %20 或 +</li>
          <li>中文"你好" → %E4%BD%A0%E5%A5%BD</li>
          <li>& → %26</li>
          <li>= → %3D</li>
          <li>? → %3F</li>
        </ul>
        <Title level={4} style={{ marginTop: 16 }}>
          使用场景
        </Title>
        <ul>
          <li>URL 参数传递</li>
          <li>表单数据提交</li>
          <li>AJAX 请求</li>
          <li>处理包含特殊字符的文件名</li>
        </ul>
      </Card>
    </div>
  );
};

export default URLEncode;
