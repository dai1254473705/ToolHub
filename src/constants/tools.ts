/**
 * 工具配置文件
 */
export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  path: string;
  icon: string;
  iconColor?: string;
  tags: string[];
  isNew?: boolean;
  isHot?: boolean;
}

export const TOOLS: Tool[] = [
  // ========== 代码处理 ==========
  {
    id: 'json-editor',
    name: 'JSON 编辑器',
    description: '强大的 JSON 编辑器，支持语法高亮、错误检查、格式化',
    category: 'code',
    path: '/tools/json-editor',
    icon: 'CodeOutlined',
    tags: ['JSON', '编辑器', '格式化'],
    isHot: true,
  },
  {
    id: 'json-diff',
    name: 'JSON 对比',
    description: '对比两个 JSON 的差异，高亮显示不同之处',
    category: 'code',
    path: '/tools/json-diff',
    icon: 'DiffOutlined',
    tags: ['JSON', '对比', '差异'],
  },
  {
    id: 'regex-tester',
    name: '正则表达式测试',
    description: '实时测试正则表达式，高亮匹配结果',
    category: 'code',
    path: '/tools/regex-tester',
    icon: 'SearchOutlined',
    tags: ['正则', 'Regex', '测试'],
    isHot: true,
  },

  // ========== 转换工具 ==========
  {
    id: 'base64',
    name: 'Base64 编解码',
    description: 'Base64 编码和解码，支持文本和图片',
    category: 'convert',
    path: '/tools/base64',
    icon: 'KeyOutlined',
    tags: ['Base64', '编码', '解码'],
    isHot: true,
  },
  {
    id: 'url-encode',
    name: 'URL 编解码',
    description: 'URL 编码和解码',
    category: 'convert',
    path: '/tools/url-encode',
    icon: 'LinkOutlined',
    tags: ['URL', '编码', '解码'],
  },
  {
    id: 'timestamp',
    name: '时间戳转换',
    description: 'Unix 时间戳与日期时间互相转换',
    category: 'convert',
    path: '/tools/timestamp',
    icon: 'ClockCircleOutlined',
    tags: ['时间戳', '日期', '时间'],
    isHot: true,
  },
  {
    id: 'unicode',
    name: 'Unicode 转换',
    description: '中文和 Unicode 互相转换',
    category: 'convert',
    path: '/tools/unicode',
    icon: 'FontColorsOutlined',
    tags: ['Unicode', '中文', '转换'],
  },

  // ========== 加密解密 ==========
  {
    id: 'hash',
    name: '哈希计算',
    description: '计算 MD5、SHA-1、SHA-256 等哈希值',
    category: 'crypto',
    path: '/tools/hash',
    icon: 'SafetyOutlined',
    tags: ['MD5', 'SHA', '哈希'],
    isHot: true,
  },
  {
    id: 'uuid-generator',
    name: 'UUID 生成器',
    description: '生成 UUID v1 和 v4',
    category: 'crypto',
    path: '/tools/uuid-generator',
    icon: 'BlockOutlined',
    tags: ['UUID', '生成器', '唯一标识'],
    isNew: true,
  },

  // ========== 图片处理 ==========
  {
    id: 'favicon-generator',
    name: 'Favicon 生成器',
    description: '生成网站 Favicon 图标',
    category: 'image',
    path: '/tools/favicon-generator',
    icon: 'PictureOutlined',
    tags: ['Favicon', '图标', '生成'],
    isHot: true,
  },
  {
    id: 'image-base64',
    name: '图片转 Base64',
    description: '将图片转换为 Base64 编码',
    category: 'image',
    path: '/tools/image-base64',
    icon: 'FileImageOutlined',
    tags: ['Base64', '图片', '编码'],
  },

  // ========== 文本处理 ==========
  {
    id: 'text-diff',
    name: '文本对比',
    description: '对比两段文本的差异',
    category: 'text',
    path: '/tools/text-diff',
    icon: 'DiffOutlined',
    tags: ['对比', '差异', '文本'],
  },
  {
    id: 'text-dedup',
    name: '文本去重',
    description: '去除文本中的重复行',
    category: 'text',
    path: '/tools/text-dedup',
    icon: 'DeleteOutlined',
    tags: ['去重', '文本', '清理'],
  },
  {
    id: 'markdown-editor',
    name: 'Markdown 编辑器',
    description: 'Markdown 实时预览编辑器',
    category: 'text',
    path: '/tools/markdown-editor',
    icon: 'EditOutlined',
    tags: ['Markdown', '编辑器', '预览'],
  },

  // ========== 颜色工具 ==========
  {
    id: 'color-converter',
    name: '颜色转换',
    description: 'HEX、RGB、HSL、HSV 等格式转换',
    category: 'color',
    path: '/tools/color-converter',
    icon: 'BgColorsOutlined',
    tags: ['颜色', '转换', 'HEX', 'RGB'],
    isHot: true,
  },

  // ========== 效率工具 ==========
  {
    id: 'todo-list',
    name: '待办事项',
    description: '管理你的待办事项',
    category: 'productivity',
    path: '/tools/todo-list',
    icon: 'CheckCircleOutlined',
    tags: ['Todo', '任务', '管理'],
    isHot: true,
  },
  {
    id: 'qrcode-generator',
    name: '二维码生成',
    description: '生成二维码图片',
    category: 'productivity',
    path: '/tools/qrcode-generator',
    icon: 'QrcodeOutlined',
    tags: ['二维码', 'QR Code', '生成'],
    isHot: true,
  },
];

/**
 * 获取指定分类的工具
 */
export function getToolsByCategory(categoryId: string): Tool[] {
  return TOOLS.filter(tool => tool.category === categoryId);
}

/**
 * 根据关键词搜索工具
 */
export function searchTools(keyword: string): Tool[] {
  const lowerKeyword = keyword.toLowerCase();
  return TOOLS.filter(tool =>
    tool.name.toLowerCase().includes(lowerKeyword) ||
    tool.description.toLowerCase().includes(lowerKeyword) ||
    tool.tags.some(tag => tag.toLowerCase().includes(lowerKeyword))
  );
}

/**
 * 获取热门工具
 */
export function getHotTools(): Tool[] {
  return TOOLS.filter(tool => tool.isHot);
}

/**
 * 获取最新工具
 */
export function getNewTools(): Tool[] {
  return TOOLS.filter(tool => tool.isNew);
}

/**
 * 根据 ID 获取工具
 */
export function getToolById(id: string): Tool | undefined {
  return TOOLS.find(tool => tool.id === id);
}
