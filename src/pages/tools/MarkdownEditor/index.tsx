/**
 * Markdown 编辑器
 */
import React, { useState } from 'react';
import { Typography, Button, Space, Segmented, Tooltip, message, Modal, Radio } from 'antd';
import Editor from '@monaco-editor/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { useTranslation } from 'react-i18next';
import { 
  DownloadOutlined, 
  CopyOutlined, 
  DeleteOutlined, 
  EyeOutlined, 
  EditOutlined,
  QuestionCircleOutlined,
  LayoutOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import SEO from '@/components/SEO';
import { themeStore } from '@/store';
import { observer } from 'mobx-react-lite';
import 'github-markdown-css/github-markdown.css';
import 'highlight.js/styles/github.css'; // Light theme code highlight
import './index.less';

const { Title } = Typography;

const MarkdownEditor: React.FC = () => {
  const { t } = useTranslation();
  const [markdown, setMarkdown] = useState<string>('# Hello Markdown\n\nStart writing...\n\n```javascript\nconsole.log("Hello World");\n```\n\n| Column 1 | Column 2 |\n| -------- | -------- |\n| Cell 1   | Cell 2   |\n');
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit'); // Mobile state
  const [layout, setLayout] = useState<'split' | 'edit' | 'preview'>('split'); // Desktop state
  const [helpVisible, setHelpVisible] = useState(false);
  
  // 导出 Markdown
  const handleDownloadMd = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.md';
    a.click();
    URL.revokeObjectURL(url);
    message.success(t('common.success'));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown);
    message.success(t('common.copied'));
  };

  const handleClear = () => {
    setMarkdown('');
  };

  const helpContent = (
    <div className="markdown-help-content">
      <h3>常用语法</h3>
      <table>
        <thead>
          <tr>
            <th>功能</th>
            <th>语法</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>标题</td><td># H1, ## H2, ...</td></tr>
          <tr><td>粗体</td><td>**Bold**</td></tr>
          <tr><td>斜体</td><td>*Italic*</td></tr>
          <tr><td>引用</td><td>&gt; Quote</td></tr>
          <tr><td>代码块</td><td>```lang ... ```</td></tr>
          <tr><td>行内代码</td><td>`code`</td></tr>
          <tr><td>链接</td><td>[Title](url)</td></tr>
          <tr><td>图片</td><td>![Alt](url)</td></tr>
          <tr><td>无序列表</td><td>- Item</td></tr>
          <tr><td>有序列表</td><td>1. Item</td></tr>
          <tr><td>任务列表</td><td>- [x] Task</td></tr>
          <tr><td>表格</td><td>| Header |...</td></tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <>
      <SEO title={t('tools.markdownEditor.title')} description={t('tools.markdownEditor.description')} />
      <div className="markdown-editor-container">
        <div className="header-section">
          <div className="header-left">
            <Title level={2} style={{ margin: 0 }}>{t('tools.markdownEditor.title')}</Title>
          </div>
          <div className="header-right">
            <Space>
              {/* Desktop Layout Switcher */}
              <div className="desktop-layout-switcher">
                <Radio.Group value={layout} onChange={(e) => setLayout(e.target.value)} buttonStyle="solid">
                  <Tooltip title={t('tools.markdownEditor.modes.edit')}>
                    <Radio.Button value="edit"><FileTextOutlined /></Radio.Button>
                  </Tooltip>
                  <Tooltip title={t('tools.markdownEditor.modes.split')}>
                    <Radio.Button value="split"><LayoutOutlined /></Radio.Button>
                  </Tooltip>
                  <Tooltip title={t('tools.markdownEditor.modes.preview')}>
                    <Radio.Button value="preview"><EyeOutlined /></Radio.Button>
                  </Tooltip>
                </Radio.Group>
              </div>

              <Tooltip title={t('tools.markdownEditor.help.title')}>
                <Button icon={<QuestionCircleOutlined />} onClick={() => setHelpVisible(true)} />
              </Tooltip>
              <Tooltip title={t('common.copy')}>
                <Button icon={<CopyOutlined />} onClick={handleCopy} />
              </Tooltip>
              <Tooltip title={t('common.download')}>
                <Button icon={<DownloadOutlined />} onClick={handleDownloadMd} />
              </Tooltip>
              <Tooltip title={t('common.clear')}>
                <Button danger icon={<DeleteOutlined />} onClick={handleClear} />
              </Tooltip>
            </Space>
          </div>
        </div>

        {/* Mobile Tabs */}
        <div className="mobile-tabs">
          <Segmented
            block
            value={activeTab}
            onChange={(val) => setActiveTab(val as 'edit' | 'preview')}
            options={[
              { label: '编辑', value: 'edit', icon: <EditOutlined /> },
              { label: '预览', value: 'preview', icon: <EyeOutlined /> },
            ]}
          />
        </div>

        <div className={`editor-wrapper layout-${layout}`}>
          {/* Editor Pane */}
          <div className={`pane editor-pane ${activeTab === 'edit' ? 'active' : ''}`}>
            <Editor
              height="100%"
              defaultLanguage="markdown"
              value={markdown}
              onChange={(value) => setMarkdown(value || '')}
              theme={themeStore.isDarkMode ? 'vs-dark' : 'light'}
              options={{
                minimap: { enabled: false },
                wordWrap: 'on',
                lineNumbers: 'off',
                padding: { top: 16, bottom: 16 },
                fontSize: 14,
              }}
            />
          </div>

          {/* Preview Pane */}
          <div className={`pane preview-pane ${activeTab === 'preview' ? 'active' : ''}`}>
            <div className={`markdown-body ${themeStore.isDarkMode ? 'markdown-body-dark' : ''}`}>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {markdown}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title={t('tools.markdownEditor.help.title')}
        open={helpVisible}
        onCancel={() => setHelpVisible(false)}
        footer={null}
        width={600}
      >
        {helpContent}
      </Modal>
    </>
  );
};

export default observer(MarkdownEditor);
