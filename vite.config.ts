import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import unocss from 'unocss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), unocss()],
  base: '/ToolHub/',
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    host: true,
    port: 3003,
    open: true,
  },
  build: {
    outDir: 'docs',
    sourcemap: false,
    // 启用 CSS 代码分割
    cssCodeSplit: true,
    // 设置构建目标
    target: 'es2015',
    // 启用压缩
    minify: 'terser',
    rollupOptions: {
      output: {
        // 更细粒度的代码分割
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // React 核心
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react';
            }
            // Ant Design 单独打包
            if (id.includes('antd')) {
              return 'antd';
            }
            // React Router
            if (id.includes('react-router')) {
              return 'router';
            }
            // MobX
            if (id.includes('mobx')) {
              return 'mobx';
            }
            // Monaco Editor
            if (id.includes('@monaco-editor')) {
              return 'monaco';
            }
            // 其他工具库
            if (id.includes('i18next') || id.includes('react-i18next')) {
              return 'i18n';
            }
            return 'vendor';
          }
        },
        // 资源文件命名
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    // chunk 大小警告限制
    chunkSizeWarningLimit: 1000,
  },
  // 优化预加载
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'antd',
      'i18next',
      'react-i18next',
    ],
  },
});
