---
ContentId: 9f84b21e-5b76-4c3a-a5dd-2021ab343f1f
DateApproved: 6/10/2026
MetaDescription: 了解如何在 Visual Studio Code 中使用 GitHub Copilot 编写、调试和修复测试。
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# 使用 GitHub Copilot 进行测试

编写和维护测试是软件开发中至关重要但往往耗时的一部分。GitHub Copilot 通过帮助你在 Visual Studio Code 中更高效地编写、调试和修复测试来简化这一过程。本文介绍如何利用 Copilot 的测试功能来改进你的测试工作流并提高项目中的测试覆盖率。

Copilot 可以帮助完成以下测试任务：

* **搭建测试框架**：获取帮助，为你的项目和语言配置合适的测试框架和 VS Code 扩展。
* **生成测试代码**：创建覆盖你应用程序代码的单元测试、集成测试和端到端测试。
* **处理边界情况**：生成全面的测试套件，覆盖边界情况和错误条件。
* **修复失败的测试**：接收修复测试失败的建议。
* **保持一致性**：个性化设置 Copilot，使其生成的测试遵循你项目的编码规范。

> [!TIP]
> 如果你还没有 Copilot 订阅，可以注册 [Copilot 免费计划](https://github.com/github-copilot/signup) 免费使用 Copilot，并获得每月的行内建议和 AI 额度。

> [!IMPORTANT]
> **自 2026 年 4 月 20 日起**，Copilot Pro、Copilot Pro+、Max 和学生计划的新注册将暂时暂停。

## 搭建你的测试框架

为了加速你的测试工作流，Copilot 可以帮助你为项目搭建测试框架和 VS Code 扩展。Copilot 会根据你的项目类型建议合适的测试框架。

1. 打开聊天视图（`kb(workbench.action.chat.open)`）。
1. 在聊天输入框中输入 `/setupTests` 命令。
1. 按照 Copilot 的指导配置你的项目。

## 使用 Copilot 编写测试

Copilot 可以通过生成覆盖你代码库的测试代码来帮助你为应用程序代码编写测试。这包括单元测试、端到端测试和边界情况测试。

### 使用聊天提示词

1. 打开你的应用程序代码文件。

1. 打开以下视图之一：
    * 聊天视图（`kb(workbench.action.chat.open)`）
    * 行内聊天（`kb(inlineChat.start)`）

1. 输入类似以下内容的提示词：
    * "为这段代码生成测试"
    * "编写包含边界情况的单元测试"
    * "为此模块创建集成测试"

在 GitHub 文档中获取有关[使用 GitHub Copilot 编写测试](https://docs.github.com/en/copilot/using-github-copilot/guides-on-using-github-copilot/writing-tests-with-github-copilot)的更多指导。

### 使用编辑器智能操作

无需编写提示词即可为应用程序代码生成测试，你可以使用编辑器智能操作。

1. 打开你的应用程序代码文件。
1. 或者，选择要测试的代码。
1. 右键单击并选择 **生成代码** > **生成测试**。

    Copilot 会在现有的测试文件中生成测试代码，如果没有则创建新的测试文件。

1. 或者，通过在行内聊天提示词中提供额外的上下文来优化生成的测试。

## 修复失败的测试

Copilot 与 VS Code 中的测试资源管理器集成，可以帮助修复失败的测试。

1. 在测试资源管理器中，将鼠标悬停在失败的测试上
1. 选择 **修复测试失败** 按钮（星形图标）
1. 查看并应用 Copilot 建议的修复

或者，你也可以：

1. 打开聊天视图
1. 输入 `/fixTestFailure` 命令
1. 按照 Copilot 的建议修复测试

> [!TIP]
> 使用[智能体](/docs/agents/agent-types/local-agents.md)时，智能体会在运行测试时监控测试输出，并自动尝试修复和重新运行失败的测试。

## 个性化测试生成

如果你的组织有特定的测试要求，你可以自定义 Copilot 生成测试的方式，以确保它们符合你的标准。你可以通过提供自定义指令来个性化 Copilot 生成测试的方式。例如：

* 指定偏好的测试框架
* 定义测试的命名约定
* 设置代码结构偏好
* 请求特定的测试模式或方法论

获取有关[个性化设置 Copilot 以生成测试](/docs/agent-customization/overview.md)的更多信息。

## 获得更好测试生成效果的提示

为了在使用 Copilot 生成测试时获得最佳效果，请遵循以下提示：

* 在提示词中提供关于你偏好使用的测试框架的上下文
* 指定你是否需要特定类型的测试（单元测试、集成测试、端到端测试）
* 要求特定的测试用例或边界情况
* 请求遵循你项目编码标准的测试

## 后续步骤

* 尝试[使用浏览器智能体工具测试 Web 应用](/docs/agents/guides/browser-agent-testing-guide.md)。
* 了解有关 [VS Code 中的 Copilot](/docs/agent-native/overview.md) 的更多信息。
* 探索 [VS Code 中的通用测试功能](/docs/debugtest/testing.md)。
* 查看用于[生成单元测试](https://docs.github.com/en/copilot/example-prompts-for-github-copilot-chat/testing-code/generate-unit-tests)的示例提示词
