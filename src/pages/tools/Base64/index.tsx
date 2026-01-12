/**
 * Base64 编解码工具
 */
import React, { useState } from 'react';
import { Card, Row, Col, Typography, Input, Button, message, Tabs, Space } from 'antd';
import { CopyOutlined, SwapOutlined, ClearOutlined } from '@ant-design/icons';
import './index.less';

const { Title, Text } = Typography;
const { TextArea } = Input;

const Base64: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  // 编码
  const handleEncode = () => {
    if (!input.trim()) {
      message.warning('请输入要编码的内容');
      return;
    }

    try {
      // 使用 TextEncoder 处理 Unicode 字符
      const encoder = new TextEncoder();
      const data = encoder.encode(input);
      const base64 = btoa(String.fromCharCode(...data));
      setOutput(base64);
      message.success('编码成功');
    } catch (error) {
      message.error(`编码失败: ${error instanceof Error ? error.message : '未知错误'}`);
    }
  };

  // 解码
  const handleDecode = () => {
    if (!input.trim()) {
      message.warning('请输入要解码的内容');
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
      message.success('解码成功');
    } catch (error) {
      message.error(`解码失败: ${error instanceof Error ? error.message : '请确保输入的是有效的 Base64 字符串'}`);
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

    navigator.clipboard.writeText(output).then(() => {
      message.success('已复制到剪贴板');
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
      <Title level={2}>Base64 编解码</Title>
      <Text type="secondary">支持中文和 Unicode 字符的 Base64 编码和解码</Text>

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
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder={mode === 'encode' ? '请输入要编码的文本' : '请输入 Base64 字符串'}
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
                placeholder={mode === 'encode' ? 'Base64 编码结果' : '解码结果'}
                rows={10}
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
        <Title level={4}>什么是 Base64？</Title>
        <Text>
          Base64 是一种用 64 个字符来表示任意二进制数据的方法。常用于在 HTTP 环境下传递较长的标识信息。
          使用 Base64 编码可以将二进制数据转换为文本格式，方便在文本协议中传输。
        </Text>
        <Title level={4} style={{ marginTop: 16 }}>
          特点
        </Title>
        <ul>
          <li>将二进制数据转换为 ASCII 字符串</li>
          <li>编码后的数据大小约为原始数据的 4/3</li>
          <li>可以安全地在文本协议中传输</li>
          <li>支持中文和 Unicode 字符</li>
        </ul>
      </Card>
    </div>
  );
};

export default Base64;
