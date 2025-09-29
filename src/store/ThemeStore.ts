/*
 * @Author: daiyunzhou daiyunz@chanjet.com
 * @Date: 2025-09-29 20:28:17
 * @LastEditors: daiyunzhou daiyunz@chanjet.com
 * @LastEditTime: 2025-09-29 20:28:47
 * @Description: 主题状态管理
 */

import { makeAutoObservable } from 'mobx';

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
export {ThemeStore};
