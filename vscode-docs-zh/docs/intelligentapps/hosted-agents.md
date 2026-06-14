---
ContentId: bedbd8a9-eec9-4f61-9784-1bd38f735468
DateApproved: 05/29/2026
MetaDescription: 开始使用 Foundry Toolkit 创建托管代理并将其部署到 Foundry。
---

# 在 Foundry Toolkit for VS Code 中创建并部署托管代理

托管代理是基于代码的 AI 代理，运行在 Microsoft Foundry 代理服务中，提供托管、缩放、可观测性和安全执行环境，让你可以专注于代理逻辑而非基础设施。借助 Microsoft Foundry Toolkit for Visual Studio Code，你可以从 Python 或 .NET 的各种项目模板快速创建新的托管代理，在本地开发和测试，然后直接将其部署到你的 Foundry 项目。

## 创建新的托管代理

要创建新的托管代理：

1. 在 Foundry Toolkit 的主侧边栏中，导航到 **我的资源** > **你的项目名称** > **托管代理（预览版）**，然后选择该树节点右侧的 **+**。

    ![显示 Visual Studio Code 主侧边栏的截图，其中在操作栏中选中了 Foundry Toolkit，并突出显示了用于创建新托管代理的加号图标。](./images/hosted-agents/primary-sidebar-add.png)

2. Visual Studio Code 主区域中将显示"从示例创建托管代理"设计器。

    ![显示代理详细信息设计器的截图。](./images/hosted-agents/create-step-1.png)

    在此第一步中，你需要选择代理的详细信息：

    - **编程语言** - 选择 Python 或 C#。
    - **框架** - 选择一个框架或不使用框架。
    - **协议类型** - 选择一个协议类型。
    - **示例** - 将用作新托管代理起点的示例项目。

    根据你的选择，下拉列表中会显示不同的示例项目。

    ![显示使用 Responses API 的 Python 可用示例项目列表的截图。](./images/hosted-agents/create-sample-list.png)

    > [!NOTE]
    > 设计器中的某些字段可能会根据工作区的上下文（如编程语言、项目等）预填充。因此，你可能不需要为每个字段都"选择"值。

选择 **下一步** 按钮。

3. 在第二步中，你需要选择：

    - **工作区文件夹** - 本地驱动器上用于存储新项目文件的位置。
    - **环境设置** - 如果你希望提前为新托管代理选择部署目标，请选中此项。这将显示 **订阅和项目名称** 和 **模型部署** 选项。
    - **订阅和项目名称** - 可选步骤。选择你要部署到的 Azure 订阅和 Foundry 项目名称。
    - **模型部署** - 选择此托管代理将使用的模型。

    ![显示代理详细信息设计器第二页的截图。](./images/hosted-agents/create-step-2.png)

选择 **创建** 按钮。

4. 将打开一个新的 Visual Studio Code 实例，其中包含生成的文件。文件的数量和名称取决于你选择的示例。

5. 阅读 `README.md` 文件，了解示例说明、如何部署新托管代理的指导以及故障排除步骤。

## 部署你的托管代理

修改示例项目以实现你自己的自定义逻辑后，你将把代理部署到 Foundry。

1. 在 Foundry Toolkit 侧边栏中，选择 **开发工具** > **构建** > **部署到 Microsoft Foundry**。

    ![显示侧边栏中选中"部署到 Microsoft Foundry"的截图。](./images/hosted-agents/primary-sidebar-deploy.png)

2. 如果你没有选择默认项目，主区域将显示"部署托管代理"设计器的第一步"Foundry 项目设置"。选择你的 Azure 订阅和 Foundry 项目名称（或创建新项目）。

    ![显示部署项目设置选项的截图。](./images/hosted-agents/deploy-foundry-project-setup.png)

选择 **下一步** 按钮。

3. 在"基本信息"步骤中，选择部署方法。你需要选择以下之一：

    - **代码**
    - **容器**

    ![显示基本信息设计器的截图，其中突出显示了部署方法选项。](./images/hosted-agents/deployment-method.png)

根据你的选择，你需要在后续步骤中填写不同的信息。

### 将托管代理作为 ZIP 包中的源代码部署

如果你选择了 **代码** 选项：

1. 接下来你需要在以下两者之间选择：

    - **远程** - Azure 在配置过程中根据 requirements.txt 或项目文件安装依赖项。
    - **捆绑** - 按原样运行 ZIP，依赖项包含在 `packages/` 或 `publish` 输出中。

    ![显示基本信息设计器的截图，其中突出显示了部署包模式选项。](./images/hosted-agents/deploy-code-package-mode.png)

2. 你将选择部署到：

- **新建代理** - 你需要为新托管代理输入新名称。
- **现有代理** - 从包含现有托管代理的列表框中选择。

选择 **下一步** 按钮。

3. 在"审阅 + 部署"步骤中，你需要选择：

    - **语言** - Python 或 C#。
    - **运行时版本** - 要使用的运行时版本。
    - **入口点** - 启动代理的命令。
    - **CPU 和内存** - 希望托管代理使用的计算和内存量。

    ![显示基本信息设计器的截图，其中突出显示了部署方法选项。](./images/hosted-agents/code-review-deploy.png)

    > [!NOTE]
    > 你的 CPU 和内存选择会影响托管代理的计费。

4. 选择 **部署** 按钮。继续阅读[部署进度和成功](#部署进度和成功) 部分。

### 通过 ACR 将托管代理作为 Docker 容器部署

如果你选择了 **容器** 选项：

1. 接下来你需要在以下选项之间选择：

    - **默认 ACR** - Foundry 为你创建并管理容器注册表。
    - **自定义 ACR** - 使用你在 Azure 中拥有的容器注册表
    - **自定义 ACR 镜像** - 使用预构建的 ACR 镜像 URL

    ![显示通过容器部署的选项截图。](./images/hosted-agents/deploy-container-registry.png)

如果选择 **自定义 ACR**，则需要提供 ACR URL。

如果选择 **自定义 ACR 镜像**，则需要提供镜像 URL。

2. 你将选择部署到：

- **新建代理** - 你需要为新托管代理输入新名称。
- **现有代理** - 从包含现有托管代理的列表框中选择。

选择 **下一步** 按钮。

3. 在"审阅 + 部署"步骤中，你需要选择 **CPU 和内存** - 希望托管代理使用的计算和内存量。

      ![显示选择 CPU 和内存进行部署的步骤截图。](./images/hosted-agents/deploy-cpu-memory.png)

      > [!NOTE]
      > 你的 CPU 和内存选择会影响托管代理的计费。

4. 选择 **部署** 按钮。继续阅读[部署进度和成功](#部署进度和成功) 部分。

### 部署进度和成功

选择 **部署** 按钮后，你将看到部署正在进行的通知，并在终端输出中看到日志信息。片刻之后，你应该会看到代理部署成功，并且托管代理 Playground 加载到主视图中。

选择"**详细信息**"选项卡可查看代理和部署详细信息。

![显示代理 Playground 的截图，其中选中了"详细信息"选项卡。](./images/hosted-agents/hosted-agent-details.png)

此外，你现在应该能够在 Foundry Toolkit 侧边栏中的 **我的资源** > **你的项目名称** > **托管代理（预览版）** > **你的代理名称** 下看到新的托管代理。

![显示 Foundry Toolkit 侧边栏中列出的新代理截图。](./images/hosted-agents/deployed-agent-sidebar.png)

## 你学到了什么

在本文中，你学会了如何：

- 使用"托管代理"功能，根据所需编程语言、API 框架等的示例创建新的托管代理项目。
- 使用"部署托管代理"功能配置并启动将托管代理部署到 Foundry。

## 后续步骤

- [使用代理检查器](/docs/intelligentapps/agent-inspector.md) 测试和调试你的代理
