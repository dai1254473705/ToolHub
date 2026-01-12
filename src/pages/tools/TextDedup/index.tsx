/**
 * 文本去重工具
 */
import React, { useState, useMemo } from 'react';
import { Card, Typography, Input, Button, message, Space, Checkbox, Radio } from 'antd';
import { CopyOutlined, ClearOutlined } from '@ant-design/icons';
import './index.less';

const { Title, Text } = Typography;
const { TextArea } = Input;

const TextDedup: React.FC = () => {
  const [input, setInput] = useState('');
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [trimSpaces, setTrimSpaces] = useState(true);
  const [removeEmpty, setRemoveEmpty] = useState(true);
  const [sortResult, setSortResult] = useState<'none' | 'asc' | 'desc'>('none');

  // 去重处理
  const result = useMemo(() => {
    if (!input) return '';

    let lines = input.split('\n');

    // 移除空行
    if (removeEmpty) {
      lines = lines.filter((line) => line.trim() !== '');
    }

    // 去重
    const uniqueLines = new Map<string, string>();
    lines.forEach((line) => {
      const key = trimSpaces ? line.trim() : line;
      const compareKey = ignoreCase ? key.toLowerCase() : key;

      if (!uniqueLines.has(compareKey)) {
        uniqueLines.set(compareKey, line);
      }
    });

    let deduped = Array.from(uniqueLines.values());

    // 排序
    if (sortResult !== 'none') {
      deduped.sort((a, b) => {
        const compareA = (ignoreCase ? a.toLowerCase() : a).trim();
        const compareB = (ignoreCase ? b.toLowerCase() : b).trim();
        if (sortResult === 'asc') {
          return compareA.localeCompare(compareB);
        } else {
          return compareB.localeCompare(compareA);
        }
      });
    }

    return deduped.join('\n');
  }, [input, ignoreCase, trimSpaces, removeEmpty, sortResult]);

  const stats = useMemo(() => {
    const originalLines = input.split('\n').filter((line) => line.trim() !== '');
    const resultLines = result.split('\n').filter((line) => line.trim() !== '');
    return {
      original: originalLines.length,
      result: resultLines.length,
      removed: originalLines.length - resultLines.length,
    };
  }, [input, result]);

  const handleCopy = () => {
    if (!result) {
      message.warning('没有可复制的内容');
      return;
    }
    navigator.clipboard.writeText(result);
    message.success('已复制到剪贴板');
  };

  const handleClear = () => {
    setInput('');
  };

  return (
    <div className="text-dedup">
      <Title level={2}>文本去重</Title>
      <Text type="secondary">去除文本中的重复行，支持多种选项</Text>

      <Card className="tool-card" bordered={false}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Text strong>选项</Text>
            <div className="options-section">
              <Checkbox checked={ignoreCase} onChange={(e) => setIgnoreCase(e.target.checked)}>
                忽略大小写
              </Checkbox>
              <Checkbox checked={trimSpaces} onChange={(e) => setTrimSpaces(e.target.checked)}>
                去除首尾空格
              </Checkbox>
              <Checkbox checked={removeEmpty} onChange={(e) => setRemoveEmpty(e.target.checked)}>
                移除空行
              </Checkbox>
            </div>
            <div className="sort-section">
              <Text strong>排序：</Text>
              <Radio.Group value={sortResult} onChange={(e) => setSortResult(e.target.value)}>
                <Radio value="none">不排序</Radio>
                <Radio value="asc">升序</Radio>
                <Radio value="desc">降序</Radio>
              </Radio.Group>
            </div>
          </div>

          <div>
            <div className="section-header">
              <Text strong>输入文本 ({stats.original} 行)</Text>
              <Button size="small" icon={<ClearOutlined />} onClick={handleClear}>
                清空
              </Button>
            </div>
            <TextArea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="请输入文本，每行一条"
              rows={10}
              allowClear
            />
          </div>

          {input && (
            <div>
              <div className="stats-info">
                <Text>去重后 <Text strong>{stats.result}</Text> 行，移除了 <Text strong type="danger">{stats.removed}</Text> 行重复内容</Text>
              </div>
            </div>
          )}

          {result && (
            <div>
              <div className="section-header">
                <Text strong>去重结果 ({stats.result} 行)</Text>
                <Button size="small" icon={<CopyOutlined />} onClick={handleCopy}>
                  复制
                </Button>
              </div>
              <TextArea
                value={result}
                readOnly
                rows={10}
                className="result-textarea"
              />
            </div>
          )}
        </Space>
      </Card>

      <Card className="info-card" bordered={false}>
        <Title level={4}>使用说明</Title>
        <ul>
          <li>
            <Text strong>忽略大小写：</Text>
            开启后，"ABC" 和 "abc" 会被视为相同内容
          </li>
          <li>
            <Text strong>去除首尾空格：</Text>
            开启后，比较时会忽略每行首尾的空格
          </li>
          <li>
            <Text strong>移除空行：</Text>
            自动删除所有空白行
          </li>
          <li>
            <Text strong>排序：</Text>
            可选择升序或降序排列结果
          </li>
        </ul>
        <Title level={4} style={{ marginTop: 16 }}>
          使用场景
        </Title>
        <ul>
          <li>清洗数据列表</li>
          <li>去除重复的 URL</li>
          <li>整理关键词列表</li>
          <li>清理配置文件</li>
          <li>去重邮箱列表</li>
        </ul>
      </Card>
    </div>
  );
};

export default TextDedup;
