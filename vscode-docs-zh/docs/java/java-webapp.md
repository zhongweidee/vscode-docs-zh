---
ContentId: 98ddf1d3-6a8e-4b0f-a44d-e57cfdf2348c
DateApproved: 3/2/2023
MetaDescription: Java Web 应用教程，展示如何使用 Visual Studio Code 构建 Java Web 应用并将其部署到 Azure
---
# 使用 Visual Studio Code 开发 Java Web 应用

本教程将展示如何使用 Visual Studio Code 创建 Java Web 应用程序。你将学习如何将 Java Web 应用程序部署到 Azure App Service 中的 Linux Tomcat 服务器上。

## 场景

一个简单的 Hello World Web 应用。

![Greeting from Java](images/java-webapp/greeting.png)

## 开始之前

在运行和部署本示例之前，你必须在本地开发环境中安装 Java SE 开发工具包（JDK）和 Apache Maven 构建工具。如果你还没有安装，请先安装它们。

下载并安装[适用于 Java 的扩展包](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack)，其中包含 JDK 11。

>**注意**：必须将 `JAVA_HOME` 环境变量设置为 JDK 的安装位置，才能完成本教程。

下载 Apache Maven 3 或更高版本：

<a class="install-extension-btn" href="https://maven.apache.org/download.cgi" target="_blank" style="background-color:#68217A">下载 Apache Maven</a>

为你的本地开发环境安装 Apache Maven：

<a class="install-extension-btn" href="https://maven.apache.org/install" target="_blank" style="background-color:#68217A">安装 Apache Maven</a>

## 创建 Maven Web App 项目

`maven-archetype-webapp` 是一个用于生成 Maven Web App 项目的原型。要了解更多信息，你可以访问[此文档](https://maven.apache.org/archetypes/maven-archetype-webapp/)。

1. 在一个空文件夹中，运行以下命令，从 Maven 原型生成新项目。

```cmd
   mvn archetype:generate -DarchetypeGroupId=org.apache.maven.archetypes -DarchetypeArtifactId=maven-archetype-webapp -DarchetypeVersion=1.4
```
1. Maven 会要求你提供完成项目生成所需的值。在出现提示时提供以下值：

    | 提示 | 值 | 描述 |
    | ------ | ----- | ----------- |
    | **groupId** | `com.webappproject` | 一个在所有项目中唯一标识你的项目的值，遵循 Java 的[包命名规则](https://docs.oracle.com/javase/specs/jls/se6/html/packages.html#7.7)。 |
    | **artifactId** | `webapp-project` | 作为 jar 名称的值，不包含版本号。 |
    | **version** | `1.0-SNAPSHOT` | 选择默认值。 |
    | **package** | `com.webappproject` | 作为生成的函数代码的 Java 包的值。使用默认值。 |

1. 输入 `Y` 或按 Enter 确认。

    Maven 会在一个以 _artifactId_ 命名的新文件夹中创建项目文件，本示例中即为 `webapp-project`。

1. 导航到项目文件夹：

    ```console
    cd webapp-project
    ```

## 将 Web 应用部署到云端

我们刚刚构建了一个 Java Web 应用程序并在本地运行了它。现在你将学习如何从 Visual Studio Code 进行部署，并在云端的 [Azure](https://azure.microsoft.com) 上运行它。

如果你没有 Azure 订阅，可以注册一个[免费 Azure 账户](https://azure.microsoft.com/pricing/free-trial/)。

<a class="install-extension-btn" href="https://azure.microsoft.com/pricing/free-trial/" target="_blank" style="background-color:#68217A">创建你的免费 Azure 账户</a>

### 安装 Azure App Service 扩展

[Azure App Service](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureappservice) 扩展用于创建、管理和部署 Azure App Service，其主要功能包括：

- 创建新的 Azure Web App/部署槽位
- 部署到 Azure Web App/部署槽位
- 启动、停止和重启 Azure Web App/部署槽位
- 查看 Web App 的日志文件
- 交换部署槽位

要安装 Azure App Service 扩展，请打开扩展视图（`kb(workbench.view.extensions)`）并搜索 `azure app service` 以筛选结果。选择 Microsoft 的 [Azure App Service](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureappservice) 扩展。如果你更倾向于以命令行和 Maven 为中心的体验，也可以查看 [Azure App Service 的 Maven 插件 Linux 教程](https://learn.microsoft.com/azure/app-service/quickstart-java?pivots=platform-linux-development-environment-maven)。

### 登录你的 Azure 订阅

要登录 Azure，请从**命令面板**（`kb(workbench.action.showCommands)`）运行 **Azure: Sign In**。或者，你也可以通过单击**资源**资源管理器中的 **Sign in to Azure...** 来登录你的 Azure 账户。

![Azure sign in code](images/java-webapp/login.png)

### 在 Azure 上创建新的 Web App

安装扩展后，你可以按照以下步骤在 Azure 上创建新的 Web App。

1. 单击**资源**资源管理器视图上的**创建**按钮，并选择**创建 App Service Web App...**。

2. 为新 Web App 输入一个唯一的名称。

3. 选择 Web App 的运行时任务，例如 `Java 17`。

4. 选择 Java Web 服务器堆栈，例如 `Apache Tomcat 10.0`。

5. 选择一个定价层，例如 `Free(F1)`。

![Create a Web App](images/java-webapp/create-webapp.png)

### 构建并部署到 Web App

部署过程利用 [Azure Resources](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureresourcegroups) 扩展（该扩展作为 Azure App Service 扩展的依赖项一并安装），你需要使用 Azure 订阅登录。如果你没有 Azure 订阅，可以[立即注册](https://azure.microsoft.com//free/?b=16.48)一个 30 天免费账户，并获得 $200 Azure 额度来试用任意组合的 Azure 服务。

登录后，你可以打开命令提示符或终端窗口，使用 Maven 命令构建项目。这将在 `target` 目录中生成一个新的 `war` 或 `jar` 构件。

```bash
mvn clean package
```

构建项目后，在 VS Code 资源管理器中打开 `target` 目录。右键单击该构件并选择**部署到 Web App**，然后按照提示选择你的 Web App 进行部署。

![Deploy to Web App](images/java-webapp/deploy-webapp.png)

在 VS Code 中打开**输出**窗口以查看部署日志。部署完成后，它将打印出你的 Web App 的 URL。单击该链接在浏览器中打开它，你就可以看到运行在 Azure 上的 Web 应用！

![Greeting from Spring Boot](images/java-webapp/greeting.png)

> **注意：** 有关 App Service 的更多高级功能，你可以查看 [Azure App Service](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureappservice) 扩展。

## 清理资源

1. 要删除你的 Web 应用，请导航到**资源**资源管理器并找到 **App Services** 项。

2. 右键单击你要删除的 Web 应用，然后单击**删除**。

![Delete the Web App Resources](images/java-webapp/delete-webapp.png)

3. 要删除你的应用服务计划或资源组，请访问 [Azure 门户](https://portal.azure.com) 并手动删除订阅下的资源。

## 后续步骤

- 要容器化并部署 Web 应用程序，请查看 [Docker in VS Code](/docs/containers/overview.md)。
- 要了解更多关于 Java 调试功能的信息，请参见 [Java 调试教程](/docs/java/java-debugging.md)。
