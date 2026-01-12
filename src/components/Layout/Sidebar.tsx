/**
 * Sidebar 组件 - 左侧导航栏
 * 支持折叠/展开、响应式设计、玻璃拟态效果
 */
import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Drawer } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CodeOutlined,
  SwapOutlined,
  PictureOutlined,
  BgColorsOutlined,
  ThunderboltOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { useLocation, Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { CATEGORIES } from '@/constants/categories';
import { TOOLS } from '@/constants/tools';
import { themeStore } from '@/store';
import './Sidebar.less';

const { Sider } = Layout;

// 图标映射
const iconMap: Record<string, React.ReactNode> = {
  CodeOutlined: <CodeOutlined />,
  SwapOutlined: <SwapOutlined />,
  PictureOutlined: <PictureOutlined />,
  BgColorsOutlined: <BgColorsOutlined />,
  ThunderboltOutlined: <ThunderboltOutlined />,
};

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // 监听屏幕尺寸变化
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenWidth(width);
      // 在小屏幕上自动折叠
      if (width < 1024) {
        setCollapsed(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // 初始化

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 判断当前路由是否激活
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // 生成菜单项
  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link to="/">首页</Link>,
    },
    ...CATEGORIES.map((category) => ({
      key: category.id,
      icon: iconMap[category.icon as keyof typeof iconMap] || <SwapOutlined />,
      label: category.name,
      children: TOOLS.filter((tool) => tool.category === category.id).map((tool) => ({
        key: tool.path,
        label: (
          <Link
            to={tool.path}
            className={
              isActive(tool.path) ? 'active-menu-item sidebar-menu-link' : 'sidebar-menu-link'
            }
            onClick={() => {
              if (screenWidth < 1024) {
                setMobileDrawerOpen(false);
              }
            }}
          >
            {tool.name}
          </Link>
        ),
        icon: null,
      })),
    })),
  ];

  // 移动端抽屉内容
  const drawerContent = (
    <div className="sidebar-drawer-content">
      <div className="sidebar-header">
        <Link to="/" onClick={() => setMobileDrawerOpen(false)} className="logo">
          <span className="logo-icon">⚡</span>
          <span className="logo-text">ToolHub</span>
        </Link>
      </div>
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        defaultOpenKeys={CATEGORIES.map((c) => c.id)}
        style={{ borderRight: 0 }}
        className="sidebar-menu"
        items={menuItems}
      />
    </div>
  );

  // 移动端使用抽屉
  if (screenWidth < 1024) {
    return (
      <>
        {/* 移动端汉堡菜单按钮 */}
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setMobileDrawerOpen(true)}
          className="mobile-menu-button"
          style={{
            position: 'fixed',
            top: 72,
            left: 16,
            zIndex: 1000,
            display: mobileDrawerOpen ? 'none' : 'flex',
          }}
        />
        <Drawer
          title={null}
          placement="left"
          onClose={() => setMobileDrawerOpen(false)}
          open={mobileDrawerOpen}
          width={280}
          styles={{
            body: { padding: 0 },
          }}
          className="sidebar-drawer"
        >
          {drawerContent}
        </Drawer>
      </>
    );
  }

  // 桌面端侧边栏
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      collapsedWidth={80}
      width={280}
      theme={themeStore.isDarkMode ? 'dark' : 'light'}
      className={`sidebar ${className} ${themeStore.isDarkMode ? 'dark' : 'light'}`}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'sticky',
        top: 0,
        left: 0,
        // 玻璃拟态效果
        background: themeStore.isDarkMode
          ? 'rgba(15, 23, 42, 0.95)'
          : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRight: themeStore.isDarkMode ? '1px solid rgba(51, 65, 85, 0.5)' : '1px solid rgba(226, 232, 240, 0.8)',
      }}
    >
      {/* Logo */}
      <div className="sidebar-logo">
        <Link to="/" className="logo">
          {!collapsed ? (
            <>
              <span className="logo-icon">⚡</span>
              <span className="logo-text">ToolHub</span>
            </>
          ) : (
            <span className="logo-icon-collapsed">⚡</span>
          )}
        </Link>
      </div>

      {/* 菜单 */}
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        defaultOpenKeys={CATEGORIES.map((c) => c.id)}
        style={{ borderRight: 0 }}
        className="sidebar-menu"
        items={menuItems}
      />

      {/* 折叠按钮 */}
      <div className="sidebar-collapse-trigger">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          className="collapse-button"
        />
      </div>
    </Sider>
  );
};

export default observer(Sidebar);
