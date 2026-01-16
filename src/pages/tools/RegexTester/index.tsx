/**
 * 正则表达式测试器
 */
import React, { useState, useMemo, useEffect } from 'react';
import { Card, Row, Col, Typography, Input, Checkbox, Space, Button } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import './index.less';

const { Title, Text } = Typography;
const { TextArea } = Input;

interface MatchResult {
  index: number;
  match: string;
  start: number;
  end: number;
}

interface RegexExample {
  name: string;
  pattern: string;
  flags: string;
  testString: string;
}

const RegexTester: React.FC = () => {
  const { t } = useTranslation();
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState('');
  const [error, setError] = useState('');
  const [matches, setMatches] = useState<MatchResult[]>([]);

  const regexExamples: RegexExample[] = useMemo(() => {
    const examples = t('tools.regexTester.info.examples.list', { returnObjects: true }) as Record<string, RegexExample>;
    return Object.values(examples).map((value) => ({
      name: value.name,
      pattern: value.pattern,
      flags: value.flags,
      testString: value.testString,
    }));
  }, [t]);

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
      setError(err instanceof Error ? err.message : t('tools.regexTester.messages.invalidRegex'));
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

  // 应用示例
  const applyExample = (example: RegexExample) => {
    setPattern(example.pattern);
    setFlags(example.flags);
    setTestString(example.testString);
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
      <Title level={2}>{t('tools.regexTester.title')}</Title>
      <Text type="secondary">{t('tools.regexTester.description')}</Text>

      <Card className="tool-card" bordered={false}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Text strong>{t('tools.regexTester.pattern.label')}</Text>
            <Input
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder={t('tools.regexTester.pattern.placeholder')}
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
            <Text strong>{t('tools.regexTester.flags.label')}</Text>
            <div className="flags-section">
              <Checkbox checked={flags.includes('g')} onChange={() => toggleFlag('g')}>
                <Text code>g</Text> - {t('tools.regexTester.flags.g')}
              </Checkbox>
              <Checkbox checked={flags.includes('i')} onChange={() => toggleFlag('i')}>
                <Text code>i</Text> - {t('tools.regexTester.flags.i')}
              </Checkbox>
              <Checkbox checked={flags.includes('m')} onChange={() => toggleFlag('m')}>
                <Text code>m</Text> - {t('tools.regexTester.flags.m')}
              </Checkbox>
              <Checkbox checked={flags.includes('s')} onChange={() => toggleFlag('s')}>
                <Text code>s</Text> - {t('tools.regexTester.flags.s')}
              </Checkbox>
            </div>
          </div>

          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <div>
                <Text strong>{t('tools.regexTester.testString.label')}</Text>
                <TextArea
                  value={testString}
                  onChange={(e) => setTestString(e.target.value)}
                  placeholder={t('tools.regexTester.testString.placeholder')}
                  rows={5}
                  style={{ marginTop: 8, resize: 'vertical' }}
                />
              </div>
            </Col>

            <Col xs={24} md={12}>
              <div>
                <Text strong>{t('tools.regexTester.matches.title', { count: matches.length })}</Text>
                {matches.length > 0 ? (
                  <div className="matches-list">
                    {matches.map(({ index, match, start, end }) => (
                      <div key={index} className="match-item">
                        <div className="match-header">
                          <CheckCircleOutlined style={{ color: '#10b981' }} />
                          <Text strong>{t('tools.regexTester.matches.match', { index: index + 1 })}</Text>
                          <Text type="secondary">{t('tools.regexTester.matches.position', { start, end })}</Text>
                        </div>
                        <div className="match-content">
                          <Text code>{match}</Text>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-matches">
                    {pattern ? t('tools.regexTester.matches.empty') : t('tools.regexTester.matches.emptyPattern')}
                  </div>
                )}
              </div>
            </Col>
          </Row>

          {matches.length > 0 && (
            <div>
              <Text strong>{t('tools.regexTester.highlight')}</Text>
              <div
                className="highlight-preview"
                dangerouslySetInnerHTML={{ __html: highlightedText }}
              />
            </div>
          )}
        </Space>
      </Card>

      <Card className="info-card" bordered={false}>
        <Title level={4}>{t('tools.regexTester.info.common.title')}</Title>
        <ul>
          <li><Text code>\d</Text> - {t('tools.regexTester.info.common.list.digit')}</li>
          <li><Text code>\w</Text> - {t('tools.regexTester.info.common.list.word')}</li>
          <li><Text code>\s</Text> - {t('tools.regexTester.info.common.list.space')}</li>
          <li><Text code>.</Text> - {t('tools.regexTester.info.common.list.any')}</li>
          <li><Text code>*</Text> - {t('tools.regexTester.info.common.list.zeroOrMore')}</li>
          <li><Text code>+</Text> - {t('tools.regexTester.info.common.list.oneOrMore')}</li>
          <li><Text code>?</Text> - {t('tools.regexTester.info.common.list.zeroOrOne')}</li>
          <li><Text code>[abc]</Text> - {t('tools.regexTester.info.common.list.range')}</li>
          <li><Text code>(abc|def)</Text> - {t('tools.regexTester.info.common.list.group')}</li>
        </ul>
        <Title level={4} style={{ marginTop: 24 }}>
          {t('tools.regexTester.info.examples.title')}
        </Title>
        <div className="examples-grid">
          {regexExamples.map((example, index) => (
            <div key={index} className="example-item">
              <div className="example-header">
                <Text strong>{example.name}</Text>
                <Button
                  type="primary"
                  size="small"
                  onClick={() => applyExample(example)}
                >
                  {t('tools.regexTester.info.examples.apply')}
                </Button>
              </div>
              <div className="example-content">
                <Text code style={{ fontSize: '12px' }}>
                  /{example.pattern}/{example.flags}
                </Text>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default RegexTester;
