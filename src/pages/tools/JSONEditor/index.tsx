import React, { useState, useRef, useEffect } from 'react';
import { Card, Divider, Typography, Button, message, Space } from 'antd';
import { CopyOutlined, ClearOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import Editor from '@monaco-editor/react';
import './index.css';

const { Title } = Typography;

const JSONEditor: React.FC = () => {
  const [jsonInput, setJsonInput] = useState<string>('');
  const [formattedJson, setFormattedJson] = useState<string>('');
  const [isValidJson, setIsValidJson] = useState<boolean | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  // 添加文件输入框的 ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 处理JSON格式化
  const handleFormat = () => {
    if (!jsonInput.trim()) {
      message.warning('请输入JSON内容');
      return;
    }

    try {
      const parsedJson = JSON.parse(jsonInput);
      const formatted = JSON.stringify(parsedJson, null, 2);
      setFormattedJson(formatted);
      setIsValidJson(true);
      message.success('JSON格式化成功');
    } catch (error) {
      setIsValidJson(false);
      message.error(`JSON解析错误: ${error instanceof Error ? error.message : '未知错误'}`);
    }
  };

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
        message.success('已复制到剪贴板');
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
      <Title level={4}>JSON格式化工具</Title>
      <div className="json-editor-grid">
        {/* 左侧输入区域 */}
        <Card 
          title="JSON输入" 
          extra={
            <Space>
              <Button 
                type={isValidJson === true ? "primary" : "default"} 
                icon={<ClearOutlined />} 
                onClick={handleClear}
              >
                清除
              </Button>
              {/* 修改上传按钮的实现方式 */}
              <Button 
                type="primary" 
                icon={<UploadOutlined />}
                onClick={handleUploadClick}
              >
                上传
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
            placeholder="请在此粘贴JSON内容..."
            className="json-input"
          />
          {isValidJson === false && (
            <div className="error-message">
              JSON格式错误，请检查输入内容
            </div>
          )}
        </Card>

        {/* 分隔线 */}
        <Divider type="vertical" className="divider" />

        {/* 右侧预览区域 */}
        <Card 
          title="格式化结果" 
          extra={
            <Space>
              <Button 
                icon={<CopyOutlined />} 
                onClick={handleCopy}
                disabled={!formattedJson}
              >
                复制
              </Button>
              <Button 
                icon={<DownloadOutlined />} 
                onClick={handleDownload}
                disabled={!formattedJson}
              >
                下载
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
              格式化后的JSON将显示在这里
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default JSONEditor;