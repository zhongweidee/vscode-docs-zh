---
ContentId: 60ed75f8-8cde-43b6-bd24-d0f0fc01937d
DateApproved: 04/15/2026
MetaDescription: 在Foundry Toolkit for Visual Studio Code中连接工具和Toolbox，然后将它们添加到智能体或生成托管智能体示例。
---

# 使用工具目录连接工具和Toolbox

> [!NOTE]
> Toolbox支持目前处于预览阶段，仅在Foundry Toolkit的预发布版本中可用。

智能体通常依赖多个工具。有些工具来自Microsoft Foundry，有些作为本地模型上下文协议（MCP）服务器运行，还有些属于由其他团队管理的共享Toolbox。Foundry Toolkit for Visual Studio Code中的工具目录为您提供了一个集中位置来连接这些选项、将它们附加到智能体，并生成连接到Toolbox的托管智能体示例。

在本文中，您将学习如何连接Foundry工具、注册本地MCP服务器、创建和使用Toolbox，以及从Toolbox搭建托管智能体示例，以便从智能体构建器过渡到可运行代码。

[Toolbox](https://aka.ms/toolbox-learn)是通过一个MCP兼容端点提供服务集中托管管理的工具集合。当多个智能体需要使用同一套受治理的工具和凭据时，可使用Toolbox。

![Screenshot showing the Tool Catalog in Foundry Toolkit.](./images/overview/tool-catalog.png)

## 主要功能

| 功能 | 描述 |
| --- | --- |
| 连接Foundry工具 | 从Foundry项目添加单个工具到智能体构建器中的提示智能体。 |
| 连接本地MCP服务器 | 注册 `stdio`、HTTP 或 SSE MCP服务器，用于本地或远程智能体工作流。 |
| 附加Toolbox | 通过一个MCP兼容端点重复使用集中管理的工具集合。 |
| 生成托管智能体示例 | 搭建一个连接Toolbox并公开响应协议的Agent Framework Python项目。 |
| 集中治理 | 将凭据、策略执行和可审计性保留在Microsoft Foundry中，而非智能体代码中。 |

## 先决条件

开始之前，请确保您具备以下条件：

* Visual Studio Code。
* 已安装Foundry Toolkit扩展。
* 可访问Microsoft Foundry项目。有关更多信息，请参阅[Foundry Toolkit for Visual Studio Code](/docs/intelligentapps/overview.md)。
* 有权查看或附加项目中的工具和Toolbox。
* 对于托管智能体示例，需要Python 3.12或更高版本以及通过 `az login` 登录的Azure CLI。

> [!NOTE]
> Toolbox端点是MCP兼容的。任何支持MCP的智能体运行时都可以使用Toolbox，包括您在Foundry Toolkit外部构建的智能体。

## 入门

工具目录支持多种将工具引入智能体的方式。请根据工具的托管方式以及您希望在多个智能体之间共享的方式来选择相应的选项。以下各节将详细介绍每种选项。

| 选项 | 适用场景 |
| --- | --- |
| Foundry工具 | 您想将Foundry项目中的一个工具添加到提示智能体。 |
| 本地MCP服务器 | 您想使用在本地运行或位于自定义MCP端点的服务器。 |
| Toolbox | 您希望多个智能体共享同一套集中管理的工具、凭据和策略。 |

## 连接Foundry工具

当您想将Foundry项目中的单个工具添加到智能体构建器中的提示智能体时，请使用此选项。

1. 在**活动栏**中选择 **Foundry Toolkit**。
1. 在**我的资源**下，展开**您的项目名称** > **工具**。
1. 选择**工具**旁的 **+** 图标以打开**工具目录**。
1. 在**目录**选项卡上，浏览可用的工具。
1. 选择您要使用的工具。
1. 在**连接**对话框中，输入所需的值，例如名称、端点、参数和身份验证设置。
1. 选择**连接**。

连接创建后，该工具即可供您的智能体使用。

## 连接本地MCP服务器工具

注册在本地计算机上运行或位于自定义远程端点的MCP服务器。当您想在开发过程中测试MCP服务器，或连接到未发布到Foundry项目的服务器时，请使用此选项。

1. 在**活动栏**中选择 **Foundry Toolkit**。
1. 在**我的资源**下，展开**本地资源** > **工具**。
1. 选择**工具**旁的 **+** 图标以打开**工具目录**。
1. 在**自定义**选项卡上，选择以下选项之一：
   * 选择**编辑 mcp.json** 以在 `mcp.json` 中定义服务器。
   * 选择**配置（stdio）** 以运行本地命令。
   * 选择**配置（HTTP 或 SSE）** 以连接到远程端点。
1. 保存或完成配置。

保存配置后，MCP服务器将显示为可用工具。

## 将工具添加到智能体

通过工具目录连接工具后，将它们附加到智能体构建器中的特定智能体，以便智能体在运行时调用它们。

1. 在**我的资源** > **您的项目名称** > **提示智能体**下打开现有智能体的智能体构建器，或在**开发者工具** > **构建** > **创建智能体**下创建新智能体。
1. 在**演练场**选项卡的**工具**部分，选择 **+**。
1. 在**选择工具**对话框中，选择预配置工具、目录工具或自定义工具。
1. 配置工具选项。
1. 选择**添加工具**。

该工具现已附加到智能体，可在执行过程中使用。

### 创建新的Toolbox并在托管智能体中使用

在Foundry项目中构建一个自定义Toolbox，将相关工具组合在单个MCP兼容端点之后，然后搭建一个使用该Toolbox的托管智能体。

1. 在**活动栏**中选择 **Foundry Toolkit**。
1. 在**我的资源**下，展开**您的项目名称** > **工具**。
1. 选择 **+ 添加Toolbox** 图标以创建新的Toolbox。
1. 在**构建自定义Toolbox**选项卡上，输入Toolbox名称和描述，添加工具，然后选择**发布**。
1. 返回**工具**页面，找到您的新Toolbox，然后选择**搭建代码模板**以创建一个连接到该Toolbox的托管智能体。

![Screenshot showing the Build a Custom Toolbox page in Foundry Toolkit with fields for the toolbox name, description, and selected tools.](./images/tools/toolbox-vscode-create.png)

> [!TIP]
> 使用附加Toolbox的方式，而不是逐个将相同工具连接到多个智能体。当Toolbox所有者更新Toolbox时，使用该Toolbox的智能体会自动获取更改，无需单独编辑每个智能体。

### 复制Toolbox端点

创建Toolbox后，您可以从Foundry Toolkit中复制其MCP兼容端点。

1. 在**活动栏**中选择 **Foundry Toolkit**。
1. 在**我的资源**下，展开**您的项目名称** > **工具**。
1. 在**Toolbox**选项卡上，找到您的Toolbox。
1. 在**端点URL**列中，复制端点。

![Screenshot showing the Toolboxes tab in Foundry Toolkit with a toolbox entry, endpoint URL, and Scaffold code template action.](./images/tools/toolbox-vscode-list.png)

**端点URL**值是Toolbox的使用者端点。任何支持MCP的智能体运行时都可以使用此端点连接到Toolbox。

### 生成使用Toolbox的托管智能体示例

Foundry Toolkit可以搭建一个已连接到Toolbox的可运行托管智能体项目。生成的项目使用Agent Framework并公开响应协议，因此您可以从智能体构建器过渡到代码，本地调试，并部署回Microsoft Foundry。

1. 在**活动栏**中选择 **Foundry Toolkit**。
1. 在**我的资源**下，展开**您的项目名称** > **工具**，然后打开您要使用的Toolbox。
1. 选择**搭建代码模板**。
1. 在**命令面板**中，出现提示时选择一个项目文件夹。

生成的项目包含托管智能体入口点、部署文件以及一个 `README.md`，其中包含该框架的确切设置、运行和部署步骤。

#### 本地运行

按照生成的 `README.md` 安装依赖项、配置环境变量并登录Azure。然后通过以下方式之一启动智能体：

* 在VS Code中按 `F5`，然后选择**调试本地智能体HTTP服务器**。
* 从终端运行 `python main.py`。

> [!TIP]
> 当您需要交互式用户界面来发送消息、查看工具调用以及通过断点调试智能体行为时，请使用 `F5` 流程中的**智能体检查器**。

#### 部署

按照生成的 `README.md` 中针对该框架的部署步骤进行操作。您可以通过以下任一方式部署项目：

* 打开**命令面板**，运行 **Microsoft Foundry: 部署托管智能体**，然后按照提示操作。
* 在**活动栏**中，选择 **Foundry Toolkit**，选择**部署到Microsoft Foundry**，然后按照提示操作。
* 打开GitHub Copilot Chat并要求它将托管智能体部署到Microsoft Foundry。Copilot使用 `microsoft-foundry` 技能构建Docker镜像、推送镜像并注册智能体。

生成的项目将托管智能体设置存储在 `agent.yaml` 和 `agent.manifest.yaml` 中。

> [!NOTE]
> Toolbox MCP请求需要 `Foundry-Features: Toolboxes=V1Preview` 请求头。生成的智能体会自动处理此要求。如果没有配置Application Insights连接，您可能还会看到启动警告。智能体将继续正常运行。

## 相关内容

* [使用Foundry Toolkit创建智能体](/docs/intelligentapps/create-agents.md)
* [在Foundry Toolkit中使用智能体检查器开发智能体](/docs/intelligentapps/agent-inspector.md)
* [Foundry Toolkit for Visual Studio Code](/docs/intelligentapps/overview.md)
