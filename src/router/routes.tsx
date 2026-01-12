/**
 * 路由配置
 */
import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

// 懒加载页面组件
const Home = lazy(() => import('@/pages/Home'));
const NotFound = lazy(() => import('@/pages/NotFound'));

// 工具页面 - 懒加载（只加载已实现的工具）
const JSONEditor = lazy(() => import('@/pages/tools/JSONEditor'));
const JSONDiff = lazy(() => import('@/pages/tools/JSONDiff'));
const FaviconGenerator = lazy(() => import('@/pages/tools/FaviconGenerator'));
const TodoList = lazy(() => import('@/pages/tools/TodoList'));
const Base64 = lazy(() => import('@/pages/tools/Base64'));
const Timestamp = lazy(() => import('@/pages/tools/Timestamp'));
const ColorConverter = lazy(() => import('@/pages/tools/ColorConverter'));

/**
 * 构建工具路由
 */
function buildToolRoutes(): RouteObject[] {
  return [
    {
      path: '/tools/json-editor',
      element: <JSONEditor />,
    },
    {
      path: '/tools/json-diff',
      element: <JSONDiff />,
    },
    {
      path: '/tools/base64',
      element: <Base64 />,
    },
    {
      path: '/tools/timestamp',
      element: <Timestamp />,
    },
    {
      path: '/tools/color-converter',
      element: <ColorConverter />,
    },
    {
      path: '/tools/favicon-generator',
      element: <FaviconGenerator />,
    },
    {
      path: '/tools/todo-list',
      element: <TodoList />,
    },
  ];
}

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  ...buildToolRoutes(),
  {
    path: '*',
    element: <NotFound />,
  },
];
