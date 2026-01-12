/**
 * Header 组件
 */
import React from 'react';
import { Layout, Input, Switch, Button, Space } from 'antd';
import {
  MoonOutlined,
  SunOutlined,
  SearchOutlined,
  HomeOutlined,
  GithubOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { themeStore } from '@/store';
import './Header.less';

const { Header } = Layout;
const { Search } = Input;

interface AppHeaderProps {
  showSearch?: boolean;
}

const AppHeader: React.FC<AppHeaderProps> = ({ showSearch = true }) => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = React.useState('');

  const handleSearch = (value: string) => {
    if (value.trim()) {
      // 跳转到首页并传递搜索参数
      navigate(`/?search=${encodeURIComponent(value.trim())}`);
    }
  };

  const handleThemeToggle = () => {
    themeStore.toggleDarkMode();
  };

  return (
    <Header className="app-header">
      <div className="header-content">
        <div className="header-left">
          <Link to="/" className="logo">
            <span className="logo-icon">⚡</span>
            <span className="logo-text">ToolHub</span>
          </Link>
        </div>

        {showSearch && (
          <div className="header-center">
            <Search
              placeholder="搜索工具..."
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onSearch={handleSearch}
              className="search-bar"
              style={{ width: 400 }}
            />
          </div>
        )}

        <div className="header-right">
          <Space size="middle">
            <Link to="/">
              <Button type="text" icon={<HomeOutlined />}>
                首页
              </Button>
            </Link>
            <Switch
              checked={themeStore.isDarkMode}
              onChange={handleThemeToggle}
              checkedChildren={<MoonOutlined />}
              unCheckedChildren={<SunOutlined />}
            />
            <Button
              type="text"
              icon={<GithubOutlined />}
              href="https://github.com/yourusername/ToolHub"
              target="_blank"
            />
          </Space>
        </div>
      </div>
    </Header>
  );
};

export default observer(AppHeader);
