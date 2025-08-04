# 泷宝换换乐 🎵

> 我要换素龙！汪苏泷粉丝专属周边交换平台

一个专为汪苏泷粉丝设计的周边商品价值评估和交换比较工具，帮助粉丝们进行公平、透明的周边交换。

## ✨ 功能特色

- 🎯 **智能价值评估**：基于原价和市场溢价的综合价值计算
- 📱 **响应式设计**：完美适配桌面端和移动端
- 🎨 **多主题支持**：5种颜色主题 + 亮暗模式切换
- ⚡ **流畅动画**：基于 Framer Motion 的丰富交互动画
- 🛒 **购物车体验**：类似电商的商品选择和管理体验
- 📊 **详细对比**：全面的交换价值分析和建议

## 🚀 在线体验

访问 [GitHub Pages 部署地址](https://username.github.io/price-down/) 立即体验！

## 🛠️ 技术栈

- **前端框架**：React 19 + TypeScript
- **构建工具**：Vite 7
- **样式方案**：Tailwind CSS 4 + shadcn/ui
- **动画库**：Framer Motion
- **部署方式**：GitHub Pages + GitHub Actions

## 📦 本地开发

### 环境要求

- Node.js 18+
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 `http://localhost:5173` 查看应用。

### 构建生产版本

```bash
npm run build
```

构建产物将生成在 `dist` 目录中。

### 预览生产版本

```bash
npm run preview
```

## 🚀 部署到 GitHub Pages

### 自动部署（推荐）

1. Fork 本仓库到你的 GitHub 账户
2. 在仓库设置中启用 GitHub Pages，选择 "GitHub Actions" 作为源
3. 修改 `package.json` 中的 `homepage` 字段为你的仓库地址
4. 修改 `vite.config.ts` 中的 `base` 路径为你的仓库名
5. 推送代码到 `main` 分支，GitHub Actions 将自动构建和部署

### 手动部署

```bash
# 安装 gh-pages 工具
npm install -g gh-pages

# 构建并部署
npm run deploy
```

## 📁 项目结构

```
src/
├── components/          # React 组件
│   ├── ui/             # 基础 UI 组件
│   ├── ProductCard.tsx # 商品卡片
│   ├── ProductSelector.tsx # 商品选择器
│   ├── ExchangeComparison.tsx # 交换对比
│   ├── SelectedItemsBar.tsx # 已选商品栏
│   └── ThemeSettings.tsx # 主题设置
├── contexts/           # React Context
│   └── ThemeContext.tsx # 主题上下文
├── data/              # 数据文件
│   └── sampleProducts.ts # 示例商品数据
├── types/             # TypeScript 类型定义
├── utils/             # 工具函数
│   └── priceCalculator.ts # 价格计算逻辑
└── App.tsx            # 主应用组件
```

## 🎨 主题定制

项目支持 5 种预设颜色主题：

- 🌸 **粉色主题**（默认）：#fe48a9
- 🔵 **蓝色主题**：#3b82f6
- 🟢 **绿色主题**：#10b981
- 🟣 **紫色主题**：#8b5cf6
- 🟠 **橙色主题**：#f59e0b

每个主题都支持亮色和暗色模式，用户可以在应用中实时切换。

## 📱 移动端优化

- 响应式网格布局
- 触摸友好的交互设计
- 移动端优化的步骤指示器
- 底部固定的操作栏

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支：`git checkout -b feature/amazing-feature`
3. 提交更改：`git commit -m 'Add some amazing feature'`
4. 推送分支：`git push origin feature/amazing-feature`
5. 提交 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 💝 致谢

- 感谢汪苏泷为我们带来的美好音乐
- 感谢所有为开源社区贡献的开发者们
- 特别感谢所有泷宝们的支持和建议

---

**免责声明**：本工具仅供粉丝交流使用，商品价格仅供参考，实际交换请以双方协商为准。
