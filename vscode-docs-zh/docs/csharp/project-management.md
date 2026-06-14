---
ContentId: 90d72255-dbe2-402a-aecc-a6edd12aadba
DateApproved: 6/6/2023
MetaDescription: 在 Visual Studio Code 中管理 C# 项目
---
# 项目管理

当你在 Visual Studio Code 中创建 C# 应用程序时，你首先要创建一个**项目**。项目包含所有被编译为可执行文件、库或网站的文件（例如源代码、图片等）。你所有相关联的项目随后可以存储在一个称为**解决方案**的容器中。本文将向你展示如何通过**解决方案资源管理器**视图来维护你的所有项目及其相关文件。

>**注意**：在 VS Code 中使用解决方案资源管理器视图需要安装 [C# Dev Kit 扩展](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit)。

## 解决方案资源管理器

新的 C# Dev Kit 扩展在主侧边栏中包含一个新视图，即**解决方案资源管理器**。该视图以结构化的方式展示你的应用程序、其解决方案和项目，便于进行集中的项目管理。当你打开一个包含 .NET 解决方案文件或项目文件的工作区时，解决方案资源管理器将自动显示。

> **提示**：如果解决方案资源管理器部分在资源管理器窗格中不可见，你可以手动启用它。打开**资源管理器**视图，选择资源管理器标题栏中的**视图和更多操作**（`...`）按钮，然后勾选**解决方案资源管理器**以将其切换为打开状态。请注意，右键单击活动栏无法控制此特定视图。

如果工作区中只有一个解决方案文件（.sln 文件），解决方案资源管理器将检测到该文件并在工作区加载后自动加载它。例如，请查看下面的动画，其中展示了打开包含单个解决方案文件的工作区的体验。

![Open workspace with 1 solution file](images/project-management/open-workspace-1-sln-file.gif)

在上面的动画中，工作区是首次加载到 VS Code 中。工作区加载后，解决方案资源管理器检测到唯一的 `.sln` 文件并自动加载它。

当工作区中有多个解决方案文件时，系统将提示你选择要加载的特定解决方案文件。在工作区加载了某个解决方案文件后，该扩展将记住上次加载的解决方案文件，并在该工作区于 VS Code 中加载时自动重新加载该文件。在下面的动画中，你可以看到首次打开包含多个解决方案文件的工作区的体验。

![Open workspace with multiple solution files](images/project-management/open-workspace-multiple-sln-files.gif)

在上面的视频中，工作区加载后，解决方案资源管理器检测到工作区包含多个解决方案文件，并通过标准的 VS Code 通知提示你选择要加载的解决方案。此后当你打开同一个工作区时，解决方案资源管理器会记住上次加载的解决方案文件并自动重新加载它。

当你在解决方案资源管理器中加载了一个解决方案并想要关闭该解决方案时，可以使用**关闭解决方案**命令。你可以在右键单击解决方案资源管理器中的解决方案时，在上下文菜单中找到此命令。

![Close solution context menu](images/project-management/close-solution-context-menu.png)

你也可以在命令面板中调用此命令。你可以使用 `kb(workbench.action.showCommands)` 打开命令面板。如下图所示。

![Close solution from the Command Palette](images/project-management/close-solution-command-palette.png)

关闭解决方案后，解决方案资源管理器将显示一个按钮，以便你稍后可以从工作区中打开解决方案文件。你也可以在命令面板中使用 **.NET: Open Solution** 命令来调用该命令。

当你调用**打开解决方案**命令时，如果工作区中只有一个解决方案文件，它将自动加载该文件。当存在多个解决方案文件时，系统将提示你选择要加载的解决方案文件。这与你首次打开包含一个或多个解决方案文件的工作区时的体验相同。接下来我们讨论解决方案资源管理器对解决方案文件夹的支持。

## 解决方案文件夹

在解决方案资源管理器中，如果解决方案包含解决方案文件夹（用于在解决方案中对项目进行分组的虚拟文件夹），它们将会被显示出来。在这里，你可以与解决方案文件夹的内容进行交互。要添加新的解决方案文件夹，你可以右键单击解决方案并选择**新建解决方案文件夹**菜单项。请查看下面的短视频。

![C# Dev Kit new solution folder](images/project-management/csdevkit-new-sln-folder.gif)

在上面的视频中，创建了一个名为 "tests" 的新解决方案文件夹。创建解决方案文件夹后，你可以通过**添加现有项目**上下文菜单向其中添加项目。下面的动画展示了此体验。

![Add existing project](images/project-management/add-existing-project.gif)

你还可以通过**添加新文件**上下文菜单向解决方案文件夹添加新文件，如下图所示。

![Add file to solution folder](images/project-management/add-file-to-solution-folder.png)

调用此命令后，系统将提示你在命令面板中选择要使用的文件模板。下图显示了这一点。

![Add new file from Command Palette ](images/project-management/add-new-file-command-palette.png)

此列表显示了该扩展当前为解决方案文件夹支持的文件模板。要创建不使用模板的文件（创建空白文件），请选择**自定义文件（不使用模板）**。

要删除解决方案文件夹，可以使用**删除**上下文菜单选项。

![Remove Solution Folder](images/project-management/sln-folder-delete.png)

当你从解决方案中删除解决方案文件夹时，解决方案文件夹及其内容将从解决方案中移除。它所包含的文件和/或项目不会从磁盘中删除。现在我们已经讨论了解决方案文件夹，接下来看看如何在解决方案资源管理器中与项目进行更多交互。

## 使用项目

在解决方案资源管理器中，有许多功能可让你使用项目。当你首次打开解决方案时，你将看到项目和解决方案文件夹。你可以展开解决方案文件夹或项目来查看其内容。下图显示了展开了一些节点的解决方案资源管理器。

![Solution Explorer with expanded nodes](images/project-management/sln-explorer.png)

在上图中，我们可以看到解决方案资源管理器展开了一些解决方案文件夹以及 `TemplatesWeb` 项目。此版本中支持了最基本的文件嵌套，我们将扩展该支持，使其与 Visual Studio IDE 中看到的文件嵌套更加一致。

在这里，你可以通过在解决方案资源管理器中双击文件来打开它们。你还可以右键单击解决方案资源管理器中的项目以获取特定于上下文的可用操作菜单。例如，要向项目添加新文件，右键单击项目并选择**添加新文件**。选择该选项后，系统将提示你选择用于默认内容的文件模板。如果你的项目面向 .NET 7.0.200 或更高版本，你将获得最佳体验。

你还可以像在 VS Code 中通常所做的那样创建文件，并将其保存在包含项目文件的文件夹下，从而将文件添加到项目中。默认情况下，添加到项目文件夹的新文件将自动添加到项目中。

在项目视图中，你还可以看到项目所具有的依赖项，包括**项目引用**和**包引用**。在此版本的 C# Dev Kit 中，你无法修改依赖项。要向项目或包引用添加依赖项，你可以使用 `dotnet add` 命令行工具。要添加包引用，请参阅 [dotnet add package 命令 - .NET CLI](https://learn.microsoft.com/dotnet/core/tools/dotnet-add-package)；要添加项目引用，请参阅 [dotnet add reference 命令 - .NET CLI](https://learn.microsoft.com/dotnet/core/tools/dotnet-add-reference)。要删除引用，请使用 `dotnet remove`。你可以阅读更多信息，请参阅[如何删除包引用](https://learn.microsoft.com/dotnet/core/tools/dotnet-remove-reference)和[如何删除包](https://learn.microsoft.com/dotnet/core/tools/dotnet-remove-package)。

如果你想查看或编辑项目文件，请在解决方案资源管理器中选择项目节点，项目文件将在编辑器中打开。这与你在解决方案资源管理器中选择文件时的行为相同。

使用解决方案资源管理器，你还可以通过上下文菜单执行常见操作，例如**生成**、**重新生成**和**清理**。当你在解决方案资源管理器中选中了解决方案节点或项目节点时，你将看到这些上下文菜单。这将对所选项及其依赖项执行生成/重新生成/清理操作。
