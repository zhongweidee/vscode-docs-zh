---
ContentId: 2e8a4b9c-3d1f-5e7a-9c2b-4f6d8e1a3b5c
DateApproved: 6/10/2026
MetaDescription: 使用指令、提示文件、自定义代理和技能自定义 VS Code 中 AI 的分步指南。
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- customization
- instructions
- prompt files
- custom agents
- skills
- copilot
- ai
- tutorial
---
# 为项目自定义 AI

本指南将引导你为 Visual Studio Code 中的项目设置 AI 自定义。你将从基本的编码规范开始，逐步添加更具针对性的功能。

完成本指南后，你的项目将拥有：

* 应用于每次聊天请求的项目级编码规范
* 针对前端代码的特定文件指令
* 用于常见任务的可复用提示文件
* 一个工具受限的自定义代理
* 一项用于专用功能的技能

## 先决条件

* [下载并安装 Visual Studio Code](/download)

* [在 VS Code 中启用 AI 功能](/docs/getstarted/overview.md#enable-ai-features)

## 步骤 1：设置项目级编码规范

首先生成一个记录项目编码规范的指令文件。这些指令会自动包含在每次聊天请求中。

1. 在 VS Code 中打开包含要为其自定义 AI 的代码库的工作区或文件夹。

1. 打开聊天视图 (`kb(workbench.action.chat.open)`)。

1. 输入 `/init` 并按 `kbstyle(Enter)`。

    ```prompt
    /init
    ```

1. VS Code 会分析你的项目结构，并生成一个适合你代码库的 `.github/copilot-instructions.md` 文件。

1. 查看生成的文件并对其进行自定义。例如，添加一条关于你偏好的导入风格的规则：

    ```markdown
    ## 导入
    - 使用命名导入而非默认导入。
    - 分组导入：先是外部库，然后是内部模块，最后是相对路径。
    ```

1. 保存文件。

**验证是否生效**：让 Copilot 生成一些代码（例如，“创建一个用于日期格式化的工具函数”）。检查回复是否遵循你的编码规范。在聊天回复中选择“**引用**”部分，确认 `copilot-instructions.md` 已被包含。

> [!TIP]
> 在[使用自定义指令](/docs/agent-customization/custom-instructions.md#use-a-githubcopilot-instructionsmd-file)中了解有关始终生效的指令的更多信息。

## 步骤 2：添加特定文件指令

当代码库的不同部分遵循不同的约定时，使用带有 `applyTo` 模式的指令文件来针对特定文件类型。

1. 打开聊天视图 (`kb(workbench.action.chat.open)`)。

1. 输入 `/create-instructions`，后跟你要创建的指令的描述，然后按 `kbstyle(Enter)`。

    ```prompt
    /create-instructions React 特定的编码规范
    ```

1. 回答关于指令的澄清性问题，并查看生成的指令文件。

**验证是否生效**：打开一个 `.tsx` 文件，让 Copilot“创建一个用户个人资料卡片组件”。回复应遵循你设定的 React 特定约定。检查“**引用**”部分以确认指令文件已应用。

> [!TIP]
> 你可以为不同的文件类型、框架或模块创建多个指令文件。在[使用 `.instructions.md` 文件](/docs/agent-customization/custom-instructions.md#use-instructionsmd-files)中了解更多。

## 步骤 3：创建可复用的提示文件

提示文件将常见任务编码为可在聊天中调用的斜杠命令。为你经常执行的任务创建一个。

1. 打开聊天视图 (`kb(workbench.action.chat.open)`)。

1. 输入 `/create-prompt`，后跟你要创建的提示的描述，然后按 `kbstyle(Enter)`。

    ```prompt
    /create-prompt 搭建一个新的 React 组件及其测试
    ```

1. 回答关于提示的澄清性问题，并查看生成的提示文件。

**验证是否生效**：在聊天视图中输入 `/<提示名称> 带有排序和筛选功能的数据表格`，然后按 `kbstyle(Enter)`。代理应根据你的约定搭建组件和测试文件。

> [!TIP]
> 在聊天中输入 `/create-prompt` 以借助 AI 辅助生成提示文件。你还可以通过说“将此工作流保存为提示”从正在进行的对话中提取可复用的提示。在[使用提示文件](/docs/agent-customization/prompt-files.md)中了解更多。

## 步骤 4：构建自定义代理

自定义代理让 AI 能够采用具有特定工具访问权限的专业角色。创建一个只能读取代码而不能修改代码的代码审查代理。

1. 打开聊天视图 (`kb(workbench.action.chat.open)`)。

1. 输入 `/create-agent`，后跟你要创建的代理的描述，然后按 `kbstyle(Enter)`。

    ```prompt
    /create-agent 一个代码审查员，在不修改文件的情况下分析代码的质量、安全性和最佳实践
    ```

1. 回答关于代理的澄清性问题，并查看生成的代理文件。

**验证是否生效**：从聊天视图的代理下拉菜单中选择“**审查员**”代理，然后提问“审查认证模块”。代理应分析代码而不进行任何更改。

> [!TIP]
> 你可以为代理添加 `handoffs` 来创建引导式工作流。例如，从规划代理交接给实现代理。在[自定义代理](/docs/agent-customization/custom-agents.md#handoffs)中了解更多。

## 步骤 5：为专用功能创建技能

技能是指令、脚本和资源的文件夹，Copilot 在需要执行专门任务时会加载这些内容。与定义编码规范的指令文件不同，技能教 Copilot 如何执行特定的工作流。

1. 从命令面板 (`kb(workbench.action.showCommands)`) 运行“**聊天：打开自定义项**”命令，以打开代理自定义编辑器。

1. 选择“**技能**”选项卡，然后从下拉菜单中选择“**新建技能（工作区）**”。

1. 输入技能的名称，例如 `update-readme`，然后按 `kbstyle(Enter)`。

1. 将以下内容添加到 `SKILL.md` 文件中：

    ```markdown
    ---
    name: update-readme
    description: 更新项目 README 以反映最近的代码更改。每当代码发生更改时，此技能会审查更改并使用新功能、使用说明和 API 参考来更新 README。
    ---
    # 更新 README

    在更新 README 时：
    1. 审查最近的代码更改以识别新增或修改的功能
    2. 更新相关章节（安装、使用、API 参考）
    3. 为新的命令、配置选项或环境变量添加条目
    4. 删除已删除或已弃用功能的文档
    5. 保持现有的语气、结构和格式约定
    ```

**验证是否生效**：在聊天中，让 Copilot 为你的项目添加一个新功能（例如，“添加一个健康检查端点”）。当它生成代码时，也应该自动用新端点的文档更新 README。你也可以在聊天视图中直接输入 `/update-readme` 来调用该技能。

> [!TIP]
> 在聊天中输入 `/create-skill` 以借助 AI 辅助生成技能。你还可以通过说“从我们刚刚做的事情创建一个技能”从正在进行的对话中提取技能。在[代理技能](/docs/agent-customization/agent-skills.md)中了解更多。

## 你构建了什么

你的项目现在拥有了分层的 AI 自定义设置：

```text
your-project/
  .github/
    copilot-instructions.md          # 项目级编码规范（步骤 1）
    instructions/
      react.instructions.md          # React 特定约定（步骤 2）
    prompts/
      create-component.prompt.md     # 可复用的组件搭建（步骤 3）
    agents/
      reviewer.agent.md              # 只读代码审查员（步骤 4）
    skills/
      update-readme/
        SKILL.md                     # README 更新工作流（步骤 5）
```

## 后续步骤

* 添加 [MCP 服务器](/docs/agent-customization/mcp-servers.md)以使用外部工具和服务扩展代理
* 设置[钩子](/docs/agent-customization/hooks.md)以在代理生命周期的关键节点自动执行任务，例如在每次文件编辑后运行格式化器
* 浏览[代理插件](/docs/agent-customization/agent-plugins.md)以从社区市场安装预打包的自定义项
* 通过将 `.github/` 目录提交到你的仓库，与团队共享自定义项
* 使用[代理自定义编辑器](/docs/agent-customization/overview.md#manage-customizations-in-the-editor)在一个地方查看所有自定义项
