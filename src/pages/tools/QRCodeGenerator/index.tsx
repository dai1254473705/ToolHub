/**
 * 二维码生成器
 */
import React, { useState, useRef } from 'react';
import { Card, Row, Col, Typography, Input, Button, message, Space, Slider } from 'antd';
import { DownloadOutlined, ClearOutlined } from '@ant-design/icons';
import { toPng } from 'html-to-image';
import { useTranslation } from 'react-i18next';
import './index.less';

const { Title, Text } = Typography;

const QRCodeGenerator: React.FC = () => {
  const { t } = useTranslation();
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
      message.warning(t('tools.qrCodeGenerator.messages.inputEmpty'));
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
        message.success(t('tools.qrCodeGenerator.messages.downloadSuccess'));
      } catch {
        message.error(t('tools.qrCodeGenerator.messages.downloadError'));
      }
    }
  };

  // 清空
  const handleClear = () => {
    setText('');
  };

  return (
    <div className="qrcode-generator">
      <Title level={2}>{t('tools.qrCodeGenerator.title')}</Title>
      <Text type="secondary">{t('tools.qrCodeGenerator.description')}</Text>

      <Card className="tool-card" bordered={false}>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <div>
                <Text strong>{t('tools.qrCodeGenerator.input.label')}</Text>
                <Input.TextArea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder={t('tools.qrCodeGenerator.input.placeholder')}
                  rows={6}
                  maxLength={500}
                  showCount
                  allowClear
                  style={{ marginTop: 8 }}
                />
              </div>

              <div>
                <Text strong>{t('tools.qrCodeGenerator.size', { size })}</Text>
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
                  {t('tools.qrCodeGenerator.download')}
                </Button>
                <Button icon={<ClearOutlined />} onClick={handleClear}>
                  {t('common.clear')}
                </Button>
              </Space>
            </Space>
          </Col>

          <Col xs={24} md={12}>
            <div className="qrcode-preview">
              <Text strong>{t('tools.qrCodeGenerator.preview.title')}</Text>
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
                    <Text type="secondary">{t('tools.qrCodeGenerator.preview.placeholder')}</Text>
                  </div>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Card>

      <Card className="info-card" bordered={false}>
        <Title level={4}>{t('tools.qrCodeGenerator.info.what.title')}</Title>
        <Text>
          {t('tools.qrCodeGenerator.info.what.content')}
        </Text>
        <Title level={4} style={{ marginTop: 16 }}>
          {t('tools.qrCodeGenerator.info.features.title')}
        </Title>
        <ul>
          <li>
            <Text strong>{t('tools.qrCodeGenerator.info.features.list.0').split('：')[0]}：</Text>{t('tools.qrCodeGenerator.info.features.list.0').split('：')[1]}
          </li>
          <li>
            <Text strong>{t('tools.qrCodeGenerator.info.features.list.1').split('：')[0]}：</Text>{t('tools.qrCodeGenerator.info.features.list.1').split('：')[1]}
          </li>
          <li>
            <Text strong>{t('tools.qrCodeGenerator.info.features.list.2').split('：')[0]}：</Text>{t('tools.qrCodeGenerator.info.features.list.2').split('：')[1]}
          </li>
          <li>
            <Text strong>{t('tools.qrCodeGenerator.info.features.list.3').split('：')[0]}：</Text>{t('tools.qrCodeGenerator.info.features.list.3').split('：')[1]}
          </li>
        </ul>
        <Title level={4} style={{ marginTop: 16 }}>
          {t('tools.qrCodeGenerator.info.usage.title')}
        </Title>
        <ul>
          <li>{t('tools.qrCodeGenerator.info.usage.list.0')}</li>
          <li>{t('tools.qrCodeGenerator.info.usage.list.1')}</li>
          <li>{t('tools.qrCodeGenerator.info.usage.list.2')}</li>
          <li>{t('tools.qrCodeGenerator.info.usage.list.3')}</li>
          <li>{t('tools.qrCodeGenerator.info.usage.list.4')}</li>
          <li>{t('tools.qrCodeGenerator.info.usage.list.5')}</li>
        </ul>
      </Card>
    </div>
  );
};

export default QRCodeGenerator;
