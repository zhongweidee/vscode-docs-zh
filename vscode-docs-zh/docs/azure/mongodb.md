---
ContentId: d1187f99-354f-4798-9c19-e432e4ae8572
MetaDescription: 在 Visual Studio Code 中使用 MongoDB
DateApproved: 11/1/2025
---
# 使用 MongoDB

Visual Studio Code 对 [MongoDB](https://www.mongodb.com/what-is-mongodb) 数据库提供了出色的支持，无论您使用的是自己的实例还是 [Azure DocumentDB（兼容 MongoDB）](https://learn.microsoft.com/azure/cosmos-db/mongodb/vcore/introduction)。通过 [DocumentDB for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-documentdb) 扩展，您可以在 VS Code 中创建、管理和查询 MongoDB 数据库。

## 安装扩展

VS Code 的 MongoDB 支持由 [DocumentDB for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-documentdb) 扩展提供。要安装 DocumentDB for VS Code 扩展，请按 `kb(workbench.view.extensions)` 打开扩展视图，然后搜索 'DocumentDB' 来筛选结果。选择 **DocumentDB for VS Code** 扩展。

![Select DocumentDB for VS Code](images/documentdb/install-documentdb-extension.png)

## 连接到 MongoDB

安装 DocumentDB for VS Code 扩展后，您会注意到活动栏视图中出现了一个新的 **DocumentDB** 图标。选择 DocumentDB 图标，您将看到资源管理器。

![DocumentDB explorer](images/documentdb/documentdb-explorer.png)

要连接到兼容 MongoDB 的数据库：

1. 在 DocumentDB 连接视图中选择 **添加新连接**

1. 接下来，选择使用连接字符串连接或使用服务发现选项：

    * 选择 **连接字符串**，然后在连接字符串快速选择框中输入连接字符串。

        ![Database Connection setup](images/documentdb/attach-via-connection-string.png)

    * 选择 **服务发现**，选择您的提供程序，然后选择 **保存并连接**。

        ![Database Connection setup](images/documentdb/attach-via-service-discovery.png)

>**注意**：如果您尚未在 VS Code 中登录到 Azure，系统将提示您进行登录。这是使用服务发现所必需的。

连接后，您可以操作 MongoDB 服务器，管理 MongoDB 数据库、集合和文档。

您可以展开数据库，以 JSON / 表格 / 树形视图查看其集合及其架构和索引。

![manage mongodb database](images/documentdb/manage-database.png)

您还可以将 MongoDB shell 附加到活动连接，只需右键单击连接本身并选择 **启动 Shell** 即可。

![MongoDB Connection](images/documentdb/launch-shell.jpeg)

>**注意**：请确保 MongoDB shell（`mongo` 或 `mongosh`）已[安装](https://docs.mongodb.com/mongodb-shell/install#mdb-shell-install)并且位于您的路径中。在扩展的设置中，您可以选择正在使用的 shell。

## 使用 Scrapbook

**DocumentDB Scrapbook** 是该扩展最强大的功能之一。它允许您直接在 VS Code 编辑器中编写、运行和保存 MongoDB 命令，帮助您快速原型化查询和脚本。

### 创建新的 Scrapbook
1. 在 DocumentDB 资源管理器中，右键单击所需的集合。

1. 从菜单中单击 **DocumentDB Scrapbook**，然后选择 **新建 DocumentDB Scrapbook**。

![launch documentdb scrapbook](images/documentdb/create-scrapbook.png)

在 Scrapbook 中，您可以引用 MongoDB 实体和命令，并且在输入时会获得丰富的 IntelliSense 支持。Scrapbook 非常适合用于原型化数据库操作和查询。使用 **运行命令** 执行 Scrapbook 查询中的选中行。

![Run scrapbook queries](images/documentdb/run-scrapbook.png)

## Azure DocumentDB 上的 MongoDB

您可以通过 [Azure DocumentDB](https://aka.ms/documentdb) 轻松地在 Azure 上**免费**创建一个托管的 MongoDB 集群。

## 后续步骤

* [索引顾问](https://learn.microsoft.com/azure/documentdb/index-advisor) - 了解如何使用索引顾问优化 MongoDB 性能。
* [Azure 扩展](/docs/azure/extensions.md) - Visual Studio Marketplace 提供了数百个用于 Azure 和云的 VS Code 扩展。
* [部署到 Azure](/docs/azure/deployment.md) - 逐步了解如何将应用程序部署到 Azure。
* [使用 Docker](/docs/azure/docker.md) - 将您的应用程序放入 Docker 容器中，以便于重用和部署。
