/**
 * 主布局组件 - 带侧边栏的响应式布局
 */
import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import AppHeader from './Header';
import AppFooter from './Footer';
import Sidebar from './Sidebar';
import './index.less';

const { Content } = Layout;

const AppLayout: React.FC = () => {
  return (
    <Layout className="app-layout" style={{ minHeight: '100vh' }}>
      {/* 顶部导航栏 - 移动端显示 */}
      <div className="header-wrapper">
        <AppHeader showSearch={false} />
      </div>

      <Layout>
        {/* 左侧边栏 - 桌面端显示 */}
        <Sidebar />

        {/* 主内容区域 */}
        <Content className="app-content">
          <div className="content-wrapper">
            <Outlet />
          </div>
        </Content>
      </Layout>

      {/* 底部 */}
      <AppFooter />
    </Layout>
  );
};

export default AppLayout;
