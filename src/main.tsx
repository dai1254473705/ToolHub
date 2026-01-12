import 'uno.css';
import './styles/global.less';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import AppRouter from './router';
import ThemeProvider from './components/ThemeProvider';
import Analytics from './components/Analytics';
import '@/i18n/config';
import '@ant-design/v5-patch-for-react-19';

// 统计配置 - Google Analytics ID
const GOOGLE_ANALYTICS_ID = import.meta.env.VITE_GA_ID || 'G-BGCNYGE4W5';
const BAIDU_ANALYTICS_ID = import.meta.env.VITE_BAIDU_ID || '';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <Analytics
          googleAnalyticsId={GOOGLE_ANALYTICS_ID}
          baiduAnalyticsId={BAIDU_ANALYTICS_ID}
        />
        <AppRouter />
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>,
);
