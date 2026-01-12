export interface WebsiteBookmark {
  id: string;
  title: string;
  url: string;
  logoUrl: string;
  category: string;
  createdAt: number;
  updatedAt: number;
}

// 预定义的分类
export const CATEGORIES = [
  '开发工具',
  '学习资源',
  '设计工具',
  '生活服务',
  '娱乐休闲',
  '其他'
];