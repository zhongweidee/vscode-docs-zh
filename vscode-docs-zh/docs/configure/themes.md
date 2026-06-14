---
ContentId: CAC88BC7-90A5-4384-8A05-2187117C0F72
DateApproved: 02/04/2026
MetaDescription: 更改 Visual Studio Code 中的颜色主题。你可以使用 VS Code 提供的颜色主题、社区提供的颜色主题，或者创建自己的新主题。
---
# 主题

## 颜色主题

颜色主题使你能够修改 Visual Studio Code 用户界面中的颜色，以符合你的偏好和工作环境。颜色主题会影响 VS Code 用户界面元素和编辑器的高亮颜色。

![从命令面板预览主题](images/themes/themes_hero.gif)

要选择不同的颜色主题：

1. 选择 **文件** > **首选项** > **主题** > **颜色主题** 菜单项，或使用 **首选项: 颜色主题** 命令（`kb(workbench.action.selectTheme)`）来显示颜色主题选择器。

1. 使用 `kbstyle(Up)` 和 `kbstyle(Down)` 键浏览列表并预览主题的颜色。

1. 选择你想要的主题，然后按 `kbstyle(Enter)`。

当前活动的颜色主题存储在你的用户[设置](/docs/configure/settings.md)中（键盘快捷键 `kb(workbench.action.openSettings)`）。

```json
  // 指定工作台中使用的颜色主题。
  "workbench.colorTheme": "Solarized Dark"
```

> [!TIP]
> 默认情况下，主题存储在你的用户设置中，并全局应用于所有工作区。你也可以配置特定于工作区的主题。为此，请在工作区[设置](/docs/configure/settings.md#workspace-settings)中设置一个主题。
>
> ![设置编辑器截图，展示如何设置特定于工作区的颜色主题。](images/themes/workspace-color-theme.png)

## 来自 Marketplace 的颜色主题

VS Code 中有多个开箱即用的颜色主题可供你试用。社区还将许多更多的主题上传到了 VS Code [扩展市场](/docs/configure/extensions/extension-marketplace.md)。

你可以直接从颜色主题选择器中通过选择 **浏览其他颜色主题...** 来从 VS Code Marketplace 选择颜色主题。

![颜色主题选择器截图，突出显示从 VS Code Marketplace 浏览主题的选项。](images/themes/additional-color-themes.png)

或者，你也可以在扩展视图（`kb(workbench.view.extensions)`）搜索框中使用 `@category:"themes"` 过滤器来搜索主题。

![在扩展视图中搜索主题](images/themes/category-themes.png)

## 根据操作系统颜色方案自动切换

Windows 和 macOS 支持浅色和深色颜色方案。有一个设置 `setting(window.autoDetectColorScheme)`，它指示 VS Code 监听操作系统颜色方案的变化，并相应地切换到匹配的主题。

同样，你可以使用 `setting(window.autoDetectHighContrast)` 设置来自动检测操作系统是否切换到了高对比度颜色方案。

要自定义在颜色方案更改时使用的主题，你可以在设置编辑器中设置偏好的浅色、深色和高对比度主题：

* **工作台: 偏好深色颜色主题** - 默认为 Dark Modern
* **工作台: 偏好浅色颜色主题** - 默认为 Light Modern
* **工作台: 偏好高对比度颜色主题** - 默认为 Dark High Contrast
* **工作台: 偏好高对比度浅色颜色主题** - 默认为 Light High Contrast

![设置编辑器筛选偏好颜色主题设置](images/themes/preferred-color-themes.png)

## 自定义颜色主题

### 工作台颜色

你可以使用 `setting(workbench.colorCustomizations)` 和 `setting(editor.tokenColorCustomizations)` 用户[设置](/docs/configure/settings.md)来自定义当前活动的颜色主题。

要设置 VS Code UI 元素（如列表和树（文件资源管理器、建议小组件）、差异编辑器、活动栏、通知、滚动条、拆分视图、按钮等）的颜色，请使用 `setting(workbench.colorCustomizations)`。

![活动栏主题定制](images/themes/theme-activitybar.gif)

你可以在设置 `setting(workbench.colorCustomizations)` 值时使用 IntelliSense，或者查看[主题颜色参考](/api/references/theme-color.md)以获取所有可自定义颜色的列表。

要对特定主题进行自定义，请使用以下语法：

```json
"workbench.colorCustomizations": {
    "[Monokai]": {
        "sideBar.background": "#347890"
    }
}
```

如果某个自定义设置适用于多个主题，你可以命名多个主题，或在名称的开头和结尾使用 `*` 作为通配符：

```json
"workbench.colorCustomizations": {
    "[Abyss][Red]": {
        "activityBar.background": "#ff0000"
    },
    "[Monokai*]": {
        "activityBar.background": "#ff0000"
    }
}
```

如果主题设置了你不喜欢的颜色或边框，你可以使用 `default` 将其恢复为原始值：

```json
  "workbench.colorCustomizations": {
      "diffEditor.removedTextBorder": "default"
  }
```

### 编辑器语法高亮

要调整编辑器的语法高亮颜色，请在用户[设置](/docs/configure/settings.md)的 `settings.json` 文件中使用 `setting(editor.tokenColorCustomizations)`：

![标记颜色自定义](images/themes/token_color_customization.png)

一组预配置的语法标记（'comments'、'strings' 等）可用于最常见的结构。如果你想要更多，可以通过直接指定 TextMate 主题颜色规则来实现：

![高级标记颜色自定义](images/themes/token_color_customization_advanced.png)

> [!NOTE]
> 直接配置 TextMate 规则是一项高级技能，因为你需要了解 TextMate 语法的工作原理。请参阅[颜色主题指南](/api/extension-guides/color-theme.md)了解更多信息。

要自定义特定主题，你可以通过以下方式之一进行操作：

```json
"editor.tokenColorCustomizations": {
    "[Monokai]": {
        "comments": "#229977"
    },
    "[*Dark*]": {
        "variables": "#229977"
    },
    "[Abyss][Red]": {
        "keywords": "#f00"
    }
}
```

### 编辑器语义高亮

某些语言（目前：TypeScript、JavaScript、Java）提供语义标记。语义标记基于语言服务的符号理解，比来自 TextMate 语法（由正则表达式驱动）的语法标记更准确。从语义标记计算出的语义高亮在语法高亮之上运行，可以纠正和丰富高亮显示，如以下示例所示：

没有语义高亮的 "Tomorrow Night Blue" 颜色主题：

![没有语义高亮](images/themes/no-semantic-highlighting.png)

具有语义高亮的 "Tomorrow Night Blue" 颜色主题：

![具有语义高亮](images/themes/with-semantic-highlighting.png)

注意基于语言服务符号理解的颜色差异：

* 第 10 行：`languageModes` 被着色为参数。
* 第 11 行：`Range` 和 `Position` 被着色为类，`document` 被着色为参数。
* 第 13 行：`getFoldingRanges` 被着色为函数。

设置 `setting(editor.semanticHighlighting.enabled)` 是语义高亮是否应用的主要控制开关。它可以有值 `true`、`false` 和 `configuredByTheme`。

* `true` 和 `false` 为所有主题打开或关闭语义高亮。
* `configuredByTheme` 是默认值，允许每个主题控制是否启用语义高亮。所有随 VS Code 提供的主题（例如默认的 "Dark+"）都默认启用了语义高亮。

你可以通过以下方式覆盖主题设置：

```json
"editor.semanticTokenColorCustomizations": {
    "[Rouge]": {
        "enabled": true
    }
}
```

当语义高亮已启用并且可用于某种语言时，由主题来配置是否以及如何对语义标记进行着色。一些语义标记是标准化的，并映射到已建立的 TextMate 作用域。如果主题对这些 TextMate 作用域有着色规则，则语义标记将使用该颜色呈现，无需任何额外的着色规则。

可以在 `"editor.semanticTokenColorCustomizations"` 中配置其他样式规则：

```json
"editor.semanticTokenColorCustomizations": {
    "[Rouge]": {
        "enabled": true,
        "rules": {
            "*.declaration": { "bold": true }
        }
    }
}
```

要查看计算了哪些语义标记以及它们是如何设置样式的，你可以使用作用域检查器（**开发人员: 检查编辑器标记和作用域**），它会显示当前光标位置文本的信息。

![作用域检查器](images/themes/semantic-highlighting-scope-inspector.png)

如果语义标记在给定位置可用于该语言并且已被主题启用，则检查工具会显示一个 **语义标记类型** 部分。该部分显示语义标记信息（类型和任意数量的修饰符）以及应用的样式规则。

有关语义标记和样式规则语法的更多信息，请参阅[语义高亮指南](/api/language-extensions/semantic-highlight-guide.md)。

## 创建你自己的颜色主题

创建和发布主题扩展很容易。在你的用户设置中自定义颜色，然后使用 **开发人员: 根据当前设置生成颜色主题** 命令生成主题定义文件。

VS Code 的 Yeoman [扩展生成器](/api/get-started/your-first-extension.md)可以帮助你生成扩展的其余部分。

请参阅我们的扩展 API 部分中的[创建新的颜色主题](/api/extension-guides/color-theme.md#create-a-new-color-theme)文章以了解更多信息。

## 移除默认颜色主题

如果你想从颜色主题选择器中移除一些随 VS Code 提供的默认主题，你可以从扩展视图（`kb(workbench.view.extensions)`）中禁用它们。选择扩展视图顶部的 **筛选扩展** 按钮，选择 **内置** 选项，你会看到一个 **THEMES** 部分，其中列出了默认主题。

![内置主题](images/themes/built-in-themes.png)

你可以像禁用任何其他 VS Code [扩展](/docs/configure/extensions/extension-marketplace.md)一样，通过齿轮上下文菜单中的 **禁用** 命令来禁用内置主题扩展。

![禁用主题](images/themes/disable-theme.png)

## 文件图标主题

文件图标表示特定的文件类型。这些图标与文件名一起显示在资源管理器视图和选项卡标题中。文件图标主题可以由扩展提供。

要选择不同的文件图标主题：

1. 选择 **文件** > **首选项** > **主题** > **文件图标主题** 菜单项，或使用 **首选项: 文件图标主题** 命令来显示文件图标主题选择器。

1. 使用 `kbstyle(Up)` 和 `kbstyle(Down)` 键浏览列表并预览主题的图标。

1. 选择你想要的主题，然后按 `kbstyle(Enter)`。

![文件图标主题下拉菜单](images/themes/file-icon-theme-dropdown.png)

默认情况下，使用 **Seti** 文件图标主题，这些就是你在资源管理器视图中看到的图标。VS Code 会在重启后记住你的文件图标主题选择。你可以通过选择 **无** 来禁用文件图标。

VS Code 提供了两个文件图标主题：**Minimal** 和 **Seti**。要安装更多的文件图标主题，请在文件图标主题选择器中选择 **安装其他文件图标主题** 项，这将打开扩展视图，并筛选出图标主题。

你也可以直接浏览 [VS Code Marketplace](https://marketplace.visualstudio.com/vscode/Themes) 网站来查找可用的主题。

当前活动的文件图标主题会持久保存在你的用户[设置](/docs/configure/settings.md)中（键盘快捷键 `kb(workbench.action.openSettings)`）。

```json
  // 指定工作台中使用的文件图标主题。
  "workbench.iconTheme": "vs-seti"
```

## 创建你自己的文件图标主题

你可以用图标（最好是 SVG）创建自己的文件图标主题，请参阅我们扩展 API 部分中的[文件图标主题](/api/extension-guides/file-icon-theme.md)文章了解详细信息。

## VS Code for the Web

VS Code for the Web 提供了一种免费、无需安装的 VS Code 体验，完全在你的浏览器中运行，网址为 [https://vscode.dev](https://vscode.dev)。

你可以通过 URL 架构 `https://vscode.dev/editor/theme/<extensionId>` 在 VS Code for the Web 中分享和体验颜色主题。

例如，你可以访问 [https://vscode.dev/editor/theme/sdras.night-owl](https://vscode.dev/editor/theme/sdras.night-owl) 来体验 [Night Owl 主题](https://marketplace.visualstudio.com/items?itemName=sdras.night-owl)，而无需经过下载和安装过程。

你可以在 [VS Code for the Web 文档](/docs/remote/vscode-web.md#themes)中了解更多关于预览和分享主题的信息。

## 产品图标主题

产品图标主题使你能够更改 VS Code 用户界面中的图标，而不是特定文件类型的图标。例如，你可以修改活动栏中视图的图标，或标题栏中用于更改布局的图标。

注意下图中，当选择不同的产品图标主题时，活动栏图标是如何更新的。

![产品图标主题下拉菜单截图，以及活动栏图标如何更改。](images/themes/product-icon-theme-dropdown.png)

要选择不同的产品图标主题：

1. 选择 **文件** > **首选项** > **主题** > **产品图标主题** 菜单项，或使用 **首选项: 产品图标主题** 命令来显示产品图标主题选择器。

1. 使用 `kbstyle(Up)` 和 `kbstyle(Down)` 键浏览列表并预览主题的图标。

1. 选择你想要的主题，然后按 `kbstyle(Enter)`。

默认情况下，VS Code 附带一个产品图标主题，**Default**。你可以直接从产品图标主题选择器中通过选择 **浏览其他产品图标主题...** 从 VS Code Marketplace 选择更多的产品图标主题。

## 后续步骤

主题只是自定义 VS Code 的一种方式。如果你想了解更多关于 VS Code 自定义和扩展性的信息，请尝试阅读以下文章：

* [设置](/docs/configure/settings) - 了解如何通过用户和工作区设置将 VS Code 配置为符合你的偏好。
* [代码片段](/docs/editing/userdefinedsnippets.md) - 为你喜欢的语言添加额外的代码片段。
* [扩展 API](/api) - 了解扩展 VS Code 的其他方法。
* [颜色主题](/api/extension-guides/color-theme.md) - 颜色主题扩展 API。
* [文件图标主题](/api/extension-guides/file-icon-theme.md) - 文件图标主题扩展 API。
