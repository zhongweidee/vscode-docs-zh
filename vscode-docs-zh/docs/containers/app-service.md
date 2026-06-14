---
ContentId: 044913F5-F99D-4228-A916-0443260AB7FB
DateApproved: 1/17/2023
MetaDescription: 使用 Visual Studio Code，为你的应用程序构建容器映像，将映像推送到容器注册表，并将其部署到 Azure 应用服务或 Azure 容器应用。
---
# 将容器化应用部署到 Azure

在本指南中，你将学习如何：

- 为你的应用程序创建容器映像。
- 将映像推送到容器注册表。
- 将映像部署到 Azure 应用服务或 Azure 容器应用。

## 先决条件

- 一个 Azure 订阅。
- 必须安装[容器工具](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-containers)和 [Azure 应用服务](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureappservice)扩展。
- 一个能生成容器映像的 [**Web** 应用程序](https://learn.microsoft.com/azure/app-service/tutorial-custom-container)。你也可以按照[创建示例 ASP.NET Core 应用程序](/docs/containers/quickstart-aspnet-core.md)来创建这样的应用程序。
- 你需要一个 [Docker Hub](https://hub.docker.com/) 帐户或一个 [Azure 容器注册表 (ACR)](https://learn.microsoft.com/azure/container-registry/container-registry-get-started-portal) 实例。

## 创建应用程序映像

如果你已有映像，请跳过此步骤，直接进行[将映像推送到容器注册表](#push-the-image-to-a-container-registry)步骤。

1. 在 VS Code 中打开应用程序文件夹。

2. 打开命令面板 (`kb(workbench.action.showCommands)`) 并使用**容器映像: 构建映像...** 命令来构建映像。

    ![构建容器映像](images/app-service/command-build-image.png)

    你可以在构建映像命令的输出中找到映像名称，也可以在容器资源管理器的映像窗格中找到相同的名称。

    ![构建映像输出](images/app-service/terminal-output-build-image.png)

## 将映像推送到容器注册表

在将映像部署到应用服务或容器应用之前，必须先将映像上传到容器注册表。映像可以上传到 [Azure 容器注册表 (ACR)](https://learn.microsoft.com/azure/container-registry/container-registry-get-started-portal) 或 [Docker Hub](https://hub.docker.com/)。

1. 打开容器资源管理器，在**注册表**组下选择**连接注册表...** 图标，并按照提示操作。选择提供程序（Azure 或 Docker Hub）并提供凭据以连接到注册表。

    ![连接到注册表](images/app-service/explorer-connect-registry.png)

2. 现在，注册表将显示在"注册表"下方。

   ![注册表](images/app-service/explorer-registries.png)

3. （可选）为映像打标签。为了将映像上传到注册表，需要为映像打上注册表名称的标签，以便 `docker push` 命令将其上传到正确的注册表。
    - 要在 Azure ACR 中创建注册表，请打开容器资源管理器的**注册表**部分，登录 Azure（如果尚未登录），然后右键单击要使用的订阅，选择**创建注册表**。
    - 上一节中构建的映像将显示在容器资源管理器的"映像"部分下。右键单击并选择**打标签...**。

        ![为映像打标签](images/app-service/explorer-tag-image.png)
    - 指定新名称 `<你的注册表或用户名>/<映像名称>:<标签>` 并完成打标签操作。例如，名为 WebApp6 的 ACR 的新映像名称将为 'webapp6.azurecr.io/webapp6:latest'，对于 Docker Hub，则为 'myusername/webapp6:latest'。

4. 该映像将显示在容器资源管理器中，位于映像标签所指向的注册表下。选择此映像并选择**推送**。如果映像尚未打标签，系统将提示你选择要推送到的注册表，并将根据选择为映像打标签。

    ![推送映像](images/app-service/explorer-push-image.png)

5. 推送命令完成后，刷新推送映像的注册表节点，上传的映像将显示出来。

    ![刷新注册表](images/app-service/explorer-refresh-registry.png)

## 将映像部署到 Azure

在上一节中，映像已推送到远程容器注册表。现在将此映像部署到 Azure 应用服务或 Azure 容器应用。

1. 在容器资源管理器中，导航到"注册表"下的映像，右键单击标签，选择**将映像部署到 Azure 应用服务...** 或**将映像部署到 Azure 容器应用...**。

    ![部署到 Azure 应用服务](images/app-service/explorer-deploy-to-app-service.png)

2. 出现提示时，提供应用服务或容器应用的值。
    - 新 Web 应用名称：该名称在 Azure 中必须是唯一的。
    - 资源组：选择现有的资源组或创建一个新的资源组。
    - 应用服务计划：选择现有的应用服务计划或创建一个新的计划。（应用服务计划定义了托管网站的物理资源；对于本教程，你可以使用基本或免费计划层级）。

3. 部署完成后，Visual Studio Code 会显示一条包含网站 URL 的通知。

    ![部署完成通知](images/app-service/notification-appservice-deployment.png)

4. 你还可以在 Visual Studio Code 的输出面板的"容器工具"部分中查看结果。

    ![部署完成输出](images/app-service/output-appservice-deployment.png)

5. 要浏览已部署的网站，你可以使用 `kbstyle(Ctrl+click)` 打开输出面板中的 URL。你可能需要稍等片刻，等待应用在 Azure 中变为活动状态。新的应用服务或容器应用也会出现在 Visual Studio Code 的 Azure 视图中，你可以在其中右键单击网站并选择**浏览网站**。

    ![Web 应用程序](images/app-service/webapp-homepage.png)

## 后续步骤

继续阅读以了解更多信息：

- [Azure 扩展](/docs/azure/extensions.md) - VS Code Marketplace 中提供了数百个适用于 Azure 和云的扩展。
- [部署到 Azure](/docs/azure/deployment.md) - 逐步了解如何将应用程序部署到 Azure。
- [使用 MongoDB](/docs/azure/mongodb.md) - 在 VS Code 中创建、管理和查询 MongoDB 数据库。
