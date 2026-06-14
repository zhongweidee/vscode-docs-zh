---
name: update-docs
description: 更新 VS Code 中文文档翻译到最新版本
---

# 更新 VS Code 中文文档

将 VS Code 官方文档更新到最新版本并重新翻译。

## 步骤

### 1. 获取最新源码

```bash
# 进入工作目录
cd /tmp

# 克隆最新文档
rm -rf vscode-docs
git clone --depth 1 https://github.com/microsoft/vscode-docs.git
cd vscode-docs
git sparse-checkout set docs
git checkout main

# 复制到工作区源目录
rm -rf "C:/Users/zhong/OneDrive/AI/vscode/download_documents/vscode-docs-source"
cp -r docs "C:/Users/zhong/OneDrive/AI/vscode/download_documents/vscode-docs-source"
```

### 2. 翻译新文件

运行多智能体翻译工作流：

```bash
cd "C:/Users/zhong/OneDrive/AI/vscode/download_documents"
node build-html.js
```

这个脚本会：
- 读取 `vscode-docs-source/docs/` 下的源文件
- 检查 `vscode-docs-zh/docs/` 中哪些文件未翻译
- 只翻译新增或变更的文件
- 重新生成 HTML

### 3. 重新生成 HTML

```bash
node build-html.js
```

### 4. 重新生成 EPUB

```bash
node build-epub.js
```

### 5. 提交并推送

```bash
git add -A
git commit -m "Update to VS Code 1.xxx"
git push
```

## 文件说明

| 文件 | 用途 |
|------|------|
| `vscode-docs-source/docs/` | 官方英文原版（只读，每次更新替换） |
| `vscode-docs-zh/docs/` | 中文 Markdown 翻译 |
| `docs/` (repo root) | HTML 浏览版（GitHub Pages 使用） |
| `build-html.js` | Markdown → HTML 转换脚本 |
| `build-epub.js` | EPUB 电子书生成脚本 |
| `.claude/skills/update-docs.md` | 本技能文件 |

## 注意

- 工作流默认使用 DeepSeek V4 模型
- 翻译时会保留已有的翻译，只更新新增或变更的文件
- GitHub Pages 在 push 后自动部署
