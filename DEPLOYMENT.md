# ToolHub 部署指南

## 功能特性

### 1. 性能优化
- ✅ 代码分割：React、Ant Design、Router、MobX 等独立打包
- ✅ 懒加载：所有工具页面按需加载
- ✅ CSS 代码分割
- ✅ Terser 压缩（生产环境自动移除 console）
- ✅ 预加载优化
- ✅ 资源文件 Hash 命名

### 2. SEO 优化
- ✅ 动态 Meta 标签管理（react-helmet-async）
- ✅ Open Graph 标签
- ✅ Twitter Card 标签
- ✅ sitemap.xml
- ✅ robots.txt
- ✅ 语义化 HTML
- ✅ 可配置的页面标题和描述

### 3. 多语言支持
- ✅ 中文（简体）
- ✅ English
- ✅ 浏览器语言自动检测
- ✅ 手动语言切换
- ✅ LocalStorage 持久化

### 4. 统计功能
- ✅ Google Analytics 4 支持
- ✅ 百度统计支持
- ✅ 环境变量配置

### 5. 广告位
- ✅ 横幅广告位（728x90）
- ✅ 侧边栏广告位（300x250）
- ✅ 方形广告位（300x300）
- ✅ 深色模式适配

## 配置说明

### 1. 统计代码配置

创建 `.env` 文件：

```bash
cp .env.example .env
```

编辑 `.env` 文件：

```env
# Google Analytics ID (GA4)
VITE_GA_ID=G-XXXXXXXXXX

# 百度统计 ID
VITE_BAIDU_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 2. SEO 配置

#### 更新域名

**index.html** (第 17 行)：
```html
<link rel="canonical" href="https://yourdomain.com/" />
```

**index.html** (第 20-25 行)：
```html
<meta property="og:url" content="https://yourdomain.com/" />
```

**public/sitemap.xml**：
将所有 `https://yourdomain.com/` 替换为你的实际域名。

**public/robots.txt**：
```txt
Sitemap: https://yourdomain.com/sitemap.xml
```

### 3. 语言配置

默认语言：中文（zh-CN）
后备语言：中文（zh-CN）

修改默认语言，编辑 `src/i18n/config.ts`：

```typescript
fallbackLng: 'en-US',  // 修改默认后备语言
lng: 'en-US',          // 修改默认语言
```

### 4. 广告位配置

在需要展示广告的地方使用：

```tsx
import AdBanner from '@/components/AdBanner';

// 横幅广告
<AdBanner type="horizontal" />

// 侧边栏广告
<AdBanner type="vertical" />

// 方形广告
<AdBanner type="square" />
```

## 构建部署

### 开发环境

```bash
pnpm dev
```

访问：http://localhost:3003/ToolHub/

### 生产构建

```bash
# 构建
pnpm build

# 预览构建结果
pnpm preview
```

### 部署到静态服务器

构建后的文件在 `dist` 目录，可以直接部署到：

- GitHub Pages
- Vercel
- Netlify
- 阿里云 OSS
- 腾讯云 COS
- Nginx

#### Nginx 配置示例

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/toolhub/dist;
    index index.html;

    # SPA 路由支持
    location / {
        try_files $uri $uri/ /ToolHub/index.html;
    }

    # 启用 gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # 浏览器缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## 性能优化建议

### 1. CDN 加速

建议将静态资源上传到 CDN：
- JS/CSS 文件
- 图片资源
- 字体文件

### 2. 启用 HTTP/2

Nginx 配置：
```nginx
listen 443 ssl http2;
```

### 3. 预加载关键资源

在 `index.html` 中添加：
```html
<link rel="preload" href="/path/to/font.woff2" as="font" type="font/woff2" crossorigin>
```

### 4. 图片优化

- 使用 WebP 格式
- 提供多种尺寸
- 使用 lazy loading

```html
<img loading="lazy" src="image.jpg" alt="description">
```

## 监控和统计

### Google Analytics

1. 登录 [Google Analytics](https://analytics.google.com/)
2. 创建账号和媒体资源
3. 获取衡量 ID（格式：G-XXXXXXXXXX）
4. 在 `.env` 文件中配置

### 百度统计

1. 登录 [百度统计](https://tongji.baidu.com/)
2. 添加网站
3. 获取统计代码 ID
4. 在 `.env` 文件中配置

## 常见问题

### 1. 路由 404 问题

确保服务器配置了 SPA 路由支持（参考上面的 Nginx 配置）。

### 2. 语言不生效

清除 LocalStorage 中的 `i18nextLng` 键，或使用隐私模式测试。

### 3. 统计代码不工作

- 检查 `.env` 文件是否正确配置
- 确保使用 `VITE_` 前缀
- 重新构建项目

### 4. 广告位显示问题

检查 `AdBanner.less` 文件是否正确加载，确保样式文件路径正确。

## 更新日志

- 2025-01-12：添加 SEO 优化、多语言支持、统计功能和广告位
- 性能优化：代码分割、懒加载、资源优化
- 构建优化：Terser 压缩、CSS 分割
