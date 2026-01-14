/**
 * 主布局组件 - 带侧边栏的响应式布局
 */
import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import AppHeader from './Header';
import Sidebar from './Sidebar';
import './index.less';

const { Content } = Layout;

const AppLayout: React.FC = () => {
  return (
    <Layout className="app-layout">
      {/* 顶部导航栏 - 移动端显示 */}
      <div className="header-wrapper">
        <AppHeader showSearch={false} />
      </div>

      <Layout className="main-layout">
        {/* 左侧边栏 - 桌面端显示 */}
        <Sidebar />

        {/* 主内容区域 */}
        <Content className="app-content">
          <div className="content-wrapper">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
