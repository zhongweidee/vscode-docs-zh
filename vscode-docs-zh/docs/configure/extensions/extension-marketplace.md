---
ContentId: 319916C4-93F2-471F-B448-FD416736C40C
DateApproved: 02/04/2026
MetaDescription: 通过扩展市场发现、添加、更新、禁用和卸载 Visual Studio Code 扩展（插件）。
---
# 扩展市场

Visual Studio Code 开箱即用的功能仅仅是个开始。VS Code 扩展允许你向安装中添加语言、调试器和工具，以支持你的开发工作流。VS Code 丰富的可扩展性模型允许扩展作者直接接入 VS Code 用户界面，并通过 VS Code 使用的相同 API 贡献功能。本文将介绍如何从 [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/VSCode) 查找、安装和管理 VS Code 扩展。

## 浏览扩展

你可以在 VS Code 内部浏览和安装扩展。通过单击 VS Code 侧边**活动栏**上的扩展图标或使用**视图：扩展**命令（`kb(workbench.view.extensions)`）打开扩展视图。

![扩展视图图标](images/extension-marketplace/extensions-view-icon.png)

这将显示 [VS Code Marketplace](https://marketplace.visualstudio.com/VSCode) 上最受欢迎的 VS Code 扩展列表。

![热门扩展](images/extension-marketplace/extensions-popular.png)

列表中的每个扩展都包含简要说明、发布者、下载次数和五星评级。你可以选择扩展项以显示扩展详情页面，在那里了解更多信息。

> [!NOTE]
> 如果你的计算机通过代理服务器访问互联网，则需要配置代理服务器。有关详细信息，请参阅[代理服务器支持](/docs/setup/network.md#proxy-server-support)。

## 安装扩展

要安装扩展，请选择**安装**按钮。安装完成后，**安装**按钮将变为**管理**齿轮按钮。

> [!IMPORTANT]
> 扩展具有与 VS Code 本身相同的权限。从 VS Code 1.97 版本开始，当你首次安装来自第三方发布者的扩展时，VS Code 会显示一个对话框，提示你确认是否信任该扩展发布者。获取有关[扩展运行时安全性](/docs/configure/extensions/extension-runtime-security.md)以及如何保护自己免受恶意扩展侵害的更多信息。

如果你想安装扩展的特定版本，右键单击扩展并选择**安装其他版本**。然后你可以从可用版本列表中选择一个版本。

当[设置同步](/docs/configure/settings-sync.md)启用时，你可以在多台计算机之间共享你的 VS Code 配置（如扩展）。要安装扩展但不在各计算机之间同步，请右键单击扩展并选择**安装（不同步）**。

### 查找并安装扩展

例如，让我们安装流行的 [TODO Highlight](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight) 扩展。此扩展会高亮显示源代码中的 'TODO:' 和 'FIXME:' 等文本，以便你快速找到未完成的部分。

![TODO Highlight 扩展在编辑器中的高亮显示](images/extension-marketplace/todo-highlighting.png)

在扩展视图（`kb(workbench.view.extensions)`）中，在搜索框中输入 'todo'，将市场产品筛选为标题或元数据中包含 'todo' 的扩展。你应该会在列表中看到 **TODO Highlight** 扩展。

![在扩展视图中搜索 todo](images/extension-marketplace/search-for-todo-extension.png)

每个扩展由其发布者和扩展 ID 唯一标识。如果选择 **TODO Highlight** 扩展，你将看到扩展详情页面，在那里可以找到扩展 ID，在本例中为 `wayou.vscode-todo-highlight`。如果有多个名称相似的扩展，了解扩展 ID 会很有帮助。

![TODO Highlight 扩展详情，扩展 ID 高亮显示](images/extension-marketplace/todo-highlight-details.png)

选择**安装**按钮，VS Code 将从市场下载并安装该扩展。安装完成后，**安装**按钮将被**管理**齿轮按钮替代。

![管理齿轮按钮](images/extension-marketplace/manage-button.png)

要查看 TODO Highlight 扩展的实际效果，打开任何源代码文件，添加文本 'TODO:'，你将看到该文本被高亮显示。

TODO Highlight 扩展贡献了 **TODO-Highlight: 列出高亮注释**和 **TODO-Highlight: 切换高亮**两个命令，你可以在命令面板（`kb(workbench.action.showCommands)`）中找到它们。**TODO-Highlight: 切换高亮**命令让你可以快速禁用或启用高亮。

![命令面板中的 TODO Highlight 命令](images/extension-marketplace/todo-highlight-commands.png)

该扩展还提供了用于调整其行为的设置，你可以在设置编辑器（`kb(workbench.action.openSettings)`）中找到它们。例如，你可能希望文本搜索不区分大小写，那么你可以取消选中 **Todohighlight: Is Case Sensitive** 设置。

![设置编辑器中的 TODO Highlight 设置](images/extension-marketplace/todo-highlight-settings.png)

如果扩展未提供你所需的功能，你可以随时从**管理**按钮上下文菜单中**卸载**该扩展。

![卸载 TODO Highlight 扩展](images/extension-marketplace/todo-highlight-uninstall.png)

这只是如何安装和使用扩展的一个示例。VS Code Marketplace 拥有数千个扩展，支持数百种编程语言和任务。从对 [Java](https://marketplace.visualstudio.com/items?itemName=redhat.java)、[Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python)、[Go](https://marketplace.visualstudio.com/items?itemName=golang.Go) 和 [C++](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools) 的全面语言支持，到[创建 GUID](https://marketplace.visualstudio.com/items?itemName=nwallace.createGUID)、更改[颜色主题](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)或向编辑器添加[虚拟宠物](https://marketplace.visualstudio.com/items?itemName=tonybaloney.vscode-pets)的简单扩展，应有尽有。

### 扩展详情

在扩展详情页面上，你可以阅读扩展的 README 并查看扩展的以下内容：

* **功能贡献** - 扩展对 VS Code 的添加，例如设置、命令和键盘快捷键、语言语法、调试器等。
* **更新日志** - 扩展仓库的 CHANGELOG（如果可用）。
* **依赖项** - 列出扩展是否依赖于任何其他扩展。

![扩展贡献](images/extension-marketplace/extension-contributions.png)

如果扩展是一个扩展包，**扩展包**部分将显示安装该包时将安装哪些扩展。[扩展包](/api/references/extension-manifest.md#extension-packs)将多个独立扩展捆绑在一起，以便可以一次性轻松安装。

![Azure Tools 扩展包](images/extension-marketplace/extension-pack.png)

### 扩展视图筛选和命令

你可以使用**筛选扩展**上下文菜单来筛选扩展视图。

![扩展视图筛选上下文菜单](images/extension-marketplace/extensions-view-filter-menu.png)

有以下筛选器可供显示：

* 可以更新的已过期扩展列表
* 当前已启用/已禁用的扩展列表
* 基于你的工作区的推荐扩展列表
* 全球热门扩展列表

你可以按**安装次数**、**评分**、**名称**、**发布日期**或**更新日期**以升序或降序对扩展列表进行排序。你可以在[下文](#扩展视图筛选器)了解更多关于扩展搜索筛选器的信息。

你可以通过 `...` **查看和更多操作**按钮运行其他扩展视图命令。

![更多按钮](images/extension-marketplace/more-button.png)

通过此上下文菜单，你可以控制扩展更新、启用或禁用所有扩展，并使用[扩展二分查找](https://code.visualstudio.com/blogs/2021/02/16/extension-bisect)工具来隔离有问题的扩展行为。

### 搜索扩展

你可以清除扩展视图顶部的搜索框，然后输入你要查找的扩展、工具或编程语言的名称。

例如，输入 'python' 将显示 Python 语言扩展列表：

![Python 扩展](images/extension-marketplace/extensions-python.png)

如果你知道要查找的扩展的确切标识符，可以使用 `@id:` 前缀，例如 `@id:vue.volar`。此外，要筛选或排序结果，你可以使用下文详述的[筛选器](#扩展视图筛选器)和[排序](#排序)命令。

### 安装预发布版本扩展

扩展发布者可能提供扩展的预发布版本。要安装预发布版本，请选择**安装**按钮上的下拉菜单，然后选择**安装预发布版本**。

![安装预发布版本](images/extension-marketplace/extensions-install-prerelease.png)

## 管理扩展

VS Code 使管理扩展变得简单。你可以通过扩展视图、**命令面板**（命令带有 **Extensions:** 前缀）或命令行开关来安装、禁用、更新和卸载扩展。

### 列出已安装的扩展

默认情况下，扩展视图将显示你当前已安装的扩展以及所有为你推荐的扩展。你可以使用**命令面板**（`kb(workbench.action.showCommands)`）或**更多操作**（`...`）下拉菜单 > **视图** > **已安装**中的**扩展：聚焦到已安装视图**命令，清除搜索框中的任何文本并显示所有已安装扩展的列表，包括那些已被禁用的扩展。

### 卸载扩展

要卸载扩展，请选择扩展条目右侧的**管理**齿轮按钮，然后从下拉菜单中选择**卸载**。这将卸载扩展并提示你重新启动扩展宿主（**重启扩展**）。

![卸载扩展](images/extension-marketplace/uninstall-extension.png)

### 禁用扩展

如果你不想永久删除扩展，可以单击扩展条目右侧的齿轮按钮来临时禁用扩展。你可以全局禁用扩展，也可以仅为当前工作区禁用扩展。禁用扩展后，系统会提示你重新启动扩展宿主（**重启扩展**）。

如果你想快速禁用所有已安装的扩展，**命令面板**和**更多操作**（`...`）下拉菜单中有一个**禁用所有已安装的扩展**命令。

扩展在所有 VS Code 会话中将保持禁用状态，直到你重新启用它们。

### 启用扩展

同样，如果你已禁用了某个扩展（它会出现在列表的**已禁用**部分并标记为***已禁用***），你可以通过下拉菜单中的**启用**或**启用（工作区）**命令重新启用它。

![启用扩展](images/extension-marketplace/enable-extension.png)

**更多操作**（`...`）下拉菜单中还有一个**启用所有扩展**命令。

### 扩展自动更新

VS Code 检查扩展更新并自动安装它们。更新后，系统会提示你重新启动扩展宿主（**重启扩展**）。

如果你更愿意手动更新扩展，可以使用**禁用所有扩展的自动更新**命令或扩展视图中相应的操作来禁用自动更新。你也可以配置 `setting(extensions.autoUpdate)` [设置](/docs/configure/settings.md)。使用**启用所有扩展的自动更新**命令重新启用自动更新。

![禁用所有扩展的自动更新操作](images/extension-marketplace/disable-auto-update-all-extensions.png)

你还可以通过右键单击扩展并切换**自动更新**项来为单个扩展配置自动更新。

如果你不希望 VS Code 甚至检查更新，可以将 `setting(extensions.autoCheckUpdates)` 设置设为 false。

### 手动更新扩展

如果你禁用了扩展自动更新，可以使用使用了 `@updates` 筛选器的**显示过期的扩展**命令快速查找扩展更新。这将显示你当前已安装扩展的任何可用更新。

选择过期扩展的**更新**按钮。更新将被安装，系统会提示你重新启动扩展宿主（**重启扩展**）。你还可以使用**更新所有扩展**命令一次性更新所有过期的扩展。

如果你也禁用了自动检查更新，可以使用**检查扩展更新**命令来检查哪些扩展可以更新。

## 推荐的扩展

你可以使用**显示推荐的扩展**来查看推荐扩展列表，这会设置 `@recommended` [筛选器](#扩展视图筛选器)。扩展推荐可以是：

* **工作区推荐** - 由你当前工作区的其他用户推荐。
* **其他推荐** - 基于最近打开的文件推荐。

请参阅下面的章节，了解如何为项目中的其他用户[贡献](#工作区推荐的扩展)推荐。

### 忽略推荐

要忽略某个推荐，请选择扩展项以打开详情页面，然后选择**管理**齿轮按钮显示上下文菜单。选择**忽略推荐**菜单项。被忽略的推荐将不再向你推荐。

![忽略扩展推荐](images/extension-marketplace/ignore-recommendation.png)

## 配置扩展

VS Code 扩展可能具有非常不同的配置和要求。一些扩展向 VS Code 贡献[设置](/docs/configure/settings.md)，可以在设置编辑器中进行修改。其他扩展可能有自己的配置文件。扩展还可能需要安装和设置额外的组件，如编译器、调试器和命令行工具。请查阅扩展的 README（在扩展视图详情页面中可见）或前往 [VS Code Marketplace](https://marketplace.visualstudio.com/VSCode) 上的扩展页面（在详情页面中单击扩展名称）。许多扩展是开源的，并在其 Marketplace 页面上提供了指向其仓库的链接。

## 命令行扩展管理

为了更轻松地自动化和配置 VS Code，你可以从[命令行](/docs/configure/command-line.md)列出、安装和卸载扩展。在标识扩展时，请提供 `publisher.extension` 形式的完整名称，例如 `ms-python.python`。

示例：

```bash
code --extensions-dir <dir>
    设置扩展的根路径。
code --list-extensions
    列出已安装的扩展。
code --show-versions
    使用 --list-extension 时显示已安装扩展的版本。
code --install-extension (<extension-id> | <extension-vsix-path>)
    安装一个扩展。
code --uninstall-extension (<extension-id>)
    卸载一个扩展。
code --enable-proposed-api (<extension-id>)
    为扩展启用建议的 API 功能。可以接收一个或多个扩展 ID 以单独启用。
```

你可以在扩展详情页面的 Marketplace 信息下查看扩展 ID。

![扩展标识符](images/extension-marketplace/extension-identifier.png)

## 扩展视图筛选器

扩展视图搜索框支持筛选器，以帮助你查找和管理扩展。如果你使用了**显示已安装的扩展**和**显示推荐的扩展**命令，你可能已经看到过 `@installed` 和 `@recommended` 等筛选器。此外，还有筛选器允许你按受欢迎程度或评分排序，以及按类别（例如 'Linters'）和标签（例如 'node'）搜索。你可以在扩展搜索框中输入 `@` 并浏览建议，查看所有筛选器和排序命令的完整列表：

![扩展搜索筛选器的智能感知](images/extension-marketplace/extension-search-filters.png)

以下是一些扩展视图筛选器：

* `@builtin` - 显示 VS Code 自带的扩展。按类型分组（编程语言、主题等）。
* `@deprecated` - 显示已弃用的扩展。
* `@disabled` - 显示已禁用的已安装扩展。
* `@enabled` - 显示已启用的已安装扩展。扩展可以单独启用/禁用。
* `@featured` - 显示精选扩展。
* `@installed` - 显示已安装的扩展。
* `@popular` - 显示热门扩展。
* `@recentlyPublished` - 显示最近在市场中发布的扩展。
* `@recommended` - 显示推荐的扩展。按工作区特定或通用用途分组。
* `@updates` - 显示已过期的已安装扩展。市场中提供了更新版本。
* `@workspaceUnsupported` - 显示此工作区不支持的扩展。
* `@category` - 显示属于指定类别的扩展。以下是部分支持的类别。要查看完整列表，请输入 `@category` 并按照建议列表中的选项操作：
  * `@category:themes`
  * `@category:formatters`
  * `@category:linters`
  * `@category:snippets`

这些筛选器也可以组合使用。例如：使用 `@installed @category:themes` 查看所有已安装的主题。

如果未提供筛选器，扩展视图将显示当前已安装和推荐的扩展。

### 排序

你可以使用 `@sort` 筛选器对扩展进行排序，该筛选器可以取以下值：

* `installs` - 按市场安装次数降序排序。
* `name` - 按扩展名称字母顺序排序。
* `publishedDate` - 按扩展发布日期排序。
* `rating` - 按市场评分（1-5 星）降序排序。
* `updateDate` - 按扩展最后更新名称排序。

![按安装次数排序](images/extension-marketplace/sort-install-count.png)

### 类别和标签

扩展可以设置描述其功能的**类别**和**标签**。

![扩展类别和标签](images/extension-marketplace/categories-and-tags.png)

你可以使用 `category:` 和 `tag:` 按类别和标签进行筛选。

支持的类别有：`[Azure, Data Science, Debuggers, Education, Extension Packs, Formatters, Keymaps, Language Packs, Linters, Machine Learning, Notebooks, Others, Programming Languages, SCM Providers, Snippets, Testing, Themes, Visualization]`。可以通过扩展搜索框中的 IntelliSense 访问它们：

![调试器类别](images/extension-marketplace/extension-search-categories.png)

请注意，如果类别名称超过一个单词，你必须用引号将其括起来（例如 `category:"SCM Providers"`）。

标签可以包含任何字符串，并且不由 IntelliSense 提供，因此请查看市场以找到有用的标签。

## 从 VSIX 安装

你可以手动安装打包在 `.vsix` 文件中的 VS Code 扩展。使用扩展视图命令下拉菜单中的**从 VSIX 安装**命令，或**命令面板**中的**扩展：从 VSIX 安装**命令，指向 `.vsix` 文件。

你也可以使用 VS Code 的 `--install-extension` 命令行开关，提供 `.vsix` 文件的路径进行安装。

```bash
code --install-extension myextension.vsix
```

你可以在命令行中多次提供 `--install-extension` 以一次安装多个扩展。

> [!NOTE]
> 当你通过 VSIX 安装扩展时，该扩展的[自动更新](#扩展自动更新)默认处于禁用状态。

如果你想了解更多关于打包和发布扩展的信息，请参阅扩展 API 中的[发布扩展](/api/working-with-extensions/publishing-extension.md)文章。

## 工作区推荐的扩展

一套好的扩展可以让特定工作区或编程语言的工作更加高效，你通常希望与你的团队或同事分享这个列表。你可以使用**扩展：配置推荐的扩展（工作区文件夹）**命令为工作区创建推荐的扩展列表。

在单文件夹工作区中，该命令会在工作区的 `.vscode` 文件夹中创建一个 `extensions.json` 文件，你可以在其中添加扩展标识符列表（{publisherName}.{extensionName}）。

在[多根工作区](/docs/editing/workspaces/multi-root-workspaces.md)中，该命令将打开你的 `.code-workspace` 文件，你可以在 `extensions.recommendations` 下列出扩展。你仍然可以使用**扩展：配置推荐的扩展（工作区文件夹）**命令向多根工作区中的各个文件夹添加扩展推荐。

一个 `extensions.json` 示例如下：

```json
{
    "recommendations": [
        "dbaeumer.vscode-eslint",
        "esbenp.prettier-vscode"
    ]
}
```

它推荐了一个代码检查扩展和一个代码格式化扩展。

扩展使用其发布者标识符和扩展标识符 `publisher.extension` 来标识。你可以在扩展的详情页面上查看名称。VS Code 将在这些文件中为你提供已安装扩展的自动补全。

![扩展标识符](images/extension-marketplace/extension-identifier.png)。

当工作区首次打开时，VS Code 会提示用户安装推荐的扩展。用户也可以使用**扩展：显示推荐的扩展**命令查看该列表。

![显示推荐](images/extension-marketplace/recommendations.png)

## 后续步骤

以下是你可能感兴趣的一些主题……

* [扩展 API](/api) - 开始学习 VS Code 扩展 API。
* [你的第一个扩展](/api/get-started/your-first-extension.md) - 尝试创建一个简单的 Hello World 扩展。
* [发布到市场](/api/working-with-extensions/publishing-extension.md) - 将你自己的扩展发布到 VS Code Marketplace。

## 常见问题

### 扩展安装在哪里？

扩展安装在每个用户的扩展文件夹中。根据你的平台，位置位于以下文件夹：

* **Windows** `%USERPROFILE%\.vscode\extensions`
* **macOS** `~/.vscode/extensions`
* **Linux** `~/.vscode/extensions`

你可以通过使用 `--extensions-dir <dir>` 命令行[选项](/docs/configure/command-line.md)启动 VS Code 来更改此位置。

或者，你可以将 `VSCODE_EXTENSIONS` 环境变量设置为你想要安装扩展的位置。这在企业环境中非常有用，因为你希望集中管理用户计算机上安装扩展的位置。

### 每当我尝试安装任何扩展时，都会收到 connect ETIMEDOUT 错误

如果你的计算机通过代理服务器访问互联网，你可能会看到此错误。有关详细信息，请参阅设置主题中的[代理服务器支持](/docs/setup/network.md#proxy-server-support)部分。

### 我可以直接从市场下载扩展吗？

一些用户更喜欢从市场一次下载扩展，然后从本地共享将其安装到多个 VS Code 实例。这在存在连接问题或你的开发团队希望使用一组固定扩展时非常有用。

要下载扩展，请在扩展视图中搜索它，右键单击结果中的扩展，然后选择**下载 VSIX** 或**下载特定版本的 VSIX**。

### 我可以阻止 VS Code 提供扩展推荐吗？

可以，如果你不希望 VS Code 在扩展视图或通过通知显示扩展推荐，你可以修改以下设置：

* `setting(extensions.showRecommendationsOnlyOnDemand)` - 设为 true 以移除**推荐**部分。
* `setting(extensions.ignoreRecommendations)` - 设为 true 以静默扩展推荐通知。

如果你想查看推荐，**显示推荐的扩展**命令始终可用。

### 我可以信任市场中的扩展吗？

Visual Studio Marketplace 采取了多种措施来保护你免受恶意扩展的侵害，你也可以在安装前执行各种步骤来确定扩展是否可靠。

从 VS Code 1.97 版本开始，当你首次安装来自第三方发布者的扩展时，VS Code 会显示一个对话框，提示你确认是否信任该扩展发布者。

获取有关[扩展运行时安全性](/docs/configure/extensions/extension-runtime-security.md)的更多信息。

### 我可以为我的组织内部托管扩展吗？

可以，请参阅[扩展的私有市场](/docs/enterprise/extensions.md#host-a-private-extension-marketplace)。

### VS Code 无法验证扩展签名

Visual Studio Marketplace 在发布扩展时会对所有扩展进行签名。VS Code 在你安装扩展时会验证此签名，以检查扩展包的完整性和来源。

> [!IMPORTANT]
> 安装扩展时，你可能会看到以下错误消息：`Cannot install extension because Visual Studio Code cannot verify the extension signature`。此错误可能由多种原因引起，如果你遇到此错误，请在决定继续安装之前谨慎行事。使用 `setting(extensions.verifySignature)` 设置禁用扩展签名验证。

#### 包完整性问题

对于包完整性问题，建议你联系 [Visual Studio Marketplace 团队](mailto:vsmarketplace@microsoft.com?subject=Extension%20Signature%20Verification%20Issue)报告问题。请务必包含扩展 ID。以下列表提供了与包完整性问题相关的错误代码：

```text
PackageIntegrityCheckFailed
SignatureIsInvalid
SignatureManifestIsInvalid
SignatureIntegrityCheckFailed
EntryIsMissing
EntryIsTampered
Untrusted
CertificateRevoked
SignatureIsNotValid
SignatureArchiveHasTooManyEntries
NotSigned
```

#### 其他问题

对于其他问题，如不受支持的环境或未知原因，建议你向 VS Code [报告问题](https://github.com/microsoft/vscode/issues/new)，提供所有必要信息并包含共享日志：`kb(workbench.action.showCommands)` > **打开视图……** > **共享**。

### 连接到远程窗口时我的扩展无法同步

[设置同步](/docs/configure/settings-sync.md)允许你在多台计算机之间共享你的 Visual Studio Code 配置，如设置、键盘快捷键和已安装的扩展，这样你始终可以使用你喜欢的设置进行工作。

当你连接到[远程](/docs/remote/remote-overview.md)窗口（例如连接到 SSH、开发容器（devcontainer）或 WSL）时，VS Code 不会将你的扩展同步到远程窗口或从远程窗口同步扩展。

### 我可以允许或阻止组织中的特定扩展吗？

你可以通过配置 `extensions.allowed` 应用程序设置来控制可以在组织中安装哪些扩展。如果未配置该设置，则允许所有扩展。如果配置了该设置，则未列出的所有扩展都将被阻止安装。

获取有关[配置允许的扩展](/docs/enterprise/extensions.md#configure-allowed-extensions)的更多详细信息。
