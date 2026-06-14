---
name: test-site
description: 测试 GitHub Pages 站点的链接、图片、视频是否正常
---

# 测试 VS Code 中文文档站点

验证 https://zhongweidee.github.io/vscode-docs-zh/ 上的所有链接、图片、视频是否可访问。

## 运行方式

```bash
cd "C:/Users/zhong/OneDrive/AI/vscode/download_documents"
```

## 测试步骤

### 1. 测试首页可访问

检查首页和各主要页面 HTTP 状态码是否为 200。

### 2. 测试侧边栏所有链接

爬取首页 HTML，提取侧边栏所有 `<a href>` 链接，逐个请求检查是否返回 200。

需要覆盖的链接类型：
- `docs/` 下的核心文档（从不同页面深度检查）
- `blogs/` 下的博客
- `release-notes/` 下的发布说明
- 首页的目录列表链接

**关键：必须从子页面（如 `docs/agents/agents-tutorial.html`）测试侧边栏路径是否正确解析。**

### 3. 测试图片

从所有 HTML 页面中提取 `<img src>` 标签，检查每个图片 URL 是否返回 200。

需检查：
- PNG、JPG、GIF、SVG 图片
- 图片路径是否正确（相对路径在不同深度页面下解析是否正确）
- 没有 404 的图片

### 4. 测试视频

从所有 HTML 页面中提取 `<video src>` 标签，检查每个视频 URL 是否返回 200。

需检查：
- MP4 视频
- Content-Type 是否为 `video/mp4` 或 `application/octet-stream`
- 内容长度大于 1000 字节（排除 Git LFS 指针文件）

### 5. 测试折叠按钮

检查页面是否包含：
- `toggleAll` JavaScript 函数
- 侧边栏折叠按钮 `.sidebar-tools`

### 6. 报告

输出格式：

```
## 测试报告

| 类型 | 总数 | 通过 | 失败 |
|------|------|------|------|
| 页面 | 10 | 10 | 0 |
| 图片 | 50 | 48 | 2 |
| 视频 | 30 | 30 | 0 |

### 失败的项
- ❌ docs/agents/xxx.png (404)
```

失败即 FAIL，不通过。
