import type { ThemeConfig as AntdThemeConfig } from 'antd';
import { theme } from 'antd';
const { defaultAlgorithm, darkAlgorithm } = theme;

export type ThemeConfig = AntdThemeConfig;

// 默认主题配置
export const defaultTheme: ThemeConfig = {
  algorithm: defaultAlgorithm,
  token: {
    fontSize: 14,
    colorPrimary: '#1890ff',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#f5222d',
    borderRadius: 6,
  },
  components: {
    Button: {
      borderRadius: 6,
    },
    Input: {
      borderRadius: 6,
    },
  },
};

// 深色主题配置
export const darkTheme: ThemeConfig = {
  algorithm: darkAlgorithm,
  token: {
    fontSize: 14,
    colorPrimary: '#40a9ff',
    colorSuccess: '#73d13d',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    borderRadius: 6,
  },
};

// 根据主色调生成自定义主题
export function generateTheme(primaryColor: string, isDark: boolean = false): ThemeConfig {
  return {
    algorithm: isDark ? darkAlgorithm : defaultAlgorithm,
    token: {
      colorPrimary: primaryColor,
      borderRadius: 6,
    },
  };
}