import type { WebsiteBookmark } from '../types/website';

const STORAGE_KEY = 'toolhub_website_bookmarks';

// 获取所有收藏的网站
export const getAllWebsites = (): WebsiteBookmark[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('获取网站收藏失败:', error);
    return [];
  }
};

// 保存网站到收藏
export const saveWebsite = (website: Omit<WebsiteBookmark, 'id' | 'createdAt' | 'updatedAt'>): WebsiteBookmark => {
  try {
    const websites = getAllWebsites();
    const newWebsite: WebsiteBookmark = {
      ...website,
      id: `website_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    websites.push(newWebsite);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(websites));
    return newWebsite;
  } catch (error) {
    console.error('保存网站收藏失败:', error);
    throw error;
  }
};

// 更新收藏的网站
export const updateWebsite = (website: WebsiteBookmark): WebsiteBookmark => {
  try {
    const websites = getAllWebsites();
    const index = websites.findIndex(w => w.id === website.id);
    if (index !== -1) {
      websites[index] = {
        ...website,
        updatedAt: Date.now()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(websites));
    }
    return website;
  } catch (error) {
    console.error('更新网站收藏失败:', error);
    throw error;
  }
};

// 删除收藏的网站
export const deleteWebsite = (id: string): void => {
  try {
    const websites = getAllWebsites();
    const filteredWebsites = websites.filter(w => w.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredWebsites));
  } catch (error) {
    console.error('删除网站收藏失败:', error);
    throw error;
  }
};

// 拖拽排序后保存新顺序
export const reorderWebsites = (websites: WebsiteBookmark[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(websites));
  } catch (error) {
    console.error('排序网站收藏失败:', error);
    throw error;
  }
};