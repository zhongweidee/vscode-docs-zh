---
ContentId: f0f31de2-a344-4ee6-8d5b-d3ac4e11e149
DateApproved: 6/10/2026
MetaDescription: 在 VS Code 中使用智能操作，通过 AI 获得常见开发任务的帮助，例如生成提交消息、重命名符号或修复编码错误。
MetaSocialImage: images/shared/github-copilot-social.png
---
# Visual Studio Code 中的 AI 智能操作

对于几种常见场景，你可以使用_智能操作_来获得 AI 的帮助，而无需编写提示词。这些智能操作的示例包括生成提交消息、生成文档、解释或修复代码，或者执行代码审查。这些智能操作在 VS Code 的整个用户界面中均可用。

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="AI 入门">
跟随实践教程，使用 AI 在 VS Code 中构建你的首个应用。

* [开始教程](/docs/getstarted/getting-started.md)

</div>

## 生成提交消息和 PR 信息

根据你的代码更改，获取生成提交消息和拉取请求（PR）标题与描述的帮助。使用源代码管理视图或 GitHub PR 扩展中的_星标_图标来生成概括你的更改的标题和描述。

![将鼠标悬停在源代码管理输入框的星标按钮上会显示"生成提交消息"](images/copilot-smart-actions/generate-commit-message.png)

## 使用 AI 解决合并冲突（实验性）

使用 AI 帮助你解决 Git 合并冲突。在编辑器中选择**使用 AI 解决合并冲突**按钮，打开聊天视图并启动代理流，帮助你解决合并冲突。合并基和每个分支的更改将作为 AI 的上下文提供。

![编辑器中建议的合并冲突解决方案的截图。](images/copilot-smart-actions/ai-merge-conflict-resolution.png)

## 实现 TODO 注释

如果你安装了 [GitHub Pull Requests](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github) 扩展，则可以使用 [Copilot 云代理](/docs/agents/agent-types/cloud-agents.md#github-copilot-cloud-agent)通过 AI 来实现代码中的 `TODO` 注释。

1. 确保你已安装 [GitHub Pull Requests](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github) 扩展。
1. 在代码中添加 `TODO` 注释。代码操作（灯泡）会出现在注释旁边。
1. 选择代码操作，然后选择**委托给编码代理**。

    ![截图显示 TODO 注释的代码操作菜单，其中包含"启动编码代理"选项。](images/copilot-smart-actions/start-coding-agent-todo.png)

## 重命名符号

在代码中重命名符号时，根据符号和代码库的上下文，获取 AI 生成的新名称建议。

![内联聊天为 Python 文件中的符号建议新名称](images/copilot-smart-actions/copilot-inline-chat-rename-suggestion.png)

## 为 Markdown 中的图片生成替代文本

使用 AI 为 Markdown 文件中的图片生成或更新替代文本。生成替代文本的步骤：

1. 打开一个 Markdown 文件。
1. 将光标放在图片链接上。
1. 选择代码操作（灯泡）图标，然后选择**生成替代文本**。

    ![截图显示 Markdown 图片链接的代码操作菜单，其中包含"生成替代文本"选项。](images/copilot-smart-actions/generate-alt-text.png)

1. 如果已有替代文本，选择代码操作，然后选择**优化替代文本**。

## 生成文档

使用 AI 为多种语言生成代码文档。

1. 打开你的应用代码文件。
1. （可选）选择你想要为其生成文档的代码。
1. 右键单击并选择**生成代码** > **生成文档**。

    ![内联聊天 /doc 示例，为计算器类生成文档注释](images/copilot-smart-actions/inline-chat-doc-example.png)

## 生成测试

无需编写提示词即可为你的应用代码生成测试，你可以使用编辑器智能操作。

1. 打开你的应用代码文件。
1. （可选）选择你想要测试的代码。
1. 右键单击并选择**生成代码** > **生成测试**。

    VS Code 在现有的测试文件中生成测试代码，如果不存在测试文件则创建一个新的测试文件。

1. （可选）在内联聊天提示词中提供额外的上下文来优化生成的测试。

## 解释代码

在编辑器中获取解释代码块的帮助。

1. 打开你的应用代码文件。
1. 选择你想要修复的代码。
1. 右键单击并选择**解释**。

    VS Code 提供所选代码块的解释。

## 修复编码错误

无需编写提示词即可修复应用代码中的编码问题，你可以使用编辑器智能操作。

1. 打开你的应用代码文件。
1. 选择你想要修复的代码。
1. 右键单击并选择**生成代码** > **修复**。

    VS Code 提供一个修复代码的代码建议。

1. （可选）在聊天提示词中提供额外的上下文来优化生成的代码。

或者，如果代码文件中存在编译或 linting 问题，VS Code 会在编辑器中显示代码操作，帮助解决问题。

![编辑器截图显示星标图标和 Copilot 上下文菜单，用于解释或修复问题。](images/copilot-smart-actions/copilot-code-action-fix.png)

## 修复测试错误

直接从测试资源管理器中获取修复代码库中失败测试的帮助。

1. 在测试资源管理器中，将鼠标悬停在失败测试上
1. 选择**修复测试失败**按钮（星标图标）
1. 查看并应用 Copilot 建议的修复

或者，你也可以：

1. 打开聊天视图
1. 输入 `/fixTestFailure` 命令
1. 按照 Copilot 的建议修复测试

> [!TIP]
> 当使用[代理](/docs/agents/agent-types/local-agents.md)时，代理在运行测试时会监控测试输出，并自动尝试修复和重新运行失败的测试。

## 修复终端错误

当命令在终端中运行失败时，VS Code 会在装订区域显示一个星标，提供快速修复来解释发生了什么。

![终端命令失败后在终端中显示的"使用 Copilot 修复"选项。](images/copilot-smart-actions/terminal-command-explanation.png)

## 审查代码

VS Code 可以帮助审查你的代码，无论是编辑器中的代码块还是拉取请求中包含的所有更改（需要 [GitHub Pull Requests 扩展](https://marketplace.visualstudio.com/items/?itemName=GitHub.vscode-pull-request-github)）。

审查编辑器中的代码块：

1. 打开你的应用代码文件。
1. 选择你想要修复的代码。
1. 右键单击并选择**生成代码** > **审查**。

    VS Code 在**注释**面板中创建审查注释，并在编辑器中以内联方式显示它们。

审查拉取请求中的所有更改：

1. 使用 GitHub Pull Requests 扩展创建拉取请求
1. 在**文件更改**视图中选择**代码审查**按钮。

    VS Code 在**注释**面板中创建审查注释，并在编辑器中以内联方式显示它们。

## 语义搜索结果（预览版）

VS Code 中的搜索视图使你能够跨文件搜索文本。语义搜索使你能够找到与搜索查询语义相关的结果，即使它们不完全匹配文本。当你搜索与某个概念相关而非特定术语相关的代码片段或文档时，或者当你不知道搜索的确切术语时，这尤其有用。

![搜索视图显示与搜索条件不完全匹配的语义搜索结果。](images/copilot-smart-actions/semantic-search-results.png)

通过 `setting(search.searchView.semanticSearchBehavior)` 设置在搜索视图中配置语义搜索。你可以选择自动运行语义搜索，或者仅在明确请求时运行。

你还可以在搜索视图中获取 AI 生成的关键字建议，以提供相关的替代搜索词。通过 `setting(search.searchView.keywordSuggestions)` 设置启用搜索关键字建议。

![搜索视图显示基于搜索查询的关键字建议。](images/copilot-smart-actions/search-keyword-suggestions.png)

你可以在聊天提示词中引用搜索结果，方法是从**添加上下文**快速选择菜单中选择**从搜索视图获取结果**。或者，在聊天提示词中输入 `#searchResults`。

## 使用 AI 搜索设置

如果你不知道要更改的设置的确切名称，可以使用 AI 根据你的搜索查询帮助找到相关设置。例如，你可以搜索"增大文本大小"来找到控制编辑器字体大小的设置。

通过 `setting(workbench.settings.showAISearchToggle)` 设置启用此功能。在设置编辑器中，你可以通过**使用 AI 搜索设置**按钮来打开或关闭 AI 搜索结果。

![截图显示设置编辑器展示 AI 生成的设置建议。](images/copilot-smart-actions/settings-suggestions.png)

## 相关资源

* [Copilot 快速入门](/docs/getstarted/getting-started.md)。
