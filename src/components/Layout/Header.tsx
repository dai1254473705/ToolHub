/**
 * Header 组件 - 简洁的顶部导航
 */
import React from 'react';
import { Layout, Button, Space } from 'antd';
import {
  MoonOutlined,
  SunOutlined,
  GithubOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { themeStore } from '@/store';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import './Header.less';

const { Header } = Layout;

interface AppHeaderProps {
  showSearch?: boolean;
}

const AppHeader: React.FC<AppHeaderProps> = () => {
  const { t } = useTranslation();
  const handleThemeToggle = () => {
    themeStore.toggleDarkMode();
  };

  return (
    <Header className="app-header">
      <div className="header-content">
        <div className="header-left">
          <Link to="/" className="logo">
            <span className="logo-icon">⚡</span>
            <span className="logo-text">{t('app.name')}</span>
          </Link>
        </div>

        <div className="header-right">
          <Space size="middle">
            <LanguageSwitcher />
            <Button
              type="text"
              icon={themeStore.isDarkMode ? <SunOutlined /> : <MoonOutlined />}
              onClick={handleThemeToggle}
              className="theme-toggle"
            />
            <Button
              type="text"
              icon={<GithubOutlined />}
              href="https://github.com/dai1254473705/ToolHub"
              target="_blank"
              className="github-link"
            />
          </Space>
        </div>
      </div>
    </Header>
  );
};

export default observer(AppHeader);
