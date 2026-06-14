---
ContentId: d0ece2e4-8dd2-4c0d-a773-604542651c9e
DateApproved: 5/4/2022
MetaDescription: 在 Visual Studio Code 中使用 Kubernetes
---
# 在 VS Code 中使用 Kubernetes

本文档将引导你完成使用 Visual Studio Code 将应用程序部署到 [Kubernetes](https://kubernetes.io/) 的整个过程。[Kubernetes](https://kubernetes.io/) 是一个用于自动化部署、扩展和管理容器化应用程序的开源系统。我们将向你展示如何创建 Kubernetes 集群、编写 Kubernetes 清单文件（通常使用 YAML 编写），该文件告诉 Kubernetes 它需要了解的关于应用程序的所有信息，最后将应用程序部署到 Kubernetes 集群。

## 准备工作

你需要准备好 [Docker](https://docker.com/) 和 [kubectl](https://kubernetes.io/docs/reference/kubectl/overview/) 工具。有关在计算机上设置 Docker 的详细信息，请参阅[安装 Docker](https://docs.docker.com/install/) 文档，以及[安装 kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)。在继续之前，请确认你能从 Shell 中运行 Docker 和 kubectl 命令。

你可以使用 [minikube](https://kubernetes.io/docs/getting-started-guides/minikube/) 创建本地 Kubernetes 集群，也可以在 [Azure Kubernetes Service (AKS)](https://learn.microsoft.com/azure/aks/) 中创建 Azure Kubernetes 集群。在本教程中，我们将使用 [Azure Kubernetes Service (AKS)](https://learn.microsoft.com/azure/aks/)，你需要准备好你的 [Azure](https://www.azure.com) 帐户以完成部署步骤。

## 安装 Kubernetes 扩展

为了获得完全集成的 Kubernetes 体验，你可以安装 [Kubernetes 工具](https://marketplace.visualstudio.com/items?itemName=ms-kubernetes-tools.vscode-kubernetes-tools)扩展，它允许你快速开发 Kubernetes 清单和 HELM 图表。使用该扩展，你还可以将基于容器化微服务的应用程序部署到本地或 Azure Kubernetes 集群，并调试运行在 Kubernetes 集群容器中的实时应用程序。它还可以轻松地在 VS Code 中浏览和管理你的 Kubernetes 集群，并与 [Draft](https://draft.sh/) 无缝集成以简化 Kubernetes 开发。

要安装 Kubernetes 扩展，请打开扩展视图（`kb(workbench.view.extensions)`）并搜索"kubernetes"。选择 Microsoft 的 [Kubernetes](https://marketplace.visualstudio.com/items?itemName=ms-kubernetes-tools.vscode-kubernetes-tools) 扩展。

![Install Kubernetes](images/kubernetes/install-kubernetes.png)

## 容器化并发布应用程序

你可以参考[使用 Docker 教程](/docs/azure/docker.md)来构建项目、生成 Docker 镜像，并通过 Microsoft [容器工具扩展](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-containers)将其推送到公共或私有容器注册表。

## 创建并配置 Kubernetes 集群

你可以使用 VS Code 中的 Kubernetes 扩展在 Azure 上创建 Kubernetes 集群。安装 Kubernetes 扩展后，你将在资源管理器中看到 **KUBERNETES**。点击**更多**并选择**创建集群**。按照说明选择集群类型（此处我们选择 **Azure Kubernetes Service**），选择你的订阅，并设置 Azure 集群和 Azure 代理设置。完成整个工作流需要几分钟时间。

![Create Kubernetes](images/kubernetes/create-k8s.gif)

**重要**：要在 Azure 上创建 Kubernetes 集群，你需要安装 [Azure CLI](https://learn.microsoft.com/cli/azure/get-started-with-azure-cli) 并登录。

**提示**：如果你没有可用的 RSA 密钥文件，将会遇到错误。在创建 Azure Kubernetes 集群之前，请按照[创建 SSH 公私钥](https://learn.microsoft.com/azure/virtual-machines/linux/mac-create-ssh-keys)的说明创建你的密钥。

![Error with RSA](images/kubernetes/error-creating-clusters-RSA.png)

**提示**：在创建 Azure Kubernetes 集群时，你可能会遇到指示位置和虚拟机大小冲突的错误。请注意选择合适的位置和虚拟机大小。

![Error creating cluster](images/kubernetes/error-creating-clusters.png)

## 将应用程序部署到 Azure Kubernetes Service

Kubernetes 扩展为 Kubernetes 清单文件提供了自动补全、代码片段和验证功能。例如，一旦你在空的 YAML 文件中输入 'Deployment'，系统会自动为你生成一个具有基本结构的清单文件。你只需要手动输入你的应用名称、镜像和端口即可。

![Create manifest](images/kubernetes/create-manifest.gif)

以下是清单文件示例：

![Manifest example](images/kubernetes/manifest-example.png)

清单文件准备好后，你只需要一个命令即可启动部署。打开**命令面板**（`kb(workbench.action.showCommands)`）并运行 **Kubernetes: Create**。它将把应用程序部署到你的 Kubernetes 集群，并根据打开的 Kubernetes 清单文件中的配置创建相应对象。

![Start deployment](images/kubernetes/start-deployment.gif)

### 检查部署状态

部署完成后，Kubernetes 扩展可以帮助你检查应用程序的状态。在资源管理器中，点击**工作负载**，右键点击 **Pod**，然后选择**获取**以查看应用程序是否已启动。要查看应用的状态，请选择**服务**，右键点击你的应用，然后点击**获取**。状态将输出到集成终端。一旦你的应用程序获得了 `EXTERNAL_IP`，你就可以打开浏览器查看你的 Web 应用运行情况。

![Check status](images/kubernetes/check-status.gif)

恭喜！现在你的应用已成功在 Azure Kubernetes Service 中运行！

## 后续步骤

* [Azure 扩展](/docs/azure/extensions.md) - VS Code Marketplace 中有数百个适用于 Azure 和云的扩展。
* [部署到 Azure](/docs/azure/deployment.md) - 逐步学习如何将你的应用程序部署到 Azure。
