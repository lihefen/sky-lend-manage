# Tailwind CSS 使用指南

## 概述

本项目已成功集成 Tailwind CSS v4.1.13，可以与现有的 SCSS 和 px-to-viewport 插件协同工作。

## 配置文件

### 1. tailwind.config.js
- 配置了内容扫描路径，包括所有 Vue 组件和 HTML 文件
- 可以在此文件中扩展主题、添加自定义颜色、字体等

### 2. postcss.config.js
- 已添加 `require("tailwindcss")` 插件
- 与现有的 `postcss-px-to-viewport` 和 `autoprefixer` 插件兼容
- webpack 配置已简化，统一使用 postcss.config.js 配置

### 3. src/styles/tailwind.css
- 主要的 Tailwind CSS 入口文件
- 包含 `@tailwind base`、`@tailwind components`、`@tailwind utilities` 指令

## 如何在项目中使用

### 1. 在页面入口文件中引入 Tailwind CSS

在需要使用 Tailwind CSS 的页面入口文件中引入：

```javascript
import '@/styles/index.scss';
```

`src/styles/index.scss` 文件已经包含了 Tailwind CSS 和重置样式的引入。

### 2. 使用 Tailwind CSS 类名

```vue
<template>
  <div class="bg-blue-500 text-white p-4 rounded-lg">
    <h1 class="text-2xl font-bold">标题</h1>
    <p class="text-blue-100">内容文本</p>
  </div>
</template>
```

### 3. 响应式设计

```vue
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div class="bg-white p-4 rounded-lg shadow-md">卡片内容</div>
  </div>
</template>
```

## 与现有样式的兼容性

- Tailwind CSS 与现有的 SCSS 文件可以共存
- `postcss-px-to-viewport` 插件会继续工作，将 px 单位转换为 vw
- Vant UI 组件的样式不会被 px-to-viewport 转换影响

## 注意事项

1. **类名优先级**：Tailwind CSS 使用 `!important` 声明，可能会覆盖现有样式
2. **文件大小**：生产环境会自动移除未使用的 CSS 类
3. **自定义样式**：可以在 `tailwind.config.js` 中扩展主题配置


## 开发建议

1. 优先使用 Tailwind CSS 的工具类进行快速开发
2. 对于复杂的自定义样式，可以结合 SCSS 使用
3. 利用 Tailwind CSS 的响应式前缀（sm:, md:, lg:, xl:）创建移动端友好的界面