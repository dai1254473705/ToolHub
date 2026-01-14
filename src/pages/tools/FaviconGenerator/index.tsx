import React, { useState, useRef } from 'react';
import { Typography, Upload, Button, Card, Row, Col, Empty, Spin, message } from 'antd';
import { UploadOutlined, DownloadOutlined, DeleteOutlined } from '@ant-design/icons';
import type { UploadProps, UploadFile } from 'antd';
import { useTranslation } from 'react-i18next';

const { Title, Text } = Typography;
const { Dragger } = Upload;

// 支持的图片格式
const SUPPORTED_FORMATS = ['image/png', 'image/jpeg', 'image/gif', 'image/x-icon'];
// 需要生成的尺寸
const SIZES = [16, 32, 48, 64, 128, 256];

const FaviconGenerator: React.FC = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [generatedIcons, setGeneratedIcons] = useState<Record<number, string>>({});
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 上传前的检查
  const beforeUpload: UploadProps['beforeUpload'] = (file) => {
    const isValidType = SUPPORTED_FORMATS.includes(file.type);
    if (!isValidType) {
      message.error(t('tools.faviconGenerator.messages.invalidFormat'));
      return Upload.LIST_IGNORE;
    }
    
    // 读取文件并设置到fileList
    const reader = new FileReader();
    reader.readAsDataURL(file as File);
    reader.onload = (e) => {
      const newFile: UploadFile = {
        uid: file.uid,
        name: file.name,
        status: 'done',
        url: e.target?.result as string,
        originFileObj: file
      };
      setFileList([newFile]);
      setGeneratedIcons({}); // 清除之前生成的图标
    };
    
    return false; // 阻止默认上传行为
  };

  // 处理文件列表变化
  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  // 生成favicon图标
  const generateFavicons = () => {
    if (fileList.length === 0 || !canvasRef.current) {
      message.warning(t('tools.faviconGenerator.messages.uploadFirst'));
      return;
    }

    setLoading(true);
    const tempCanvas = canvasRef.current;
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) {
      setLoading(false);
      return;
    }

    const file = fileList[0];
    const img = new Image();
    img.onload = () => {
      const icons: Record<number, string> = {};
      
      // 对每个尺寸生成图标
      SIZES.forEach(size => {
        tempCanvas.width = size;
        tempCanvas.height = size;
        
        // 创建临时画布以处理透明背景
        const tempOffscreenCanvas = document.createElement('canvas');
        const tempOffscreenCtx = tempOffscreenCanvas.getContext('2d');
        if (!tempOffscreenCtx) return;
        
        // 计算正方形区域
        const side = Math.min(img.width, img.height);
        const startX = (img.width - side) / 2;
        const startY = (img.height - side) / 2;
        
        // 绘制裁剪后的图片到临时画布并缩放到目标尺寸
        tempCtx.clearRect(0, 0, size, size);
        tempCtx.drawImage(
          img,
          startX, // 原始图片上的x坐标（居中裁剪）
          startY, // 原始图片上的y坐标（居中裁剪）
          side,   // 原始图片上的宽度
          side,   // 原始图片上的高度
          0, 0,   // 目标画布上的x,y坐标
          size, size // 目标画布上的宽度和高度
        );
        
        // 将画布内容转换为DataURL
        icons[size] = tempCanvas.toDataURL('image/png');
      });
      
      setGeneratedIcons(icons);
      setLoading(false);
      message.success(t('tools.faviconGenerator.messages.success'));
    };
    img.onerror = () => {
      setLoading(false);
      message.error(t('tools.faviconGenerator.messages.loadError'));
    };
    img.src = file.url || '';
  };

  // 下载favicon图标
  const downloadIcon = (size: number) => {
    if (!generatedIcons[size]) return;
    
    const link = document.createElement('a');
    link.href = generatedIcons[size];
    link.download = `favicon-${size}x${size}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 下载所有图标
  const downloadAllIcons = () => {
    if (Object.keys(generatedIcons).length === 0) return;
    
    message.info(t('tools.faviconGenerator.messages.downloadStart'));
    SIZES.forEach(size => {
      setTimeout(() => downloadIcon(size), 100 * SIZES.indexOf(size));
    });
  };

  // 移除上传的文件
  const handleRemove = () => {
    setFileList([]);
    setGeneratedIcons({});
  };

  // 上传组件的配置
  const uploadProps: UploadProps = {
    name: 'image',
    multiple: false,
    beforeUpload,
    onChange: handleChange,
    fileList,
    onRemove: () => {
      handleRemove();
      return true;
    },
    showUploadList: false,
    accept: SUPPORTED_FORMATS.join(',')
  };

  return (
    <div className="page-transition">
      <Title level={2}>{t('tools.faviconGenerator.title')}</Title>
      <div className="text-gray-500 mb-6">{t('tools.faviconGenerator.subtitle')}</div>
      
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title={t('tools.faviconGenerator.upload.title')} className="h-full">
            {fileList.length === 0 ? (
              <Dragger {...uploadProps}>
                <p className="ant-upload-drag-icon">
                  <UploadOutlined />
                </p>
                <p className="ant-upload-text">{t('tools.faviconGenerator.upload.dragText')}</p>
                <p className="ant-upload-hint">
                  {t('tools.faviconGenerator.upload.hint')}
                </p>
              </Dragger>
            ) : (
              <div className="relative">
                <div className="flex flex-col items-center justify-center p-4">
                  <img 
                    src={fileList[0].url || undefined} 
                    alt={t('tools.faviconGenerator.upload.preview')} 
                    className="max-w-full max-h-[250px] object-contain rounded border border-gray-200"
                  />
                  <Text className="mt-2 text-gray-600">{fileList[0].name}</Text>
                  <Button 
                    type="text" 
                    danger 
                    icon={<DeleteOutlined />}
                    onClick={handleRemove}
                    className="mt-1"
                  >
                    {t('tools.faviconGenerator.upload.remove')}
                  </Button>
                </div>
              </div>
            )}
            
            <div className="mt-4 text-center">
              <Button
                type="primary"
                onClick={generateFavicons}
                loading={loading}
                disabled={fileList.length === 0}
              >
                {t('tools.faviconGenerator.upload.generate')}
              </Button>
            </div>
          </Card>
        </Col>
        
        <Col xs={24} lg={12}>
          <Card title={t('tools.faviconGenerator.generated.title')} className="h-full">
            {loading ? (
              <div className="flex items-center justify-center h-80">
                <Spin />
                <Text className="ml-2">{t('tools.faviconGenerator.generated.loading')}</Text>
              </div>
            ) : Object.keys(generatedIcons).length > 0 ? (
              <>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {SIZES.map(size => (
                    <div key={size} className="text-center">
                      <img
                        src={generatedIcons[size] || undefined}
                        alt={`${size}x${size}`}
                        className="border border-gray-300 rounded mx-auto"
                        width={size * 2}
                        height={size * 2}
                      />
                      <Text className="block mt-1">{size}×{size}</Text>
                      <Button
                        size="small"
                        icon={<DownloadOutlined />}
                        className="mt-1"
                        onClick={() => downloadIcon(size)}
                      >
                        {t('tools.faviconGenerator.generated.download')}
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <Button type="primary" onClick={downloadAllIcons}>
                    {t('tools.faviconGenerator.generated.downloadAll')}
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-80">
                <Empty description={t('tools.faviconGenerator.generated.empty')} />
              </div>
            )}
          </Card>
        </Col>
      </Row>
      
      {/* 隐藏的画布用于处理图片 */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default FaviconGenerator;