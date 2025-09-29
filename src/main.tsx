import 'uno.css';
import './styles/global.less';
import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './router';
import ThemeProvider from './components/ThemeProvider';
import '@ant-design/v5-patch-for-react-19';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  </React.StrictMode>,
);
