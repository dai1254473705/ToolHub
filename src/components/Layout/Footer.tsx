/**
 * Footer 组件
 */
import React from 'react';
import { Layout } from 'antd';
import { GithubOutlined, HeartFilled } from '@ant-design/icons';
import './Footer.less';

const { Footer: AntFooter } = Layout;

const AppFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <AntFooter className="app-footer">
      <div className="footer-content">
        <div className="footer-links">
          <a href="https://github.com/yourusername/ToolHub" target="_blank" rel="noopener noreferrer">
            <GithubOutlined /> GitHub
          </a>
          <a href="/about">关于我们</a>
          <a href="/privacy">隐私政策</a>
          <a href="/terms">使用条款</a>
        </div>
        <div className="footer-copyright">
          Made with <HeartFilled /> by ToolHub Team © {currentYear}
        </div>
      </div>
    </AntFooter>
  );
};

export default AppFooter;
