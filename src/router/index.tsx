/**
 * 路由配置
 */
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { Suspense } from 'react';
import { Spin } from 'antd';
import Layout from '@/components/Layout';
import { routes } from './routes';

// 使用 HashRouter 以支持 GitHub Pages
// URL 格式：https://dai1254473705.github.io/ToolHub/#/tools/json-editor
const router = createHashRouter([
  {
    path: '/',
    element: (
      <Suspense
        fallback={
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Spin size="large" />
          </div>
        }
      >
        <Layout />
      </Suspense>
    ),
    children: routes,
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}