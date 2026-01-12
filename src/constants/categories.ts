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
    description: 'JSON 编辑器、格式化、对比等工具',
    color: '#1677ff',
  },
  {
    id: 'convert',
    name: '转换工具',
    icon: 'SwapOutlined',
    description: 'Base64、时间戳、编码转换等',
    color: '#52c41a',
  },
  {
    id: 'image',
    name: '图片处理',
    icon: 'PictureOutlined',
    description: 'Favicon 图标生成等',
    color: '#eb2f96',
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
    description: '待办事项管理、记事本等',
    color: '#fa8c16',
  },
];
