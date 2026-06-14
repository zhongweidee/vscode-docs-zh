---
ContentId: 3a9bc520-95e2-416e-a0ac-5be02a38c4c3
DateApproved: 12/1/2023
MetaDescription: 使用 Visual Studio Code 在容器中开发、构建和调试 Python 应用。
---
# 在容器中使用 Python

在本教程中，你将学习如何：

- 创建一个描述简单 Python 容器的 `Dockerfile` 文件。
- 构建、运行并验证 [Django](https://www.djangoproject.com/)、[Flask](https://flask.palletsprojects.com/en/stable/) 或通用 Python 应用的功能。
- 调试在容器中运行的应用。

## 前提条件

- 在计算机上[安装 Docker](https://docs.docker.com/install/) 并将其添加到系统路径中。
- 在 Linux 上，你还应该为将用于运行 VS Code 的非 root 用户账户[启用 Docker CLI](https://docs.docker.com/install/linux/linux-postinstall/#manage-docker-as-a-non-root-user)。
- 容器工具扩展。要安装该扩展，请打开扩展视图（`kb(workbench.view.extensions)`），搜索 `container tools` 以筛选结果，然后选择由 Microsoft 开发的容器工具扩展。

  ![选择容器工具扩展](images/overview/installation-extension-search.png) <!-- TODO: image needs updating -->

### 创建 Python 项目

如果你还没有 Python 项目，请先按照[Python 入门](/docs/python/python-tutorial.md)教程操作。

> **注意**：如果你想将完整的 Django 或 Flask Web 应用容器化，可以从以下示例之一开始：
>
>- [python-sample-vscode-django-tutorial](https://github.com/microsoft/python-sample-vscode-django-tutorial/)，这是按照 [Django 教程](/docs/python/tutorial-django.md)操作的结果
>
>- [python-sample-vscode-flask-tutorial](https://github.com/microsoft/python-sample-vscode-flask-tutorial/)，这是按照 [Flask 教程](/docs/python/tutorial-flask.md)操作的结果

> **注意**：在本教程中，请确保使用示例仓库的 **tutorial** 分支。

验证应用正常运行后，你现在可以将其容器化了。

## 将 Docker 文件添加到项目中

1. 在 VS Code 中打开项目文件夹。
1. 打开**命令面板**（`kb(workbench.action.showCommands)`）并选择**容器：将 Docker 文件添加到工作区...**：

    ![将 Dockerfile 添加到 Python 项目](images/quickstarts/python-add-python.png)

1. 当系统提示选择应用类型时，选择 **Python: Django**、**Python: Flask** 或 **Python: General** 作为应用类型。在本教程中，我们将重点讨论 **Python: General** 的情况，但也会包含 Django 和 Flask 的说明。

1. 输入应用入口点的相对路径。这不包括你起始的工作区文件夹。如果你根据 [Python 入门](/docs/python/python-tutorial)教程使用 `hello.py` 创建了 Python 应用，请选择该文件。

   **Django**：选择 `manage.py`（根文件夹）或 `subfolder_name/manage.py`。请参阅[官方 Django 文档](https://docs.djangoproject.com/en/stable/intro/tutorial01/#creating-a-project)。

   **Flask**：选择你创建 Flask 实例的路径。请参阅[官方 Flask 文档](https://flask.palletsprojects.com/en/1.1.x/api/)。

    >**提示**：你也可以输入文件夹名称的路径，只要该文件夹包含 `__main__.py` 文件即可。

1. 选择端口号。我们建议选择 1024 或以上的端口，以降低[以 root 用户身份运行](/docs/containers/troubleshooting.md#running-as-a-non-root-user)带来的安全风险。任何未使用的端口都可以，但 Django 和 Flask 使用标准的默认端口。

   **Django**：默认端口 8000。

   **Flask**：默认端口 5000。

1. 当系统提示是否包含 Docker Compose 时，如果不需要 Docker Compose 文件，请选择**否**。如果选择**是**，则需要验证 `Dockerfile` 中 `wsgi.py` 文件的路径，以确保 **Compose Up** 命令能成功运行。Compose 通常用于同时运行多个容器。

1. 有了所有这些信息后，容器工具扩展将创建以下文件：

    - 一个 `Dockerfile`。要了解有关此文件中 IntelliSense 的更多信息，请参阅[概述](/docs/containers/overview.md)。

    - 一个 `.dockerignore` 文件，用于通过排除不需要的文件和文件夹（如 `.git`、`.vscode` 和 `__pycache__`）来减小镜像大小。

    - 如果你使用 Docker Compose，还会创建 `docker-compose.yml` 和 `docker-compose.debug.yml` 文件。

    - 如果尚不存在，还会创建一个 `requirements.txt` 文件，用于捕获所有应用依赖项。
    > **重要提示**：要使用我们的设置，Python 框架（Django/Flask）和 Gunicorn **必须包含**在 `requirements.txt` 文件中。如果虚拟环境/主机计算机已经安装了这些前提条件并且应与容器环境完全相同，请通过在终端中运行 `pip freeze > requirements.txt` 来确保应用依赖项已迁移过来。**这将覆盖你当前的 `requirements.txt` 文件。**

### （可选）向镜像添加环境变量

此步骤不是必需的，但包含它是为了帮助你了解如何添加需要在容器环境中设置的环境变量。

容器工具扩展通过使用 [IntelliSense](/docs/editing/intellisense.md) 提供自动补全和上下文帮助来帮助你编写 Dockerfile。要查看此功能的实际效果：

1. 打开 `Dockerfile`。
2. 在 `EXPOSE` 语句下方，键入 `kb(editor.action.triggerSuggest)` 触发 IntelliSense，然后滚动到 `ENV`。

    ![向 Dockerfile 添加环境变量](images/quickstarts/python-edit-dockerfile.png)

3. 按 `kbstyle(Tab)` 或 `kbstyle(Enter)` 完成该语句，然后将 `key` 设置为变量名，并设置 `value`。

有关在 Dockerfile 中设置和使用环境变量的更多信息，请参阅 Docker 文档中的 [ENV](https://docs.docker.com/engine/reference/builder/#env) 指令和[环境替换](https://docs.docker.com/engine/reference/builder/#environment-replacement)部分。

## Django 和 Flask 应用的 Gunicorn 修改

为了给 Python Web 开发者一个良好的起点，我们选择使用 [Gunicorn](https://gunicorn.org/#docs) 作为默认 Web 服务器。由于它在默认的 Dockerfile 中被引用，因此它作为依赖项包含在 `requirements.txt` 文件中。如果你在 `requirements.txt` 中没有看到它，请运行 `pip install gunicorn`，然后运行 `pip freeze > requirements.txt` 以重新生成 `requirements.txt` 文件。

- **Django**：要使用 Gunicorn，它必须绑定到一个应用可调用对象（应用服务器用来与你的代码通信的对象）作为入口点。此可调用对象在 Django 应用的 `wsgi.py` 文件中声明。为了实现此绑定，Dockerfile 中的最后一行写着：

   ```docker
   CMD ["gunicorn", "--bind", "0.0.0.0:8000", "{workspace_folder_name}.wsgi"]
   ```

   如果你的项目不遵循 Django 的默认项目结构（即一个工作区文件夹和一个与工作区同名的子文件夹中的 wsgi.py 文件），你必须覆盖 Dockerfile 中的 Gunicorn 入口点以找到正确的 `wsgi.py` 文件。

   如果你的 `wsgi.py` 文件在根文件夹中，则上述命令中的最后一个参数将为 `"wsgi"`。如果在子文件夹中，则该参数将为 `"subfolder1_name.subfolder2_name.wsgi"`。

- **Flask**：要使用 Gunicorn，它必须绑定到一个应用可调用对象（应用服务器用来与你的代码通信的对象）作为入口点。此可调用对象对应于你创建的 Flask 实例的**文件位置**和**变量名**。根据[官方 Flask 文档](https://flask.palletsprojects.com/en/1.1.x/api/)，用户通常在主模块或包的 `__init__.py` 文件中以如下方式创建 Flask 实例：

   ```python
   from flask import Flask
   app = Flask(__name__) # 名为 app 的 Flask 实例
   ```

   为了实现此绑定，Dockerfile 中的最后一行写着：

   ```docker
   CMD ["gunicorn", "--bind", "0.0.0.0:5000", "{subfolder}.{module_file}:app"]
   ```

   在**容器：将 Docker 文件添加到工作区...** 命令期间，你可以配置 Flask 实例的路径，但是容器工具扩展假定你的 Flask 实例变量名为 `app`。如果不是这种情况，你必须更改 Dockerfile 中的变量名。

   如果你的主模块位于根文件夹中，文件名为 `main.py`，并且 Flask 实例变量名为 `myapp`，则上述命令中的最后一个参数将为 `"main:myapp"`。如果在子文件夹中，则该参数将为 `"subfolder1_name.subfolder2_name.main:myapp"`。

## 构建、运行和调试容器

**容器：将 Docker 文件添加到工作区...** 命令会自动创建一个 Docker 启动配置，以在调试模式下构建和运行你的容器。要调试你的 Python 应用容器：

1. 导航到包含应用启动代码的文件，并设置断点。

1. 导航到**运行和调试**，然后根据情况选择 **Containers: Python - General**、**Containers: Python - Django** 或 **Containers: Python - Flask**。

    ![选择的容器调试配置](images/quickstarts/python-debug-configuration.png)

1. 使用 `kb(workbench.action.debug.start)` 键开始调试。
    - 容器镜像开始构建。
    - 容器开始运行。
    - Python 调试器在断点处停止。

1. 单步跳过这一行一次。
1. 准备就绪后，按继续。

容器工具扩展将启动你的浏览器到一个随机映射的端口：

  ![Django 网站启动](images/quickstarts/python-web-launch.png)

>**提示**：要修改 Docker 构建设置（例如更改镜像标签），请导航到 `.vscode -> tasks.json`，在 `docker-build` 任务下的 `dockerBuild` 属性中进行修改。使用文件中的 IntelliSense（`kb(editor.action.triggerSuggest)`）来显示所有其他有效的指令。

## 使用容器资源管理器

容器资源管理器提供了一种交互式体验，用于检查和管理容器资产，例如容器、镜像等。查看示例：

1. 导航到容器资源管理器。
1. 在**容器**选项卡中，右键单击你的容器并选择**查看日志**。

    ![查看容器日志](images/quickstarts/python-view-logs.png)

1. 输出将显示在终端中。

## 在 Azure 中构建镜像

你可以使用命令 **Azure Container Registry: Build Image in Azure** 来构建一个镜像，然后将其部署到 Azure App Service 或 Azure Container Apps。

1. 安装 [Azure Resources 扩展](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureresourcegroups)。打开**命令面板**（`kb(workbench.action.showCommands)`）并搜索命令 **Azure: Sign In**。如果你没有 Azure 账户，可以注册[免费试用](https://azure.microsoft.com/free/?utm_source=campaign&utm_campaign=vscode-azure-account&mktingSource=vscode-azure-account)。

1. 有两种方式可以调用在 Azure 中构建的命令。你可以右键单击 Dockerfile，然后选择**在 Azure 中构建镜像**。你也可以使用**命令面板**（`kb(workbench.action.showCommands)`）并搜索命令 **Azure Container Registry: Build Image in Azure**。

    ![调用在 Azure 中构建镜像命令](images/app-service/acr-build-image-in-azure.png)

1. 为构建的镜像选择名称和标签。你将使用它来在容器注册表中识别它。

   ![为构建的镜像选择名称和标签。](images/app-service/acr-tag-image.png)

1. 选择你要使用的 Azure 订阅。

1. 选择现有的 Azure Container Registry，或创建一个新的。创建新的时，系统会要求你提供名称、资源组、位置以及定价选项（例如 Basic、Standard 或 Premium）。你可以在[定价 - 容器注册表](https://azure.microsoft.com/pricing/details/container-registry/)中了解这些选项的费用。

1. 指定基础操作系统，Linux 或 Windows。此选择必须与 Dockerfile 保持一致。

   ![为构建的镜像选择基础操作系统](images/app-service/acr-build-image-select-base-os.png)

构建镜像的过程可能需要几分钟。你可以在终端中跟踪进度。如果遇到错误（`Error: failed to download context.`），请尝试在容器注册表上使用**刷新**选项，然后再次请求构建。在重新构建之前，请手动删除旧镜像。

## 部署到 Azure App Service 或 Azure Container Apps

容器镜像构建完成后，它应该会以你指定的标签出现在容器注册表中。现在它已经构建完成，你可以将其部署到 Azure App Service 或 Azure Container Apps。推荐使用 [Azure App Service](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureappservice) 扩展部署到 Azure App Service，而部署到 Azure Container Apps 则需要 [Azure Container Apps](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurecontainerapps) 扩展。如果你安装 [Azure Tools 扩展包](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack)，则可以同时获得两者，该包包含了一组适用于各种 Azure 开发场景的工具。

1. 右键单击镜像标签，然后选择**将镜像部署到 Azure App Service** 或**将镜像部署到 Azure Container Apps**。

   ![将镜像部署到 Azure App Service](images/quickstarts/deploy-image-to-azure-python.png)

1. 提供网站的名称。这必须是唯一的名称，并且对于 Django 应用，还必须将其列为 `settings.py` 文件中 `ALLOWED_HOSTS` 列表中的有效主机名。

1. 提供资源组、位置和 App Service 计划。如果你刚入门，可以选择免费计划。

1. 镜像开始部署；该过程可能需要几分钟。部署完成后，会出现一条通知，其中包含一个按钮，你可以使用它来访问网站。你也可以使用网站的地址 `{appname}.azurewebsites.net`，其中 `{appname}` 是你在创建时提供的名称。如果第一次不起作用，请过几分钟再试一次。前几次尝试超时或返回错误并不少见。这仅意味着 App Service 尚未准备好接收请求。

1. 在应用程序代码中进行一个可以在页面上看到的微小更改，然后保存文件。

1. 使用 Azure 图标打开**资源**视图，并展开你的订阅节点以找到你在上一步中部署的 App Service。

1. 右键单击 App Service 节点并查看可用选项。选择**部署到 Web 应用**，然后指定你的应用文件夹以进行部署。

   ![部署到 Web 应用](images/app-service/deploy-to-web-app.png)

   当系统警告这将覆盖之前的部署时，选择**部署**以确认。

   这可能需要几分钟；你可以在终端窗口中监控进度。完成后，会出现一个可访问该站点按钮。

   ![浏览网站按钮](images/app-service/browse-website-button.png)

   使用该按钮并验证你的更改是否反映在网站上。

恭喜，你已经使用 VS Code 中的 Python 创建并部署了一个托管在云端的、可在互联网上访问的网站！

## 释放资源

在 [Azure 门户](https://portal.azure.com)中，删除资源组以释放你在此练习中创建的所有资源。

## 后续步骤

完成了！现在你的容器已经就绪，你可能想要：

- [了解如何使用 Docker Compose](/docs/containers/docker-compose.md)
- [使用 Docker Compose 进行调试](/docs/containers/docker-compose.md#python)
- [自定义如何在容器中调试 Python 应用](/docs/containers/debug-python.md)
- [自定义你的 Docker 构建和运行任务](/docs/containers/reference.md)
- [将你的 Django 镜像推送到 Azure Container Registry](/docs/containers/tutorial-django-push-to-registry.md)
- [部署到 Azure Container Apps](https://learn.microsoft.com/azure/container-apps/deploy-visual-studio-code)
