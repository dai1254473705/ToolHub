/**
 * 工具相关类型定义
 */
import type { Tool } from '@/constants/tools';

export type { Tool };

/**
 * 工具使用记录
 */
export interface ToolUsage {
  toolId: string;
  timestamp: number;
}

/**
 * 工具统计信息
 */
export interface ToolStats {
  totalUses: number;
  lastUsed: number;
}
