/**
 * 工具分类配置
 */
export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
}

export const CATEGORIES: Category[] = [
  {
    id: 'code',
    name: '代码处理',
    icon: 'CodeOutlined',
    description: 'JSON 编辑器、正则表达式测试等工具',
    color: '#1677ff',
  },
  {
    id: 'convert',
    name: '转换工具',
    icon: 'SwapOutlined',
    description: 'Base64、URL 编码、时间戳、Unicode 转换等',
    color: '#52c41a',
  },
  {
    id: 'crypto',
    name: '加密解密',
    icon: 'LockOutlined',
    description: '哈希算法、UUID 生成等',
    color: '#faad14',
  },
  {
    id: 'image',
    name: '图片处理',
    icon: 'PictureOutlined',
    description: 'Favicon 图标生成、图片转 Base64 等',
    color: '#eb2f96',
  },
  {
    id: 'text',
    name: '文本处理',
    icon: 'FileTextOutlined',
    description: '文本对比、去重、Markdown 编辑器等',
    color: '#722ed1',
  },
  {
    id: 'color',
    name: '颜色工具',
    icon: 'BgColorsOutlined',
    description: '颜色格式转换、调色板等',
    color: '#fa541c',
  },
  {
    id: 'productivity',
    name: '效率工具',
    icon: 'ThunderboltOutlined',
    description: '待办事项管理、二维码生成等',
    color: '#fa8c16',
  },
];
