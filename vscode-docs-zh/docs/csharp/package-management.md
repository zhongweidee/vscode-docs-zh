---
ContentId: 6e7d5ecf-d7aa-44b5-abc0-2257a2075906
DateApproved: 12/13/2024
MetaDescription: 在 Visual Studio Code 中使用 NuGet 进行 C# 包管理
---
# Visual Studio Code 中的 NuGet

NuGet 是 .NET 的包管理器。它定义了 .NET 包的创建、托管和使用方式，同时为各项功能提供了相应的工具。NuGet 还代表项目管理依赖关系树，因此你只需关注项目中直接使用的包。

在 Visual Studio Code 中，你可以直接通过 C# Dev Kit 解决方案资源管理器或使用命令面板来管理 NuGet 包。

* [C# Dev Kit 中的 NuGet 命令](#c-dev-kit-中的-nuget-命令)
* [依赖关系管理](#依赖关系管理)

要了解有关 NuGet 的更多信息，请访问 [NuGet 文档](https://learn.microsoft.com/nuget/what-is-nuget)。

## C# Dev Kit 中的 NuGet 命令

在 C# Dev Kit 中，你可以通过以下两种方式之一执行 NuGet 包操作：

* 使用命令面板 (`kb(workbench.action.showCommands)`)

* 在 C# Dev Kit 解决方案资源管理器中右键单击

以下部分介绍如何使用每种 NuGet 命令，涵盖了这两种方法。

### 添加包

1. 要将 NuGet 包添加到你的项目中，请在命令面板 (`kb(workbench.action.showCommands)`) 中使用 **NuGet: Add NuGet Package** 命令。

    ![Screenshot showing command 'NuGet: Add NuGet Package' in the command palette ](images/package-management/nuget-command-addpackage.png)

2. 如果你的解决方案中有多个项目，系统会要求你选择要将包添加到哪个项目。

    ![Screenshot showing quickpick menu with dropdown options "Project" and "Project2"](images/package-management/nuget-command-addackage-projectselection.png)

3. 接下来，输入搜索词以按名称搜索 NuGet 包。

    ![Screenshot showing command palette search bar with placeholder text that reads "Enter a search term to search for a NuGet package."](images/package-management/nuget-command-addpackage-search1.png)

    快速选择菜单会显示一系列可供选择的示例 NuGet 包。

    ![Screenshot showing quickpicks dropdown menu with placeholder text that reads: "Select a NuGet package". The quickpick options show a list of example NuGet packages to choose from.](images/package-management/nuget-command-addpackage-search2.png)

4. 接下来，选择你要应用的版本。

    ![Screenshot showing quickpicks dropdown menu with placeholder text that reads: "Select a NuGet package version". The quickpick options show a list of example NuGet package versions to choose from.](images/package-management/nuget-command-addpackage-versionselection.png)

5. 选择包和版本号后，C# Dev Kit 会将其添加到你的项目中，并更新项目文件和引用。

### 更新包

1. 要更新项目中的 NuGet 包，请在命令面板 (`kb(workbench.action.showCommands)`) 中使用 **NuGet: Update NuGet Package** 命令。

2. 如果你的解决方案中有多个项目，系统会要求你选择包含要更新包的项目。

3. 接下来，从当前已安装且有可用更新的包列表中选择要更新的包。如果你的解决方案中没有任何包有可用更新，你会看到一条通知消息。

4. 最后，你可以从可用版本的下拉列表中选择要将包更新到哪个版本。

    ![Screenshot showing quickpicks dropdown menu with placeholder text that reads: "Select a NuGet package version". The quickpick options show a list of example NuGet packages to choose from. There are indicators on the list to show which version is currently installed in the users project ("current"), and which is the latest available version ("latest")](images/package-management/nuget-command-update-versionselector.png)

5. C# Dev Kit 随后会执行必要的更改，并更新你的项目文件和引用。

### 移除包

1. 要从项目中移除 NuGet 包，请在命令面板 (`kb(workbench.action.showCommands)`) 中使用 **NuGet: Remove NuGet Package** 命令。

2. 如果你的解决方案中有多个项目，系统会要求你选择要从中移除包的项目。

3. 接下来，从当前已安装的包列表中选择你要移除的包。

4. C# Dev Kit 随后会执行必要的更改，并更新你的项目文件和引用。

### 包含预发布包版本

如果你想要更新或添加 NuGet 包的预发布版本，首先需要将 **Include Prerelease Package Versions** 设置为 **true**。

你可以在 **文件** > **首选项** > **设置** (`kb(workbench.action.openSettings)`) 中找到此选项，并搜索 `nuget.includePrereleasePackageVersions` 将其设置为 `true`。

## 依赖关系管理

### 自动 NuGet 包还原

对于 .NET 项目，当你从模板创建项目、生成、加载或对 SDK 风格的项目进行更改时，包还原会自动进行。你可以在输出面板中查看进度和日志。

![Automatic NuGet package restore](images/package-management/automatic-nuget-package-restore.png)

对于使用 `<PackageReference>` 的项目，你可以在 Visual Studio Code 的**解决方案资源管理器**部分查看包引用。

![Package references in the Solution Explorer](images/package-management/package-references-solution-explorer.png)

当还原过程发生或运行生成时未正确安装的包，将在**解决方案资源管理器**中显示错误图标。

**注意**：目前，你无法在项目上右键单击来管理 NuGet 包，Visual Studio Code 中也没有 NuGet 包管理器用户界面。

有关管理包的更多信息，请参阅[使用 dotnet CLI 安装和管理 NuGet 包](https://learn.microsoft.com/nuget/consume-packages/install-use-packages-dotnet-cli)。
