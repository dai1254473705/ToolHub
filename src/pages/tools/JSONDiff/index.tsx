import React, { useState, useRef, useEffect } from 'react';
import { Card, Divider, Typography, Button, message, Space, Modal, Badge, Tooltip } from 'antd';
import { ClearOutlined, DownloadOutlined, UploadOutlined, FileSyncOutlined, FullscreenOutlined, FullscreenExitOutlined, UpOutlined, DownOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import './index.css';

const { Title } = Typography;

interface DiffLine {
  line: string;
  isDifferent: boolean;
  lineNumber: number;
  path?: string; // JSON 路径，例如 "user.name"
}

type JSONValue = string | number | boolean | null | JSONObject | JSONArray;
interface JSONObject {
  [key: string]: JSONValue;
}
interface JSONArray extends Array<JSONValue> {}

const JSONDiff: React.FC = () => {
  const { t } = useTranslation();
  const [jsonLeft, setJsonLeft] = useState<string>('');
  const [jsonRight, setJsonRight] = useState<string>('');
  const [diffLeft, setDiffLeft] = useState<DiffLine[]>([]);
  const [diffRight, setDiffRight] = useState<DiffLine[]>([]);
  const [isLeftValid, setIsLeftValid] = useState<boolean | null>(null);
  const [isRightValid, setIsRightValid] = useState<boolean | null>(null);
  const [isCompared, setIsCompared] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isInputCollapsed, setIsInputCollapsed] = useState<boolean>(false);
  const [isResultCollapsed, setIsResultCollapsed] = useState<boolean>(false);

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

  // 深度比较两个JSON值，返回不同的路径集合
  const deepCompare = (left: JSONValue, right: JSONValue, path: string = '', diffPaths: Set<string> = new Set()): Set<string> => {
    // 类型不同
    if (left === null || right === null) {
      if (left !== right) {
        diffPaths.add(path);
      }
      return diffPaths;
    }

    if (typeof left !== typeof right) {
      diffPaths.add(path);
      return diffPaths;
    }

    // 基本类型比较
    if (typeof left !== 'object') {
      if (left !== right) {
        diffPaths.add(path);
      }
      return diffPaths;
    }

    // 数组比较
    if (Array.isArray(left) && Array.isArray(right)) {
      if (left.length !== right.length) {
        diffPaths.add(path);
      }
      const maxLength = Math.max(left.length, right.length);
      for (let i = 0; i < maxLength; i++) {
        deepCompare(left[i], right[i], `${path}[${i}]`, diffPaths);
      }
      return diffPaths;
    }

    // 对象比较
    if (!Array.isArray(left) && !Array.isArray(right)) {
      const leftKeys = new Set(Object.keys(left as JSONObject).sort());
      const rightKeys = new Set(Object.keys(right as JSONObject).sort());

      // 检查左边独有的key
      for (const key of leftKeys) {
        if (!rightKeys.has(key)) {
          diffPaths.add(`${path}.${key}`);
        }
      }

      // 检查右边独有的key
      for (const key of rightKeys) {
        if (!leftKeys.has(key)) {
          diffPaths.add(`${path}.${key}`);
        }
      }

      // 比较共同的key
      for (const key of leftKeys) {
        if (rightKeys.has(key)) {
          deepCompare(
            (left as JSONObject)[key],
            (right as JSONObject)[key],
            path ? `${path}.${key}` : key,
            diffPaths
          );
        }
      }

      return diffPaths;
    }

    // 一个是数组，一个是对象
    diffPaths.add(path);
    return diffPaths;
  };

  // 标记格式化JSON中的差异行
  const markDiffLines = (obj: JSONValue, diffPaths: Set<string>): DiffLine[] => {
    const formatted = JSON.stringify(obj, null, 2);
    const lines = formatted.split('\n');
    const result: DiffLine[] = [];

    // 用于存储每行对应的路径
    const linePaths: Array<string | null> = new Array(lines.length).fill(null);

    // 解析每行，确定其对应的JSON路径
    const parseLines = () => {
      const stack: Array<{ path: string; indent: number }> = [];

      lines.forEach((line, index) => {
        const trimmed = line.trim();
        const indent = line.search(/\S/);

        // 弹出栈到当前层级
        while (stack.length > 0 && stack[stack.length - 1].indent >= indent) {
          stack.pop();
        }

        // 构建当前路径
        let currentPath = stack.length > 0 ? stack[stack.length - 1].path : '';

        // 匹配key-value行 "key": value
        const keyValueMatch = trimmed.match(/^"([^"]+)"\s*:\s*(.+)$/);

        if (keyValueMatch) {
          const key = keyValueMatch[1];
          const value = keyValueMatch[2].trim();
          currentPath = currentPath ? `${currentPath}.${key}` : key;

          // 如果值不是对象或数组开始，记录该路径
          if (value !== '{' && value !== '[') {
            linePaths[index] = currentPath;
          }

          stack.push({ path: currentPath, indent });
        } else if (trimmed === '{' || trimmed === '}') {
          // 对象的开始和结束，不需要记录路径
        } else if (trimmed === '[' || trimmed === ']') {
          // 数组的开始和结束，不需要记录路径
        } else if (trimmed.match(/^"([^"]+)"\s*:\s*[\[\{]$/)) {
          // "key": { 或 "key": [ 这样的行
          const key = trimmed.match(/^"([^"]+)"\s*:/)![1];
          currentPath = currentPath ? `${currentPath}.${key}` : key;
          stack.push({ path: currentPath, indent });
          linePaths[index] = currentPath;
        }
      });
    };

    parseLines();

    // 生成差异行结果
    lines.forEach((line, index) => {
      const lineNumber = index + 1;
      const path = linePaths[index];

      let isDifferent = false;
      let matchedPath = '';

      // 检查该行对应的路径是否在差异集合中
      if (path && diffPaths.has(path)) {
        isDifferent = true;
        matchedPath = path;
      }

      result.push({
        line,
        isDifferent,
        lineNumber,
        path: isDifferent ? matchedPath : undefined
      });
    });

    return result;
  };

  // 对比JSON
  const handleCompare = () => {
    if (!jsonLeft.trim() || !jsonRight.trim()) {
      message.warning(t('tools.jsonDiff.messages.inputBoth'));
      return;
    }

    if (isLeftValid !== true || isRightValid !== true) {
      message.error(t('tools.jsonDiff.messages.invalidFormat'));
      return;
    }

    try {
      const leftObj = JSON.parse(jsonLeft) as JSONValue;
      const rightObj = JSON.parse(jsonRight) as JSONValue;

      // 深度比较，获取所有差异路径
      const diffPaths = deepCompare(leftObj, rightObj);

      // 标记差异行
      const leftDiff = markDiffLines(leftObj, diffPaths);
      const rightDiff = markDiffLines(rightObj, diffPaths);

      setDiffLeft(leftDiff);
      setDiffRight(rightDiff);
      setIsCompared(true);
      setIsInputCollapsed(true); // 对比后自动收起输入区域
      message.success(t('tools.jsonDiff.messages.compareSuccess'));
    } catch (error) {
      message.error(t('tools.jsonDiff.messages.compareError', { error: error instanceof Error ? error.message : '未知错误' }));
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

  // 计算差异数量
  const getDiffCount = () => {
    if (!isCompared) return 0;
    const leftDiffPaths = new Set(diffLeft.filter(d => d.isDifferent).map(d => d.path));
    const rightDiffPaths = new Set(diffRight.filter(d => d.isDifferent).map(d => d.path));
    // 合并左右两边的差异路径
    const allDiffPaths = new Set([...leftDiffPaths, ...rightDiffPaths]);
    return allDiffPaths.size;
  };

  const diffCount = getDiffCount();
  const hasDifference = diffCount > 0;

  return (
    <div className="json-diff-container">
      <Title level={4}>{t('tools.jsonDiff.title')}</Title>
      
      <div className="json-diff-controls">
        <Button 
          type="primary" 
          icon={<FileSyncOutlined />}
          onClick={handleCompare}
          disabled={isLeftValid !== true || isRightValid !== true}
        >
          {t('tools.jsonDiff.controls.compare')}
        </Button>
      </div>
      
      <div className={`json-diff-grid ${isInputCollapsed ? 'collapsed' : ''}`}>
        {/* 左侧输入区域 */}
        <Card
          title={
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Button
                type="text"
                size="small"
                icon={isInputCollapsed ? <DownOutlined /> : <UpOutlined />}
                onClick={() => setIsInputCollapsed(!isInputCollapsed)}
                style={{ padding: 0, width: 24, height: 24 }}
              />
              {t('tools.jsonDiff.left.title')}
            </div>
          }
          extra={
            <Space>
              <Button 
                icon={<ClearOutlined />} 
                onClick={handleClearLeft}
              >
                {t('common.clear')}
              </Button>
              <Button 
                icon={<UploadOutlined />}
                onClick={() => handleUploadClick(leftFileInputRef)}
              >
                {t('common.upload')}
              </Button>
              <Button 
                icon={<DownloadOutlined />} 
                onClick={() => handleDownload(jsonLeft, 'left.json')}
                disabled={!jsonLeft}
              >
                {t('common.download')}
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
          className={`${isLeftValid === false ? 'error-card' : ''} ${isInputCollapsed ? 'collapsed-card' : ''}`}
        >
          <textarea
            ref={leftInputRef}
            value={jsonLeft}
            onChange={(e) => setJsonLeft(e.target.value)}
            placeholder={t('tools.jsonDiff.left.placeholder')}
            className="json-input"
          />
          {isLeftValid === false && (
            <div className="error-message">
              {t('tools.jsonDiff.messages.formatError')}
            </div>
          )}
        </Card>

        {/* 分隔线 */}
        <Divider type="vertical" className="divider" />

        {/* 右侧输入区域 */}
        <Card 
          title={t('tools.jsonDiff.right.title')} 
          extra={
            <Space>
              <Button 
                icon={<ClearOutlined />} 
                onClick={handleClearRight}
              >
                {t('common.clear')}
              </Button>
              <Button 
                icon={<UploadOutlined />}
                onClick={() => handleUploadClick(rightFileInputRef)}
              >
                {t('common.upload')}
              </Button>
              <Button 
                icon={<DownloadOutlined />} 
                onClick={() => handleDownload(jsonRight, 'right.json')}
                disabled={!jsonRight}
              >
                {t('common.download')}
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
          className={`${isRightValid === false ? 'error-card' : ''} ${isInputCollapsed ? 'collapsed-card' : ''}`}
        >
          <textarea
            ref={rightInputRef}
            value={jsonRight}
            onChange={(e) => setJsonRight(e.target.value)}
            placeholder={t('tools.jsonDiff.right.placeholder')}
            className="json-input"
          />
          {isRightValid === false && (
            <div className="error-message">
              {t('tools.jsonDiff.messages.formatError')}
            </div>
          )}
        </Card>
      </div>

      {/* 对比结果展示 */}
      {isCompared && (
        <div className={`json-diff-results ${isResultCollapsed ? 'collapsed' : ''}`}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Button
                type="text"
                size="small"
                icon={isResultCollapsed ? <DownOutlined /> : <UpOutlined />}
                onClick={() => setIsResultCollapsed(!isResultCollapsed)}
                style={{ padding: 0, width: 24, height: 24 }}
              />
              <Title level={5} style={{ margin: 0 }}>{t('tools.jsonDiff.results.title')}</Title>
              {hasDifference ? (
                <Badge count={diffCount} title={`${diffCount} 个字段不一致`}>
                  <Tooltip title={`${diffCount} 个字段不一致`}>
                    <CloseCircleOutlined style={{ color: '#ff4d4f', fontSize: 16 }} />
                  </Tooltip>
                </Badge>
              ) : (
                <Tooltip title="完全一致">
                  <CheckCircleOutlined style={{ color: '#52c41a', fontSize: 16 }} />
                </Tooltip>
              )}
            </div>
            <Button
              icon={<FullscreenOutlined />}
              onClick={() => setIsFullscreen(true)}
            >
              全屏查看
            </Button>
          </div>
          <div className={`json-diff-results-grid ${isResultCollapsed ? 'collapsed' : ''}`}>
            {/* 左侧对比结果 */}
            <Card title={t('tools.jsonDiff.results.leftTitle')} className="diff-result-card">
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
            <Card title={t('tools.jsonDiff.results.rightTitle')} className="diff-result-card">
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

      {/* 全屏查看 Modal */}
      <Modal
        title={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>JSON 对比结果 - 全屏查看</span>
            <Button
              type="text"
              icon={<FullscreenExitOutlined />}
              onClick={() => setIsFullscreen(false)}
            >
              退出全屏
            </Button>
          </div>
        }
        open={isFullscreen}
        onCancel={() => setIsFullscreen(false)}
        footer={null}
        width="95vw"
        style={{ top: 20 }}
        bodyStyle={{ height: 'calc(100vh - 150px)', overflow: 'auto' }}
      >
        <div className="json-diff-results-grid json-diff-results-grid-fullscreen">
          {/* 左侧对比结果 */}
          <Card title={t('tools.jsonDiff.results.leftTitle')} className="diff-result-card diff-result-card-fullscreen">
            <div className="diff-result-content diff-result-content-fullscreen">
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
          <Divider type="vertical" className="divider divider-fullscreen" />

          {/* 右侧对比结果 */}
          <Card title={t('tools.jsonDiff.results.rightTitle')} className="diff-result-card diff-result-card-fullscreen">
            <div className="diff-result-content diff-result-content-fullscreen">
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
      </Modal>
    </div>
  );
};

export default JSONDiff;