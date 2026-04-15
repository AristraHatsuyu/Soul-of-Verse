# 诗魂问道 · Soul of Verse

一款融合古诗词与现代交互小游戏。通过AI评分机制，让用户在创作诗词中感受中华文化的魅力。

## 特性

- **诗词创作**: 多个主题场景，激发创意灵感
- **AI评分**: 采用深度学习模型，客观评估诗词质量
- **沉浸式体验**: 音乐、视觉、动画完美融合
- **成长系统**: 积分、等级、排名等互动元素

## 快速开始

### 环境要求
- Node.js >= 16
- NodeJS / pnpm

### 安装依赖

```bash
pnpm install
```

### 开发模式

在 `http://localhost:3000` 启动开发服务器：

```bash
pnpm run dev
```

### 生产构建

```bash
pnpm run build
```

## 项目结构

```
├── pages/              # 页面
├── components/         # Vue 组件
├── public/static/      # 静态资源（图片、音乐）
├── assets/             # 数据资源（题库、主题）
├── server/             # 服务端
└── nuxt.config.ts      # Nuxt 配置
```

## 技术栈

- **Nuxt 3**: 现代 Vue 框架
- **TypeScript**: 类型安全
- **DeepSeek API**: AI 诗词评分

## 开发指南

- 修改页面请在 `pages/` 目录下操作
- 新增组件放在 `components/` 目录
- 题库数据在 `assets/questions.json`
- 主题配置在 `assets/toptic.json`

## API 配置

> **重要提示**

本项目是一款轻量级小游戏，无后端服务，AI 评分功能所需的 API Key 存储在前端。使用 AI 评分功能前需要配置 DeepSeek API Key。

**配置步骤：**

1. 复制 `.env.example` 为 `.env.local`
2. 填入你的 DeepSeek API Key：
   ```env
   NUXT_PUBLIC_DEEPSEEK_API_KEY=sk-your-api-key-here
   ```
3. 重启开发服务器使配置生效

**安全建议：**
- `.env.local` 已在 `.gitignore` 中，不会被提交
- 如进行二次开源分发，务必**检查并确保 API Key 已被移除**，避免凭证泄露
- 生产环境推荐使用服务端中转 API 调用

## License

本项目采用 MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

---

**诗魂问道** · Awaken the poet in your soul.

发布时间：2025年4月
更新时间：2025年4月

