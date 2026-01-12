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
    id: 'json-yaml',
    name: 'JSON ↔ YAML',
    description: 'JSON 和 YAML 格式互相转换',
    category: 'code',
    path: '/tools/json-yaml',
    icon: 'SwapOutlined',
    tags: ['JSON', 'YAML', '转换'],
  },
  {
    id: 'json-csv',
    name: 'JSON ↔ CSV',
    description: 'JSON 和 CSV 格式互相转换',
    category: 'code',
    path: '/tools/json-csv',
    icon: 'TableOutlined',
    tags: ['JSON', 'CSV', '转换'],
  },
  {
    id: 'json-typescript',
    name: 'JSON 转 TypeScript',
    description: '将 JSON 转换为 TypeScript Interface',
    category: 'code',
    path: '/tools/json-typescript',
    icon: 'CodeSandboxOutlined',
    tags: ['JSON', 'TypeScript', 'Interface'],
    isNew: true,
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
  {
    id: 'code-formatter',
    name: '代码格式化',
    description: '格式化 JS、TS、HTML、CSS 代码',
    category: 'code',
    path: '/tools/code-formatter',
    icon: 'AlignLeftOutlined',
    tags: ['格式化', '美化', '代码'],
  },
  {
    id: 'code-minify',
    name: '代码压缩',
    description: '压缩 JS、CSS 代码，减小文件体积',
    category: 'code',
    path: '/tools/code-minify',
    icon: 'CompressOutlined',
    tags: ['压缩', 'Minify', '优化'],
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
  {
    id: 'hex-convert',
    name: '十六进制转换',
    description: '文本和十六进制互相转换',
    category: 'convert',
    path: '/tools/hex-convert',
    icon: 'NumberOutlined',
    tags: ['Hex', '十六进制', '转换'],
  },
  {
    id: 'yaml-json',
    name: 'YAML 转 JSON',
    description: 'YAML 和 JSON 互相转换',
    category: 'convert',
    path: '/tools/yaml-json',
    icon: 'SwapOutlined',
    tags: ['YAML', 'JSON', '转换'],
  },
  {
    id: 'xml-json',
    name: 'XML ↔ JSON',
    description: 'XML 和 JSON 互相转换',
    category: 'convert',
    path: '/tools/xml-json',
    icon: 'FileOutlined',
    tags: ['XML', 'JSON', '转换'],
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
    id: 'aes-encrypt',
    name: 'AES 加密解密',
    description: 'AES 对称加密和解密',
    category: 'crypto',
    path: '/tools/aes-encrypt',
    icon: 'LockOutlined',
    tags: ['AES', '加密', '解密'],
  },
  {
    id: 'uuid-generator',
    name: 'UUID 生成器',
    description: '生成 UUID v1 和 v4',
    category: 'crypto',
    path: '/tools/uuid-generator',
    icon: 'BlockOutlined',
    tags: ['UUID', '生成器', '唯一标识'],
  },
  {
    id: 'password-generator',
    name: '密码生成器',
    description: '生成安全的随机密码',
    category: 'crypto',
    path: '/tools/password-generator',
    icon: 'KeyOutlined',
    tags: ['密码', '生成器', '随机'],
    isNew: true,
  },

  // ========== 图片处理 ==========
  {
    id: 'image-cropper',
    name: '图片裁剪',
    description: '在线裁剪图片，支持自定义尺寸',
    category: 'image',
    path: '/tools/image-cropper',
    icon: 'ScissorOutlined',
    tags: ['裁剪', '图片', '编辑'],
  },
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
    id: 'image-compress',
    name: '图片压缩',
    description: '在线压缩图片，减小文件体积',
    category: 'image',
    path: '/tools/image-compress',
    icon: 'CompressOutlined',
    tags: ['压缩', '图片', '优化'],
  },
  {
    id: 'image-converter',
    name: '图片格式转换',
    description: 'PNG、JPG、WebP 等格式互转',
    category: 'image',
    path: '/tools/image-converter',
    icon: 'SwapOutlined',
    tags: ['转换', '格式', '图片'],
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
  {
    id: 'color-picker',
    name: '图片取色器',
    description: '从图片中提取颜色',
    category: 'image',
    path: '/tools/color-picker',
    icon: 'EyeOutlined',
    tags: ['取色', '图片', '颜色'],
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
    id: 'text-counter',
    name: '文本统计',
    description: '统计字数、行数、词频等',
    category: 'text',
    path: '/tools/text-counter',
    icon: 'BarChartOutlined',
    tags: ['统计', '字数', '计数'],
  },
  {
    id: 'case-convert',
    name: '大小写转换',
    description: '转换大小写、驼峰命名等',
    category: 'text',
    path: '/tools/case-convert',
    icon: 'FontSizeOutlined',
    tags: ['大小写', '驼峰', '命名'],
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
  {
    id: 'color-palette',
    name: '配色方案生成',
    description: '生成单色、互补、类比配色方案',
    category: 'color',
    path: '/tools/color-palette',
    icon: 'PaletteOutlined',
    tags: ['配色', '调色板', '方案'],
  },
  {
    id: 'gradient-generator',
    name: 'CSS 渐变生成',
    description: '生成 CSS 渐变代码',
    category: 'color',
    path: '/tools/gradient-generator',
    icon: 'LineChartOutlined',
    tags: ['渐变', 'CSS', '生成'],
  },

  // ========== 网络工具 ==========
  {
    id: 'url-parser',
    name: 'URL 解析器',
    description: '解析 URL 的各个组成部分',
    category: 'network',
    path: '/tools/url-parser',
    icon: 'LinkOutlined',
    tags: ['URL', '解析', '拆分'],
  },
  {
    id: 'query-string',
    name: 'Query String 构建器',
    description: '构建和解析 URL 查询参数',
    category: 'network',
    path: '/tools/query-string',
    icon: 'SearchOutlined',
    tags: ['Query', '参数', 'URL'],
  },
  {
    id: 'ip-info',
    name: 'IP 地址查询',
    description: '查询 IP 地址的详细信息',
    category: 'network',
    path: '/tools/ip-info',
    icon: 'GlobalOutlined',
    tags: ['IP', '查询', '信息'],
  },

  // ========== 开发辅助 ==========
  {
    id: 'cron-generator',
    name: 'Cron 表达式生成',
    description: '图形化生成 Cron 表达式',
    category: 'dev',
    path: '/tools/cron-generator',
    icon: 'ScheduleOutlined',
    tags: ['Cron', '定时任务', '表达式'],
    isNew: true,
  },
  {
    id: 'gitignore-generator',
    name: '.gitignore 生成器',
    description: '生成各种语言的 .gitignore 文件',
    category: 'dev',
    path: '/tools/gitignore-generator',
    icon: 'GithubOutlined',
    tags: ['Git', 'gitignore', '生成'],
  },
  {
    id: 'json-path',
    name: 'JSONPath 提取',
    description: '从 JSON 中提取指定路径的数据',
    category: 'dev',
    path: '/tools/json-path',
    icon: 'BranchesOutlined',
    tags: ['JSONPath', 'JSON', '提取'],
  },

  // ========== 数据计算 ==========
  {
    id: 'unit-converter',
    name: '单位转换',
    description: '长度、重量、温度等单位转换',
    category: 'calc',
    path: '/tools/unit-converter',
    icon: 'SwapOutlined',
    tags: ['单位', '转换', '计算'],
  },
  {
    id: 'calculator',
    name: '科学计算器',
    description: '在线科学计算器',
    category: 'calc',
    path: '/tools/calculator',
    icon: 'CalculatorOutlined',
    tags: ['计算器', '科学计算', '数学'],
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
  {
    id: 'notepad',
    name: '在线记事本',
    description: '自动保存的在线记事本',
    category: 'productivity',
    path: '/tools/notepad',
    icon: 'FileTextOutlined',
    tags: ['记事本', '笔记', '自动保存'],
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
