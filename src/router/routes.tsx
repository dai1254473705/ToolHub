/**
 * 路由配置
 */
import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

// 懒加载页面组件
const Home = lazy(() => import('@/pages/Home'));
const NotFound = lazy(() => import('@/pages/NotFound'));

// 工具页面 - 懒加载
const JSONEditor = lazy(() => import('@/pages/tools/JSONEditor'));
const JSONDiff = lazy(() => import('@/pages/tools/JSONDiff'));
const FaviconGenerator = lazy(() => import('@/pages/tools/FaviconGenerator'));
const TodoList = lazy(() => import('@/pages/tools/TodoList'));
const Base64 = lazy(() => import('@/pages/tools/Base64'));
const Timestamp = lazy(() => import('@/pages/tools/Timestamp'));
const ColorConverter = lazy(() => import('@/pages/tools/ColorConverter'));

// 新增工具
const UUIDGenerator = lazy(() => import('@/pages/tools/UUIDGenerator'));
const Hash = lazy(() => import('@/pages/tools/Hash'));
const URLEncode = lazy(() => import('@/pages/tools/URLEncode'));
const QRCodeGenerator = lazy(() => import('@/pages/tools/QRCodeGenerator'));
const RegexTester = lazy(() => import('@/pages/tools/RegexTester'));
const TextDedup = lazy(() => import('@/pages/tools/TextDedup'));
const Unicode = lazy(() => import('@/pages/tools/Unicode'));
const ImageBase64 = lazy(() => import('@/pages/tools/ImageBase64'));

/**
 * 构建工具路由
 */
function buildToolRoutes(): RouteObject[] {
  return [
    // 代码处理
    {
      path: '/tools/json-editor',
      element: <JSONEditor />,
    },
    {
      path: '/tools/json-diff',
      element: <JSONDiff />,
    },
    {
      path: '/tools/regex-tester',
      element: <RegexTester />,
    },

    // 转换工具
    {
      path: '/tools/base64',
      element: <Base64 />,
    },
    {
      path: '/tools/url-encode',
      element: <URLEncode />,
    },
    {
      path: '/tools/timestamp',
      element: <Timestamp />,
    },
    {
      path: '/tools/unicode',
      element: <Unicode />,
    },

    // 加密解密
    {
      path: '/tools/hash',
      element: <Hash />,
    },
    {
      path: '/tools/uuid-generator',
      element: <UUIDGenerator />,
    },

    // 图片处理
    {
      path: '/tools/favicon-generator',
      element: <FaviconGenerator />,
    },
    {
      path: '/tools/image-base64',
      element: <ImageBase64 />,
    },

    // 文本处理
    {
      path: '/tools/text-dedup',
      element: <TextDedup />,
    },

    // 颜色工具
    {
      path: '/tools/color-converter',
      element: <ColorConverter />,
    },

    // 效率工具
    {
      path: '/tools/todo-list',
      element: <TodoList />,
    },
    {
      path: '/tools/qrcode-generator',
      element: <QRCodeGenerator />,
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
