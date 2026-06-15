---
name: test-site
description: 测试 GitHub Pages 站点的链接、图片、视频是否正常
---

# 测试 VS Code 中文文档站点

验证 https://zhongweidee.github.io/vscode-docs-zh/ 上的所有链接、图片、视频是否可访问。

## 测试步骤

### 1. 测试所有页面链接

从首页和子页面（`docs/`、`docs/agents/concepts/`、`release-notes/`、`blogs/`）分别提取侧边栏 `<a href>` 链接，逐个检查 HTTP 200。

### 2. 测试所有图片

从所有 HTML 页面提取 `<img src>` 和 `<video poster>` 等图片引用，格式包括：
- PNG、JPG、GIF、SVG、WebP

需从不同页面深度检查相对路径是否正确解析。

### 3. 测试所有视频

从所有 HTML 页面提取 `<video src>` 标签，检查：
- HTTP 200
- Content-Length > 1000（排除 Git LFS 指针）

### 4. 测试折叠按钮

- `toggleAll` JavaScript 函数存在
- `.sidebar-tools` 按钮存在

### 5. 报告

```
| 类型 | 总数 | 通过 | 失败 |
|------|------|------|------|
| 链接 | 329 | 329 | 0 |
| 图片 | 200 | 200 | 0 |
| 视频 | 30 | 30 | 0 |

### 失败的项
- ❌ xxx (404)
```

失败即 FAIL，不通过。
