/**
 * 颜色转换工具
 */
import React, { useState } from 'react';
import { Card, Row, Col, Typography, Input, Button, message, Space } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import './index.less';

const { Title, Text } = Typography;

interface ColorValues {
  hex: string;
  rgb: string;
  hsl: string;
  hsv: string;
}

const ColorConverter: React.FC = () => {
  const [color, setColor] = useState<ColorValues>({
    hex: '#1677ff',
    rgb: 'rgb(22, 119, 255)',
    hsl: 'hsl(211, 100%, 54%)',
    hsv: 'hsv(211, 91%, 100%)',
  });
  const [previewColor, setPreviewColor] = useState('#1677ff');

  // HEX 转 RGB
  const hexToRgb = (hex: string): string => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return 'rgb(0, 0, 0)';
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    return `rgb(${r}, ${g}, ${b})`;
  };

  // RGB 转 HEX
  const rgbToHex = (rgb: string): string => {
    const result = rgb.match(/\d+/g);
    if (!result || result.length < 3) return '#000000';
    const r = parseInt(result[0]);
    const g = parseInt(result[1]);
    const b = parseInt(result[2]);
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  };

  // RGB 转 HSL
  const rgbToHsl = (rgb: string): string => {
    const result = rgb.match(/\d+/g);
    if (!result || result.length < 3) return 'hsl(0, 0%, 0%)';
    let r = parseInt(result[0]) / 255;
    let g = parseInt(result[1]) / 255;
    let b = parseInt(result[2]) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  };

  // RGB 转 HSV
  const rgbToHsv = (rgb: string): string => {
    const result = rgb.match(/\d+/g);
    if (!result || result.length < 3) return 'hsv(0, 0%, 0%)';
    let r = parseInt(result[0]) / 255;
    let g = parseInt(result[1]) / 255;
    let b = parseInt(result[2]) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const d = max - min;
    let h = 0;
    const s = max === 0 ? 0 : d / max;
    const v = max;

    if (max !== min) {
      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return `hsv(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(v * 100)}%)`;
  };

  // 当 HEX 变化时，更新所有颜色格式
  const handleHexChange = (value: string) => {
    const hex = value.startsWith('#') ? value : '#' + value;
    const rgb = hexToRgb(hex);
    const hsl = rgbToHsl(rgb);
    const hsv = rgbToHsv(rgb);

    setColor({ hex, rgb, hsl, hsv });
    setPreviewColor(hex);
  };

  // 当 RGB 变化时，更新所有颜色格式
  const handleRgbChange = (value: string) => {
    const hex = rgbToHex(value);
    const hsl = rgbToHsl(value);
    const hsv = rgbToHsv(value);

    setColor({
      hex,
      rgb: value,
      hsl,
      hsv,
    });
    setPreviewColor(hex);
  };

  // 复制到剪贴板
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      message.success(`已复制 ${label}`);
    });
  };

  return (
    <div className="color-converter">
      <Title level={2}>颜色转换</Title>
      <Text type="secondary">HEX、RGB、HSL、HSV 颜色格式互相转换</Text>

      {/* 颜色预览 */}
      <Card className="preview-card" bordered={false}>
        <div className="color-preview" style={{ backgroundColor: previewColor }}>
          <Text strong style={{ fontSize: 24, color: '#fff', textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
            {previewColor.toUpperCase()}
          </Text>
        </div>
      </Card>

      {/* 颜色格式转换 */}
      <Card className="tool-card" bordered={false}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* HEX */}
          <div className="color-input">
            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} sm={4}>
                <Text strong>HEX</Text>
              </Col>
              <Col xs={24} sm={16}>
                <Input
                  value={color.hex}
                  onChange={(e) => handleHexChange(e.target.value)}
                  placeholder="#1677ff"
                  size="large"
                />
              </Col>
              <Col xs={24} sm={4}>
                <Button
                  icon={<CopyOutlined />}
                  onClick={() => handleCopy(color.hex, 'HEX')}
                  block
                >
                  复制
                </Button>
              </Col>
            </Row>
          </div>

          {/* RGB */}
          <div className="color-input">
            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} sm={4}>
                <Text strong>RGB</Text>
              </Col>
              <Col xs={24} sm={16}>
                <Input
                  value={color.rgb}
                  onChange={(e) => handleRgbChange(e.target.value)}
                  placeholder="rgb(22, 119, 255)"
                  size="large"
                />
              </Col>
              <Col xs={24} sm={4}>
                <Button
                  icon={<CopyOutlined />}
                  onClick={() => handleCopy(color.rgb, 'RGB')}
                  block
                >
                  复制
                </Button>
              </Col>
            </Row>
          </div>

          {/* HSL */}
          <div className="color-input">
            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} sm={4}>
                <Text strong>HSL</Text>
              </Col>
              <Col xs={24} sm={16}>
                <Input
                  value={color.hsl}
                  placeholder="hsl(211, 100%, 54%)"
                  size="large"
                  readOnly
                />
              </Col>
              <Col xs={24} sm={4}>
                <Button
                  icon={<CopyOutlined />}
                  onClick={() => handleCopy(color.hsl, 'HSL')}
                  block
                >
                  复制
                </Button>
              </Col>
            </Row>
          </div>

          {/* HSV */}
          <div className="color-input">
            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} sm={4}>
                <Text strong>HSV</Text>
              </Col>
              <Col xs={24} sm={16}>
                <Input
                  value={color.hsv}
                  placeholder="hsv(211, 91%, 100%)"
                  size="large"
                  readOnly
                />
              </Col>
              <Col xs={24} sm={4}>
                <Button
                  icon={<CopyOutlined />}
                  onClick={() => handleCopy(color.hsv, 'HSV')}
                  block
                >
                  复制
                </Button>
              </Col>
            </Row>
          </div>
        </Space>
      </Card>

      {/* 使用说明 */}
      <Card className="info-card" bordered={false}>
        <Title level={4}>颜色格式说明</Title>
        <div className="format-info">
          <div>
            <Text strong>HEX：</Text>
            <Text>十六进制颜色码，如 #1677ff</Text>
          </div>
          <div>
            <Text strong>RGB：</Text>
            <Text>红绿蓝颜色模式，如 rgb(22, 119, 255)</Text>
          </div>
          <div>
            <Text strong>HSL：</Text>
            <Text>色相、饱和度、亮度，如 hsl(211, 100%, 54%)</Text>
          </div>
          <div>
            <Text strong>HSV：</Text>
            <Text>色相、饱和度、明度，如 hsv(211, 91%, 100%)</Text>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ColorConverter;
