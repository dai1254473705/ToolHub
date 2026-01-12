/**
 * 路由配置
 */
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Suspense } from 'react';
import { Spin } from 'antd';
import Layout from '@/components/Layout';
import { routes } from './routes';

// 构建完整路由（包含 Layout）
const router = createBrowserRouter([
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