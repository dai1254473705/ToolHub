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
    description: 'JSON、正则表达式、代码格式化等工具',
    color: '#1677ff',
  },
  {
    id: 'convert',
    name: '转换工具',
    icon: 'SwapOutlined',
    description: 'Base64、YAML、时间戳、编码转换等',
    color: '#52c41a',
  },
  {
    id: 'crypto',
    name: '加密解密',
    icon: 'LockOutlined',
    description: '哈希算法、AES、RSA、密码生成等',
    color: '#faad14',
  },
  {
    id: 'image',
    name: '图片处理',
    icon: 'PictureOutlined',
    description: '裁剪、压缩、格式转换、图标生成等',
    color: '#eb2f96',
  },
  {
    id: 'text',
    name: '文本处理',
    icon: 'FileTextOutlined',
    description: '文本对比、去重、统计、大小写转换等',
    color: '#722ed1',
  },
  {
    id: 'color',
    name: '颜色工具',
    icon: 'BgColorsOutlined',
    description: '颜色转换、取色器、色卡、渐变生成等',
    color: '#fa541c',
  },
  {
    id: 'network',
    name: '网络工具',
    icon: 'GlobalOutlined',
    description: 'API测试、URL解析、IP查询等',
    color: '#13c2c2',
  },
  {
    id: 'dev',
    name: '开发辅助',
    icon: 'ToolOutlined',
    description: 'Git工具、Cron生成、代码片段等',
    color: '#1890ff',
  },
  {
    id: 'calc',
    name: '数据计算',
    icon: 'CalculatorOutlined',
    description: '单位转换、计算器、百分比计算等',
    color: '#52c41a',
  },
  {
    id: 'productivity',
    name: '效率工具',
    icon: 'ThunderboltOutlined',
    description: 'TodoList、番茄钟、记事本等',
    color: '#fa8c16',
  },
];
