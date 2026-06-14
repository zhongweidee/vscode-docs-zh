---
ContentId: c2d81f09-3c24-4659-8aa0-9ca24ef4950d
DateApproved: 02/04/2026
MetaDescription: Visual Studio Code glob 模式参考
---
# Glob 模式参考

Visual Studio Code 在许多组件中都使用了 glob 模式。例如，在[搜索](/docs/editing/codebasics.md#advanced-search-options)、从文件资源管理器中隐藏文件或将其标记为只读，以及设置编程语言特定的文件关联等功能中设置文件和文件夹的包含/排除。

## Glob 模式语法

VS Code 支持以下 glob 语法：

* `/` 用于分隔路径段
* `*` 用于匹配路径段中的零个或多个字符
* `?` 用于匹配路径段中的一个字符
* `**` 用于匹配任意数量的路径段，包括没有
* `{}` 用于分组条件（例如 `{**/*.html,**/*.txt}` 匹配所有 HTML 和文本文件）
* `[]` 用于**声明**一个要匹配的字符范围（`example.[0-9]` 匹配 `example.0`、`example.1`，以此类推）
* `[!...]` 用于否定一个要匹配的字符范围（`example.[!0-9]` 匹配 `example.a`、`example.b`，但不匹配 `example.0`）

**注意：** 路径使用 `/` 而非 `\` 分隔，即使在 Windows 上也是如此。但在应用时，glob 模式将匹配同时使用斜杠和反斜杠的路径。

## 大小写敏感性

Glob 模式匹配行为因平台文件系统而异：

* **Windows 和 macOS**：Glob 模式默认**不区分大小写**。例如，模式 `**/MyFolder/**` 将匹配 `myfolder/`、`MyFolder/`、`MYFOLDER/` 以及任何其他大小写变体。
* **Linux**：Glob 模式**区分大小写**。模式 `**/MyFolder/**` 仅匹配大小写完全相同的文件夹。

这种平台感知行为适用于 VS Code 中所有使用 glob 模式的地方，包括：

* 搜索视图的包含/排除模式
* `setting(files.exclude)` 设置
* `setting(search.exclude)` 设置
* `.gitignore` 文件模式（当 `setting(explorer.excludeGitIgnore)` 启用时）
* 搜索编辑器模式

例如，如果您的 `.gitignore` 文件中有一个像 `build/` 这样的模式，在 Windows 和 macOS 上，它将匹配 `build/`、`Build/`、`BUILD/` 以及其他大小写变体，但在 Linux 上仅匹配大小写完全相同的项。这确保了与这些文件系统处理文件和文件夹名称的方式保持一致。

**远程开发：** 当使用远程工作区（如 WSL、SSH 或开发容器）时，glob 匹配行为遵循**远程**文件系统的大小写敏感性规则，而非本地客户端的操作系统。

## 特殊情况

搜索视图中的 glob 模式与 `setting(files.exclude)` 和 `setting(search.exclude)` 等设置中的模式工作方式不同。在设置中，您必须使用 `**/example` 来匹配工作区中子文件夹 `folder1/example` 里名为 `example` 的文件夹。而在搜索视图中，`**` 前缀是默认隐含的。这些设置中的 glob 模式始终相对于工作区文件夹的路径进行评估。

## 常见问题

### 为什么 glob 模式不支持功能 X 或 Y？

我们实现了自己的 [glob 匹配库](https://github.com/microsoft/vscode/blob/main/src/vs/base/common/glob.ts)，旨在为大多数典型模式提供最佳性能。如果您期望支持某个特定的 glob 语法，可以提交一个包含您用例的问题报告。

### 为什么我的 glob 模式不起作用？

请确保在 Windows 上使用 `/` 而非 `\` 来分隔路径。VS Code 中的 glob 模式需要使用 `/` 分隔路径，但它们将同时匹配路径中的 `/` 和 `\`。

如果您想要按字面匹配特殊字符（如 `[` 或 `]`），请将特殊字符放在方括号内（单字符范围）进行转义，以避免其在模式匹配中被解释。反斜杠不会对它们进行转义。例如，要匹配 `src/routes/post/[id]/` 下的文件，您应使用模式 `src/routes/post/[[]id[]]/**`。
