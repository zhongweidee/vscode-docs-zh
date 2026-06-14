---
ContentId: 318A4299-AF24-4ADA-863D-E73B314FC440
DateApproved: 12/1/2023
MetaDescription: 在 Visual Studio Code 中使用容器注册表
---
# 使用容器注册表

容器注册表是一种存储和内容分发系统，用于存放命名容器镜像，并提供不同标记版本。

用户可以从以下来源连接到容器注册表：

- [Azure 容器注册表](https://learn.microsoft.com/azure/container-registry)
- [Docker Hub](https://hub.docker.com/)
- [GitHub](https://github.com) 容器注册表
- 任何支持 [Docker V2 API](https://docs.docker.com/registry/spec/api/) 的通用私有注册表

## 将镜像推送到容器注册表

在部署容器镜像之前，必须先将镜像上传到容器注册表。镜像可以上传到 [Docker Hub](https://hub.docker.com/)、[Azure 容器注册表 (ACR)](https://learn.microsoft.com/azure/container-registry/container-registry-get-started-portal) 或其他注册表。无论你是推送到 Docker Hub、Azure 容器注册表还是任何其他注册表，都可以按照相同的步骤推送镜像。如果你还没有 Azure 容器注册表，可以在**推送**步骤中创建一个。

1. 打开容器资源管理器，选择**注册表**视图下的**连接注册表...**图标，然后按照提示操作。选择提供程序（例如 Azure 或 Docker Hub）并提供凭据以连接到注册表。如果出现提示，请安装 [Azure 资源](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureresourcegroups)扩展。

    ![连接到注册表](images/registries/connect-registry-2.png)

2. 现在注册表将显示在**注册表**下方。

   ![注册表](images/registries/explorer-registries.png)

3. 可选地，为镜像打标签。为了将镜像上传到注册表，镜像需要使用注册表名称打上标签，以便 `docker push` 将其上传到正确的注册表。如果在尝试推送时镜像尚未打标签，VS Code 会询问你要将镜像关联到哪个注册表。
    - 你之前构建的镜像会显示在容器资源管理器的**镜像**视图下。右键单击并选择**打标签...**。

        ![为镜像打标签](images/registries/explorer-tag-image.png)
    - 指定新名称 `<你的注册表或用户名>/<镜像名称>:<标签>` 并完成标签操作。例如，ACR 的新镜像名称将是 `mainacr.azurecr.io/webapp6:latest`，Docker Hub 的将是 `myusername/webapp6:latest`。

4. 镜像会显示在容器资源管理器的**镜像**视图下，位于镜像标签指向的注册表中。选择此镜像并选择**推送**。如果镜像尚未打标签，系统会提示你选择要推送到的注册表，或创建一个新的注册表，然后根据你的选择为镜像打标签。

    ![推送镜像](images/registries/explorer-push-image.png)

5. 推送命令完成后，刷新镜像推送到的注册表节点，上传的镜像将显示出来。

    ![刷新注册表](images/registries/explorer-refresh-registry.png)

## Docker Hub

此项连接到 [Docker Hub](https://hub.docker.com/)，并列出给定账户下的所有仓库和镜像。
选择此选项后，你需要输入 Docker Hub 凭据。

![Docker Hub](images/registries/docker-hub.png)

对于 Docker Hub 注册表中的每个仓库，可以执行以下操作：

- **拉取仓库**：将给定仓库中的所有镜像复制到本地
- **在浏览器中打开**：打开浏览器并导航到 Docker Hub 上的给定仓库
- **刷新**：刷新仓库以反映更改

对于仓库中的每个已标记镜像，可以执行以下操作：

- **拉取镜像**：将镜像的最新版本复制到本地
- **复制完整标签**：将完整标签复制到剪贴板
- **将镜像部署到 Azure 应用服务**：将镜像部署到 Azure 应用服务，请参阅[将镜像部署到 Azure](/docs/containers/app-service.md) 页面
- **将镜像部署到 Azure 容器应用**：将镜像部署到 Azure 容器应用，请参阅[将镜像部署到 Azure](/docs/containers/app-service.md) 页面
- **在浏览器中打开**：打开浏览器并导航到 Docker Hub 上的给定镜像

## Azure 容器注册表

此选项需要安装 [Azure 资源](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureresourcegroups)扩展，才能连接到你的 Azure 账户并显示所有不同的订阅和注册表。
身份验证后，**Azure** 节点将显示订阅及其各自的注册表：

![Azure 容器注册表](images/registries/azure-registries.png)

对于每个注册表，用户可以使用上下文菜单执行不同的操作：

![Azure 注册表上下文菜单](images/registries/azure-registry-context-menu.png)

- **删除注册表**：永久删除注册表
- **在门户中打开**：打开浏览器并导航到 Azure 门户中的注册表
- **查看属性**：以 JSON 格式打开注册表属性
- **刷新**：刷新注册表以反映更改

对于给定注册表中的每个仓库，可以执行以下操作：

![Azure 仓库上下文菜单](images/registries/azure-repository-context-menu.png)

- **拉取仓库**：将给定仓库中的所有镜像复制到本地
- **删除仓库**：永久删除仓库
- **刷新**：刷新仓库以反映更改

对于仓库中的每个已标记镜像，可以执行以下操作：

![Azure 镜像上下文菜单](images/registries/azure-image-context-menu.png)

- **拉取镜像**：将镜像的最新版本复制到本地
- **复制完整标签**：将完整标签复制到剪贴板
- **复制镜像摘要**：将镜像摘要（Docker 使用的 SHA256 哈希标识符）复制到剪贴板。有关镜像摘要的更多信息，请参阅 [Docker 文档](https://docs.docker.com/engine/reference/commandline/images/#list-image-digests)
- **检查镜像清单**：检查镜像的注册表清单。这与镜像在本地拉取后的检查不同。
- **将镜像部署到 Azure 应用服务**：将镜像部署到 Azure 应用服务，请参阅[将镜像部署到 Azure](/docs/containers/app-service.md) 页面
- **将镜像部署到 Azure 容器应用**：将镜像部署到 Azure 容器应用，请参阅[将镜像部署到 Azure](/docs/containers/app-service.md) 页面
- **取消标记镜像**：取消镜像的标记
- **删除镜像**：永久删除镜像

## GitHub

此项连接到你的 [GitHub](https://github.com/) 账户中的容器注册表。选择此选项后，系统会要求你输入 GitHub 账户凭据。

![GitHub](images/registries/github.png)

对于 GitHub 注册表中的每个仓库，可以执行以下操作：

- **拉取仓库**：将给定仓库中的所有镜像复制到本地
- **刷新**：刷新仓库以反映更改

对于仓库中的每个已标记镜像，可以执行以下操作：

- **拉取镜像**：将镜像的最新版本复制到本地
- **复制完整标签**：将完整标签复制到剪贴板
- **复制镜像摘要**：将镜像摘要（Docker 使用的 SHA256 哈希标识符）复制到剪贴板。有关镜像摘要的更多信息，请参阅 [Docker 文档](https://docs.docker.com/engine/reference/commandline/images/#list-image-digests)
- **检查镜像清单**：检查镜像的注册表清单。这与镜像在本地拉取后的检查不同。
- **将镜像部署到 Azure 应用服务**：将镜像部署到 Azure 应用服务，请参阅[将镜像部署到 Azure](/docs/containers/app-service.md) 页面
- **将镜像部署到 Azure 容器应用**：将镜像部署到 Azure 容器应用，请参阅[将镜像部署到 Azure](/docs/containers/app-service.md) 页面

## 后续步骤

- [部署到 Azure](/docs/containers/app-service.md)
