---
ContentId: 131f9633-5446-4384-96ca-7bff2e3dc0fc
DateApproved: 12/2/2022
MetaDescription: 在 Visual Studio Code 中使用 AKS 工具和诊断功能
---
# VS Code 中的 AKS 工具和诊断功能

本文档将介绍直接从 Visual Studio Code 与 AKS 集群交互的一些方式。[Azure Kubernetes Services](https://azure.microsoft.com/services/kubernetes-service/#overview) 是一项完全托管的 [Kubernetes](https://azure.microsoft.com/topic/what-is-kubernetes/#overview) 服务。Azure Kubernetes Service (AKS) 提供无服务器 Kubernetes、持续集成和持续交付 (CI/CD) 体验，并具备企业级安全性和治理能力。Azure Kubernetes Service (AKS) 是一个开源系统，用于自动部署、扩展和管理容器化应用程序。

我们将展示如何对 AKS 集群运行[诊断健康检查](https://learn.microsoft.com/azure/aks/concepts-diagnostics)、启动 [AKS Periscope](https://github.com/azure/aks-periscope) 进行更深入的问题排查、部署 [Azure Service Operator](https://github.com/Azure/azure-service-operator)，或生成 [GitHub Actions 入门工作流](https://github.com/actions/starter-workflows)。

## 准备工作

[AKS VS Code 扩展](https://marketplace.visualstudio.com/items?itemName=ms-kubernetes-tools.vscode-aks-tools) 依赖于 [Kubernetes VS Code 扩展](https://marketplace.visualstudio.com/items?itemName=ms-kubernetes-tools.vscode-kubernetes-tools)。

你需要下载 [Kubernetes VS Code 扩展](https://code.visualstudio.com/docs/azure/kubernetes)。

你可以对现有的 AKS 集群按照本指南操作，也可以[创建 AKS 集群](https://learn.microsoft.com/azure/aks/learn/quick-kubernetes-deploy-portal)。

## 安装 Azure Kubernetes Services 扩展

若想获得完全集成的 Azure Kubernetes 诊断体验，你可以安装 [Azure Kubernetes Services 工具](https://marketplace.visualstudio.com/items?itemName=ms-kubernetes-tools.vscode-aks-tools)扩展。

借助该扩展，你可以轻松地从 VS Code 环境中查看和管理 AKS 集群。

要安装 Azure Kubernetes Services VS Code 扩展，请打开扩展视图 (`kb(workbench.view.extensions)`) 并搜索 "AKS"。选择 Microsoft 的 [Azure Kubernetes Services](https://marketplace.visualstudio.com/items?itemName=ms-kubernetes-tools.vscode-aks-tools) 扩展。

![安装 Azure Kubernetes Services](images/aksextensions/install-aks-extension.png)

## 安装步骤

1. 下载并安装适用于 VS Code 的 [Azure Kubernetes Service 扩展](https://marketplace.visualstudio.com/items?itemName=ms-kubernetes-tools.vscode-aks-tools)。

2. 等待扩展安装完成后，在提示时重新加载 VS Code。

3. 安装完成后，你将在 **Clouds** 下看到一个名为 **Azure** 的部分。

4. 选择 **Sign in to Azure…** 登录你的 Azure 帐户。

![登录你的 Azure 帐户](images/aksextensions/Sign-in.png)

## 功能

使用 Azure 帐户成功登录后，你可以在 **Azure** 部分下查看所有 Azure 订阅中的 AKS 集群。你可以右键单击 AKS 集群并选择菜单项来执行以下操作。

对集群运行 AKS 诊断：

![Cloud explorer 扩展，运行 AKS 诊断菜单](images/aksextensions/right-click-menu.png)

启动 GitHub 工作流：

![Cloud explorer 扩展，创建 GitHub 工作流菜单](images/aksextensions/right-click-menu-workflow.png)

运行 Kubectl 命令：

![Cloud explorer 扩展，运行 Kubectl 命令菜单](images/aksextensions/right-click-menu-kubectl.png)

### 合并到 Kubeconfig

右键单击你的 AKS 集群并选择 **Merge into Kubeconfig**，将所选 AKS 集群添加到你的[活动 kubeconfig 文件](https://github.com/vscode-kubernetes-tools/vscode-kubernetes-tools#working-with-kubeconfigs)中。

### 保存 Kubeconfig

右键单击你的 AKS 集群并选择 **Save Kubeconfig**，将所选 AKS 集群的 kubeconfig 保存为一个新文件。

### AKS 诊断

右键单击你的 AKS 集群并选择 **Run AKS Diagnostics**，基于 AKS 集群的后端遥测数据显示以下诊断信息：

* 最佳实践
* 创建、升级、删除和扩展问题
* 身份与安全
* 网络与连接问题
* 节点运行状况

若要对 AKS 集群执行进一步检查以排查问题并获取推荐的解决方案，请选择页面顶部的 AKS 诊断链接，为所选集群打开该页面。有关 AKS 诊断的更多信息，请访问 [AKS 诊断概述](https://learn.microsoft.com/azure/aks/concepts-diagnostics)。

![AKS 诊断 Webview](images/aksextensions/aks-diagnostics-webview.png)

### 在 Azure 门户中导航到你的集群

右键单击你的 AKS 集群并选择 **Show In Azure Portal**，在 [Azure 门户](https://portal.azure.com/)中打开集群的概览页面。

### 显示 AKS 集群属性

右键单击你的 AKS 集群并选择 **Show Properties**，显示 AKS 集群和代理池属性，如预配状态、FQDN、K8s 版本，以及节点属性，如节点版本、VM 类型、VM 大小、操作系统类型、操作系统磁盘大小和节点预配状态。

### AKS Periscope

右键单击你的 AKS 集群并选择 **Run AKS Periscope**，从 AKS 集群中提取详细的诊断信息并将其导出到 Azure 存储帐户。选择该选项后，将加载一个 Web 视图，为你提供生成已收集日志的可下载链接以及一个具有 7 天有效期的可共享链接的选项。

> 如果你没有看到所有节点的日志，可能是日志仍在上传中。请再次按 **Generate Link** 按钮以加载更多日志。

有关更多信息，请访问 [AKS Periscope](https://github.com/Azure/aks-periscope)。

![AKS Periscope Webview](images/aksextensions/aks-periscope-webview.png)

**配置存储帐户**

运行 AKS Periscope 要求你拥有一个与 AKS 集群诊断设置关联的存储帐户。

如果你的 AKS 集群的诊断设置只关联了一个存储帐户，则收集的日志将默认存储在该关联的存储帐户中。

如果你的 AKS 集群的诊断设置关联了多个存储帐户，则扩展将提示你选择用于保存已收集日志的存储帐户。

如果你的诊断设置中没有配置存储帐户，你可以按照以下说明启用它：

1. 右键单击你的 AKS 集群并选择 **Show In Azure Portal**。

2. 在左侧导航栏中选择 **Monitoring** 下的 **Diagnostic Settings**。

3. 选择 **Add diagnostic setting**。

4. 输入名称，例如 myAKSClusterLogs，然后选择 **Archive to a storage account** 选项。

5. 选择你选择的存储帐户。

6. 在可用日志列表中，选择你希望启用的日志。
    > 注意：产生的费用取决于你的存储帐户使用情况和 Azure 存储策略。

7. 准备就绪后，选择 **Save** 以启用所选日志的收集。

有关诊断设置的更多信息，请访问[创建诊断设置以将平台日志和指标发送到不同目标](https://learn.microsoft.com/azure/azure-monitor/essentials/diagnostic-settings)。

### 安装 Azure Service Operator

右键单击你的 AKS 集群并选择 **Install Azure Service Operator**，轻松地在 AKS 集群上部署最新版本的 Azure Service Operator (ASO) 并在 Kubernetes 中预配 Azure 资源。选择此选项时，系统将提示你提供 ASO 在执行 Azure 资源操作时使用的服务主体。此服务主体必须具有适当的权限（通常是在适当范围内的参与者权限）。填写服务主体详细信息并选择 **Submit** 以启动 Azure Service Operator 的安装。

> Install Azure Service Operator 只能在从未安装过 ASO 的 AKS 集群上执行。如果你已经手动启动了安装，请按照 [Azure Service Operator](https://azure.github.io/azure-service-operator/#installation) 上的说明完成安装。

有关 Azure Service Operator 的更多信息，请访问 [Azure Service Operator（适用于 Kubernetes）](https://github.com/Azure/azure-service-operator)。如果你在使用 Azure Service Operator 时遇到问题，请访问 [Azure Service Operator (ASO) 故障排除](https://github.com/Azure/azure-service-operator/blob/master/docs/troubleshooting.md)。

![Azure Service Operator Webview](images/aksextensions/azure-service-operator-screenshot.png)

### 创建 GitHub 工作流

右键单击你的 AKS 集群并选择 **Create GitHub Workflow**，轻松打开并创建工作流入门模板。这有助于快速生成工作流模板，并预先填充资源组和集群名称，适用于：

* [入门工作流](https://github.com/actions/starter-workflows/blob/main/deployments/azure-kubernetes-service.yml)
* [Helm 工作流](https://github.com/actions/starter-workflows/blob/main/deployments/azure-kubernetes-service-helm.yml)
* [Kompose 工作流](https://github.com/actions/starter-workflows/blob/main/deployments/azure-kubernetes-service-kompose.yml)
* [Kustomize 工作流](https://github.com/actions/starter-workflows/blob/main/deployments/azure-kubernetes-service-kustomize.yml)

### 从 Azure 门户创建集群

右键单击你的 AKS 订阅并选择 **Create Cluster From Azure Portal**，轻松导航到 Azure 门户中的 AKS 创建集群页面。

![AKS 订阅上的从 Azure 门户创建集群命令](images/aksextensions/right-click-subscription.png)

### 启动或停止 AKS 集群

右键单击你的 AKS 集群并选择 **Show Properties** 以显示 AKS 集群属性。在该页面上，有一个 **Stop/Start Cluster** 按钮用于启动或停止集群。

![从属性 Webview 启动或停止集群](images/aksextensions/aks-startstop-cluster.png)

### 从你的 AKS 集群运行 Kubectl 命令

右键单击你的 AKS 集群并选择 **Run KubectlCommands** 以在集群上运行 Kubectl 命令。目前，以下 Kubectl 命令可用：

* Describe Services
* Get All Pods
* API Resources
* Get Cluster Info
* Get Node
* Get All Events

恭喜！你现在知道如何浏览此 VS Code 扩展了。

## 后续步骤

* [Azure 扩展](/docs/azure/extensions.md) - VS Code Marketplace 有数百个适用于 Azure 和云的扩展。
* [Azure Kubernetes Service 诊断（预览版）概述](https://learn.microsoft.com/azure/aks/concepts-diagnostics)
* [Azure Service Operator](https://azure.github.io/azure-service-operator/#azure-service-operator-v2) - 了解 Azure Service Operator。
* [AKS Periscope](https://github.com/azure/aks-periscope)
* [GitHub AKS 入门工作流](https://github.com/actions/starter-workflows)
