/**
 * 图片转 Base64 工具
 */
import React, { useState, useRef } from 'react';
import { Card, Typography, Upload, Button, message, Space, Input, Radio } from 'antd';
import { UploadOutlined, CopyOutlined, ClearOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import './index.less';

const { Title, Text } = Typography;
const { TextArea } = Input;

const ImageBase64: React.FC = () => {
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
      message.warning('没有可复制的内容');
      return;
    }
    navigator.clipboard.writeText(base64);
    message.success('已复制到剪贴板');
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
      <Title level={2}>图片转 Base64</Title>
      <Text type="secondary">将图片转换为 Base64 编码</Text>

      <Card className="tool-card" bordered={false}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Text strong>选择图片</Text>
            <Upload
              accept="image/*"
              showUploadList={false}
              onChange={handleFileChange}
              beforeUpload={() => false}
              customRequest={() => {}}
            >
              <Button icon={<UploadOutlined />}>选择图片</Button>
            </Upload>
            <Text type="secondary" style={{ marginLeft: 12 }}>
              支持 PNG、JPG、GIF、WebP 等格式，最大 5MB
            </Text>
          </div>

          {preview && (
            <>
              <div>
                <Text strong>输出格式</Text>
                <Radio.Group
                  value={format}
                  onChange={(e) => {
                    setFormat(e.target.value);
                    updateBase64(preview);
                  }}
                  style={{ marginTop: 8, marginLeft: 16 }}
                >
                  <Radio value="data-url">Data URL (完整)</Radio>
                  <Radio value="raw">纯 Base64 (无前缀)</Radio>
                </Radio.Group>
              </div>

              <div>
                <Text strong>图片预览</Text>
                <div className="preview-container">
                  <img src={preview} alt="Preview" className="preview-image" />
                </div>
              </div>

              <div>
                <div className="section-header">
                  <Text strong>Base64 结果 ({base64.length.toLocaleString()} 字符)</Text>
                  <Space>
                    <Button size="small" icon={<CopyOutlined />} onClick={handleCopy}>
                      复制
                    </Button>
                    <Button size="small" icon={<ClearOutlined />} onClick={handleClear}>
                      清空
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
        <Title level={4}>什么是 Base64 图片？</Title>
        <Text>
          Base64 是一种用 64 个字符来表示任意二进制数据的方法。
          将图片转换为 Base64 编码后，可以直接嵌入 HTML、CSS 中，无需额外的 HTTP 请求。
        </Text>
        <Title level={4} style={{ marginTop: 16 }}>
          格式说明
        </Title>
        <ul>
          <li>
            <Text strong>Data URL: </Text>
            完整格式，包含<Text code>data:image/png;base64,</Text>前缀，可直接用于 &lt;img&gt; 标签
          </li>
          <li>
            <Text strong>纯 Base64: </Text>
            只包含编码数据，不包含前缀
          </li>
        </ul>
        <Title level={4} style={{ marginTop: 16 }}>
          使用示例
        </Title>
        <div className="code-example">
          <pre>{`<!-- HTML -->
<img src="data:image/png;base64,iVBORwKGgo..." />

<!-- CSS -->
background-image: url(data:image/png;base64,iVBORwKGgo...);`}</pre>
        </div>
        <Title level={4} style={{ marginTop: 16 }}>
          优缺点
        </Title>
        <ul>
          <li>
            <Text type="success">优点：</Text>减少 HTTP 请求、可缓存、简单部署
          </li>
          <li>
            <Text type="warning">缺点：</Text>文件体积增大约 33%、不适合大图片
          </li>
        </ul>
        <Title level={4} style={{ marginTop: 16 }}>
          适用场景
        </Title>
        <ul>
          <li>小图标、Logo</li>
          <li>加载动画</li>
          <li>邮件嵌入图片</li>
          <li>单文件应用</li>
        </ul>
      </Card>
    </div>
  );
};

export default ImageBase64;
