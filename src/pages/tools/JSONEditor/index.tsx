import React, { useState, useRef, useEffect } from 'react';
import { Card, Divider, Typography, Button, message, Space } from 'antd';
import { CopyOutlined, ClearOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import Editor from '@monaco-editor/react';
import { useTranslation } from 'react-i18next';
import './index.css';

const { Title } = Typography;

const JSONEditor: React.FC = () => {
  const { t } = useTranslation();
  const [jsonInput, setJsonInput] = useState<string>('');
  const [formattedJson, setFormattedJson] = useState<string>('');
  const [isValidJson, setIsValidJson] = useState<boolean | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  // 添加文件输入框的 ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 处理JSON输入变化
  useEffect(() => {
    if (!jsonInput.trim()) {
      setIsValidJson(null);
      setFormattedJson('');
      return;
    }

    try {
      const parsedJson = JSON.parse(jsonInput);
      const formatted = JSON.stringify(parsedJson, null, 2);
      setFormattedJson(formatted);
      setIsValidJson(true);
    } catch (error) {
      setIsValidJson(false);
      message.error(`JSON解析错误: ${error instanceof Error ? error.message : '未知错误'}`);
    }
  }, [jsonInput]);

  // 清除输入
  const handleClear = () => {
    setJsonInput('');
    setFormattedJson('');
    setIsValidJson(null);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // 复制到剪贴板
  const handleCopy = () => {
    if (formattedJson) {
      navigator.clipboard.writeText(formattedJson).then(() => {
        message.success(t('common.copied'));
      });
    }
  };

  // 下载JSON文件
  const handleDownload = () => {
    if (!formattedJson) return;
    
    const blob = new Blob([formattedJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // 上传JSON文件
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setJsonInput(content);
      // 自动格式化上传的内容
      try {
        const parsedJson = JSON.parse(content);
        const formatted = JSON.stringify(parsedJson, null, 2);
        setFormattedJson(formatted);
        setIsValidJson(true);
      } catch {
        setIsValidJson(false);
      }
    };
    reader.readAsText(file);
    // 重置input，以便可以重复上传同一个文件
    if (e.target) {
      e.target.value = '';
    }
  };

  // 当输入变化时自动尝试解析JSON
  useEffect(() => {
    if (!jsonInput.trim()) {
      setFormattedJson('');
      setIsValidJson(null);
      return;
    }

    try {
      const parsedJson = JSON.parse(jsonInput);
      const formatted = JSON.stringify(parsedJson, null, 2);
      setFormattedJson(formatted);
      setIsValidJson(true);
    } catch {
      setIsValidJson(false);
    }
  }, [jsonInput]);

  // 修改上传按钮的点击处理函数
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="json-editor-container">
      <Title level={4}>{t('tools.jsonEditor.title')}</Title>
      <div className="json-editor-grid">
        {/* 左侧输入区域 */}
        <Card 
          title={t('tools.jsonEditor.input.title')} 
          extra={
            <Space>
              <Button 
                type={isValidJson === true ? "primary" : "default"} 
                icon={<ClearOutlined />} 
                onClick={handleClear}
              >
                {t('common.clear')}
              </Button>
              {/* 修改上传按钮的实现方式 */}
              <Button 
                type="primary" 
                icon={<UploadOutlined />}
                onClick={handleUploadClick}
              >
                {t('common.upload')}
              </Button>
              {/* 将文件输入框移到按钮外部 */}
              <input 
                ref={fileInputRef}
                type="file" 
                accept=".json"
                style={{ display: 'none' }} 
                onChange={handleUpload}
              />
            </Space>
          } 
          className={isValidJson === false ? 'error-card' : ''}
        >
          <textarea
            ref={inputRef}
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder={t('tools.jsonEditor.input.placeholder')}
            className="json-input"
          />
          {isValidJson === false && (
            <div className="error-message">
              {t('tools.jsonEditor.messages.formatError')}
            </div>
          )}
        </Card>

        {/* 分隔线 */}
        <Divider type="vertical" className="divider" />

        {/* 右侧预览区域 */}
        <Card 
          title={t('tools.jsonEditor.output.title')} 
          extra={
            <Space>
              <Button 
                icon={<CopyOutlined />} 
                onClick={handleCopy}
                disabled={!formattedJson}
              >
                {t('common.copy')}
              </Button>
              <Button 
                icon={<DownloadOutlined />} 
                onClick={handleDownload}
                disabled={!formattedJson}
              >
                {t('common.download')}
              </Button>
            </Space>
          }
          className="preview-card"
        >
          {formattedJson ? (
            <Editor
              height="400px"
              defaultLanguage="json"
              value={formattedJson}
              options={{
                readOnly: true,
                minimap: { enabled: true },
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                fontSize: 14,
                theme: 'vs-light'
              }}
            />
          ) : (
            <div className="empty-state">
              {t('tools.jsonEditor.output.placeholder')}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default JSONEditor;