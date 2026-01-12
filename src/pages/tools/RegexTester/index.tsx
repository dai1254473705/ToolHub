/**
 * 正则表达式测试器
 */
import React, { useState, useMemo, useEffect } from 'react';
import { Card, Row, Col, Typography, Input, Checkbox, Space } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import './index.less';

const { Title, Text } = Typography;
const { TextArea } = Input;

interface MatchResult {
  index: number;
  match: string;
  start: number;
  end: number;
}

const RegexTester: React.FC = () => {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState('');
  const [error, setError] = useState('');
  const [matches, setMatches] = useState<MatchResult[]>([]);

  // 测试正则表达式
  useEffect(() => {
    if (!pattern) {
      setMatches([]);
      setError('');
      return;
    }

    try {
      const regex = new RegExp(pattern, flags);
      const testStr = testString || '';

      if (flags.includes('g')) {
        // 全局匹配
        const allMatches: MatchResult[] = [];
        let match;
        while ((match = regex.exec(testStr)) !== null) {
          allMatches.push({
            index: allMatches.length,
            match: match[0] || '',
            start: match.index || 0,
            end: (match.index || 0) + (match[0]?.length || 0),
          });
          // 防止无限循环
          if (match.index === regex.lastIndex) {
            regex.lastIndex++;
          }
        }
        setMatches(allMatches);
      } else {
        // 单次匹配
        const match = regex.exec(testStr);
        if (match && match[0]) {
          setMatches([{
            index: 0,
            match: match[0],
            start: match.index || 0,
            end: (match.index || 0) + match[0].length,
          }]);
        } else {
          setMatches([]);
        }
      }
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : '无效的正则表达式');
      setMatches([]);
    }
  }, [pattern, flags, testString]);

  // 切换标志位
  const toggleFlag = (flag: string) => {
    if (flags.includes(flag)) {
      setFlags(flags.replace(flag, ''));
    } else {
      setFlags(flags + flag);
    }
  };

  // 高亮显示匹配结果
  const highlightedText = useMemo(() => {
    if (!testString || matches.length === 0) return testString;

    let result = testString;
    let offset = 0;

    matches.forEach(({ start, end }) => {
      const before = result.slice(0, start + offset);
      const matched = result.slice(start + offset, end + offset);
      const after = result.slice(end + offset);

      result = before + `<mark class="match-highlight">${matched}</mark>` + after;
      offset += '<mark class="match-highlight"></mark>'.length;
    });

    return result;
  }, [testString, matches]);

  return (
    <div className="regex-tester">
      <Title level={2}>正则表达式测试</Title>
      <Text type="secondary">实时测试正则表达式，查看匹配结果</Text>

      <Card className="tool-card" bordered={false}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Text strong>正则表达式</Text>
            <Input
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="例如: \d+"
              prefix="/"
              suffix={flags ? `/${flags}` : ''}
              style={{ marginTop: 8, fontFamily: 'JetBrains Mono, monospace' }}
            />
            {error && (
              <div className="error-message">
                <CloseCircleOutlined /> {error}
              </div>
            )}
          </div>

          <div>
            <Text strong>标志位</Text>
            <div className="flags-section">
              <Checkbox checked={flags.includes('g')} onChange={() => toggleFlag('g')}>
                <Text code>g</Text> - 全局匹配
              </Checkbox>
              <Checkbox checked={flags.includes('i')} onChange={() => toggleFlag('i')}>
                <Text code>i</Text> - 忽略大小写
              </Checkbox>
              <Checkbox checked={flags.includes('m')} onChange={() => toggleFlag('m')}>
                <Text code>m</Text> - 多行模式
              </Checkbox>
              <Checkbox checked={flags.includes('s')} onChange={() => toggleFlag('s')}>
                <Text code>s</Text> - 点号匹配换行符
              </Checkbox>
            </div>
          </div>

          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <div>
                <Text strong>测试文本</Text>
                <TextArea
                  value={testString}
                  onChange={(e) => setTestString(e.target.value)}
                  placeholder="输入要测试的文本"
                  rows={10}
                  style={{ marginTop: 8 }}
                />
              </div>
            </Col>

            <Col xs={24} md={12}>
              <div>
                <Text strong>匹配结果 ({matches.length})</Text>
                {matches.length > 0 ? (
                  <div className="matches-list">
                    {matches.map(({ index, match, start, end }) => (
                      <div key={index} className="match-item">
                        <div className="match-header">
                          <CheckCircleOutlined style={{ color: '#10b981' }} />
                          <Text strong>匹配 {index + 1}</Text>
                          <Text type="secondary">位置: {start} - {end}</Text>
                        </div>
                        <div className="match-content">
                          <Text code>{match}</Text>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-matches">
                    {pattern ? '无匹配结果' : '请输入正则表达式'}
                  </div>
                )}
              </div>
            </Col>
          </Row>

          {matches.length > 0 && (
            <div>
              <Text strong>高亮预览</Text>
              <div
                className="highlight-preview"
                dangerouslySetInnerHTML={{ __html: highlightedText }}
              />
            </div>
          )}
        </Space>
      </Card>

      <Card className="info-card" bordered={false}>
        <Title level={4}>常用正则表达式</Title>
        <ul>
          <li><Text code>\d</Text> - 匹配数字</li>
          <li><Text code>\w</Text> - 匹配字母、数字、下划线</li>
          <li><Text code>\s</Text> - 匹配空白字符</li>
          <li><Text code>.</Text> - 匹配任意字符（除换行符）</li>
          <li><Text code>*</Text> - 匹配 0 次或多次</li>
          <li><Text code>+</Text> - 匹配 1 次或多次</li>
          <li><Text code>?</Text> - 匹配 0 次或 1 次</li>
          <li><Text code>[abc]</Text> - 匹配 a、b 或 c</li>
          <li><Text code>(abc|def)</Text> - 匹配 abc 或 def</li>
        </ul>
        <Title level={4} style={{ marginTop: 16 }}>
          实用示例
        </Title>
        <ul>
          <li>邮箱: <Text code>{`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$`}</Text></li>
          <li>手机号: <Text code>{`^1[3-9]\\d{9}$`}</Text></li>
          <li>IP地址: <Text code>{`^(\\d{1,3}\\.){3}\\d{1,3}$`}</Text></li>
          <li>URL: <Text code>{`^https?://[^\\s]+$`}</Text></li>
        </ul>
      </Card>
    </div>
  );
};

export default RegexTester;
