/**
 * 哈希计算工具
 */
import React, { useState } from 'react';
import { Card, Row, Col, Typography, Input, Button, message, Space, Select } from 'antd';
import { CopyOutlined, ThunderboltOutlined, ClearOutlined } from '@ant-design/icons';
import './index.less';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

type HashAlgorithm = 'md5' | 'sha-1' | 'sha-256' | 'sha-512';

const HashTool: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [algorithm, setAlgorithm] = useState<HashAlgorithm>('sha-256');

  // 计算哈希值
  const handleHash = async () => {
    if (!input.trim()) {
      message.warning('请输入要计算哈希值的内容');
      return;
    }

    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(input);
      const hashBuffer = await crypto.subtle.digest(algorithm, data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
      setOutput(hashHex);
      message.success('哈希值计算成功');
    } catch (error) {
      message.error('计算失败，请重试');
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

  return (
    <div className="hash-tool">
      <Title level={2}>哈希计算</Title>
      <Text type="secondary">计算文本的 MD5、SHA-1、SHA-256、SHA-512 哈希值</Text>

      <Card className="tool-card" bordered={false}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Text strong>选择算法</Text>
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
                  <Text strong>输入内容</Text>
                  <Button size="small" icon={<ClearOutlined />} onClick={handleClear}>
                    清空
                  </Button>
                </div>
                <TextArea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="请输入要计算哈希值的文本"
                  rows={10}
                  allowClear
                />
              </div>
            </Col>

            <Col xs={24} md={12}>
              <div className="output-section">
                <div className="section-header">
                  <Text strong>哈希结果</Text>
                  <Button size="small" icon={<CopyOutlined />} onClick={handleCopy}>
                    复制
                  </Button>
                </div>
                <TextArea
                  value={output}
                  readOnly
                  placeholder="哈希值将显示在这里"
                  rows={10}
                  className="hash-output"
                />
              </div>
            </Col>
          </Row>

          <Button type="primary" size="large" onClick={handleHash} block icon={<ThunderboltOutlined />}>
            计算哈希值
          </Button>
        </Space>
      </Card>

      <Card className="info-card" bordered={false}>
        <Title level={4}>什么是哈希？</Title>
        <Text>
          哈希（Hash）是将任意长度的输入数据通过哈希算法转换为固定长度的输出数据的函数。
          哈希值具有以下特点：
        </Text>
        <ul>
          <li>
            <Text strong>固定长度：</Text>无论输入多长，输出长度固定
          </li>
          <li>
            <Text strong>确定性：</Text>相同输入总是产生相同输出
          </li>
          <li>
            <Text strong>快速计算：</Text>计算哈希值非常快速
          </li>
          <li>
            <Text strong>单向性：</Text>无法从哈希值反推原始数据
          </li>
          <li>
            <Text strong>雪崩效应：</Text>输入微小变化会导致输出巨大变化
          </li>
        </ul>
        <Title level={4} style={{ marginTop: 16 }}>
          常见算法
        </Title>
        <ul>
          <li>
            <Text strong>MD5:</Text> 128 位哈希值，已不推荐用于安全场景（存在碰撞攻击）
          </li>
          <li>
            <Text strong>SHA-1:</Text> 160 位哈希值，也已不推荐使用（存在碰撞攻击）
          </li>
          <li>
            <Text strong>SHA-256:</Text> 256 位哈希值，目前广泛使用的安全哈希算法
          </li>
          <li>
            <Text strong>SHA-512:</Text> 512 位哈希值，安全性更高，适用于高安全要求场景
          </li>
        </ul>
        <Title level={4} style={{ marginTop: 16 }}>
          使用场景
        </Title>
        <ul>
          <li>密码存储（加盐哈希）</li>
          <li>数据完整性校验</li>
          <li>数字签名</li>
          <li>文件校验和</li>
          <li>区块链技术</li>
        </ul>
      </Card>
    </div>
  );
};

export default HashTool;
