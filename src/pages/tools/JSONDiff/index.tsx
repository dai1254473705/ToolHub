import React, { useState, useRef, useEffect } from 'react';
import { Card, Divider, Typography, Button, message, Space } from 'antd';
import { ClearOutlined, DownloadOutlined, UploadOutlined, FileSyncOutlined } from '@ant-design/icons';
import './index.css';

const { Title } = Typography;

interface DiffLine {
  line: string;
  isDifferent: boolean;
  lineNumber: number;
}

const JSONDiff: React.FC = () => {
  const [jsonLeft, setJsonLeft] = useState<string>('');
  const [jsonRight, setJsonRight] = useState<string>('');
  const [diffLeft, setDiffLeft] = useState<DiffLine[]>([]);
  const [diffRight, setDiffRight] = useState<DiffLine[]>([]);
  const [isLeftValid, setIsLeftValid] = useState<boolean | null>(null);
  const [isRightValid, setIsRightValid] = useState<boolean | null>(null);
  const [isCompared, setIsCompared] = useState<boolean>(false);
  
  const leftInputRef = useRef<HTMLTextAreaElement>(null);
  const rightInputRef = useRef<HTMLTextAreaElement>(null);
  const leftFileInputRef = useRef<HTMLInputElement>(null);
  const rightFileInputRef = useRef<HTMLInputElement>(null);

  // 验证JSON并格式化
  const validateAndFormat = (json: string): { isValid: boolean; formatted: string } => {
    if (!json.trim()) {
      return { isValid: false, formatted: '' };
    }

    try {
      const parsed = JSON.parse(json);
      return { isValid: true, formatted: JSON.stringify(parsed, null, 2) };
    } catch {
      return { isValid: false, formatted: '' };
    }
  };

  // 处理左侧JSON输入变化
  useEffect(() => {
    if (!jsonLeft.trim()) {
      setIsLeftValid(null);
      setIsCompared(false);
      return;
    }

    const result = validateAndFormat(jsonLeft);
    setIsLeftValid(result.isValid);
    setIsCompared(false);
  }, [jsonLeft]);

  // 处理右侧JSON输入变化
  useEffect(() => {
    if (!jsonRight.trim()) {
      setIsRightValid(null);
      setIsCompared(false);
      return;
    }

    const result = validateAndFormat(jsonRight);
    setIsRightValid(result.isValid);
    setIsCompared(false);
  }, [jsonRight]);

  // 对比JSON
  const handleCompare = () => {
    if (!jsonLeft.trim() || !jsonRight.trim()) {
      message.warning('请在两侧都输入JSON内容');
      return;
    }

    if (isLeftValid !== true || isRightValid !== true) {
      message.error('请确保两侧的JSON格式正确');
      return;
    }

    try {
      const leftObj = JSON.parse(jsonLeft);
      const rightObj = JSON.parse(jsonRight);
      
      const leftFormatted = JSON.stringify(leftObj, null, 2);
      const rightFormatted = JSON.stringify(rightObj, null, 2);
      
      const leftLines = leftFormatted.split('\n');
      const rightLines = rightFormatted.split('\n');
      
      // 构建差异比较结果
      const leftDiff: DiffLine[] = leftLines.map((line, index) => ({
        line,
        isDifferent: rightLines[index] !== line,
        lineNumber: index + 1
      }));
      
      const rightDiff: DiffLine[] = rightLines.map((line, index) => ({
        line,
        isDifferent: leftLines[index] !== line,
        lineNumber: index + 1
      }));
      
      setDiffLeft(leftDiff);
      setDiffRight(rightDiff);
      setIsCompared(true);
      message.success('JSON对比完成');
    } catch (error) {
      message.error(`对比过程中发生错误: ${error instanceof Error ? error.message : '未知错误'}`);
    }
  };

  // 清除功能
  const handleClearLeft = () => {
    setJsonLeft('');
    setIsLeftValid(null);
    setIsCompared(false);
    if (leftInputRef.current) {
      leftInputRef.current.focus();
    }
  };

  const handleClearRight = () => {
    setJsonRight('');
    setIsRightValid(null);
    setIsCompared(false);
    if (rightInputRef.current) {
      rightInputRef.current.focus();
    }
  };

  // 下载功能
  const handleDownload = (text: string, fileName: string) => {
    if (!text) return;
    
    const blob = new Blob([text], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // 上传功能
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>, setJson: (value: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setJson(content);
    };
    reader.readAsText(file);
    
    // 重置input，以便可以重复上传同一个文件
    if (e.target) {
      e.target.value = '';
    }
  };

  // 触发上传按钮点击
  const handleUploadClick = (fileInputRef: React.RefObject<HTMLInputElement | null>) => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="json-diff-container">
      <Title level={4}>JSON对比工具</Title>
      
      <div className="json-diff-controls">
        <Button 
          type="primary" 
          icon={<FileSyncOutlined />}
          onClick={handleCompare}
          disabled={isLeftValid !== true || isRightValid !== true}
        >
          对比JSON
        </Button>
      </div>
      
      <div className="json-diff-grid">
        {/* 左侧输入区域 */}
        <Card 
          title="JSON 左侧" 
          extra={
            <Space>
              <Button 
                icon={<ClearOutlined />} 
                onClick={handleClearLeft}
              >
                清除
              </Button>
              <Button 
                icon={<UploadOutlined />}
                onClick={() => handleUploadClick(leftFileInputRef)}
              >
                上传
              </Button>
              <Button 
                icon={<DownloadOutlined />} 
                onClick={() => handleDownload(jsonLeft, 'left.json')}
                disabled={!jsonLeft}
              >
                下载
              </Button>
              <input 
                ref={leftFileInputRef}
                type="file" 
                accept=".json"
                style={{ display: 'none' }} 
                onChange={(e) => handleUpload(e, setJsonLeft)}
              />
            </Space>
          } 
          className={isLeftValid === false ? 'error-card' : ''}
        >
          <textarea
            ref={leftInputRef}
            value={jsonLeft}
            onChange={(e) => setJsonLeft(e.target.value)}
            placeholder="请在此粘贴左侧JSON内容..."
            className="json-input"
          />
          {isLeftValid === false && (
            <div className="error-message">
              JSON格式错误，请检查输入内容
            </div>
          )}
        </Card>

        {/* 分隔线 */}
        <Divider type="vertical" className="divider" />

        {/* 右侧输入区域 */}
        <Card 
          title="JSON 右侧" 
          extra={
            <Space>
              <Button 
                icon={<ClearOutlined />} 
                onClick={handleClearRight}
              >
                清除
              </Button>
              <Button 
                icon={<UploadOutlined />}
                onClick={() => handleUploadClick(rightFileInputRef)}
              >
                上传
              </Button>
              <Button 
                icon={<DownloadOutlined />} 
                onClick={() => handleDownload(jsonRight, 'right.json')}
                disabled={!jsonRight}
              >
                下载
              </Button>
              <input 
                ref={rightFileInputRef}
                type="file" 
                accept=".json"
                style={{ display: 'none' }} 
                onChange={(e) => handleUpload(e, setJsonRight)}
              />
            </Space>
          } 
          className={isRightValid === false ? 'error-card' : ''}
        >
          <textarea
            ref={rightInputRef}
            value={jsonRight}
            onChange={(e) => setJsonRight(e.target.value)}
            placeholder="请在此粘贴右侧JSON内容..."
            className="json-input"
          />
          {isRightValid === false && (
            <div className="error-message">
              JSON格式错误，请检查输入内容
            </div>
          )}
        </Card>
      </div>

      {/* 对比结果展示 */}
      {isCompared && (
        <div className="json-diff-results">
          <Title level={5}>对比结果</Title>
          <div className="json-diff-results-grid">
            {/* 左侧对比结果 */}
            <Card title="左侧对比结果" className="diff-result-card">
              <div className="diff-result-content">
                {diffLeft.map((diffLine, index) => (
                  <div 
                    key={index} 
                    className={`diff-line ${diffLine.isDifferent ? 'diff-different' : 'diff-same'}`}
                  >
                    <span className="line-number">{diffLine.lineNumber}</span>
                    <span className="line-content">{diffLine.line}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* 分隔线 */}
            <Divider type="vertical" className="divider" />

            {/* 右侧对比结果 */}
            <Card title="右侧对比结果" className="diff-result-card">
              <div className="diff-result-content">
                {diffRight.map((diffLine, index) => (
                  <div 
                    key={index} 
                    className={`diff-line ${diffLine.isDifferent ? 'diff-different' : 'diff-same'}`}
                  >
                    <span className="line-number">{diffLine.lineNumber}</span>
                    <span className="line-content">{diffLine.line}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default JSONDiff;