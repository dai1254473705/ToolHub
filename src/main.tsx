import 'uno.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './router';
import ThemeProvider from './components/ThemeProvider';
import './styles/global.less';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  </React.StrictMode>,
);
