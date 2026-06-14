---
ContentId: 09f4c3b8-1504-4fb2-9f84-5aa0fbe3969a
DateApproved: 04/15/2026
MetaDescription: 了解如何使用 Visual Studio Code 中的 Foundry Toolkit 创建 AI 代理，包括使用模板或带有 Foundry 技能的 Copilot 创建托管代理，以及使用 Agent Builder 创建提示代理。
---

# 使用 Foundry Toolkit 创建代理

Visual Studio Code 的 Foundry Toolkit 扩展提供了多种使用 Microsoft Foundry 创建 AI 代理的方式。你可以构建托管代理（作为已部署的服务运行，带有支持性代码和基础架构），或提示代理（由指令、模型设置和可选工具定义的轻量级代理）。

## 选择合适的方式

- **模板** 带有代码和部署支持的完整代理项目
- **Copilot + Foundry 技能** 快速生成自定义代理
- **Agent Builder** 简单的基于提示的代理，无需完整的项目设置

## 先决条件

- Visual Studio Code
- 已安装 Foundry Toolkit 扩展
- 可访问 Microsoft Foundry

## 从模板创建托管代理

使用模板快速搭建新的托管代理项目。

1. 在 Foundry Toolkit 面板中，选择**我的资源** > **你的项目名称** > **托管代理（预览版）**
1. 选择 **+** 图标创建新的托管代理
1. 在**选择框架**对话框中，选择 "Microsoft Agent Framework" 或 "LangGraph"。
1. 在**创建托管代理**对话框中，选择以下模板之一：
   - Single Agent Hotel Assistant - 单代理模板
   - Writer-Reviewer Agent Workflow - 多代理模板
1. 在**选择编程语言**对话框中，选择以下之一：
   - Python
   - C#
1. 在**选择模型**对话框中，选择以下选项之一：
   - 已部署到你的 Foundry 项目的现有模型
   - **部署并使用新模型**，以上传现有的本地模型
   - **浏览模型目录**，选择要部署到你的 Foundry 项目的 Foundry 模型
1. 在**工作区文件夹**对话框中，选择**浏览**选项，在你的本地驱动器上选择你希望模板生成代码的文件夹

完成选择后，一个新的 Visual Studio Code 实例将打开，其中包含你选择的工作文件夹以及从所选模板生成的新代码。

### 后续步骤

创建项目后：

1. 按照 `README.md` 文件中的说明操作。例如，对于 Python 项目，它将提供确切的 PowerShell 或 bash 命令来设置环境并安装依赖项。
1. 按 F5 在本地运行和测试代理
1. 根据需要更新配置和代码
1. 将代理部署到 Microsoft Foundry

## 使用 Copilot 和 Foundry 技能创建托管代理

你还可以使用 GitHub Copilot 配合 Foundry 技能来创建代理。Foundry 技能会随 Foundry Toolkit 自动安装，你无需执行任何特殊操作即可调用这些技能。

1. 在 Visual Studio Code 中打开 GitHub Copilot Chat
1. 输入类似以下内容的提示："Create a Foundry agent that..."
1. Copilot 使用 Foundry 技能生成所需的文件和配置
1. 检查并更新生成的项目

此方法适用于基于场景快速生成自定义代理。

## 使用 Agent Builder 创建提示代理

使用 Agent Builder 创建轻量级的基于提示的代理。

1. 在 Foundry Toolkit 面板中，选择**我的资源** > **你的项目名称** > **提示代理**
1. 选择 **+** 创建新代理
1. 配置基本信息，例如：
   - 代理名称
   - 模型
   - 指令（系统提示）
   - 可选工具
1. 测试代理
1. 使用**保存**按钮发布到你的 Foundry 项目

如需了解更多信息，请参阅 [Agent Builder](/docs/intelligentapps/agentbuilder.md)。
