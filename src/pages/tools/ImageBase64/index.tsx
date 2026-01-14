/**
 * 图片转 Base64 工具
 */
import React, { useState, useRef } from 'react';
import { Card, Typography, Upload, Button, message, Space, Input, Radio } from 'antd';
import { UploadOutlined, CopyOutlined, ClearOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { useTranslation } from 'react-i18next';
import './index.less';

const { Title, Text } = Typography;
const { TextArea } = Input;

const ImageBase64: React.FC = () => {
  const { t } = useTranslation();
  const [base64, setBase64] = useState('');
  const [preview, setPreview] = useState('');
  const [format, setFormat] = useState<'data-url' | 'raw'>('data-url');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange: UploadProps['onChange'] = (info) => {
    const file = info.file.originFileObj;
    if (!file) return;

    // 验证文件类型
    if (!file.type.startsWith('image/')) {
      message.error('请选择图片文件');
      return;
    }

    // 验证文件大小（限制 5MB）
    if (file.size > 5 * 1024 * 1024) {
      message.error('图片大小不能超过 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreview(result);
      updateBase64(result);
    };
    reader.readAsDataURL(file);
  };

  const updateBase64 = (dataUrl: string) => {
    if (format === 'data-url') {
      setBase64(dataUrl);
    } else {
      // 移除 data:image/xxx;base64, 前缀
      const base64Content = dataUrl.split(',')[1];
      setBase64(base64Content || '');
    }
  };

  const handleCopy = () => {
    if (!base64) {
      message.warning(t('tools.imageBase64.messages.copyEmpty'));
      return;
    }
    navigator.clipboard.writeText(base64);
    message.success(t('tools.imageBase64.messages.copySuccess'));
  };

  const handleClear = () => {
    setBase64('');
    setPreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="image-base64">
      <Title level={2}>{t('tools.imageBase64.title')}</Title>
      <Text type="secondary">{t('tools.imageBase64.description')}</Text>

      <Card className="tool-card" bordered={false}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Text strong>{t('tools.imageBase64.upload.title')}</Text>
            <Upload
              accept="image/*"
              showUploadList={false}
              onChange={handleFileChange}
              beforeUpload={() => false}
              customRequest={() => {}}
            >
              <Button icon={<UploadOutlined />}>{t('tools.imageBase64.upload.button')}</Button>
            </Upload>
            <Text type="secondary" style={{ marginLeft: 12 }}>
              {t('tools.imageBase64.upload.hint')}
            </Text>
          </div>

          {preview && (
            <>
              <div>
                <Text strong>{t('tools.imageBase64.format.title')}</Text>
                <Radio.Group
                  value={format}
                  onChange={(e) => {
                    setFormat(e.target.value);
                    updateBase64(preview);
                  }}
                  style={{ marginTop: 8, marginLeft: 16 }}
                >
                  <Radio value="data-url">{t('tools.imageBase64.format.dataUrl')}</Radio>
                  <Radio value="raw">{t('tools.imageBase64.format.raw')}</Radio>
                </Radio.Group>
              </div>

              <div>
                <Text strong>{t('tools.imageBase64.preview')}</Text>
                <div className="preview-container">
                  <img src={preview} alt="Preview" className="preview-image" />
                </div>
              </div>

              <div>
                <div className="section-header">
                  <Text strong>{t('tools.imageBase64.output', { length: base64.length.toLocaleString() })}</Text>
                  <Space>
                    <Button size="small" icon={<CopyOutlined />} onClick={handleCopy}>
                      {t('common.copy')}
                    </Button>
                    <Button size="small" icon={<ClearOutlined />} onClick={handleClear}>
                      {t('common.clear')}
                    </Button>
                  </Space>
                </div>
                <TextArea
                  value={base64}
                  readOnly
                  rows={10}
                  className="base64-output"
                />
              </div>
            </>
          )}
        </Space>
      </Card>

      <Card className="info-card" bordered={false}>
        <Title level={4}>{t('tools.imageBase64.info.what.title')}</Title>
        <Text>
          {t('tools.imageBase64.info.what.content')}
        </Text>
        <Title level={4} style={{ marginTop: 16 }}>
          {t('tools.imageBase64.info.formats.title')}
        </Title>
        <ul>
          <li>
            <Text strong>{t('tools.imageBase64.info.formats.dataUrl.label')}</Text>
            {t('tools.imageBase64.info.formats.dataUrl.desc')}
          </li>
          <li>
            <Text strong>{t('tools.imageBase64.info.formats.raw.label')}</Text>
            {t('tools.imageBase64.info.formats.raw.desc')}
          </li>
        </ul>
        <Title level={4} style={{ marginTop: 16 }}>
          {t('tools.imageBase64.info.example.title')}
        </Title>
        <div className="code-example">
          <pre>{`<!-- HTML -->
<img src="data:image/png;base64,iVBORwKGgo..." />

<!-- CSS -->
background-image: url(data:image/png;base64,iVBORwKGgo...);`}</pre>
        </div>
        <Title level={4} style={{ marginTop: 16 }}>
          {t('tools.imageBase64.info.prosCons.title')}
        </Title>
        <ul>
          <li>
            <Text type="success">{t('tools.imageBase64.info.prosCons.pros.label')}</Text>{t('tools.imageBase64.info.prosCons.pros.desc')}
          </li>
          <li>
            <Text type="warning">{t('tools.imageBase64.info.prosCons.cons.label')}</Text>{t('tools.imageBase64.info.prosCons.cons.desc')}
          </li>
        </ul>
        <Title level={4} style={{ marginTop: 16 }}>
          {t('tools.imageBase64.info.usage.title')}
        </Title>
        <ul>
          <li>{t('tools.imageBase64.info.usage.list.0')}</li>
          <li>{t('tools.imageBase64.info.usage.list.1')}</li>
          <li>{t('tools.imageBase64.info.usage.list.2')}</li>
          <li>{t('tools.imageBase64.info.usage.list.3')}</li>
        </ul>
      </Card>
    </div>
  );
};

export default ImageBase64;
