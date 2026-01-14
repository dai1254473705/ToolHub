import type { ThemeConfig as AntdThemeConfig } from 'antd';
import { theme } from 'antd';
const { defaultAlgorithm, darkAlgorithm } = theme;

export type ThemeConfig = AntdThemeConfig;

/**
 * Developer Tools 主题配置
 * 采用现代化的 Violet/Indigo 配色，增加圆角和阴影，提升视觉体验
 */

// 浅色主题
export const defaultTheme: ThemeConfig = {
  algorithm: defaultAlgorithm,
  token: {
    fontSize: 14,
    fontFamily: "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    colorPrimary: '#8b5cf6', // Violet 500 - 更时尚的紫色
    colorSuccess: '#10B981',
    colorWarning: '#F59E0B',
    colorError: '#EF4444',
    colorInfo: '#8b5cf6',
    borderRadius: 10,         // 增加圆角
    borderRadiusLG: 16,
    borderRadiusSM: 6,
    // 背景色微调
    colorBgBase: '#ffffff',
    colorBgContainer: '#ffffff',
    colorBgLayout: '#f8fafc', // Slate 50 - 极淡的灰背景，避免纯白刺眼
    colorText: '#1e293b',     // Slate 800
    colorTextSecondary: '#64748b',
    colorBorder: '#e2e8f0',
  },
  components: {
    Button: {
      borderRadius: 10,
      controlHeight: 40,
      controlHeightLG: 48,
      controlHeightSM: 32,
      fontWeight: 500,
      defaultShadow: '0 2px 0 rgba(0, 0, 0, 0.02)',
      primaryShadow: '0 4px 14px 0 rgba(139, 92, 246, 0.39)', // 紫色阴影
    },
    Input: {
      borderRadius: 10,
      controlHeight: 40,
      activeBorderColor: '#8b5cf6',
      hoverBorderColor: '#a78bfa',
    },
    Card: {
      borderRadiusLG: 16,
      boxShadowTertiary: '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
    },
    Menu: {
      borderRadius: 10,
      itemBorderRadius: 8,
    },
    Typography: {
      fontFamilyCode: "'Fira Code', 'JetBrains Mono', monospace",
    }
  },
};

// 深色主题
export const darkTheme: ThemeConfig = {
  algorithm: darkAlgorithm,
  token: {
    fontSize: 14,
    fontFamily: "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    colorPrimary: '#a78bfa', // Violet 400 - 深色模式下稍亮
    colorSuccess: '#34d399',
    colorWarning: '#fbbf24',
    colorError: '#f87171',
    colorInfo: '#a78bfa',
    borderRadius: 10,
    borderRadiusLG: 16,
    borderRadiusSM: 6,
    
    colorBgBase: '#0f172a',        // Slate 900
    colorBgContainer: '#1e293b',   // Slate 800
    colorBgLayout: '#020617',      // Slate 950
    colorText: '#f8fafc',
    colorTextSecondary: '#94a3b8',
    colorBorder: '#334155',
  },
  components: {
    Button: {
      borderRadius: 10,
      fontWeight: 500,
      primaryShadow: '0 4px 14px 0 rgba(139, 92, 246, 0.2)',
    },
    Input: {
      borderRadius: 10,
      colorBgContainer: '#1e293b',
      colorBorder: '#334155',
    },
    Card: {
      borderRadiusLG: 16,
      colorBgContainer: '#1e293b',
    },
    Menu: {
      borderRadius: 10,
      itemBorderRadius: 8,
      darkItemBg: 'transparent',
    },
  },
};

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
