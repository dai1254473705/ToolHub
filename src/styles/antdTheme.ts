import type { ThemeConfig as AntdThemeConfig } from 'antd';
import { theme } from 'antd';
const { defaultAlgorithm, darkAlgorithm } = theme;

export type ThemeConfig = AntdThemeConfig;

/**
 * Developer Tools 主题配置
 * 基于开发者工具的最佳实践，采用深色语法主题配色
 */

// 浅色主题（默认）
export const defaultTheme: ThemeConfig = {
  algorithm: defaultAlgorithm,
  token: {
    fontSize: 14,
    fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    colorPrimary: '#3B82F6', // 专业的蓝色
    colorSuccess: '#10B981', // 绿色
    colorWarning: '#F59E0B', // 橙色
    colorError: '#EF4444',   // 红色
    colorInfo: '#3B82F6',    // 信息蓝
    borderRadius: 8,         // 更圆润的边角
    borderRadiusLG: 12,
    borderRadiusSM: 6,
    // 背景和文本颜色
    colorBgBase: '#FFFFFF',
    colorBgContainer: '#F8FAFC',
    colorBgElevated: '#FFFFFF',
    colorBgLayout: '#F1F5F9',
    colorText: '#1E293B',
    colorTextSecondary: '#64748B',
    colorTextTertiary: '#94A3B8',
    colorBorder: '#E2E8F0',
    colorBorderSecondary: '#F1F5F9',
  },
  components: {
    Button: {
      borderRadius: 8,
      fontWeight: 500,
      controlHeight: 40,
      controlHeightLG: 48,
      controlHeightSM: 32,
    },
    Input: {
      borderRadius: 8,
      controlHeight: 40,
      activeBorderColor: '#3B82F6',
      hoverBorderColor: '#60A5FA',
    },
    Card: {
      borderRadiusLG: 12,
    },
    Menu: {
      borderRadius: 8,
      itemBorderRadius: 6,
    },
  },
};

// 深色主题（开发者友好的暗色主题）
export const darkTheme: ThemeConfig = {
  algorithm: darkAlgorithm,
  token: {
    fontSize: 14,
    fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    colorPrimary: '#3B82F6', // 保持一致的蓝色
    colorSuccess: '#10B981',
    colorWarning: '#F59E0B',
    colorError: '#EF4444',
    colorInfo: '#3B82F6',
    borderRadius: 8,
    borderRadiusLG: 12,
    borderRadiusSM: 6,
    // 深色主题配色 - 专为开发者优化
    colorBgBase: '#0F172A',        // 深色背景
    colorBgContainer: '#1E293B',   // 容器背景
    colorBgElevated: '#1E293B',    // 浮层背景
    colorBgLayout: '#0F172A',      // 布局背景
    colorText: '#F1F5F9',          // 主文本
    colorTextSecondary: '#94A3B8', // 次要文本
    colorTextTertiary: '#64748B',  // 三级文本
    colorBorder: '#334155',        // 边框颜色
    colorBorderSecondary: '#1E293B',
  },
  components: {
    Button: {
      borderRadius: 8,
      fontWeight: 500,
      colorPrimary: '#3B82F6',
      algorithm: true, // 使用暗色算法
    },
    Input: {
      borderRadius: 8,
      colorBgContainer: '#1E293B',
      colorBorder: '#334155',
      colorText: '#F1F5F9',
      colorTextPlaceholder: '#64748B',
    },
    Card: {
      borderRadiusLG: 12,
      colorBgContainer: '#1E293B',
      colorBorderSecondary: '#334155',
    },
    Menu: {
      borderRadius: 8,
      itemBorderRadius: 6,
      darkItemBg: 'transparent',
      darkItemSelectedBg: 'rgba(59, 130, 246, 0.15)',
      darkItemHoverBg: 'rgba(59, 130, 246, 0.08)',
    },
  },
};

// 根据主色调生成自定义主题
export function generateTheme(primaryColor: string, isDark: boolean = false): ThemeConfig {
  const baseTheme = isDark ? darkTheme : defaultTheme;
  return {
    ...baseTheme,
    token: {
      ...baseTheme.token,
      colorPrimary: primaryColor,
    },
  };
}
