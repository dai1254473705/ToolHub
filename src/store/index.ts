/*
 * @Author: daiyunzhou daiyunz@qq.com
 * @Date: 2025-09-29 13:30:29
 * @LastEditors: daiyunzhou daiyunz@qq.com
 * @LastEditTime: 2025-09-29 20:30:43
 * @Description: 导出所有store
 */
import { ThemeStore } from './ThemeStore';
import { HistoryStore } from './HistoryStore';
import { favoriteStore } from './FavoriteStore';
import { recentStore } from './RecentStore';

// 创建store实例
const themeStore = new ThemeStore();
const historyStore = new HistoryStore();

// 导出所有store
export { themeStore, historyStore, favoriteStore, recentStore };