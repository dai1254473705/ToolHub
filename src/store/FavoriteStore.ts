/**
 * 收藏工具状态管理
 */
import { makeAutoObservable } from 'mobx';
import localforage from 'localforage';

const FAVORITE_KEY = 'favorite_tools';

class FavoriteStore {
  favorites: string[] = [];

  constructor() {
    makeAutoObservable(this);
    this.loadFavorites();
  }

  /**
   * 加载收藏列表
   */
  async loadFavorites() {
    try {
      const saved = await localforage.getItem<string[]>(FAVORITE_KEY);
      if (saved) {
        this.favorites = saved;
      }
    } catch (error) {
      console.error('Failed to load favorites:', error);
    }
  }

  /**
   * 保存收藏列表
   */
  async saveFavorites() {
    try {
      await localforage.setItem(FAVORITE_KEY, this.favorites);
    } catch (error) {
      console.error('Failed to save favorites:', error);
    }
  }

  /**
   * 切换收藏状态
   */
  async toggleFavorite(toolId: string) {
    const index = this.favorites.indexOf(toolId);
    if (index > -1) {
      this.favorites.splice(index, 1);
    } else {
      this.favorites.push(toolId);
    }
    await this.saveFavorites();
  }

  /**
   * 检查是否已收藏
   */
  isFavorite(toolId: string): boolean {
    return this.favorites.includes(toolId);
  }

  /**
   * 清空收藏
   */
  async clearFavorites() {
    this.favorites = [];
    await this.saveFavorites();
  }
}

export const favoriteStore = new FavoriteStore();
