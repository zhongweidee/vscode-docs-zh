---
ContentId: 2f21c45a-8931-4da2-a921-af23a3b92949
DateApproved: 6/10/2026
MetaDescription: 了解如何在 Visual Studio Code 中使用 GitHub Copilot 设置调试配置并在调试过程中修复问题。
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# 使用 GitHub Copilot 进行调试

GitHub Copilot 可以帮助改进你在 Visual Studio Code 中的调试工作流。Copilot 可以协助为你的项目设置调试配置，并提供在调试过程中发现问题的修复建议。本文概述了如何在 VS Code 中使用 Copilot 来调试应用程序。

Copilot 可以帮助完成以下调试任务：

* **配置调试设置**：为你的项目生成和自定义启动配置。
* **启动调试会话**：使用 `copilot-debug` 从终端启动调试会话。
* **修复问题**：接收在调试过程中发现的问题的修复建议。

> [!TIP]
> 如果你还没有 Copilot 订阅，可以注册 [Copilot 免费计划](https://github.com/github-copilot/signup)免费使用 Copilot，并获得每月的内联建议和 AI 信用额度。

> [!IMPORTANT]
> **自 2026 年 4 月 20 日起**，Copilot Pro、Copilot Pro+、Max 和 Student 计划的新注册暂时暂停。

## 使用 Copilot 设置调试配置

VS Code 使用 `launch.json` 文件来存储[调试配置](/docs/debugtest/debugging-configuration.md)。Copilot 可以帮助你创建和自定义此文件，以便为你的项目设置调试。

1. 打开聊天视图（`kb(workbench.action.chat.open)`）。
1. 输入 `/startDebugging` 命令。
1. 按照 Copilot 的指引为你的项目设置调试。

或者，你可以使用自然语言提示，例如：

* "为 Django 应用创建调试配置"
* "为 React Native 应用设置调试"
* "为 Flask 应用程序配置调试"

## 使用 Copilot 启动调试

`copilot-debug` 终端命令简化了配置和启动调试会话的过程。在启动应用程序的命令前加上 `copilot-debug`，即可让 Copilot 自动配置并启动调试会话。

1. 打开集成终端（`kb(workbench.action.terminal.toggleTerminal)`）。

1. 输入 `copilot-debug`，后跟你的应用程序启动命令。例如：

    ```bash
    copilot-debug node app.js
    ```

    或者

    ```bash
    copilot-debug python manage.py
    ```

1. Copilot 会为你的应用程序启动调试会话。现在你可以使用 VS Code 内置的调试功能了。

了解更多关于[在 VS Code 中调试](/docs/debugtest/debugging.md)的信息。

## 使用 Copilot 修复代码问题

你可以使用 Copilot Chat 来帮助你修复代码问题或改进代码。

### 使用聊天提示

1. 打开你的应用程序代码文件。

1. 打开以下视图之一：
    * 聊天视图（`kb(workbench.action.chat.open)`）
    * 内联聊天（`kb(inlineChat.start)`）

1. 输入如下提示：
    * "/fix"
    * "修复此 #selection"
    * "验证此函数的输入"
    * "重构此代码"
    * "提高此代码的性能"

了解更多关于在 VS Code 中使用 [Copilot Chat](/docs/chat/chat-overview.md) 的信息。

### 使用编辑器智能操作

要在不编写提示的情况下修复应用程序代码的代码问题，你可以使用编辑器智能操作。

1. 打开你的应用程序代码文件。
1. 选择你要修复的代码。
1. 右键单击并选择 **Generate Code** > **Fix**。

    VS Code 会提供一个代码建议来修复该代码。

1. （可选）通过在聊天提示中提供额外的上下文来进一步优化生成的代码。

## 后续步骤

* 探索 [VS Code 中的通用调试功能](/docs/debugtest/debugging.md)。
* 了解更多关于 [VS Code 中的 Copilot](/docs/agent-native/overview.md) 的信息。
