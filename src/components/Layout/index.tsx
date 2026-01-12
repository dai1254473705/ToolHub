/**
 * 主布局组件
 */
import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import AppHeader from './Header';
import AppFooter from './Footer';
import './index.less';

const { Content } = Layout;

const AppLayout: React.FC = () => {
  return (
    <Layout className="app-layout">
      <AppHeader />
      <Content className="app-content">
        <div className="content-wrapper">
          <Outlet />
        </div>
      </Content>
      <AppFooter />
    </Layout>
  );
};

export default AppLayout;
