import React, { useEffect } from 'react';
import { ConfigProvider } from 'antd';
import { observer } from 'mobx-react-lite';
import { themeStore } from '../../store';
import { generateTheme } from '../../styles/antdTheme';

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // 应用主题到body
  useEffect(() => {
    if (themeStore.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [themeStore.isDarkMode]);

  // 根据当前主题设置生成Ant Design主题配置
  const currentTheme = generateTheme(themeStore.primaryColor, themeStore.isDarkMode);

  return (
    <ConfigProvider theme={currentTheme}>
      {children}
    </ConfigProvider>
  );
};

export default observer(ThemeProvider);