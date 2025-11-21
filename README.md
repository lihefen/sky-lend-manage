<!--
 * @Description: 
 * @version: 
 * @Author: hean
 * @Date: 2025-05-22 09:47:18
 * @LastEditors: hean
 * @LastEditTime: 2025-06-23 11:11:47
-->
# Vue 2.7 + Vant 多页面应用
-node 版本 v18.19.1
## 项目介绍

这是一个基于 Vue 2.7、Vant 组件库的多页面应用，使用 Sass 预处理器和 vw 单位实现响应式布局，通过 Webpack 进行构建打包。

## 技术栈

- Vue 2.7
- Vant UI 组件库
- Sass 预处理器
- PostCSS (autoprefixer, postcss-px-to-viewport)
- Webpack 5

## 特性

- 多页面应用结构
- 移动端适配 (vw方案)
- 组件化开发
- 模块化管理

## 目录结构

```
├── build                   # webpack配置文件
│   ├── webpack.base.js     # 基础配置
│   ├── webpack.dev.js      # 开发环境配置
│   └── webpack.prod.js     # 生产环境配置
├── public                  # 静态资源目录
│   └── index.html          # HTML模板
├── src                     # 源代码
│   ├── assets              # 资源文件
│   │   └── styles          # 样式文件
│   │       └── reset.scss  # 样式重置
│   ├── components          # 公共组件
│   ├── pages               # 页面目录
│   │   ├── home            # 首页
│   │   │   ├── App.vue     # 页面组件
│   │   │   └── main.js     # 入口文件
│   │   └── about           # 关于页
│   │       ├── App.vue     # 页面组件
│   │       └── main.js     # 入口文件
│   └── utils               # 工具函数
└── package.json            # 项目依赖
```

## 开发指南

### 安装依赖

```bash
npm install
```

### 开发环境

```bash
npm run dev
```

### 生产环境打包

```bash
npm run build
```

## 多页面开发

要添加新页面，只需在 `src/pages` 目录下创建新的文件夹，并包含 `App.vue` 和 `main.js` 文件。Webpack 将自动识别并为每个页面创建单独的入口和HTML文件。

## 移动端适配

项目使用 `postcss-px-to-viewport` 插件将 px 单位转换为 vw 单位，默认设计稿宽度为 375px。