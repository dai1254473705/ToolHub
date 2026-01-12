/**
 * 二维码生成器
 */
import React, { useState, useRef } from 'react';
import { Card, Row, Col, Typography, Input, Button, message, Space, Slider } from 'antd';
import { DownloadOutlined, ClearOutlined } from '@ant-design/icons';
import { toPng } from 'html-to-image';
import './index.less';

const { Title, Text } = Typography;

const QRCodeGenerator: React.FC = () => {
  const [text, setText] = useState('');
  const [size, setSize] = useState(200);
  const qrRef = useRef<HTMLDivElement>(null);

  // 生成二维码 URL（使用 QR Server API）
  const getQRCodeURL = () => {
    if (!text.trim()) return '';
    const encodedText = encodeURIComponent(text);
    return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedText}`;
  };

  // 下载二维码
  const handleDownload = async () => {
    if (!text.trim()) {
      message.warning('请输入要生成二维码的内容');
      return;
    }

    if (qrRef.current) {
      try {
        const dataUrl = await toPng(qrRef.current, {
          width: size,
          height: size,
          backgroundColor: '#ffffff',
        });
        const link = document.createElement('a');
        link.download = 'qrcode.png';
        link.href = dataUrl;
        link.click();
        message.success('二维码已下载');
      } catch (error) {
        message.error('下载失败，请重试');
      }
    }
  };

  // 清空
  const handleClear = () => {
    setText('');
  };

  return (
    <div className="qrcode-generator">
      <Title level={2}>二维码生成器</Title>
      <Text type="secondary">将文本、URL 等内容转换为二维码图片</Text>

      <Card className="tool-card" bordered={false}>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <div>
                <Text strong>输入内容</Text>
                <Input.TextArea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="请输入文本或 URL"
                  rows={6}
                  maxLength={500}
                  showCount
                  allowClear
                  style={{ marginTop: 8 }}
                />
              </div>

              <div>
                <Text strong>尺寸: {size}x{size}px</Text>
                <Slider
                  min={100}
                  max={500}
                  step={10}
                  value={size}
                  onChange={setSize}
                  style={{ marginTop: 8 }}
                />
              </div>

              <Space>
                <Button
                  type="primary"
                  icon={<DownloadOutlined />}
                  onClick={handleDownload}
                  disabled={!text.trim()}
                >
                  下载二维码
                </Button>
                <Button icon={<ClearOutlined />} onClick={handleClear}>
                  清空
                </Button>
              </Space>
            </Space>
          </Col>

          <Col xs={24} md={12}>
            <div className="qrcode-preview">
              <Text strong>预览</Text>
              <div className="qrcode-container" style={{ width: size, height: size }}>
                {text.trim() ? (
                  <div ref={qrRef} className="qrcode-image-wrapper">
                    <img
                      src={getQRCodeURL()}
                      alt="QR Code"
                      style={{ width: size, height: size }}
                    />
                  </div>
                ) : (
                  <div className="qrcode-placeholder" style={{ width: size, height: size }}>
                    <Text type="secondary">请输入内容生成二维码</Text>
                  </div>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Card>

      <Card className="info-card" bordered={false}>
        <Title level={4}>什么是二维码？</Title>
        <Text>
          二维码（QR Code）是一种矩阵式二维码符号，由日本 Denso Wave 公司于 1994 年发明。
          它可以存储更多信息，并且具有快速读取、高容错性等特点。
        </Text>
        <Title level={4} style={{ marginTop: 16 }}>
          特点
        </Title>
        <ul>
          <li>
            <Text strong>高容量：</Text>最多可存储 7089 个数字或 4296 个字母
          </li>
          <li>
            <Text strong>容错性：</Text>即使部分损坏仍可读取（支持 L/M/Q/H 四级）
          </li>
          <li>
            <Text strong>快速读取：</Text>全方位识别，从任何角度都能快速扫描
          </li>
          <li>
            <Text strong>支持中文：</Text>可以使用 UTF-8 编码存储中文
          </li>
        </ul>
        <Title level={4} style={{ marginTop: 16 }}>
          使用场景
        </Title>
        <ul>
          <li>产品溯源和防伪</li>
          <li>移动支付</li>
          <li>电子票务</li>
          <li>网址分享</li>
          <li>电子名片</li>
          <li>WiFi 连接分享</li>
        </ul>
      </Card>
    </div>
  );
};

export default QRCodeGenerator;
