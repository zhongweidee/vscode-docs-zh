# VS Code 中文文档

Visual Studio Code **1.124** 官方文档的简体中文翻译。

## 内容

- **345 篇核心用户文档**已翻译为简体中文
- 覆盖 VS Code 最新功能（Agent、MCP、Copilot 等）
- 目录结构与官方一致
- 提供 Markdown 源码和 HTML 浏览版本

## 目录结构

```
vscode-docs-zh/
  docs/          — 翻译后的 Markdown 源文件（345 篇）
  vscode-docs-html/
    index.html   — 首页，带翻译进度说明
    docs/        — HTML 版本，带侧边栏导航
```

## 翻译范围

| 部分 | 状态 |
|------|------|
| docs/ 核心用户文档 | ✅ 已翻译（345/348 篇） |
| release-notes/ 版本发布说明 | ❌ 未翻译 |
| api/ 扩展 API 文档 | ❌ 未翻译 |
| blogs/ 官方博客 | ❌ 未翻译 |

## 翻译方式

- 使用 DeepSeek V4 Flash 通过多智能体并行翻译
- 347 个子 agent 同时工作，约 44 分钟完成
- 保留 Markdown 格式、代码块、YAML frontmatter
- 统一术语（debug→调试、extension→扩展 等）

## 查看方式

打开 `vscode-docs-html/index.html` 即可浏览。

## 许可

翻译内容基于 [microsoft/vscode-docs](https://github.com/microsoft/vscode-docs) 的 MIT 许可。
