#!/bin/bash

# 部署脚本 - 构建并提交到 GitHub

set -e

echo "🚀 开始部署..."

# 构建项目
echo "📦 构建项目..."
pnpm build

# 添加 docs 目录到 git（即使它在 .gitignore 中）
echo "📝 添加构建文件..."
git add -f docs/

# 检查是否有变化
if git diff --cached --quiet; then
  echo "✅ 没有需要提交的更改"
else
  # 提交更改
  echo "💾 提交更改..."
  git commit -m "auto deploy"

  # 推送到远程仓库
  echo "📤 推送到 GitHub..."
  git push origin master

  echo "✅ 部署成功！"
  echo "🌐 访问 https://dai1254473705.github.io/ToolHub/ 查看更新"
fi
