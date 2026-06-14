---
ContentId: 4eb2543d-84a7-4e11-b835-0d238ce7ed7a
DateApproved: 1/17/2023
MetaDescription: 如何使用 VS Code 容器工具扩展将 Django 镜像推送到容器注册表
MetaSocialImage: ../python/images/tutorial/python-social.png
---
# 将 Django 镜像推送到注册表

在本教程中，你将获取本地构建的 Python Django 应用的容器镜像，并将其部署到 Azure 容器注册表（ACR）或 Docker Hub。

## 创建容器注册表

创建一个容器注册表用于推送镜像。有关如何对注册表进行身份验证和使用的详细信息，请参阅[使用容器注册表](/docs/containers/quickstart-container-registries.md)。

确保你创建的注册表终结点在 VS Code 的**容器资源管理器**中的**注册表**下可见：

![Container Explorer in VS Code showing registries](images/quickstarts/python-django-registries.png)

## Django 应用设置

1. 在你的 Django 项目的 `settings.py` 文件中，修改 `ALLOWED_HOSTS` 列表，使其包含你打算部署应用的根 URL。例如，以下代码假设部署到名为 "vsdocs-django-sample-container" 的 Azure 应用服务（azurewebsites.net）：

    ```python
    ALLOWED_HOSTS = [
        # Example host name only; customize to your specific host
        "vsdocs-django-sample-container.azurewebsites.net"
    ]
    ```

    如果没有此条目，部署后你将看到一条 "DisallowedHost" 消息，提示你将网站域名添加到 `ALLOWED_HOSTS`。这将需要你重新构建、推送和部署镜像。

1. 在**命令面板**（`kb(workbench.action.showCommands)`）中，选择**容器镜像: 构建镜像...**以使用新的设置重新构建镜像。

    >**提示**：如果你想要在多个托管服务上测试生产环境中的镜像，可以直接在 ALLOWED_HOSTS 中输入 `"*"`。

## 将镜像推送到注册表

声明 `ALLOWED_HOSTS` 后，下一步是将你的 Django 镜像推送到容器注册表：

1. 打开**命令面板**（`kb(workbench.action.showCommands)`），选择**容器镜像: 推送...**。

1. 选择你刚刚构建的镜像以推送到注册表。

1. 选择你创建的注册表以进行推送。这将有助于正确标记镜像。

    ![Select a registry](images/quickstarts/select-registry.png)

1. 选择注册表和完整标签后，镜像将被推送。上传进度将显示在**终端**窗口中。

1. 完成后，在**容器资源管理器**中展开**注册表** > **Azure**（或 **DockerHub**）节点，然后展开注册表和镜像名称以查看确切的镜像。（你可能需要刷新**容器资源管理器**。）

    ![The built app image in the Azure Container Registry](images/quickstarts/python-django-image-in-acr.png)

  > **提示**：首次推送镜像时，你将看到 VS Code 上传镜像组成的每个层。然而，后续的推送操作只会从第一个发生更改的层开始更新。由于你的应用代码通常是最常更改的部分，这也就是为什么应用代码通常复制在 Dockerfile 的最后几行。要查看此内部循环的实际效果，请对代码进行小幅更改，重新构建镜像，然后再次将其推送到注册表。

现在你已将镜像推送到注册表，可以将其部署到任何支持容器的云服务。有关部署到 Azure 应用服务的详细信息，请参阅[部署容器](https://learn.microsoft.com/azure/developer/python/tutorial-deploy-containers-01)。
