---
ContentId: 0d32bced-91aa-5c2e-e569-6fc7995370ae
DateApproved: 02/04/2026
MetaDescription: Python FastAPI 教程，展示 Visual Studio Code（最佳 Python IDE）中的 IntelliSense 和调试支持。
---
# Visual Studio Code 中的 FastAPI 教程

[FastAPI](https://fastapi.tiangolo.com/) 是一个用于使用 Python 构建 API 的现代高性能 Web 框架。它旨在让您快速高效地构建 API，同时提供自动验证、序列化和 API 文档等功能，使其成为构建 Web 服务和微服务的热门选择。

在本 FastAPI 教程中，我们将使用 FastAPI 创建一个购物清单应用。通过本教程，您将了解如何在 Visual Studio Code 的终端、编辑器和调试器中操作 FastAPI。本教程并非 FastAPI 的深入讲解，如需深入了解，可以参考[官方 FastAPI 文档](https://fastapi.tiangolo.com/)。

如果您是初次使用 Python，建议您先学习我们的 [Python 教程](/docs/python/python-tutorial.md)，以熟悉该语言和 VS Code 的 Python 支持。本教程更适合那些已经熟悉 Python 并希望学习如何在 VS Code 中使用 FastAPI 的用户。

本 FastAPI 教程的完整代码项目可在 GitHub 上找到：[python-sample-vscode-fastapi-tutorial](https://github.com/microsoft/python-sample-vscode-fastapi-tutorial)。

如果您遇到任何问题，可以在 [Python 扩展讨论 Q&A](https://github.com/microsoft/vscode-python/discussions/categories/q-a) 中搜索答案或提问。

## 设置项目

您可以通过多种方式为本教程设置项目。我们将介绍如何在 [GitHub Codespaces](#github-codespaces) 和[本地 VS Code](#locally-in-vs-code) 中进行设置。

### GitHub Codespaces

您可以设置此项目以便在 [GitHub Codespaces](https://github.com/features/codespaces) 中进行开发，在这里您可以在 codespace 中远程编码、调试和运行应用。codespace 提供了托管在云端的完全配置好的开发环境，无需本地设置。此环境包含您项目的依赖项、工具和扩展，确保一致且可复现的开发体验。它通过提供实时编辑、集成版本控制以及便捷访问调试和测试工具来简化协作，同时保持项目的安全性和可靠性。

>**注意**：所有 GitHub.com 账户在免费或专业计划中都包含每月免费使用 GitHub Codespaces 的配额。有关更多信息，请访问[关于 GitHub Codespaces 的计费](https://docs.github.com/billing/managing-billing-for-github-codespaces/about-billing-for-github-codespaces)。

要为本教程设置 codespace，请导航到[此项目的 GitHub 仓库](https://github.com/microsoft/python-sample-vscode-fastapi-tutorial)。此 codespace 包含快速开始 FastAPI 开发所需的所有配置和依赖项。

在本教程中，请选择 **dictionarybased** 分支：

![dictionarybased branch selected in the python-sample-vscode-fastapi-tutorial GitHub repo](images/fastapi-tutorial/dictionarybased_github_branch.png)

然后，选择 **Code** > **Codespaces** > **Create Codespace on \<dictionarybased\>** 分支来为您的项目创建并打开 codespace。

完成后，您可以继续下面的[替换数据库](#replace-the-database)部分。

### 在本地 VS Code 中

要在 [VS Code](https://code.visualstudio.com/) 中成功完成本教程，您首先需要设置 Python 开发环境。具体来说，本教程需要：

* Python 3（如果您尚未安装，请查看[安装指南](/docs/python/python-tutorial.md#install-a-python-interpreter)）
* [VS Code 的 Python 扩展](https://marketplace.visualstudio.com/items?itemName=ms-python.python)（有关安装扩展的更多详细信息，您可以阅读[扩展市场](/docs/configure/extensions/extension-marketplace.md)）。

在本节中，我们将创建一个文件夹作为工作区在 VS Code 中打开，设置 Python 虚拟环境，并安装项目的依赖项。

1. 在您的文件系统中，为本教程创建一个项目文件夹，例如 `groceries-plugin`。

2. 在 VS Code 中打开这个新文件夹（**文件** > **打开文件夹…**）。

3. 当[工作区信任](/docs/editing/workspaces/workspace-trust.md)提示出现时，选择**是的，我信任这些作者**以允许工作区访问必要的资源和扩展。您可以了解更多关于工作区信任的[文档](/docs/editing/workspaces/workspace-trust.md)。

现在，让我们创建一个 `requirements.txt` 文件，列出我们希望为应用安装的依赖项。`requirements.txt` 文件是 Python 开发中的常见做法，用于指定项目所依赖的库及其版本。此文件有助于确保参与项目的任何人都可以重新创建类似的开发环境，使其成为保持一致性的便捷组件。

我们将安装 FastAPI 用于创建应用，[uvicorn](https://www.uvicorn.org) 作为服务器，以及 [Redis](https://redis.io) 和 `type-redis` 用于处理数据存储和与 Redis 数据库交互。

4. 在 VS Code 中创建一个新文件（**文件** > **新建文本文件** 或 `kb(workbench.action.files.newUntitledFile)`）。

5. 向其中添加以下内容：

    ```text
    fastapi
    redis
    types-redis
    uvicorn
    ```

6. 保存文件（`kb(workbench.action.files.save)`）并将其命名为 `requirements.txt`。

7. 通过打开命令面板（`kb(workbench.action.showCommands)`）并运行 **Python: 创建环境** 命令来创建虚拟环境。

    >**注意**：此步骤可能需要几分钟才能完成。

8. 当询问环境类型时，选择 **Venv**：

    ![Dropdown with "Venv" or "Conda" as options for environments that can be created with the Python: Create Environment command](images/environments/create_environment_dropdown.png)

9. 然后选择您计算机上可用的最新 Python 版本：

    ![List of available global environments that can be used to create a virtual environment](images/fastapi-tutorial/create_environment_interpreters_list.png)

10. 从下拉列表中选择 `requirements.txt` 文件，以便自动安装依赖项，然后选择**确定**：

    ![Check box selected to install dependencies from requirements.txt file](images/fastapi-tutorial/create_environment_select_requirements.png)

虚拟环境将被创建，依赖项也会自动安装，并且该环境将被选为工作区供 Python 扩展使用。您可以通过检查 VS Code 右下角来确认它已被选中：

![Environment in the Status bar](images/shared/environment-in-status-bar.png)

>**注意**：如果您在状态栏上找不到新创建的环境信息，可以单击 Python 解释器指示器（或从命令面板运行 **Python: 选择解释器** 命令）并手动选择虚拟环境。

## 开始编码

让我们创建应用！

1. 通过 **文件** > **新建文件…** 创建一个新的 Python 文件，然后选择 **Python 文件**。

2. 将其保存为 `groceries-plugin` 文件夹中的 `main.py`（`kb(workbench.action.files.saveAs)`）。

3. 将以下代码添加到 `main.py` 并保存文件：

    ```python
    from fastapi import FastAPI

    app = FastAPI()

    @app.get("/")
    def root():
        return {"message": "Hello World"}
    ```

4. 通过启动调试器（`kb(workbench.action.debug.start)`）来运行代码。

5. 从下拉菜单中，选择列表中的 **FastAPI** 配置选项：

    ![Dropdown with debugger configuration options, with FastAPI being highlighted](images/fastapi-tutorial/fastapi_debug_config_option.png)

    这将自动创建一个调试配置，调用 uvicorn 通过调试器启动应用服务器，并允许您逐步执行源代码以检查其行为。您应该在终端中看到类似以下内容：

    ![Uvicorn server running message displayed in the terminal, with an URL to access the app](images/fastapi-tutorial/fastapi_debug_terminal.png)

   >**提示**：如果您的默认端口已被占用，请停止调试器并打开命令面板（`kb(workbench.action.showCommands)`），搜索 **Debug: Add Configuration**，选择 Python Debugger，然后选择 FastAPI。这将在 `.vscode/launch.json` 中创建一个可供您编辑的自定义配置文件。在 `"args":[]` 中添加以下内容以设置自定义端口：`"--port=5000"`。保存文件，然后使用（`kb(workbench.action.debug.start)`）重启调试器。

7. `kbstyle(Ctrl+Click)` 终端中的 `http://127.0.0.1:8000/` URL，在默认浏览器中打开该地址：

    ![Hello World message displayed in the browser](images/fastapi-tutorial/helloworld_browser.png)

    恭喜！您的 FastAPI 应用已启动并运行！

8. 使用调试工具栏中的**停止**按钮或通过 `kb(workbench.action.debug.stop)` 停止调试器。

## 为购物清单项创建模型

现在我们的 FastAPI 应用已正常工作，我们可以使用 [Pydantic](https://docs.pydantic.dev/latest/) 来定义购物清单项。Pydantic 是一个与 FastAPI 无缝集成的数据验证和解析库。Pydantic 允许您使用带有[类型提示](https://docs.python.org/3/library/typing.html)的 Python 类来定义数据模型，以自动验证和解析 API 请求中的传入数据（称为"载荷"）。

让我们为购物清单项创建一个模型。我们将使用 `ItemPayload` 模型来定义要添加到购物清单中的项的数据结构。此模型将有三个字段：`item_id`、`item_name` 和 `quantity`。

1. 通过 **文件** > **新建文件…** 创建一个新的 Python 文件，然后选择 **Python 文件**。

2. 将以下行添加到文件中，然后将其保存到 `groceries-plugin` 文件夹中，命名为 `models.py`（`kb(workbench.action.files.saveAs)`）：

    ```python
    from typing import Optional
    from pydantic import BaseModel

    class ItemPayload(BaseModel):
        item_id: Optional[int]
        item_name: str
        quantity: int
    ```

[Pylance](https://marketplace.visualstudio.com/items?itemName=ms-python.vscode-pylance) 是 VS Code 中 Python 的默认语言服务器，支持类型提示功能，对于使用 Pydantic 模型和 FastAPI 非常有用。这是因为 Pylance 构建在 [Pyright](https://github.com/microsoft/pyright) 之上，后者是 Python 的静态类型检查器，可以检测代码中的类型错误，以防止错误并提高代码质量。

以下三个步骤是可选的，但鉴于 FastAPI 大量使用类型提示来提高代码可读性和验证，我们可以利用 Pylance 的类型检查功能来尽早捕获错误：

1. 打开设置编辑器（`kb(workbench.action.openSettings)`）。

2. 搜索"python type checking mode"并将其设置为 `basic` 以进行基本类型检查。Pylance 现在将显示诊断信息和警告以捕获简单的类型相关错误。或者，您可以将其设置为 `strict` 以强制执行更高级的[类型检查规则](https://microsoft.github.io/pyright/#/configuration?id=diagnostic-rule-defaults)。

    ![Python Analysis Type Checking Mode options (off, basic and strict) in Settings editor](images/fastapi-tutorial/type_checking_mode_setting.png)

3. 接下来，搜索"Python inlay type hints"，并为**变量类型**和**函数返回类型**启用内联提示：

    ![Two Python Analysis Type Hints settings being enabled in the Settings editor: for Function Return Types and for Variable Types](images/fastapi-tutorial/function_and_variable_return_type_hint_settings.png)

## 创建路由

现在我们需要一个地方来存储购物清单项。为简单起见，让我们从一个空字典开始。

1. 首先，让我们导入示例所需的所有包。打开 `main.py` 文件，将第一条 import 行替换为以下内容：

    ```python
    from fastapi import FastAPI, HTTPException

    from models import ItemPayload
    ```

2. 现在在 `app = FastAPI()` 正下方添加以下行：

    ```python
    grocery_list: dict[int, ItemPayload] = {}
    ```

    这将创建一个新的空字典，接收 `int` 类型的键（作为项 ID）和 `ItemPayload` 类型的值。

    现在，我们将在 FastAPI 应用中定义路由。在 Web 应用的上下文中，路由就像是将特定 URL 映射到处理它们代码的路径。这些路由作为应用中不同功能的入口点。当客户端（如 Web 浏览器或其他程序）使用特定 URL 向我们的应用发送请求时，FastAPI 会根据 URL 将该请求路由到适当的函数（也称为路由处理函数或视图函数），该函数处理请求并生成响应。

    让我们继续定义用于添加和检索单个项以及返回购物清单中所有项的路由。

3. 在 `main.py` 文件末尾添加以下路由：

    ```python
    # Route to add an item
    @app.post("/items/{item_name}/{quantity}")
    def add_item(item_name: str, quantity: int):
        if quantity <= 0:
            raise HTTPException(status_code=400, detail="Quantity must be greater than 0.")
        # if item already exists, we'll just add the quantity.
        # get all item names
        items_ids = {item.item_name: item.item_id if item.item_id is not None else 0 for item in grocery_list.values()}
        if item_name in items_ids.keys():
            # get index of item_name in item_ids, which is the item_id
            item_id = items_ids[item_name]
            grocery_list[item_id].quantity += quantity
    # otherwise, create a new item
        else:
            # generate an ID for the item based on the highest ID in the grocery_list
            item_id = max(grocery_list.keys()) + 1 if grocery_list else 0
            grocery_list[item_id] = ItemPayload(
                item_id=item_id, item_name=item_name, quantity=quantity
            )

        return {"item": grocery_list[item_id]}
    ```

    如果您在上一节中启用了类型提示，您可能会注意到 Pylance 会添加函数返回类型以及 `item_ids` 和 `item_id` 类型的内联提示。您可以选择双击每个建议将它们插入到代码中：

    ![Inlay function return and variable type hints being displayed by Pylance throughout the sample code](images/fastapi-tutorial/pylance_inlay_hints.png)

    现在让我们检查此路由是否按预期工作。最快的方法是同时使用 VS Code 的调试器和 FastAPI 的 `/docs` 端点，后者提供有关所有可用 API 路由的信息，并让您与 API 交互以探索其参数和响应。此文档是根据 FastAPI 应用中定义的元数据和类型提示动态生成的。

4. 在 `if quantity <= 0` 语句旁边添加一个断点，通过单击行号左侧的边距（或 `kb(editor.debug.action.toggleBreakpoint)`）来添加。调试器将在该行执行之前停止，以便您可以逐行检查代码。

    ![Breakpoint set next to the first line in the add_item function](images/fastapi-tutorial/debugger_breakpoint.png)

5. 启动调试器（`kb(workbench.action.debug.start)`），然后在浏览器中导航到 `http://127.0.0.1:8000/docs`。

    应该有一个 Swagger 界面，其中包含应用中可用的两个端点：`/items` 和根路径（`/`）。

    ![Swagger UI displaying two endpoints: /items and /](images/fastapi-tutorial/fastapi_first_swagger_page.png)

6. 选择 `/items` 路由旁边的向下箭头将其展开，然后单击右侧出现的 **Try it out** 按钮。

    !["Try it out" button displayed next to the /items route in the Swagger UI](images/fastapi-tutorial/fastapi_tryitout_button.png)

7. 通过向 `item_name` 字段传递一个字符串和向 `quantity` 传递一个数字来添加购物清单项。例如，您可以提供 apple 作为 `item_name`，2 作为 `quantity`。

8. 选择 **Execute**。

    ![Execute button displayed below the /items route](images/fastapi-tutorial/fastapi_execute_button.png)

9. 再次打开 VS Code，注意调试器已停在您之前设置的断点处。

    ![Debugger stopped at the breakpoint set in the add_item function](images/fastapi-tutorial/fastapi_breakpoint_hit.png)

    在左侧，此时定义的所有局部和全局变量都显示在"运行和调试"视图下的变量窗口中。在我们的示例中，`item_name` 在局部变量视图下设置为 'apple'，`quantity` 设置为 2，全局变量视图下显示一个空的 `grocery_list` 字典。

    ![Variables window displayed in the Run and Debug view, with the item and grocery_list variables highlighted](images/fastapi-tutorial/fastapi_debugger_variables.png)

    现在让我们使用 VS Code 的调试控制台进行一些探索。

10. 选中 `quantity <= 0` 语句，在编辑器上右键单击，然后选择**在调试控制台中计算**：

    ![Evaluate in Debug Console option displayed in the context menu when right-clicking on a line of code](images/fastapi-tutorial/fastapi_evaluate_debug_console.png)

    这将打开调试控制台并运行所选表达式。正如我们的示例所预期的，该表达式计算结果为 `False`。

    调试控制台是一个强大的工具，可以快速测试表达式并更好地理解断点时代码的状态。您还可以使用它来运行任意代码，例如调用函数或打印变量。您可以在 [Python 教程](/docs/python/python-tutorial.md#configure-and-run-the-debugger) 中了解更多关于在 VS Code 中进行 Python 调试的信息。

    现在，您可以通过在调试视图工具栏中选择**继续**或按 `kb(workbench.action.debug.continue)` 来继续执行代码。

    最后，让我们为应用添加剩余的路由，以便我们可以列出所有项或特定项，以及从购物清单中删除它们。您可以让调试器保持运行，因为当您保存下一步中所做的更改时，它会自动重新加载应用。

11. 将 `main.py` 中的内容替换为以下代码：

    ```python
    from fastapi import FastAPI, HTTPException

    from models import ItemPayload

    app = FastAPI()

    grocery_list: dict[int, ItemPayload] = {}

    # Route to add an item
    @app.post("/items/{item_name}/{quantity}")
    def add_item(item_name: str, quantity: int) -> dict[str, ItemPayload]:
        if quantity <= 0:
            raise HTTPException(status_code=400, detail="Quantity must be greater than 0.")
        # if item already exists, we'll just add the quantity.
        # get all item names
        items_ids: dict[str, int] = {
            item.item_name: item.item_id if item.item_id is not None else 0
            for item in grocery_list.values()
        }
        if item_name in items_ids.keys():
            # get index of item_name in item_ids, which is the item_id
            item_id: int = items_ids[item_name]
            grocery_list[item_id].quantity += quantity
        # otherwise, create a new item
        else:
            # generate an ID for the item based on the highest ID in the grocery_list
            item_id: int = max(grocery_list.keys()) + 1 if grocery_list else 0
            grocery_list[item_id] = ItemPayload(
                item_id=item_id, item_name=item_name, quantity=quantity
            )

        return {"item": grocery_list[item_id]}


    # Route to list a specific item by ID
    @app.get("/items/{item_id}")
    def list_item(item_id: int) -> dict[str, ItemPayload]:
        if item_id not in grocery_list:
            raise HTTPException(status_code=404, detail="Item not found.")
        return {"item": grocery_list[item_id]}


    # Route to list all items
    @app.get("/items")
    def list_items() -> dict[str, dict[int, ItemPayload]]:
        return {"items": grocery_list}


    # Route to delete a specific item by ID
    @app.delete("/items/{item_id}")
    def delete_item(item_id: int) -> dict[str, str]:
        if item_id not in grocery_list:
            raise HTTPException(status_code=404, detail="Item not found.")
        del grocery_list[item_id]
        return {"result": "Item deleted."}


    # Route to remove some quantity of a specific item by ID
    @app.delete("/items/{item_id}/{quantity}")
    def remove_quantity(item_id: int, quantity: int) -> dict[str, str]:
        if item_id not in grocery_list:
            raise HTTPException(status_code=404, detail="Item not found.")
        # if quantity to be removed is higher or equal to item's quantity, delete the item
        if grocery_list[item_id].quantity <= quantity:
            del grocery_list[item_id]
            return {"result": "Item deleted."}
        else:
            grocery_list[item_id].quantity -= quantity
        return {"result": f"{quantity} items removed."}

    ```

12. 保存文件（`kb(workbench.action.files.save)`）。应用应该会自动重新加载。

    您现在可以再次打开 `/docs` 页面并测试新路由，使用调试器和调试控制台更好地理解代码执行。完成后，您可以停止调试器（`kb(workbench.action.debug.stop)`）。您也可以通过点击来删除在第 4 步中添加的断点。

恭喜！您现在拥有一个可用的 FastAPI 应用，具有添加、列出和删除购物清单项的路由。

## 设置数据存储

此时，您已经拥有了具有基本功能的可用版本的应用。本节将指导您设置数据存储以实现持久化，但如果您对已学内容感到满意，可以选择跳过。

到目前为止，我们将数据存储在字典中，这并不理想，因为应用重启时所有数据都会丢失。

为了持久化数据，我们将使用 [Redis](https://redis.io)，这是一个开源的内存数据结构存储。由于其速度和多功能性，Redis 被广泛用作各种应用中的数据存储系统，包括 Web 应用、实时分析系统、缓存层、本教程等。

如果您已经在 **GitHub Codespaces** 中使用我们现有的模板，可以直接跳到[替换数据库](#replace-the-database)部分。

如果您使用的是 Windows，可以通过设置 [Docker 容器](https://www.docker.com/products/docker-desktop) 或 [GitHub Codespace](https://github.com/features/codespaces) 来使用 Redis。在本教程中，我们将使用 Docker 容器，但您可以参考[上面部分](#github-codespaces)获取有关如何设置 GitHub Codespace 的说明。

否则，如果您使用的是 Linux 或 macOS 机器，可以按照[其网站上的说明](https://redis.io/docs/latest/)安装 Redis，然后跳到[替换数据库](#replace-the-database)部分。

### 在 Windows 上设置 Docker 容器

VS Code 的 [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) 扩展提供了一种简化的方法，将您的项目、其依赖项和所有必要工具整合到一个整洁的容器中，创建一个功能齐全的开发环境。该扩展允许您在 VS Code 中打开容器内（或挂载到容器中）的项目，在那里您将拥有其完整的功能集。

对于以下步骤，请确保您的计算机上已安装以下要求：

#### 要求

* [Docker for Windows](https://www.docker.com/)
* [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) 扩展

#### 创建 Dev 容器配置

1. 打开命令面板并运行 **Dev Containers: Add Dev Container Configuration Files…**。

2. 选择 **Python 3**：

    ![Python 3 option selected in the Dev Containers configuration files list](images/fastapi-tutorial/devcontainers_python3.png)

3. 选择默认版本。

4. 选择 **Redis Server** 作为要安装的附加功能，按**确定**，然后选择**保留默认值**。

    我们可以选择安装[功能](https://github.com/devcontainers/features)以包含在容器中。对于本教程，我们将安装 [Redis Server](https://github.com/itsmechlark/features/tree/main/src/redis-server)，这是一个社区贡献的功能，用于安装并添加适当的 dev 容器设置以支持 Redis。

    ![Redis Server option selected in the Dev Containers configuration files list](images/fastapi-tutorial/devcontainers_redis_server_feature.png)

    这将在您的工作区中创建一个 `.devcontainer` 文件夹，其中包含一个 `devcontainer.json` 文件。让我们对此文件进行一些编辑，使容器设置包含诸如安装我们所需的 VS Code 扩展以及项目依赖项等步骤。

5. 打开 `devcontainer.json` 文件。

6. 在 `"features" : { ... }` 条目后添加一个 ","，以便我们可以向文件添加更多设置。

    接下来，我们将在 `devcontainer.json` 文件的 `postCreateCommand` 属性中添加必要的依赖项安装命令，以便容器设置完成后我们的应用即可运行。

7. 找到以下内容并从该行中删除注释（`//`），以便在容器创建后可以安装依赖项：

    ```json
    "postCreateCommand": "pip3 install --user -r requirements.txt",
    ```

    您可以在[开发容器规范](https://containers.dev/implementors/json_reference/#lifecycle-scripts)中了解 `postCreateCommand` 和更多生命周期脚本。

    现在，我们将使用 `customizations` 属性来添加我们希望安装在容器中的 VS Code 扩展。

8. 将以下设置添加到 `devcontainer.json`：

    ```jsonc
        // Use 'postCreateCommand' to run commands after the container is created.
        "postCreateCommand": "pip3 install --user -r requirements.txt",

        // Configure tool-specific properties.
        "customizations": {
            "vscode": {
                "extensions": [
                    "ms-python.python", //Python extension ID
                    "ms-python.vscode-pylance" //Pylance extension ID
                ]
            }
        }
    ```

9. 保存文件。

10. 从右下角显示的通知中选择**在容器中重新打开**，或从命令面板运行 **Dev Containers: Reopen in Container** 命令。

    >**注意**：构建容器可能需要几分钟时间，具体取决于网络速度和计算机性能。

    您可以在 [Dev Containers 文档](/docs/devcontainers/containers.md#create-a-devcontainerjson-file)中了解更多关于 dev 容器配置的信息。

完成后，您将拥有一个完全配置好的基于 Linux 的工作区，其中安装了 Python 3 和 Redis Server。

容器设置完成后，您会注意到 VS Code 左下角有一个指示器：

![Dev Containers indicator displayed on the bottom left corner of VS Code](images/fastapi-tutorial/devcontainer_indicator.png)

>**注意**：请仔细检查 Python 和 Pylance 扩展是否已成功安装在容器中，可以通过打开扩展视图（`kb(workbench.view.extensions)`）并搜索它们来确认。如果没有，您可以通过运行**在 Dev Container 中安装**来安装它们。

所选 Python 解释器信息在右下角的状态栏上可用，与 `devcontainer.json` 文件中指定的版本匹配：

![Python interpreter selection](images/fastapi-tutorial/devcontainer_python_interpreter.png)

>**注意**：如果您在状态栏上找不到 Python 解释器信息，可以单击 Python 解释器指示器（或从命令面板运行 **Python: 选择解释器** 命令）并手动选择容器中的 Python 解释器。

我们现在准备好进入下一节，在那里我们将替换数据存储。

## 替换数据库

我们有一个存储购物清单项的字典，但我们想将其替换为 Redis 数据库。在本教程中，我们将使用 Redis 哈希来存储数据，这是一种可以存储多个键值对的数据结构。

与传统数据库不同（您可以在不知道 ID 的情况下检索项），您需要知道 Redis 哈希的键才能从中检索值。在本教程中，我们将创建一个名为 `item_name_to_id` 的哈希来按名称检索项，并将它们映射到其 ID。此外，我们将创建其他哈希来按 ID 检索项，将它们映射到其名称和数量。每个项哈希都命名为 `item_id:{item_id}`，并有两个字段：`item_name` 和 `quantity`。

首先，让我们将字典替换为连接到 Redis 服务器的 Redis 客户端对象。

1. 在 `main.py` 文件中，将文件开头的 `grocery_list: dict[int, ItemPayload] = {}` 替换为以下行：

    ```python
    redis_client = redis.StrictRedis(host='0.0.0.0', port=6379, db=0, decode_responses=True)
    ```

    Pylance 将显示一条错误消息，因为 Redis 尚未导入。

2. 将光标放在编辑器中的 "redis" 上，然后单击显示的灯泡（或 `kb(editor.action.quickFix)`）。然后选择 **添加 'import redis'**。

    ![Light bulb displayed next to the Redis variable, with the option to add the import statement](images/fastapi-tutorial/fastapi_add_redis_quickfix.png)

    >**提示**：您可以通过在设置编辑器（`kb(workbench.action.openSettings)`）中查找**自动导入完成**设置并启用它，来设置 Pylance 自动添加导入。

    现在我们有一个 Redis 客户端对象，它连接到在本地主机（`host="0.0.0.0"`）上运行并监听端口 6379（`port=6379`）的 Redis 服务器。`db` 参数指定要使用的 Redis 数据库。Redis 支持多个数据库，在此代码中我们将使用数据库 0，即默认数据库。我们还传递了 `decode_responses=True`，以便响应被解码为字符串（而不是字节）。

    让我们在第一个路由 `add_item` 中做一些更多的替换。与其查看字典中的所有键来查找已提供的项名称，我们可以直接从 Redis 哈希获取该信息。

    我们将假设 `item_name_to_id` 哈希已经存在，将项名称映射到其 ID（别担心，我们稍后会添加此代码！）。然后，我们可以通过调用 Redis 的 `hget` 方法获取我们在请求中接收到的项名称的 ID，如果请求的名称已存在于哈希中，则返回项 ID，否则返回 `None`。

3. 删除包含以下内容的行：

    ```python
    items_ids = {item.item_name: item.item_id if item.item_id is not None else 0 for item in grocery_list.values()}
    ```

    并将其替换为：

    ```python
      item_id = redis_client.hget("item_name_to_id", item_name)
     ```

    请注意，Pylance 对此更改提出了一个问题。这是因为 `hget` 方法返回 `str` 或 `None`（如果项不存在）。然而，我们尚未替换的代码下方期望 `item_id` 是 `int` 类型。让我们通过重命名 `item_id` 符号来解决此警告。

4. 将 `item_id` 重命名为 `item_id_str`。

5. 如果您启用了内联提示，Pylance 应该在 `item_id_str` 旁边显示变量类型提示。您可以选择双击来接受它：

    ![Variable type hint displayed next to the item_id_str variable](images/fastapi-tutorial/pylance_redis_typehint.png)

6. 如果项不存在，则 `item_id_str` 为 `None`。所以现在我们可以删除包含以下内容的行：

    ```python
    if item_name in items_ids.keys():
    ```

    并将其替换为：

    ```python
    if item_id_str is not None:
    ```

    现在我们有了字符串形式的项 ID，需要将其转换为 `int` 并更新该项目的数量。目前，我们的 Redis 哈希仅将项名称映射到其 ID。为了也将项 ID 映射到其名称和数量，我们将为每个项创建一个单独的 Redis 哈希，使用 `"item_id:{item_id}"` 作为我们的哈希名称，以便按 ID 检索更容易。我们还将为每个哈希添加 `item_name` 和 `quantity` 字段。

7. 删除 `if` 块中的代码：

    ```python
    item_id: int = items_ids[item_name]
    grocery_list[item_id].quantity += quantity
    ```

    并添加以下内容，将 `item_id` 转换为 `int`，然后通过调用 Redis 的 `hincrby` 方法增加项的数量。此方法将 `"quantity"` 字段的值按请求中给定的数量（`quantity`）递增：

    ```python
    item_id = int(item_id_str)
    redis_client.hincrby(f"item_id:{item_id}", "quantity", quantity)
    ```

    现在我们只需要替换项不存在时的代码，即 `item_id_str` 为 `None` 时。在这种情况下，我们生成一个新的 `item_id`，为该项创建一个新的 Redis 哈希，然后添加提供的项名称和数量。

    要生成新的 `item_id`，让我们使用 Redis 的 `incr` 方法，传递一个名为 `"item_ids"` 的新哈希。此哈希用于存储最后生成的 ID，因此我们可以在每次创建新项时递增它，确保它们都有唯一的 ID。

8. 删除包含以下内容的行：

    ```python
    item_id: int = max(grocery_list.keys()) + 1 if grocery_list else 0
    ```

    并添加以下内容：

    ```python
    item_id: int = redis_client.incr("item_ids")
    ```

    当此 `incr` 调用首次使用 `item_ids` 键运行时，Redis 会创建该键并将其映射到值 `1`。然后，每次后续运行时，它将存储的值递增 1。

    现在，我们将使用 `hset` 方法将项添加到 Redis 哈希，通过提供字段（`item_id`、`item_name` 和 `quantity`）和值（项新创建的 ID 及其提供的名称和数量）的映射。

9. 删除包含以下内容的行：

    ```python
    grocery_list[item_id] = ItemPayload(
            item_id=item_id, item_name=item_name, quantity=quantity
        )
    ```

    并将其替换为以下内容：

    ```python
    redis_client.hset(
                f"item_id:{item_id}",
                mapping={
                    "item_id": item_id,
                    "item_name": item_name,
                    "quantity": quantity,
                })
    ```

    现在我们只需要通过设置我们在开头引用的哈希 `item_name_to_id` 将新创建的 ID 映射到项名称。

10. 在 `else` 块中，在路由末尾添加此行：

    ```python
    redis_client.hset("item_name_to_id", item_name, item_id)
    ```

11. 删除包含以下内容的行：

    ```python
    return {"item": grocery_list[item_id]}
    ```

    并将其替换为：

    ```python
    return {"item": ItemPayload(item_id=item_id, item_name=item_name, quantity=quantity)}
    ```

12. 如果您愿意，可以尝试对其他路由进行类似的替换。否则，您可以直接用以下行替换文件的全部内容：

    ```python
    import redis
    from fastapi import FastAPI, HTTPException

    from models import ItemPayload

    app = FastAPI()

    redis_client = redis.StrictRedis(host="0.0.0.0", port=6379, db=0, decode_responses=True)

    # Route to add an item
    @app.post("/items/{item_name}/{quantity}")
    def add_item(item_name: str, quantity: int) -> dict[str, ItemPayload]:
        if quantity <= 0:
            raise HTTPException(status_code=400, detail="Quantity must be greater than 0.")

        # Check if item already exists
        item_id_str: str | None = redis_client.hget("item_name_to_id", item_name)

        if item_id_str is not None:
            item_id = int(item_id_str)
            redis_client.hincrby(f"item_id:{item_id}", "quantity", quantity)
        else:
            # Generate an ID for the item
            item_id: int = redis_client.incr("item_ids")
            redis_client.hset(
                f"item_id:{item_id}",
                mapping={
                    "item_id": item_id,
                    "item_name": item_name,
                    "quantity": quantity,
                },
            )
            # Create a set so we can search by name too
            redis_client.hset("item_name_to_id", item_name, item_id)

        return {
            "item": ItemPayload(item_id=item_id, item_name=item_name, quantity=quantity)
        }


    # Route to list a specific item by ID but using Redis
    @app.get("/items/{item_id}")
    def list_item(item_id: int) -> dict[str, dict[str, str]]:
        if not redis_client.hexists(f"item_id:{item_id}", "item_id"):
            raise HTTPException(status_code=404, detail="Item not found.")
        else:
            return {"item": redis_client.hgetall(f"item_id:{item_id}")}


    @app.get("/items")
    def list_items() -> dict[str, list[ItemPayload]]:
        items: list[ItemPayload] = []
        stored_items: dict[str, str] = redis_client.hgetall("item_name_to_id")

        for name, id_str in stored_items.items():
            item_id: int = int(id_str)

            item_name_str: str | None = redis_client.hget(f"item_id:{item_id}", "item_name")
            if item_name_str is not None:
                item_name: str = item_name_str
            else:
                continue  # skip this item if it has no name

            item_quantity_str: str | None = redis_client.hget(
                f"item_id:{item_id}", "quantity"
            )
            if item_quantity_str is not None:
                item_quantity: int = int(item_quantity_str)
            else:
                item_quantity = 0

            items.append(
                ItemPayload(item_id=item_id, item_name=item_name, quantity=item_quantity)
            )

        return {"items": items}


    # Route to delete a specific item by ID but using Redis
    @app.delete("/items/{item_id}")
    def delete_item(item_id: int) -> dict[str, str]:
        if not redis_client.hexists(f"item_id:{item_id}", "item_id"):
            raise HTTPException(status_code=404, detail="Item not found.")
        else:
            item_name: str | None = redis_client.hget(f"item_id:{item_id}", "item_name")
            redis_client.hdel("item_name_to_id", f"{item_name}")
            redis_client.delete(f"item_id:{item_id}")
            return {"result": "Item deleted."}


    # Route to remove some quantity of a specific item by ID but using Redis
    @app.delete("/items/{item_id}/{quantity}")
    def remove_quantity(item_id: int, quantity: int) -> dict[str, str]:
        if not redis_client.hexists(f"item_id:{item_id}", "item_id"):
            raise HTTPException(status_code=404, detail="Item not found.")

        item_quantity: str | None = redis_client.hget(f"item_id:{item_id}", "quantity")

        # if quantity to be removed is higher or equal to item's quantity, delete the item
        if item_quantity is None:
            existing_quantity: int = 0
        else:
            existing_quantity: int = int(item_quantity)
        if existing_quantity <= quantity:
            item_name: str | None = redis_client.hget(f"item_id:{item_id}", "item_name")
            redis_client.hdel("item_name_to_id", f"{item_name}")
            redis_client.delete(f"item_id:{item_id}")
            return {"result": "Item deleted."}
        else:
            redis_client.hincrby(f"item_id:{item_id}", "quantity", -quantity)
            return {"result": f"{quantity} items removed."}

    ```

13. 重新运行调试器，通过与 `/docs` 路由交互来测试此应用。完成后可以停止调试器。

恭喜！您现在拥有一个可用的 FastAPI 应用，具有添加、列出和删除购物清单项的路由，并且数据持久化在 Redis 数据库中。

## 可选：设置数据库删除

现在数据由 Redis 持久化，您可能希望创建一个脚本来清除所有测试数据。为此，创建一个名为 `flushdb.py` 的新文件，内容如下：

```python
import redis

redis_client = redis.StrictRedis(host='0.0.0.0', port=6379, db=0, decode_responses=True)
redis_client.flushdb()

```

然后，当您想要重置数据库时，可以在 VS Code 中打开 `flushdb.py` 文件，然后选择编辑器右上角的**运行**按钮，或从命令面板运行 **Python: 在终端中运行 Python 文件** 命令。

请注意，这样做时应该谨慎，因为它会删除当前数据库中的所有键，如果在生产环境中执行可能会导致数据丢失。

## 可选：创建 GPT 操作

使用 GitHub Codespaces，您可以在测试目的下托管应用程序，以便与 [GPT 操作](https://platform.openai.com/docs/actions/introduction) 一起使用。GPT 操作是使 [ChatGPT](https://chatgpt.com/) 能够与现有 API 交互的工具，以增强 ChatGPT 的能力，使其能够执行各种操作。您可以跟随下面的直播录制来创建自己的购物清单插件，用于 ChatGPT：

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/fPCjEbRpK1M" title="Build a GPT Action with VS Code and Codespaces" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

>**注意**：所有个人 GitHub.com 账户在免费或专业计划中都包含每月免费使用 GitHub Codespaces 的配额。有关更多信息，请访问[关于 GitHub Codespaces 的计费](https://docs.github.com/billing/managing-billing-for-github-codespaces/about-billing-for-github-codespaces)。

## 后续步骤

感谢您跟随本教程！我们希望您学到了一些关于 FastAPI 以及如何在 VS Code 中使用它的新知识。

本教程的完整代码项目可在 GitHub 上找到：[python-sample-vscode-fastapi-tutorial](https://github.com/microsoft/python-sample-vscode-fastapi-tutorial)。

在[官方文档](https://fastapi.tiangolo.com/)中了解更多关于 FastAPI 的信息。

要尝试在生产网站上部署应用，请查看教程[使用 Docker 容器将 Python 应用部署到 Azure 应用服务](https://learn.microsoft.com/azure/developer/python/tutorial-deploy-containers-01)。

您还可以查看以下其他 VS Code Python 文章：

* [编辑 Python 代码](/docs/python/editing.md)
* [管理 Python 环境](/docs/python/environments.md)
* [调试 Python](/docs/python/debugging.md)
* [测试](/docs/python/testing.md)
