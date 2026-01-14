/**
 * 文本去重工具
 */
import React, { useState, useMemo } from 'react';
import { Card, Typography, Input, Button, message, Space, Checkbox, Radio } from 'antd';
import { CopyOutlined, ClearOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import './index.less';

const { Title, Text } = Typography;
const { TextArea } = Input;

const TextDedup: React.FC = () => {
  const { t } = useTranslation();
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
      message.warning(t('tools.textDedup.messages.copyEmpty'));
      return;
    }
    navigator.clipboard.writeText(result);
    message.success(t('tools.textDedup.messages.copySuccess'));
  };

  const handleClear = () => {
    setInput('');
  };

  return (
    <div className="text-dedup">
      <Title level={2}>{t('tools.textDedup.title')}</Title>
      <Text type="secondary">{t('tools.textDedup.description')}</Text>

      <Card className="tool-card" bordered={false}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Text strong>{t('tools.textDedup.options.title')}</Text>
            <div className="options-section">
              <Checkbox checked={ignoreCase} onChange={(e) => setIgnoreCase(e.target.checked)}>
                {t('tools.textDedup.options.ignoreCase')}
              </Checkbox>
              <Checkbox checked={trimSpaces} onChange={(e) => setTrimSpaces(e.target.checked)}>
                {t('tools.textDedup.options.trim')}
              </Checkbox>
              <Checkbox checked={removeEmpty} onChange={(e) => setRemoveEmpty(e.target.checked)}>
                {t('tools.textDedup.options.removeEmpty')}
              </Checkbox>
            </div>
            <div className="sort-section">
              <Text strong>{t('tools.textDedup.options.sort.title')}</Text>
              <Radio.Group value={sortResult} onChange={(e) => setSortResult(e.target.value)}>
                <Radio value="none">{t('tools.textDedup.options.sort.none')}</Radio>
                <Radio value="asc">{t('tools.textDedup.options.sort.asc')}</Radio>
                <Radio value="desc">{t('tools.textDedup.options.sort.desc')}</Radio>
              </Radio.Group>
            </div>
          </div>

          <div>
            <div className="section-header">
              <Text strong>{t('tools.textDedup.input')} ({stats.original})</Text>
              <Button size="small" icon={<ClearOutlined />} onClick={handleClear}>
                {t('common.clear')}
              </Button>
            </div>
            <TextArea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('tools.textDedup.placeholder')}
              rows={10}
              allowClear
            />
          </div>

          {input && (
            <div>
              <div className="stats-info">
                <Text>{t('tools.textDedup.stats', { result: stats.result, removed: stats.removed })}</Text>
              </div>
            </div>
          )}

          {result && (
            <div>
              <div className="section-header">
                <Text strong>{t('tools.textDedup.result')} ({stats.result})</Text>
                <Button size="small" icon={<CopyOutlined />} onClick={handleCopy}>
                  {t('common.copy')}
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
        <Title level={4}>{t('tools.textDedup.info.title')}</Title>
        <ul>
          <li>
            <Text strong>{t('tools.textDedup.options.ignoreCase')}：</Text>
            开启后，"ABC" 和 "abc" 会被视为相同内容
          </li>
          <li>
            <Text strong>{t('tools.textDedup.options.trim')}：</Text>
            开启后，比较时会忽略每行首尾的空格
          </li>
          <li>
            <Text strong>{t('tools.textDedup.options.removeEmpty')}：</Text>
            自动删除所有空白行
          </li>
          <li>
            <Text strong>{t('tools.textDedup.options.sort.title')}：</Text>
            可选择升序或降序排列结果
          </li>
        </ul>
        <Title level={4} style={{ marginTop: 16 }}>
          {t('tools.textDedup.info.usage')}
        </Title>
        <ul>
          <li>{t('tools.textDedup.info.list.0')}</li>
          <li>{t('tools.textDedup.info.list.1')}</li>
          <li>{t('tools.textDedup.info.list.2')}</li>
          <li>{t('tools.textDedup.info.list.3')}</li>
          <li>{t('tools.textDedup.info.list.4')}</li>
        </ul>
      </Card>
    </div>
  );
};

export default TextDedup;
