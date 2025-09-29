/*
 * @Author: daiyunzhou daiyunz@qq.com
 * @Date: 2025-09-29 20:29:32
 * @LastEditors: daiyunzhou daiyunz@qq.com
 * @LastEditTime: 2025-09-29 20:29:49
 * @Description: 工具使用历史记录管理
 */

import { makeAutoObservable } from 'mobx';
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


export { HistoryStore };