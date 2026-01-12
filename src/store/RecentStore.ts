/**
 * 最近使用工具状态管理
 */
import { makeAutoObservable } from 'mobx';
import localforage from 'localforage';

const RECENT_KEY = 'recent_tools';
const MAX_RECENT = 10;

class RecentStore {
  recentTools: string[] = [];

  constructor() {
    makeAutoObservable(this);
    this.loadRecent();
  }

  /**
   * 加载最近使用列表
   */
  async loadRecent() {
    try {
      const saved = await localforage.getItem<string[]>(RECENT_KEY);
      if (saved) {
        this.recentTools = saved;
      }
    } catch (error) {
      console.error('Failed to load recent tools:', error);
    }
  }

  /**
   * 保存最近使用列表
   */
  async saveRecent() {
    try {
      await localforage.setItem(RECENT_KEY, this.recentTools);
    } catch (error) {
      console.error('Failed to save recent tools:', error);
    }
  }

  /**
   * 添加工具到最近使用
   */
  async addRecent(toolId: string) {
    // 移除已存在的
    this.recentTools = this.recentTools.filter(id => id !== toolId);
    // 添加到开头
    this.recentTools.unshift(toolId);
    // 限制数量
    if (this.recentTools.length > MAX_RECENT) {
      this.recentTools = this.recentTools.slice(0, MAX_RECENT);
    }
    await this.saveRecent();
  }

  /**
   * 清空最近使用
   */
  async clearRecent() {
    this.recentTools = [];
    await this.saveRecent();
  }

  /**
   * 移除指定的最近使用
   */
  async removeRecent(toolId: string) {
    this.recentTools = this.recentTools.filter(id => id !== toolId);
    await this.saveRecent();
  }
}

export const recentStore = new RecentStore();
