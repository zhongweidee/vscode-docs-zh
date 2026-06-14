---
ContentId: 3c0948f9-85a5-4dd4-a461-59788dbfce4c
DateApproved: 02/04/2026
MetaDescription: Python Django 教程，演示在 Visual Studio Code（最佳 Python IDE）中进行代码和模板的智能感知、代码导航及调试。
---
# Visual Studio Code 中的 Django 教程

Django 是一个高级 Python 框架，旨在实现快速、安全且可扩展的 Web 开发。Django 提供了丰富的支持，包括 URL 路由、页面模板以及数据处理。

在本 Django 教程中，您将创建一个简单的 Django 应用，其中包含三个使用公共基础模板的页面。您将在 Visual Studio Code 环境中创建此应用，以便了解如何在 VS Code 终端、编辑器和调试器中与 Django 配合使用。本教程不会深入探讨 Django 本身的各种细节，例如使用数据模型和创建管理界面。关于这些方面的指导，请参阅本教程末尾的 Django 文档链接。

本 Django 教程的完整代码项目可在 GitHub 上找到：[python-sample-vscode-django-tutorial](https://github.com/microsoft/python-sample-vscode-django-tutorial)。

如果您遇到任何问题，可以在 [Python 扩展讨论问答](https://github.com/microsoft/vscode-python/discussions/categories/q-a)上搜索答案或提问。

## 先决条件

要成功完成本 Django 教程，您必须完成以下操作（与[通用 Python 教程](/docs/python/python-tutorial.md)中的步骤相同）：

1. 安装 [Python 扩展](https://marketplace.visualstudio.com/items?itemName=ms-python.python)。

1. 安装一个 Python 3 版本（本教程基于此版本编写）。可选方案包括：
   - （所有操作系统）从 [python.org](https://www.python.org/downloads/) 下载；通常使用页面上最先出现的 **Download Python 3.9.1** 按钮（或最新版本）。
   - （Linux）内置的 Python 3 安装可以正常使用，但要安装其他 Python 包，您必须在终端中运行 `sudo apt install python3-pip`。
   - （macOS）在 macOS 上通过 [Homebrew](https://brew.sh/) 安装，使用 `brew install python3`（不支持 macOS 上的系统 Python 安装）。
   - （所有操作系统）从 [Anaconda](https://www.anaconda.com/download/) 下载（用于数据科学目的）。

1. 在 Windows 上，确保您的 Python 解释器所在位置已包含在 PATH 环境变量中。您可以在命令提示符中运行 `path` 来检查该位置。如果 Python 解释器的文件夹未被包含，请打开 Windows 设置，搜索"环境"，选择 **编辑账户的环境变量**，然后编辑 **Path** 变量以包含该文件夹。

## 为 Django 教程创建项目环境

在本节中，您将创建一个虚拟环境，并在其中安装 Django。使用虚拟环境可以避免将 Django 安装到全局 Python 环境中，并让您能够精确控制应用程序中使用的库。虚拟环境还便于[为环境创建 requirements.txt 文件](#为环境创建-requirementstxt-文件)。

[Python Environments 扩展](/docs/python/environments.md)支持多种环境类型，包括 venv、conda、poetry 等。本教程使用 **venv**，因为它内置于 Python 中，无需额外的工具。其他环境类型的步骤类似——详见[创建环境](/docs/python/environments.md#creating-environments)。

1. 在您的文件系统中，为本教程创建一个项目文件夹，例如 `hello_django`。

1. 通过运行 `code .`，或运行 VS Code 并使用 **文件** > **打开文件夹** 命令，在 VS Code 中打开项目文件夹。

1. 使用 **Python: Create Environment** 命令创建虚拟环境：

    1. 打开命令面板（`kb(workbench.action.showCommands)`）
    2. 搜索并选择 **Python: Create Environment**
    3. 选择 **Venv** 来创建 venv 环境
    4. 选择要用于该环境的 Python 解释器

    VS Code 会在您的工作区中创建一个 `.venv` 文件夹，并自动选择新环境。

    > [!TIP]
    > 您也可以使用 **Python** 侧边栏来创建环境。展开 **Environment Managers** 并选择 **+** 按钮进行快速创建，该方式使用合理的默认设置。

    ![Django tutorial: opening the Command Palette in VS Code](images/shared/command-palette.png)

1. 所选的环境会显示在 VS Code 状态栏的右侧，**('.venv': venv)** 指示器表明您正在使用虚拟环境：

    ![Django tutorial: selected environment showing in the VS Code status bar](images/shared/environment-in-status-bar.png)

1. 使用以下方法之一在虚拟环境中安装 Django：

    **使用包管理 UI：**

    1. 在 **Python** 侧边栏中，展开 **Environment Managers**
    2. 右键单击您的 `.venv` 环境，然后选择 **Manage Packages**
    3. 搜索 `django` 并选择 **Install**

    **使用终端：**

    从命令面板中运行 [**Terminal: Create New Terminal**](/docs/terminal/basics.md)（`kb(workbench.action.terminal.new)`），这将创建一个终端并自动激活虚拟环境。然后运行：

    ```bash
    python -m pip install django
    ```

现在，您已拥有一个自包含的环境，可用于编写 Django 代码。当您打开新终端时，VS Code 会自动激活该环境。如果您在 VS Code 外部打开单独的命令提示符或终端，请运行 `source .venv/bin/activate`（Linux/macOS）或 `.venv\Scripts\Activate.ps1`（Windows）来激活环境。当命令提示符开头显示 **(.venv)** 时，即表示环境已激活。

## 创建并运行一个最小的 Django 应用

在 Django 术语中，一个"Django 项目"由多个站点级配置文件以及一个或多个"应用"组成，您将这些应用部署到 Web 主机上以创建一个完整的 Web 应用程序。一个 Django 项目可以包含多个应用，每个应用通常在项目中具有独立的功能，而同一个应用可以出现在多个 Django 项目中。而一个应用本身只是一个遵循 Django 所期望的某些约定的 Python 包。

要创建一个最小的 Django 应用，首先需要创建 Django 项目作为应用的容器，然后再创建应用本身。这两种操作都使用 Django 管理工具 `django-admin`，该工具在您安装 Django 包时便已安装。

### 创建 Django 项目

1. 在已激活虚拟环境的 VS Code 终端中，运行以下命令：

    ```bash
    django-admin startproject web_project .
    ```

    此 `startproject` 命令（通过末尾的 `.`）假定当前文件夹是您的项目文件夹，并在其中创建以下内容：

    - `manage.py`：项目的 Django 命令行管理工具。您可以使用 `python manage.py <命令> [选项]` 来运行项目的管理命令。

    - 一个名为 `web_project` 的子文件夹，其中包含以下文件：
        - `__init__.py`：一个空文件，用于告诉 Python 此文件夹是一个 Python 包。
        - `asgi.py`：供[兼容 ASGI](https://asgi.readthedocs.io/en/latest/) 的 Web 服务器为您的项目提供服务的入口点。您通常保持此文件不变，因为它为生产 Web 服务器提供了钩子。
        - `settings.py`：包含 Django 项目的设置，您在开发 Web 应用的过程中会对其进行修改。
        - `urls.py`：包含 Django 项目的内容目录，您同样会在开发过程中对其进行修改。
        - `wsgi.py`：供兼容 WSGI 的 Web 服务器为您的项目提供服务的入口点。您通常保持此文件不变，因为它为生产 Web 服务器提供了钩子。

1. 通过运行以下命令创建一个空的开发数据库：

    ```bash
    python manage.py migrate
    ```

    当您第一次运行服务器时，它会在文件 `db.sqlite3` 中创建一个默认的 SQLite 数据库，该数据库适用于开发目的，但也可用于低流量的生产环境 Web 应用。有关数据库的更多信息，请参阅[数据库类型](#数据库类型)部分。

1. 要验证 Django 项目，请确保您的虚拟环境已激活，然后使用命令 `python manage.py runserver` 启动 Django 的开发服务器。服务器在默认端口 8000 上运行，您将在终端窗口中看到类似以下的输出：

    ```bash
    Watching for file changes with StatReloader
    Performing system checks...

    System check identified no issues (0 silenced).
    June 13, 2023 - 18:38:07
    Django version 4.2.2, using settings 'web_project.settings'
    Starting development server at http://127.0.0.1:8000/
    Quit the server with CTRL-BREAK.
    ```

    Django 的内置 Web 服务器*仅*用于本地开发目的。然而，当您部署到 Web 主机时，Django 会使用主机的 Web 服务器。Django 项目中的 `wsgi.py` 和 `asgi.py` 模块负责与生产服务器进行挂接。

    如果您想使用不同于默认 8000 的端口，可以在命令行中指定端口号，例如 `python manage.py runserver 5000`。

1. `kbstyle(Ctrl+单击)` 终端输出窗口中的 `http://127.0.0.1:8000/` URL，以在默认浏览器中打开该地址。如果 Django 安装正确且项目有效，您将看到如下所示的默认页面。VS Code 终端输出窗口也会显示服务器日志。

    ![Django tutorial: default view of empty Django project](images/django-tutorial/django-empty-project-success.png)

1. 完成后，关闭浏览器窗口，并在 VS Code 中使用 `kbstyle(Ctrl+C)` 停止服务器，如终端输出窗口中所示。

### 创建 Django 应用

1. 在已激活虚拟环境的 VS Code 终端中，在项目文件夹（即 `manage.py` 所在的位置）中运行管理工具的 `startapp` 命令：

    ```bash
    python manage.py startapp hello
    ```

    该命令会创建一个名为 `hello` 的文件夹，其中包含多个代码文件和一个子文件夹。在这些文件中，您经常会用到 `views.py`（包含定义 Web 应用中页面的函数）和 `models.py`（包含定义数据对象的类）。`migrations` 文件夹由 Django 的管理工具用于管理数据库版本，本教程后续会对此进行讨论。此外还有 `apps.py`（应用配置）、`admin.py`（用于创建[管理界面](https://docs.djangoproject.com/en/3.1/ref/contrib/admin/)）和 `tests.py`（用于[创建测试](https://docs.djangoproject.com/en/3.1/topics/testing/)），这些文件不在本教程的讨论范围内。

1. 修改 `hello/views.py` 以匹配以下代码，这将为应用的首页创建一个视图：

    ```python
    from django.http import HttpResponse

    def home(request):
        return HttpResponse("Hello, Django!")
    ```

1. 创建一个文件 `hello/urls.py`，内容如下。`urls.py` 文件是您指定模式以将不同的 URL 路由到相应视图的地方。以下代码包含一个路由，用于将应用的根 URL（`""`）映射到您刚刚添加到 `hello/views.py` 中的 `views.home` 函数：

    ```python
    from django.urls import path
    from hello import views

    urlpatterns = [
        path("", views.home, name="home"),
    ]
    ```

1. `web_project` 文件夹也包含一个 `urls.py` 文件，这是实际处理 URL 路由的地方。打开 `web_project/urls.py` 并修改它以匹配以下代码（您可以保留那些说明性注释）。此代码使用 `django.urls.include` 引入应用的 `hello/urls.py`，从而将应用的路由保持在应用内部。当项目包含多个应用时，这种分离非常有用。

    ```python
    from django.contrib import admin
    from django.urls import include, path

    urlpatterns = [
        path("", include("hello.urls")),
        path('admin/', admin.site.urls)
    ]
    ```

1. 保存所有修改过的文件。

1. 在 VS Code 终端中，再次在虚拟环境已激活的情况下，使用 `python manage.py runserver` 运行开发服务器，并在浏览器中打开 `http://127.0.0.1:8000/`，即可看到一个显示"Hello, Django"的页面。

    ![Django tutorial: the basic Django app running in a browser](images/django-tutorial/app-in-browser-01.png)

## 创建调试器启动配置

您可能已经在想，有没有一种更简单的方法来运行服务器并测试应用，而不必每次都输入 `python manage.py runserver`。幸运的是，确实有！您可以在 VS Code 中创建一个自定义的启动配置，它也将用于不可避免的调试练习。

1. 切换到 VS Code 中的 **运行** 视图（使用左侧活动栏或 `kb(workbench.action.debug.start)`）。您可能会看到消息"要自定义运行和调试，请创建 launch.json 文件"。这意味着您还没有包含调试配置的 `launch.json` 文件。如果您点击 **创建 launch.json 文件** 链接，VS Code 可以为您创建：

    ![Django tutorial: initial view of the debug panel](images/shared/debug-panel-initial-view.png)

1. 选择该链接，VS Code 将提示您选择调试配置。从下拉列表中选择 **Django**，VS Code 将使用 Django 运行配置填充一个新的 `launch.json` 文件。`launch.json` 文件包含多个调试配置，每个配置都是 `configuration` 数组中的一个单独的 JSON 对象。

1. 向下滚动并查看名为 "Python: Django" 的配置：

    ```json
    {
        // Use IntelliSense to learn about possible attributes.
        // Hover to view descriptions of existing attributes.
        // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
        "version": "0.2.0",
        "configurations": [
            {
                "name": "Python Debugger: Django",
                "type": "debugpy",
                "request": "launch",
                "program": "${workspaceFolder}\\manage.py",
                "args": [
                    "runserver"
                ],
                "django": true,
                "justMyCode": true
            }
        ]
    }
    ```

    此配置告诉 VS Code 使用选定的 Python 解释器和 `args` 列表中的参数来运行 `"${workspaceFolder}/manage.py"`。因此，使用此配置启动 VS Code 调试器，等同于在已激活虚拟环境的 VS Code 终端中运行 `python manage.py runserver`。（如果需要，您可以在 `args` 中添加端口号，如 `"5000"`。）`"django": true` 条目还告诉 VS Code 启用 Django 页面模板的调试，您将在本教程后面看到。

1. 通过选择 **运行** > **开始调试** 菜单命令，或选择列表旁边的绿色 **开始调试** 箭头（`kb(workbench.action.debug.continue)`）来测试配置：

    ![Django tutorial: start debugging/continue arrow on the debug toolbar](images/django-tutorial/debug-continue-arrow.png)

1. `kbstyle(Ctrl+单击)` 终端输出窗口中的 `http://127.0.0.1:8000/` URL，以打开浏览器并查看应用是否正常运行。

1. 完成后，关闭浏览器并停止调试器。要停止调试器，请使用停止工具栏按钮（红色方块）或 **运行** > **停止调试** 命令（`kb(workbench.action.debug.stop)`）。

1. 现在，您可以随时使用 **运行** > **开始调试** 来测试应用，这还有一个好处，就是会自动保存所有修改过的文件。

## 探索调试器

调试让您有机会在特定的代码行上暂停正在运行的程序。当程序暂停时，您可以检查变量、在调试控制台面板中运行代码，以及利用[调试](/docs/python/debugging.md)中描述的其他功能。运行调试器还会在调试会话开始前自动保存所有修改过的文件。

**开始之前**：确保您已通过终端中的 `kbstyle(Ctrl+C)` 停止了上一节末尾正在运行的应用。如果您让应用在一个终端中继续运行，它会持续占用端口。因此，当您使用相同端口在调试器中运行应用时，原先运行的应用会处理所有请求，您将不会在被调试的应用中看到任何活动，程序也不会在断点处停止。换句话说，如果调试器似乎不工作，请确保没有其他应用实例仍在运行。

1. 在 `hello/urls.py` 中，向 `urlpatterns` 列表添加一个路由：

    ```python
    path("hello/<name>", views.hello_there, name="hello_there"),
    ```

    `path` 的第一个参数定义了一个路由 "hello/"，该路由接受一个名为 *name* 的变量字符串。该字符串会传递给 `path` 的第二个参数中指定的 `views.hello_there` 函数。

    URL 路由区分大小写。例如，路由 `/hello/<name>` 与 `/Hello/<name>` 是不同的。如果您希望同一个视图函数处理这两者，请为每个变体定义路径。

1. 将 `views.py` 的内容替换为以下代码，以定义 `hello_there` 函数，您可以在调试器中逐步执行该函数：

    ```python
    import re
    from django.utils.timezone import datetime
    from django.http import HttpResponse

    def home(request):
        return HttpResponse("Hello, Django!")

    def hello_there(request, name):
        now = datetime.now()
        formatted_now = now.strftime("%A, %d %B, %Y at %X")

        # Filter the name argument to letters only using regular expressions. URL arguments
        # can contain arbitrary text, so we restrict to safe characters only.
        match_object = re.match("[a-zA-Z]+", name)

        if match_object:
            clean_name = match_object.group(0)
        else:
            clean_name = "Friend"

        content = "Hello there, " + clean_name + "! It's " + formatted_now
        return HttpResponse(content)
    ```

    URL 路由中定义的 `name` 变量会作为参数传递给 `hello_there` 函数。如代码注释中所述，应始终过滤用户提供的任意信息，以避免对应用的各种攻击。在此例中，代码将 name 参数过滤为仅包含字母，从而避免了控制字符、HTML 等的注入。（当您在下一节中使用模板时，Django 会进行自动过滤，您就不需要这段代码了。）

1. 通过以下任一方式在 `hello_there` 函数的第一行代码（`now = datetime.now()`）上设置断点：
    - 将光标放在该行上，按 `kb(editor.debug.action.toggleBreakpoint)`，或
    - 将光标放在该行上，选择 **运行** > **切换断点** 菜单命令，或
    - 直接点击行号左侧的边距（悬停时会显示一个淡红色圆点）。

    断点会在左侧边距中以红色圆点的形式出现：

    ![Django tutorial: a breakpoint set on the first line of the hello_there function](images/django-tutorial/debug-breakpoint-set.png)

1. 通过选择 **运行** > **开始调试** 菜单命令，或选择列表旁边的绿色 **开始调试** 箭头（`kb(workbench.action.debug.continue)`）来启动调试器：

    ![Django tutorial: start debugging/continue arrow on the debug toolbar](images/django-tutorial/debug-continue-arrow.png)

    观察状态栏颜色变化，表示正在调试：

    ![Django tutorial: appearance of the debugging status bar](images/django-tutorial/debug-status-bar.png)

    VS Code 中还会出现一个调试工具栏（如下所示），其中包含以下命令：暂停（或继续，`kb(workbench.action.debug.continue)`）、单步跳过（`kb(workbench.action.debug.stepOver)`）、单步进入（`kb(workbench.action.debug.stepInto)`）、单步跳出（`kb(workbench.action.debug.stepOut)`）、重新启动（`kb(workbench.action.debug.restart)`）和停止（`kb(workbench.action.debug.stop)`）。有关每个命令的描述，请参阅 [VS Code 调试](/docs/debugtest/debugging.md)。

    ![Django tutorial: the VS Code debug toolbar](images/shared/debug-toolbar.png)

1. 输出出现在"Python 调试控制台"终端中。打开浏览器并导航到 `http://127.0.0.1:8000/hello/VSCode`。在页面渲染之前，VS Code 会在您设置的断点处暂停程序。断点上的小黄色箭头表示这是要执行的下一行代码。

    ![Django tutorial: VS Code paused at a breakpoint](images/django-tutorial/debug-program-paused.png)

1. 使用"单步跳过"来运行 `now = datetime.now()` 语句。

1. 在 VS Code 窗口的左侧，您会看到一个 **变量** 窗格，其中显示局部变量（如 `now`）以及参数（如 `name`）。在其下方是 **监视**、**调用堆栈** 和 **断点** 窗格（详情请参阅 [VS Code 调试](/docs/debugtest/debugging.md)）。在 **局部变量** 区域，尝试展开不同的值。您也可以双击值（或使用 `kb(debug.setVariable)`）来修改它们。然而，更改像 `now` 这样的变量可能会破坏程序。开发人员通常只在代码没有产生正确值时才进行更正。

    ![Django tutorial: local variables and arguments in VS Code during debugging](images/django-tutorial/debug-local-variables.png)

1. 当程序暂停时，**调试控制台** 面板（与终端面板中的"Python 调试控制台"不同）允许您使用程序的当前状态来试验表达式和尝试代码片段。例如，在您跳过 `now = datetime.now()` 这一行之后，您可以尝试不同的日期/时间格式。在编辑器中，选中 `now.strftime("%A, %d %B, %Y at %X")` 这段代码，然后右键单击并选择 **Debug: Evaluate** 将该代码发送到调试控制台，它会运行：

    ```bash
    now.strftime("%A, %d %B, %Y at %X")
    'Friday, 07 September, 2018 at 07:46:32'
    ```

    > **提示**：**调试控制台** 还会显示应用中可能不会出现在终端里的异常。例如，如果您在 **运行和调试** 视图的 **调用堆栈** 区域看到"Paused on exception"消息，请切换到 **调试控制台** 以查看异常消息。

1. 将该行复制到调试控制台底部的 > 提示符处，并尝试更改格式：

    ```bash
    now.strftime("%A, %d %B, %Y at %X")
    'Tuesday, 13 June, 2023 at 18:03:19'
    now.strftime("%a, %d %b, %Y at %X")
    'Tue, 13 Jun, 2023 at 18:03:19'
    now.strftime("%a, %d %b, %y at %X")
    'Tue, 13 Jun, 23 at 18:03:19'
    ```

1. 如果您愿意，可以再逐步执行几行代码，然后选择"继续"（`kb(workbench.action.debug.continue)`）让程序运行。浏览器窗口会显示结果：

    ![Django tutorial: result of the modified program](images/django-tutorial/debug-run-result.png)

1. 更改代码中的行以使用不同的日期时间格式，例如 `now.strftime("%a, %d %b, %y at %X")`，然后保存文件。Django 服务器将自动重新加载，这意味着更改将应用而无需重新启动调试器。刷新浏览器页面以查看更新。

1. 完成后，关闭浏览器并停止调试器。要停止调试器，请使用停止工具栏按钮（红色方块）或 **运行** > **停止调试** 命令（`kb(workbench.action.debug.stop)`）。

> **提示**：为了更方便地重复导航到特定 URL（如 `http://127.0.0.1:8000/hello/VSCode`），可以在某个文件（如 `views.py`）中使用 `print` 语句输出该 URL。该 URL 会出现在 VS Code 终端中，您可以使用 `kbstyle(Ctrl+单击)` 在浏览器中打开它。

## 转到定义和速览定义命令

在使用 Django 或任何其他库时，您可能想要查看这些库本身的代码。VS Code 提供了两个方便的命令，可以直接导航到任何代码中类和其他对象的定义：

- **转到定义**，从您的代码跳转到定义对象的代码中。例如，在 `views.py` 中，右键单击 `home` 函数中的 `HttpResponse` 并选择 **转到定义**（或使用 `kb(editor.action.revealDefinition)`），即可导航到 Django 库中的类定义。

- **速览定义**（`kb(editor.action.peekDefinition)`，也位于右键上下文菜单中），功能类似，但直接在编辑器中显示类定义（在编辑器窗口中腾出空间以避免遮挡任何代码）。按 `kbstyle(Escape)` 关闭速览窗口，或使用右上角的 **x**。

    ![Django tutorial: Peek Definition showing the Flask class inline](images/django-tutorial/peek-definition.png)

## 使用模板渲染页面

到目前为止，您在本教程中创建的应用仅从 Python 代码生成纯文本网页。虽然可以在代码中直接生成 HTML，但开发人员避免这种做法，因为它会使应用面临[跨站脚本（XSS）攻击](https://en.wikipedia.org/wiki/Cross-site_scripting)。例如，在本教程的 `hello_there` 函数中，人们可能会想在代码中格式化输出，类似于 `content = "<h1>Hello there, " + clean_name + "!</h1>"`，其中 `content` 的结果直接提供给浏览器。这种做法允许攻击者在 URL 中放置恶意 HTML（包括 JavaScript 代码），这些代码最终会出现在 `clean_name` 中，从而在浏览器中运行。

一个更好的做法是使用**模板**将 HTML 完全排除在代码之外，这样您的代码只关注数据值，而不关注渲染。

在 Django 中，模板是一个 HTML 文件，其中包含代码在运行时提供的值的占位符。然后，Django 模板引擎负责在渲染页面时进行替换，并提供自动转义以防止 XSS 攻击（也就是说，如果您尝试在数据值中使用 HTML，您将看到 HTML 仅渲染为纯文本）。因此，代码只关注数据值，而模板只关注标记。Django 模板提供了灵活的选项，例如模板继承，它允许您定义一个包含公共标记的基础页面，然后在此基础上添加特定于页面的内容。

在本节中，您首先创建一个使用模板的单个页面。在后续章节中，您将配置应用以提供静态文件，然后为应用创建多个页面，每个页面都包含一个来自基础模板的导航栏。Django 模板还支持控制流和迭代，您将在本教程后面关于模板调试的内容中看到。

1. 在 `web_project/settings.py` 文件中，找到 `INSTALLED_APPS` 列表并添加以下条目，以确保项目知道该应用，从而能够处理模板：

    ```python
    'hello',
    ```

1. 在 `hello` 文件夹中，创建一个名为 `templates` 的文件夹，然后再创建一个名为 `hello` 的子文件夹以匹配应用名称（这种双层文件夹结构是典型的 Django 约定）。

1. 在 `templates/hello` 文件夹中，创建一个名为 `hello_there.html` 的文件，内容如下。此模板包含两个用于数据值的占位符，分别名为 "name" 和 "date"，它们由成对的花括号 `\{{` 和 `}}` 界定。所有其他不变的文本都是模板的一部分，连同格式化标记（如 `<strong>`）。如您所见，模板占位符也可以包含格式化，即管道 `|` 符号之后的表达式，在此例中使用了 Django 内置的 [date 过滤器](https://docs.djangoproject.com/en/3.1/ref/templates/builtins/#date)和 [time 过滤器](https://docs.djangoproject.com/en/3.1/ref/templates/builtins/#time)。因此，代码只需要传递日期时间*值*，而不是预格式化的字符串：

    ```html
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8" />
            <title>Hello, Django</title>
        </head>
        <body>
            <strong>Hello there, \{{ name }}!</strong> It's \{{ date | date:"l, d F, Y" }} at \{{ date | time:"H:i:s" }}
        </body>
    </html>
    ```

1. 在 `views.py` 的顶部，添加以下导入语句：

    ```python
    from django.shortcuts import render
    ```

1. 同样在 `views.py` 中，修改 `hello_there` 函数以使用 `django.shortcuts.render` 方法来加载模板并提供*模板上下文*。上下文是供模板内使用的一组变量。`render` 函数接受请求对象，然后是*相对于 `templates` 文件夹*的模板路径，最后是上下文对象。（开发人员通常将模板命名为与使用它们的函数相同的名称，但匹配名称不是必需的，因为您始终在代码中引用确切的文件名。）

    ```python
    def hello_there(request, name):
        print(request.build_absolute_uri()) #optional
        return render(
            request,
            'hello/hello_there.html',
            {
                'name': name,
                'date': datetime.now()
            }
        )
    ```

    您可以看到，代码现在更简洁了，只关注数据值，因为标记和格式化都包含在模板中。

1. 启动程序（在调试器内部或外部均可，使用 `kb(workbench.action.debug.run)`），导航到 /hello/name URL，并观察结果。

1. 同时尝试使用像 `<a%20value%20that%20could%20be%20HTML>` 这样的名称导航到 /hello/name URL，以查看 Django 的自动转义功能。在浏览器中，"name" 值显示为纯文本，而不是渲染为实际的元素。

## 提供静态文件

静态文件是您的 Web 应用为某些请求原样返回的内容片段，例如 CSS 文件。提供静态文件需要 `settings.py` 中的 `INSTALLED_APPS` 列表包含 `django.contrib.staticfiles`，这是默认包含的。

在 Django 中提供静态文件是一门艺术，尤其是在部署到生产环境时。这里展示的是一种简单的方法，适用于 Django 开发服务器以及像 Gunicorn 这样的生产服务器。然而，对静态文件的全面处理超出了本教程的范围，因此有关更多信息，请参阅 Django 文档中的[管理静态文件](https://docs.djangoproject.com/en/3.1/howto/static-files/)。

在切换到生产环境时，导航到 `settings.py`，设置 `DEBUG=False`，并更改 `ALLOWED_HOSTS = ['*']` 以允许特定主机。这在使用容器时可能会导致额外的工作。详情请参阅 [Issue 13](https://github.com/microsoft/python-sample-vscode-django-tutorial/issues/13)。

### 为静态文件准备应用

1. 在项目的 `web_project/urls.py` 中，添加以下 `import` 语句：

    ```python
    from django.contrib.staticfiles.urls import staticfiles_urlpatterns
    ```

1. 在同一文件中，在末尾添加以下行，将标准静态文件 URL 包含到项目可以识别的列表中：

    ```python
    urlpatterns += staticfiles_urlpatterns()
    ```

### 在模板中引用静态文件

1. 在 `hello` 文件夹中，创建一个名为 `static` 的文件夹。

1. 在 `static` 文件夹中，创建一个名为 `hello` 的子文件夹，与应用名称匹配。

    之所以需要这个额外的子文件夹，是因为当您将 Django 项目部署到生产服务器时，您会将所有静态文件收集到一个单独的文件夹中，然后由专用的静态文件服务器提供服务。`static/hello` 子文件夹确保在收集应用的静态文件时，它们位于应用特定的子文件夹中，不会与同一项目中其他应用的文件发生冲突。

1. 在 `static/hello` 文件夹中，创建一个名为 `site.css` 的文件，内容如下。输入此代码后，还可以观察 VS Code 为 CSS 文件提供的语法高亮，包括颜色预览。

    ```css
    .message {
        font-weight: 600;
        color: blue;
    }
    ```

1. 在 `templates/hello/hello_there.html` 中，在 `<title>` 元素之后添加以下行。`{% load static %}` 标签是一个自定义的 Django 模板标签集，它允许您使用 `{% static %}` 来引用像样式表这样的文件。

    ```html
    {% load static %}
    <link rel="stylesheet" type="text/css" href="{% static 'hello/site.css' %}" />
    ```

1. 同样在 `templates/hello/hello_there.html` 中，将 `<body>` 元素的内容替换为以下使用 `message` 样式而不是 `<strong>` 标签的标记：

    ```html
    <span class="message">Hello, there \{{ name }}!</span> It's \{{ date | date:'l, d F, Y' }} at \{{ date | time:'H:i:s' }}.
    ```

1. 运行应用，导航到 /hello/name URL，观察消息以蓝色渲染。完成后停止应用。

### 使用 collectstatic 命令

对于生产部署，您通常使用 `python manage.py collectstatic` 命令将应用中的所有静态文件收集到一个单独的文件夹中。然后您可以使用专用的静态文件服务器来提供这些文件，这通常能带来更好的整体性能。以下步骤展示了如何进行这种收集，尽管在使用 Django 开发服务器运行时您不会使用收集到的文件。

1. 在 `web_project/settings.py` 中，添加以下行，该行定义了在使用 `collectstatic` 命令时收集静态文件的位置：

    ```python
    STATIC_ROOT = BASE_DIR / 'static_collected'
    ```

1. 在终端中，运行命令 `python manage.py collectstatic`，并观察 `hello/site.css` 被复制到与 `manage.py` 并列的顶层 `static_collected` 文件夹中。

1. 在实践中，每当您更改静态文件时以及部署到生产环境之前，都要运行 `collectstatic`。

## 创建扩展基础模板的多个模板

由于大多数 Web 应用有多个页面，而且这些页面通常共享许多公共元素，开发人员将这些公共元素分离到一个基础页面模板中，其他页面模板再对其进行扩展。（这也称为模板继承，意味着扩展的页面会从基础页面继承元素。）

此外，由于您可能会创建许多扩展同一模板的页面，因此在 VS Code 中创建一个代码片段会很有帮助，您可以用它快速初始化新的页面模板。代码片段可以帮助您避免繁琐且容易出错的复制粘贴操作。

以下各节将介绍此过程的不同部分。

### 创建基础页面模板和样式

Django 中的基础页面模板包含一组页面的所有共享部分，包括对 CSS 文件、脚本文件等的引用。基础模板还定义一个或多个 **block** 标签，其中包含扩展模板预期要覆盖的内容。block 标签在基础模板和扩展模板中均由 `{% block <名称> %}` 和 `{% endblock %}` 界定。

以下步骤演示了如何创建基础模板。

1. 在 `templates/hello` 文件夹中，创建一个名为 `layout.html` 的文件，内容如下，其中包含名为 "title" 和 "content" 的块。如您所见，该标记定义了一个简单的导航栏结构，包含指向首页、关于和联系页面的链接，您将在后面的章节中创建这些页面。注意使用 Django 的 `{% url %}` 标签通过相应 URL 模式的名称而不是相对路径来引用其他页面。

    ```html
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8"/>
        <title>{% block title %}{% endblock %}</title>
        {% load static %}
        <link rel="stylesheet" type="text/css" href="{% static 'hello/site.css' %}"/>
    </head>

    <body>
    <div class="navbar">
        <a href="{% url 'home' %}" class="navbar-brand">Home</a>
        <a href="{% url 'about' %}" class="navbar-item">About</a>
        <a href="{% url 'contact' %}" class="navbar-item">Contact</a>
    </div>

    <div class="body-content">
        {% block content %}
        {% endblock %}
        <hr/>
        <footer>
            <p>&copy; 2018</p>
        </footer>
    </div>
    </body>
    </html>
    ```

1. 将以下样式添加到 `static/hello/site.css` 中现有 "message" 样式的下方，然后保存文件。（本演练不试图演示响应式设计；这些样式只是生成一个还算有趣的结果。）

    ```css
    .navbar {
        background-color: lightslategray;
        font-size: 1em;
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        color: white;
        padding: 8px 5px 8px 5px;
    }

    .navbar a {
        text-decoration: none;
        color: inherit;
    }

    .navbar-brand {
        font-size: 1.2em;
        font-weight: 600;
    }

    .navbar-item {
        font-variant: small-caps;
        margin-left: 30px;
    }

    .body-content {
        padding: 5px;
        font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    ```

此时您可以运行应用，但由于您还没有在任何地方使用基础模板，也没有更改任何代码文件，结果与上一步相同。完成其余章节以查看最终效果。

### 创建代码片段

由于您在下一节中创建的三个页面都扩展了 `layout.html`，创建一个**代码片段**来初始化带有对基础模板的适当引用的新模板文件可以节省时间。代码片段从单一来源提供一致的代码片段，避免了从现有代码复制粘贴时可能引入的错误。

1. 在 VS Code 中，选择 **文件**（Windows/Linux）或 **Code**（macOS）菜单，然后选择 **首选项** > **用户代码片段**。

1. 在出现的列表中，选择 **html**。（如果您之前创建过代码片段，该选项可能在列表的 **现有代码片段** 部分中显示为 "html.json"。）

1. VS Code 打开 `html.json` 后，在现有花括号内添加以下代码。（此处未显示的说明性注释描述了详细信息，例如 `$0` 行如何指示 VS Code 在插入代码片段后光标放置的位置）：

    ```json
    "Django Tutorial: template extending layout.html": {
        "prefix": "djextlayout",
        "body": [
            "{% extends \"hello/layout.html\" %}",
            "{% block title %}",
            "$0",
            "{% endblock %}",
            "{% block content %}",
            "{% endblock %}"
        ],

        "description": "Boilerplate template that extends layout.html"
    },
    ```

1. 保存 `html.json` 文件（`kb(workbench.action.files.save)`）。

1. 现在，每当您开始输入代码片段的前缀（如 `djext`）时，VS Code 都会将该代码片段作为自动完成选项提供，如下一节所示。您也可以使用 **插入代码片段** 命令从菜单中选择代码片段。

有关代码片段的更多一般信息，请参阅[创建代码片段](/docs/editing/userdefinedsnippets.md)。

### 使用代码片段添加页面

有了代码片段，您可以快速创建首页、关于和联系页面的模板。

1. 在 `templates/hello` 文件夹中，创建一个名为 `home.html` 的新文件，然后开始输入 `djext` 来查看代码片段作为补全选项出现：

    ![Django tutorial: autocompletion for the djextlayout code snippet](images/django-tutorial/autocomplete-for-code-snippet.png)

    当您选择该补全时，代码片段的代码会出现，光标位于代码片段的插入点：

    ![Django tutorial: insertion of the djextlayout code snippet](images/django-tutorial/code-snippet-inserted.png)

1. 在 "title" 块的插入点处，写入 `Home`，在 "content" 块中，写入 `<p>Home page for the Visual Studio Code Django tutorial.</p>`，然后保存文件。这些行是扩展页面模板的唯一独特部分：

1. 在 `templates/hello` 文件夹中，创建 `about.html`，使用代码片段插入样板标记，分别在 "title" 和 "content" 块中插入 `About us` 和 `<p>About page for the Visual Studio Code Django tutorial.</p>`，然后保存文件。

1. 重复上一步，使用 `Contact us` 和 `<p>Contact page for the Visual Studio Code Django tutorial.</p>` 创建 `templates/hello/contact.html`。

1. 在应用的 `urls.py` 中，为 /about 和 /contact 页面添加路由。请注意，`path` 函数的 `name` 参数定义了您在模板中的 `{% url %}` 标签中引用页面时使用的名称。

    ```python
    path("about/", views.about, name="about"),
    path("contact/", views.contact, name="contact"),
    ```

1. 在 `views.py` 中，为 /about 和 /contact 路由添加函数，这些函数引用它们各自的页面模板。同时修改 `home` 函数以使用 `home.html` 模板。

    ```python
    # Replace the existing home function with the one below
    def home(request):
        return render(request, "hello/home.html")

    def about(request):
        return render(request, "hello/about.html")

    def contact(request):
        return render(request, "hello/contact.html")
    ```

### 运行应用

所有页面模板就位后，保存 `views.py`，运行应用，并在浏览器中打开首页以查看结果。在各个页面之间导航，验证页面模板是否正确扩展了基础模板。

![Django tutorial: app rendering a common nav bar from the base template](images/django-tutorial/full-app.png)

## 使用数据、数据模型和迁移

许多 Web 应用使用存储在数据库中的信息，而 Django 通过 *模型* 使得表示数据库中的对象变得容易。在 Django 中，模型是一个派生自 `django.db.models.Model` 的 Python 类，它表示一个特定的数据库对象，通常是一个表。您将这些类放在应用的 `models.py` 文件中。

使用 Django，您几乎完全通过代码中定义的模型来操作数据库。然后，Django 的"迁移"会在您随时间演变模型时自动处理底层数据库的所有细节。一般工作流程如下：

1. 在您的 `models.py` 文件中更改模型。
1. 运行 `python manage.py makemigrations` 以在 `migrations` 文件夹中生成脚本，这些脚本将数据库从当前状态迁移到新状态。
1. 运行 `python manage.py migrate` 将脚本应用到实际的数据库。

迁移脚本有效地记录了您随时间对数据模型所做的所有增量更改。通过应用迁移，Django 更新数据库以匹配您的模型。由于每个增量更改都有自己的脚本，Django 可以自动将数据库的 *任何* 先前版本（包括新数据库）迁移到当前版本。因此，您只需要关注 `models.py` 中的模型，而无需关心底层数据库模式或迁移脚本。让 Django 来完成那部分工作！

在代码中，您也完全使用您的模型类来存储和检索数据；Django 处理底层细节。唯一的例外是，您可以使用 Django 管理工具 [loaddata 命令](https://docs.djangoproject.com/en/3.1/ref/django-admin/#loaddata)将数据写入数据库。此工具通常用于在 `migrate` 命令初始化模式之后初始化数据集。

当使用 `db.sqlite3` 文件时，您也可以使用像 [SQLite 浏览器](https://sqlitebrowser.org/) 这样的工具直接操作数据库。使用此类工具在表中添加或删除记录是可以的，但要避免更改数据库模式，因为这样会使数据库与应用的模型不同步。相反，应该更改模型，运行 `makemigrations`，然后运行 `migrate`。

### 数据库类型

默认情况下，Django 为应用的数据库包含一个 `db.sqlite3` 文件，适用于开发工作。如 [SQLite 使用场景](https://www.sqlite.org/whentouse.html)（sqlite.org）中所述，SQLite 适用于每日点击量少于 10 万的中低流量站点，但不建议用于更高流量。它还限于单台计算机，因此不能用于任何多服务器场景，如负载均衡和地理复制。

出于这些原因，请考虑使用生产级数据存储，如 [PostgreSQL](https://www.postgresql.org/)、[MySQL](https://www.mysql.com/) 和 [SQL Server](https://www.microsoft.com/en-ca/sql-server/)。有关 Django 对其他数据库支持的信息，请参阅[数据库设置](https://docs.djangoproject.com/en/3.1/intro/tutorial02/#database-setup)。您也可以使用 [Azure SDK for Python](https://learn.microsoft.com/azure/developer/python/sdk/azure-sdk-overview) 来处理 Azure 存储服务，如表和 Blob。

### 定义模型

Django 模型仍然是一个派生自 `django.db.model.Models` 的 Python 类，您将其放在应用的 `models.py` 文件中。在数据库中，每个模型会自动获得一个名为 `id` 的唯一 ID 字段。所有其他字段都定义为类的属性，使用来自 `django.db.models` 的类型，例如 `CharField`（有限文本）、`TextField`（无限文本）、`EmailField`、`URLField`、`IntegerField`、`DecimalField`、`BooleanField`、`DateTimeField`、`ForeignKey` 和 `ManyToMany` 等。（有关详细信息，请参阅 Django 文档中的[模型字段参考](https://docs.djangoproject.com/en/3.1/ref/models/fields/)。）

每个字段接受一些属性，如 `max_length`。`blank=True` 属性表示该字段是可选的；`null=true` 表示值是可选的。还有一个 `choices` 属性，将值限制为数据值/显示值元组数组中的值。

例如，在 `models.py` 中添加以下类，以定义一个表示简单消息日志中带日期条目的数据模型：

```python
from django.db import models
from django.utils import timezone

class LogMessage(models.Model):
    message = models.CharField(max_length=300)
    log_date = models.DateTimeField("date logged")

    def __str__(self):
        """Returns a string representation of a message."""
        date = timezone.localtime(self.log_date)
        return f"'{self.message}' logged on {date.strftime('%A, %d %B, %Y at %X')}"
```

模型类可以包含返回从其他类属性计算出的值的方法。模型通常包含一个 `__str__` 方法，用于返回实例的字符串表示。

### 迁移数据库

由于您通过编辑 `models.py` 更改了数据模型，因此需要更新数据库本身。在 VS Code 中，打开一个已激活虚拟环境的终端（使用 **Terminal: Create New Terminal** 命令，`kb(workbench.action.terminal.new)`），导航到项目文件夹，然后运行以下命令：

```bash
python manage.py makemigrations
python manage.py migrate
```

查看 `migrations` 文件夹，了解 `makemigrations` 生成的脚本。您也可以查看数据库本身，了解模式已更新。

如果在运行命令时看到错误，请确保您没有使用之前步骤中遗留的调试终端，因为它们可能没有激活虚拟环境。

### 通过模型使用数据库

模型就位且数据库迁移完成后，您可以仅使用模型来存储和检索数据。在本节中，您将向应用添加一个表单页面，通过该页面可以记录消息。然后，您将修改首页以显示这些消息。由于您将在此处修改多个代码文件，请注意细节。

1. 在 `hello` 文件夹中（即 `views.py` 所在的文件夹），创建一个名为 `forms.py` 的新文件，代码内容如下，该代码定义了一个 Django 表单，其中包含一个从数据模型 `LogMessage` 中提取的字段：

    ```python
    from django import forms
    from hello.models import LogMessage

    class LogMessageForm(forms.ModelForm):
        class Meta:
            model = LogMessage
            fields = ("message",)   # NOTE: the trailing comma is required
    ```

1. 在 `templates/hello` 文件夹中，创建一个名为 `log_message.html` 的新模板，内容如下，该模板假设向模板提供了一个名为 `form` 的变量来定义表单的主体。然后，它添加了一个标签为 "Log" 的提交按钮。

    ```html
    {% extends "hello/layout.html" %}
    {% block title %}
        Log a message
    {% endblock %}
    {% block content %}
        <form method="POST" class="log-form">
            {% csrf_token %}
            \{{ form.as_p }}
            <button type="submit" class="save btn btn-default">Log</button>
        </form>
    {% endblock %}
    ```

    > **注意**：Django 的 `{% csrf_token %}` 标签提供了跨站请求伪造保护。有关详细信息，请参阅 Django 文档中的[跨站请求伪造保护](https://docs.djangoproject.com/en/3.1/ref/csrf/)。

1. 在应用的 `static/hello/site.css` 文件中，添加一条规则以使输入表单更宽：

    ```css
    input[name=message] {
        width: 80%;
    }
    ```

1. 在应用的 `urls.py` 文件中，为新页面添加路由：

    ```python
    path("log/", views.log_message, name="log"),
    ```

1. 在 `views.py` 中，定义名为 `log_message` 的视图（由 URL 路由引用）。此视图同时处理 HTTP GET 和 POST 情况。在 GET 情况（`else:` 部分）中，它只显示您在前面步骤中定义的表单。在 POST 情况中，它从表单中检索数据到一个数据对象（`message`），设置时间戳，然后保存该对象，此时它会被写入数据库：

    ```python
    # Add these to existing imports at the top of the file:
    from django.shortcuts import redirect
    from hello.forms import LogMessageForm
    from hello.models import LogMessage

    # Add this code elsewhere in the file:
    def log_message(request):
        form = LogMessageForm(request.POST or None)

        if request.method == "POST":
            if form.is_valid():
                message = form.save(commit=False)
                message.log_date = datetime.now()
                message.save()
                return redirect("home")
        else:
            return render(request, "hello/log_message.html", {"form": form})
    ```

1. 在尝试一切之前，还有一步！在 `templates/hello/layout.html` 中，在 "navbar" div 中为消息记录页面添加一个链接：

    ```html
    <!-- Insert below the link to Home -->
    <a href="{% url 'log' %}" class="navbar-item">Log Message</a>
    ```

1. 运行应用并在浏览器中打开首页。选择导航栏上的 **Log Message** 链接，它应该显示消息记录页面：

    ![Django tutorial: the message logging page added to the app](images/django-tutorial/message-logging-page.png)

1. 输入一条消息，选择 **Log**，您应该被带回首页。首页目前还没有显示任何已记录的消息（您稍后将解决这个问题）。您也可以随意再记录几条消息。如果需要，可以使用像 SQLite 浏览器这样的工具查看数据库，以查看是否已创建记录。以只读方式打开数据库，或者记得在使用应用之前关闭数据库，否则应用会因数据库被锁定而失败。

1. 完成后停止应用。

1. 现在修改首页以显示已记录的消息。首先，将应用 `templates/hello/home.html` 文件的内容替换为以下标记。此模板期望一个名为 `message_list` 的上下文变量。如果它接收到该变量（通过 `{% if message_list %}` 标签检查），则迭代该列表（`{% for message in message_list %}` 标签）为每条消息生成表格行。否则，页面会指示尚未记录任何消息。

    ```html
    {% extends "hello/layout.html" %}
    {% block title %}
        Home
    {% endblock %}
    {% block content %}
        <h2>Logged messages</h2>

        {% if message_list %}
            <table class="message_list">
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Message</th>
                </tr>
                </thead>
                <tbody>
                {% for message in message_list %}
                    <tr>
                        <td>\{{ message.log_date | date:'d M Y' }}</td>
                        <td>\{{ message.log_date | time:'H:i:s' }}</td>
                        <td>
                            \{{ message.message }}
                        </td>
                    </tr>
                {% endfor %}
                </tbody>
            </table>
        {% else %}
            <p>No messages have been logged. Use the <a href="{% url 'log' %}">Log Message form</a>.</p>
        {% endif %}
    {% endblock %}
    ```

1. 在 `static/hello/site.css` 中，添加一条规则来稍微格式化表格：

    ```css
    .message_list th,td {
        text-align: left;
        padding-right: 15px;
    }
    ```

1. 在 `views.py` 中，导入 Django 的通用 `ListView` 类，我们将用它来实现首页：

    ```python
    from django.views.generic import ListView
    ```

1. 同样在 `views.py` 中，将 `home` 函数替换为一个名为 `HomeListView` 的*类*，该类派生自 `ListView`，将自身绑定到 `LogMessage` 模型，并实现一个函数 `get_context_data` 来生成模板的上下文。

    ```python
    # Remove the old home function if you want; it's no longer used

    class HomeListView(ListView):
        """Renders the home page, with a list of all messages."""
        model = LogMessage

        def get_context_data(self, **kwargs):
            context = super(HomeListView, self).get_context_data(**kwargs)
            return context
    ```

1. 在应用的 `urls.py` 中，导入数据模型：

    ```python
    from hello.models import LogMessage
    ```

1. 同样在 `urls.py` 中，为新视图创建一个变量，该变量按降序检索最近五个 `LogMessage` 对象（这意味着它会查询数据库），然后为模板上下文中的数据提供一个名称（`message_list`），并标识要使用的模板：

    ```python
    home_list_view = views.HomeListView.as_view(
        queryset=LogMessage.objects.order_by("-log_date")[:5],  # :5 limits the results to the five most recent
        context_object_name="message_list",
        template_name="hello/home.html",
    )
    ```

1. 在 `urls.py` 中，修改首页的路径以使用 `home_list_view` 变量：

    ```python
        # Replace the existing path for ""
        path("", home_list_view, name="home"),
    ```

1. 启动应用并在浏览器中打开首页，现在应该显示消息了：

    ![Django tutorial: app home page displaying message from the database](images/django-tutorial/app-with-message-list.png)

1. 完成后停止应用。

## 在页面模板中使用调试器

如前一节所示，页面模板可以包含过程指令，如 `{% for message in message_list %}` 和 `{% if message_list %}`，而不仅仅是像 `{% url %}` 和 `{% block %}` 这样的被动声明式元素。因此，就像处理任何其他过程代码一样，您可能会在模板中出现编程错误。

幸运的是，当您在调试配置中设置了 `"django": true` 时（您已经设置好了），VS Code 的 Python 扩展提供了模板调试功能。以下步骤演示了此功能：

1. 在 `templates/hello/home.html` 中，在 `{% if message_list %}` 和 `{% for message in message_list %}` 这两行上设置断点，如下图所示中的黄色箭头：

    ![Django tutorial: breakpoints set in a Django page template](images/django-tutorial/template-breakpoints.png)

1. 在调试器中运行应用，并在浏览器中打开首页。（如果您已经在运行调试器，则无需在设置断点后重新启动应用；只需刷新页面即可。）观察 VS Code 在模板中的 `{% if %}` 语句处中断进入调试器，并在 **变量** 窗格中显示所有上下文变量：

    ![Django tutorial: debugger stopped at breakpoints in the page template](images/django-tutorial/template-debugger.png)

1. 使用单步跳过（`kb(workbench.action.debug.stepOver)`）命令逐步执行模板代码。观察调试器跳过所有声明式语句，并在任何过程代码处暂停。例如，逐步执行 `{% for message in message_list %}` 循环可以让您检查 `message` 中的每个值，并让您逐步执行像 `<td>\{{ message.log_date | date:'d M Y' }}</td>` 这样的行。

1. 您还可以在 **调试控制台** 面板中使用变量。（但是，像 `date` 这样的 Django 过滤器目前在控制台中不可用。）

1. 准备好后，选择继续（`kb(workbench.action.debug.continue)`）以完成应用运行，并在浏览器中查看渲染的页面。完成后停止调试器。

## 可选活动

以下各节描述了您在 Python 和 Visual Studio Code 工作中可能会发现有用的额外步骤。

### 为环境创建 requirements.txt 文件

当您通过源代码管理或其他方式共享应用代码时，复制虚拟环境中的所有文件是没有意义的，因为接收者自己总是可以重新创建该环境。

因此，开发人员通常会从源代码管理中省略虚拟环境文件夹，而是使用 `requirements.txt` 文件来描述应用的依赖项。

尽管您可以手动创建该文件，但您也可以使用 `pip freeze` 命令根据已激活环境中安装的确切库来生成该文件：

1. 在使用 **Python: Select Interpreter** 命令选择了您选择的环境后，运行 **Terminal: Create New Terminal** 命令（`kb(workbench.action.terminal.new)`）以打开一个激活了该环境的终端。

1. 在终端中，运行 `pip freeze > requirements.txt` 在项目文件夹中创建 `requirements.txt` 文件。

任何接收到项目副本的人（或构建服务器）只需要运行 `pip install -r requirements.txt` 命令，即可在活动环境中重新安装应用所依赖的包。

> **注意**：`pip freeze` 会列出您在当前环境中安装的所有 Python 包，包括您当前未使用的包。该命令还会列出带有确切版本号的包，您可能希望将其转换为范围以便将来获得更大的灵活性。有关更多信息，请参阅 pip 命令文档中的[需求文件](https://pip.pypa.io/en/stable/user_guide/#requirements-files)。

### 创建超级用户并启用管理界面

默认情况下，Django 为 Web 应用提供了一个受身份验证保护的管理界面。该界面通过内置的 `django.contrib.admin` 应用实现，该项目 `INSTALLED_APPS` 列表（`settings.py`）中默认包含此项，身份验证由内置的 `django.contrib.auth` 应用处理，该应用也默认在 `INSTALLED_APPS` 中。

执行以下步骤以启用管理界面：

1. 在 VS Code 中为您的虚拟环境打开一个终端，然后运行命令 `python manage.py createsuperuser --username=<用户名> --email=<邮箱>`，当然，请将 `<用户名>` 和 `<邮箱>` 替换为您的个人信息来创建应用中的超级用户账户。当您运行该命令时，Django 会提示您输入并确认密码。

    请务必记住您的用户名和密码组合。这些是您用来对应用进行身份验证的凭据。

1. 在项目级别的 `urls.py`（本教程中为 `web_project/urls.py`）中添加以下 URL 路由，以指向内置的管理界面：

    ```python
    # This path is included by default when creating the app
     path("admin/", admin.site.urls),
    ```

1. 运行服务器，然后在浏览器中打开应用的 /admin 页面（例如，在使用开发服务器时为 `http://127.0.0.1:8000/admin`）。

1. 一个登录页面会出现，由 `django.contrib.auth` 提供。输入您的超级用户凭据。

    ![Django tutorial: default Django login prompt](images/django-tutorial/login-prompt.png)

1. 身份验证后，您将看到默认的管理页面，通过它可以管理用户和组：

    ![Django tutorial: the default Django administrative interface](images/django-tutorial/default-admin-interface.png)

您可以根据需要自定义管理界面。例如，您可以提供编辑和删除数据库中条目的功能。有关进行自定义的更多信息，请参阅 [Django 管理站点文档](https://docs.djangoproject.com/en/3.1/ref/contrib/admin/)。

### 使用 Container Tools 扩展为 Django 应用创建容器

[Container Tools 扩展](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-containers) 使得从 Visual Studio Code 构建、管理和部署容器化应用程序变得容易。如果您有兴趣了解如何为本教程中开发的 Django 应用创建 Python 容器，请查看 [Python 在容器中](/docs/containers/quickstart-python.md)教程，它将引导您完成以下操作：

- 创建一个描述简单 Python 容器的 `Dockerfile` 文件。
- 构建、运行并验证 [Django](https://www.djangoproject.com/) 应用的功能。
- 调试在容器中运行的应用。

## 后续步骤

祝贺您完成了在 Visual Studio Code 中使用 Django 的演练！

本教程的完整代码项目可在 GitHub 上找到：[python-sample-vscode-django-tutorial](https://github.com/microsoft/python-sample-vscode-django-tutorial)。

在本教程中，我们只是触及了 Django 所能做的所有事情的皮毛。请务必访问 [Django 文档](https://docs.djangoproject.com/en/3.1/)和[官方 Django 教程](https://docs.djangoproject.com/en/3.1/intro/tutorial01/)，以获取有关视图、模板、数据模型、URL 路由、管理界面、使用其他类型的数据库、部署到生产环境等方面的更多详细信息。

要在生产网站上试用您的应用，请查看教程[使用 Docker 容器将 Python 应用部署到 Azure App Service](https://learn.microsoft.com/azure/developer/python/tutorial-deploy-containers-01)。Azure 还提供了一个标准容器 [App Service on Linux](https://learn.microsoft.com/azure/developer/python/configure-python-web-app-local-environment)，您可以从 VS Code 内部将 Web 应用部署到其中。

您可能还想查看 VS Code 文档中与 Python 相关的以下文章：

- [编辑 Python 代码](/docs/python/editing.md)
- [Linting](/docs/python/linting.md)
- [管理 Python 环境](/docs/python/environments.md)
- [调试 Python](/docs/python/debugging.md)
- [测试](/docs/python/testing.md)
