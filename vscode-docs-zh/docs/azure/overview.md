---
ContentId: d2e93075-4cfe-48f4-b05e-f985c86d9713
MetaDescription: Visual Studio Code Azure 扩展
DateApproved: 02/1/2024
---
# Azure 扩展

你可以通过各种扩展直接在 Visual Studio Code 中使用 Azure。[Azure Tools](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack) 扩展包包含了一系列扩展，旨在帮助你在几分钟内将应用程序部署到 Azure。

![app service](images/extensions/azure-tools.png)

## 我应该使用哪个扩展？

下表描述了 VS Code 的 Azure Tools 扩展包中提供的各种扩展，并突出显示了常见使用场景。

|开发者类型|描述|使用场景|
|----------------------|---------------------|-------------|
|全栈开发者|同时负责应用程序前端和后端开发的开发者。|如果你正在构建包含前端和后端组件的 Web 应用程序，请使用这些扩展来部署和管理 Azure 上的整个技术栈。</br></br> **Azure Container Apps** 创建或管理处理不同技术栈部分的容器化应用。</br> **Azure Functions** 创建无服务器函数来处理后端任务并与前端应用集成。</br> **Azure App Service** 部署完整的 Web 解决方案，包括动态后端服务、API 和服务器端逻辑。|
|后端开发者|构建微服务架构并使用容器封装/管理各个微服务的开发者。|在为应用程序开发微服务、后端逻辑或 API 时，这些工具提供了无需管理基础设施即可轻松扩展的能力。</br></br>**Azure Container Apps** 处理服务器端逻辑、API 和微服务。</br> **Azure Functions** 处理服务器端逻辑和 API。</br> **Azure Container Apps** 部署和管理容器化后端服务。</br> **Azure Functions** 允许你构建可扩展、事件驱动的后端服务，无需管理任何基础设施。</br> **Azure App Service** 允许你部署 RESTful API、微服务和其他后端组件。|
|DevOps 工程师|负责设置或维护 CI/CD 流水线以及管理云基础设施的工程师。|在设置 CI/CD 流水线或自动化可扩展应用程序的部署流程时使用这些扩展。</br></br>**Azure Container Apps** 自动化容器化应用程序的部署和扩展。</br> **Azure Functions** 自动化无服务器函数的部署，并将其集成到更广泛的 DevOps 工作流中。</br> **Azure App Service** 将代码仓库与自动化部署流程集成，并监控应用程序性能和日志。</br> **Azure Static Web Apps** 自动化部署流程，确保与 GitHub Actions 或 Azure DevOps 的无缝集成。|
|前端开发者|专注于使用 React、Angular、Vue.js 等框架和库或纯 HTML/CSS/JavaScript 构建用户界面的开发者。|这些扩展非常适合部署和管理静态网站或单页应用程序，并集成了来自 GitHub 或 Azure DevOps 的自动部署。</br></br>**Azure Static Web Apps**、**Azure App Service**、**Azure Storage** 和 **Azure Functions** 为开发、预览和部署静态网站及单页应用程序提供了简化的工作流。|
|企业级开发者|从事大规模应用程序、企业服务以及构建软件即服务 (SaaS) 应用的开发者。|在构建企业级应用程序或 SaaS 产品时，这些工具有助于确保关键业务服务的可扩展性和可靠性。</br></br>**Azure Container Apps**、**Azure Functions**、**Azure App Service：** 使用这些扩展来部署、扩展和监控关键任务应用程序。</br> 使用容器创建可扩展的多租户服务，并自动化各种后端流程。|
|API 开发者|为各种客户端和应用程序创建和管理 API 的开发者。|对于构建 RESTful 或无服务器 API，这些扩展简化了部署和扩展流程。</br></br>**Azure Functions** 或 **Azure Container Apps** 是构建和部署无服务器 API 的可选方案。</br> **Azure Storage** 通过 blob、队列、表和文件等选项满足你的 API 数据存储需求。它还支持上传和下载数据。|
|数据工程师|处理和分析数据流的工程师。|在处理大规模数据流时，这些工具有助于为实时数据处理和分析创建可扩展的环境。</br></br> 使用 **Azure Container Apps** 在容器中部署数据处理和机器学习模型，为数据驱动型应用创建可扩展且可复现的环境。</br> **Azure Functions** 允许你触发数据工作流、执行 ETL 任务，并对实时数据变化做出响应。|

## Visual Studio Code Marketplace

[Marketplace](https://marketplace.visualstudio.com/search?term=azure&target=VSCode&category=All%20categories&sortBy=Relevance) 上有许多 VS Code 扩展，可以轻松地在 Azure 上构建和托管应用程序。

<div class="marketplace-extensions-azure-curated"></div>

> **提示：** 点击上方的扩展卡片，即可在 Marketplace 中阅读描述和评论。

## 后续步骤

* [Azure Tools 入门](/docs/azure/gettingstarted.md) - 了解如何快速入门。
* [Azure 架构中心](https://learn.microsoft.com/en-us/azure/architecture/?source=docs) - 使用既定模式和最佳实践，在 Azure 上构建解决方案的架构指南
* [VS Code 入门](https://code.visualstudio.com/docs/editing/getting-started)
