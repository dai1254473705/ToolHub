/*
 * @Author: daiyunzhou daiyunz@chanjet.com
 * @Date: 2025-09-29 13:30:29
 * @LastEditors: daiyunzhou daiyunz@chanjet.com
 * @LastEditTime: 2025-09-29 20:30:43
 * @Description: 导出所有store
 */
import {HistoryStore} from './HistoryStore';
import {ThemeStore} from './ThemeStore';


// 创建store实例
const themeStore = new ThemeStore();
const historyStore = new HistoryStore();

// 导出所有store
export { themeStore, historyStore };