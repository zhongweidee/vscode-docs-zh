---
ContentId: a4e7b2c1-3d5f-4a8e-b9c6-1e2d3f4a5b6c
DateApproved: 6/10/2026
MetaDescription: 了解如何在 Visual Studio Code 中使用“工件”面板，查看 AI 在聊天会话期间呈现的重要资源。
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# 工件面板（预览版）

Visual Studio Code 中的工件面板会在聊天对话旁边呈现重要资源，例如屏幕截图、计划和文档。工件可以同时来自多个来源，并以可折叠的树形控件显示，按来源分组。

> [!NOTE]
> 本页中的功能在[聊天视图](/docs/agents/chat-view.md)和[代理窗口](/docs/agents/agents-window.md)中均可使用。

> [!NOTE]
> 工件面板目前为预览版。要启用它，请将 `setting(chat.artifacts.enabled)` 设置为 `true`。

![工件面板在聊天视图中的截图，展示了一些示例工件，例如链接、图片和文档。](images/chat-artifacts/chat-artifacts-list.png)

## 工件来源

工件可以来自不同来源，这些来源会合并并按来源分组显示在面板中：

* **基于规则的提取**：VS Code 根据可配置的 MIME 类型模式、文件路径 glob 或内存文件路径，自动从对话内容中提取工件。例如，内置规则会呈现屏幕截图和计划文档。详情请参阅[配置工件提取规则](#配置工件提取规则)。
* **代理设置的工件**：代理通过使用 `#artifacts` 工具显式设置工件。每次更新都会替换之前的代理工件列表。
* **子代理工件**：当代理将工作委托给子代理时，每个子代理都可以设置自己的工件，这些工件会以子代理名称标记的独立组显示。

## 配置工件提取规则

基于规则的提取使用三项设置，每项设置将一个模式映射到一个组配置。组配置包含一个 `groupName`（显示标签）和一个可选的 `onlyShowGroup` 标志（当为 `true` 时，仅显示组标题，而不显示单个项目）。

| 设置 | 描述 | 默认值 |
|---------|-------------|---------|
| `setting(chat.artifacts.rules.byMimeType)` | 按 MIME 类型模式匹配工具结果，例如 `"image/*"`。 | `{ "image/*": { "groupName": "Screenshots", "onlyShowGroup": true } }` |
| `setting(chat.artifacts.rules.byFilePath)` | 按 glob 模式匹配工作区文件，例如 `"**/*plan*.md"`。 | `{ "**/*plan*.md": { "groupName": "Plans" } }` |
| `setting(chat.artifacts.rules.byMemoryFilePath)` | 按 glob 模式匹配内存工具写入，例如 `"**/*plan*.md"`。 | `{ "**/*plan*.md": { "groupName": "Plans" } }` |

例如，要添加一条规则，将代理写入的 HTML 文件作为工件呈现，请将以下内容添加到您的设置中：

```json
"chat.artifacts.rules.byFilePath": {
    "**/*.html": { "groupName": "Web Pages" }
}
```

要完全禁用基于规则的提取，请将三项规则设置全部设置为 `{}`。

## 使用工件

当工件可用时，工件面板会出现在对话旁边。工件根据其来源以组的形式组织。

* 选择一个工件以打开其对应的资源。例如，选择图片工件会显示预览，而选择文档工件则会在编辑器中打开该文件。
* 代理设置的工件在每次代理更新时，都会替换之前的代理列表。
* 每个子代理的工件显示在独立的组中。您可以单独清除特定子代理的工件。
* 基于规则的工件会随着对话的进行自动更新。如果您更改了规则设置，工件面板会反映更新后的规则。

## 请求代理创建工件

您可以通过在提示中描述您想要的内容，请求代理将某些内容存储为工件。例如：

* “截取我的应用程序的屏幕截图并将其设置为工件”
* “编写一份项目计划并将其设置为工件”
* “将这些链接保存为工件”

然后，代理会使用 `#artifacts` 工具将资源添加到工件面板。您无需直接引用该工具。只需描述您想保留什么，代理就会决定何时将其作为工件呈现。

代理还可以使用 `#artifactRules` 工具覆盖当前会话的提取规则。这将在会话期间替换任何基于设置的规则。

## 相关资源

* [聊天概述](/docs/chat/chat-overview.md)
* [代理工具](/docs/chat/chat-tools.md)
* [AI 设置参考](/docs/agents/reference/ai-settings.md)
