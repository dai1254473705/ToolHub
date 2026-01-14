/**
 * 文本对比工具
 */
import React, { useState } from 'react';
import { Typography, Card, Space, Button, Select } from 'antd';
import { DiffEditor } from '@monaco-editor/react';
import { useTranslation } from 'react-i18next';
import SEO from '@/components/SEO';
import { themeStore } from '@/store';
import { observer } from 'mobx-react-lite';
import './index.less';

const { Title, Paragraph } = Typography;

const TextDiff: React.FC = () => {
  const { t } = useTranslation();
  const [original, setOriginal] = useState('');
  const [modified, setModified] = useState('');
  const [language, setLanguage] = useState('plaintext');

  const languages = [
    { label: 'Plain Text', value: 'plaintext' },
    { label: 'JSON', value: 'json' },
    { label: 'JavaScript', value: 'javascript' },
    { label: 'TypeScript', value: 'typescript' },
    { label: 'HTML', value: 'html' },
    { label: 'CSS', value: 'css' },
    { label: 'XML', value: 'xml' },
    { label: 'SQL', value: 'sql' },
    { label: 'Markdown', value: 'markdown' },
  ];

  return (
    <>
      <SEO title={t('tools.textDiff.title', '文本对比')} description={t('tools.textDiff.description', '在线文本差异对比工具')} />
      <div className="text-diff-container">
        <div className="header-section">
          <Title level={2}>{t('tools.textDiff.title', '文本对比')}</Title>
          <Paragraph>{t('tools.textDiff.description', '对比两段文本的差异，支持多种语言高亮')}</Paragraph>
        </div>

        <Card>
          <div className="control-panel">
            <Space>
              <span>{t('common.language', '语言')}:</span>
              <Select
                value={language}
                onChange={setLanguage}
                options={languages}
                style={{ width: 120 }}
              />
              <Button onClick={() => { setOriginal(''); setModified(''); }}>
                {t('common.clear', '清空')}
              </Button>
            </Space>
          </div>

          <div className="editor-container">
            <DiffEditor
              height="100%"
              language={language}
              original={original}
              modified={modified}
              theme={themeStore.isDarkMode ? 'vs-dark' : 'light'}
              options={{
                renderSideBySide: true,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                originalEditable: true, // 允许编辑左侧
                readOnly: false,        // 允许编辑右侧
              }}
              // Monaco DiffEditor 的 originalEditable 需要通过 onMount 获取 editor 实例后设置 model 才能完全实现双向绑定
              // 这里简化处理，初始值为空，用户直接在编辑器中粘贴
            />
          </div>
        </Card>
      </div>
    </>
  );
};

export default observer(TextDiff);
