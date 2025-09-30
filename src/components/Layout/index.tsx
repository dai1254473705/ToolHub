import React from "react";
import { Layout as AntLayout, Menu, Button, Switch } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SunOutlined,
  MoonOutlined,
  HomeOutlined,
  DatabaseOutlined,
  LockOutlined,
  CodeOutlined,
  PictureOutlined,
  CheckCircleOutlined
} from "@ant-design/icons";
import { Outlet, Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { themeStore } from "../../store";
import Loading from "../Loading";
import 'src/components/Layout/index.less';

const { Header, Sider, Content, Footer } = AntLayout;

const AppLayout: React.FC = () => {
  const [collapsed, setCollapsed] = React.useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const toggleTheme = () => {
    themeStore.toggleDarkMode();
  };

  return (
    <AntLayout className="min-h-screen">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800"
      >
        <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-800">
          <h1 className={`logo text-xl font-bold ${collapsed ? "hidden" : "block"}`}>
           ToolHub
          </h1>
          {collapsed && <div className="logo collapsed"/>}
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={["home"]}
          className="h-[calc(100vh-4rem)] border-0"
          items={[
            {
              key: "home",
              icon: <HomeOutlined />,
              label: <Link to="/">首页</Link>,
            },
            {
              key: "data-tools",
              icon: <DatabaseOutlined />,
              label: <Link to="/data-tools">数据处理</Link>,
            },
            {
              key: "encryption-tools",
              icon: <LockOutlined />,
              label: <Link to="/encryption-tools">编码加密</Link>,
            },
            {
              key: "dev-tools",
              icon: <CodeOutlined />,
              label: <Link to="/dev-tools">开发辅助</Link>,
            },
            {
              key: "favicon-generator",
              icon: <PictureOutlined />,
              label: <Link to="/favicon-generator">Favicon生成</Link>,
            },
            // 移除错误的导入语句
            
            // 在Menu的items数组中添加
            {              
              key: "todo-list",
              icon: <CheckCircleOutlined />,
              label: <Link to="/todo-list">任务管理</Link>,
            },
          ]}
        />
      </Sider>
      <AntLayout className="bg-white dark:bg-gray-900">
        <Header className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleCollapsed}
            className="mr-2"
          />
          <div className="text-lg font-medium">
            <Loading className="top-loading"/>
          </div>
          <div className="flex items-center">
            <Switch
              checked={themeStore.isDarkMode}
              onChange={toggleTheme}
              checkedChildren={<MoonOutlined />}
              unCheckedChildren={<SunOutlined />}
            />
          </div>
        </Header>
        <Content className="p-6 bg-gray-50 dark:bg-gray-900 min-h-[calc(100vh-8rem)]">
          <Outlet />
        </Content>
        <Footer className="text-center py-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          ToolHub © {new Date().getFullYear()} - 多功能在线工具集合
        </Footer>
      </AntLayout>
    </AntLayout>
  );
};

export default observer(AppLayout);
