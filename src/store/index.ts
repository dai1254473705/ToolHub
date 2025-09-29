import { makeAutoObservable } from 'mobx';

// 主题状态管理
class ThemeStore {
  isDarkMode = false;
  primaryColor = '#1890ff'; // 默认蓝色
  currentTheme = 'default';

  constructor() {
    makeAutoObservable(this);
    // 从localStorage加载主题设置
    this.loadThemeSettings();
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    this.saveThemeSettings();
  }

  setPrimaryColor(color: string) {
    this.primaryColor = color;
    this.saveThemeSettings();
  }

  setTheme(theme: string) {
    this.currentTheme = theme;
    this.saveThemeSettings();
  }

  saveThemeSettings() {
    localStorage.setItem('themeSettings', JSON.stringify({
      isDarkMode: this.isDarkMode,
      primaryColor: this.primaryColor,
      currentTheme: this.currentTheme
    }));
  }

  loadThemeSettings() {
    const saved = localStorage.getItem('themeSettings');
    if (saved) {
      try {
        const settings = JSON.parse(saved);
        this.isDarkMode = settings.isDarkMode || false;
        this.primaryColor = settings.primaryColor || '#1890ff';
        this.currentTheme = settings.currentTheme || 'default';
      } catch (e) {
        console.error('Failed to load theme settings', e);
      }
    }
  }
}

// 工具使用历史记录管理
class HistoryStore {
  recentTools: { id: string; name: string; timestamp: number }[] = [];
  MAX_HISTORY = 20;

  constructor() {
    makeAutoObservable(this);
    this.loadHistory();
  }

  addToHistory(id: string, name: string) {
    // 移除已存在的相同工具
    this.recentTools = this.recentTools.filter(tool => tool.id !== id);
    // 添加到开头
    this.recentTools.unshift({ id, name, timestamp: Date.now() });
    // 限制历史记录数量
    if (this.recentTools.length > this.MAX_HISTORY) {
      this.recentTools = this.recentTools.slice(0, this.MAX_HISTORY);
    }
    this.saveHistory();
  }

  clearHistory() {
    this.recentTools = [];
    this.saveHistory();
  }

  saveHistory() {
    localStorage.setItem('toolHistory', JSON.stringify(this.recentTools));
  }

  loadHistory() {
    const saved = localStorage.getItem('toolHistory');
    if (saved) {
      try {
        this.recentTools = JSON.parse(saved);
      } catch (e) {
        console.error('Failed to load tool history', e);
      }
    }
  }
}

// 创建store实例
const themeStore = new ThemeStore();
const historyStore = new HistoryStore();

// 导出所有store
export { themeStore, historyStore };