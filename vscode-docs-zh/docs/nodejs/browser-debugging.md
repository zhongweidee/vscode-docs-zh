---
ContentId: d0e271da-0372-4ab9-a2ab-b7add855bd5a
DateApproved: 6/10/2026
MetaDescription: Visual Studio Code 编辑器内置了浏览器调试支持。设置断点、单步执行、检查变量等。
MetaSocialImage: ../editor/images/debugging/debugging-social.png
---
# VS Code 中的浏览器调试

Visual Studio Code 内置了适用于 Edge 和 Chrome 的调试器。有几种方式可以开始使用它。

* 使用 [打开链接](#open-link-command) 命令调试一个 URL。
* 在 [JavaScript 调试终端](/docs/nodejs/nodejs-debugging.md#javascript-debug-terminal) 中点击链接。
* 使用 [启动配置](#launch-configuration) 启动一个浏览器并运行你的应用。

你也可以在 VS Code 的 [集成浏览器](/docs/debugtest/integrated-browser.md#debugging) 中调试 Web 应用，无需启动外部浏览器。

我们还提供了更详细的入门教程，包括 [React](/docs/nodejs/reactjs-tutorial)、[Angular](/docs/nodejs/angular-tutorial) 和 [Vue](/docs/nodejs/vuejs-tutorial)，以及其他调试 [方法](/docs/nodejs/debugging-recipes)。

## 打开链接命令

调试网页最简单的方法是使用命令面板（`kb(workbench.action.showCommands)`）中的 **调试: 打开链接** 命令。当你运行此命令时，系统会提示你输入要打开的 URL，然后调试器将会附加。

![使用打开链接命令附加到 URL](images/browser-debugging/debug-open-link.gif)

如果你的默认浏览器是 Edge，VS Code 将使用它来打开页面。否则，它会尝试在你的系统中查找已安装的 Chrome。

## 启动配置

启动配置是在 VS Code 中设置调试的传统方式，为你运行复杂的应用程序提供了最大的灵活性。

在本节中，我们将详细介绍针对更高级调试场景的配置和功能。Node.js [跳过外部代码](/docs/nodejs/nodejs-debugging.md#skipping-uninteresting-code) 的说明同样适用于基于浏览器的调试。

>**注意**: 如果你刚刚开始使用 VS Code，可以在 [调试](/docs/debugtest/debugging.md) 主题中了解通用的调试功能以及如何创建 `launch.json` 配置文件。

### 启动浏览器

在大多数情况下，你会希望启动一个新的浏览器实例来调试你的网页或文件。为此，你可以创建一个 `.vscode/launch.json` 文件，内容如下：

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "msedge",
      "request": "launch",
      "name": "Launch my cool app",
      "url": "http://localhost:8000"
    }
  ]
}
```

当你按下 `kb(workbench.action.debug.start)` 或点击 **运行和调试** 视图中的 **开始** 按钮时，`http://localhost:8000` 将在调试模式下打开。如果你想使用 Chrome 而非 Edge，请将 `msedge` 替换为 `chrome`。

若要在不打开外部浏览器的情况下在 VS Code 内部调试，请使用 `editor-browser` 作为类型。详细了解 [集成浏览器中的调试](/docs/debugtest/integrated-browser.md#debugging)。

你还可以调试单个文件而无需运行服务器，例如：

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "msedge",
      "request": "launch",
      "name": "Launch hello.html",
      "file": "${workspaceFolder}/hello.html"
    }
  ]
}
```

### 附加到浏览器

要附加到正在运行的浏览器，该浏览器需要以特殊的调试模式启动。你可以使用以下命令来做到这一点，将 `edge.exe` 替换为你的 Edge 或 Chrome 可执行文件的路径：

```bash
edge.exe --remote-debugging-port=9222 --user-data-dir=remote-debug-profile
```

设置 `--remote-debugging-port` 会告诉浏览器在该端口上监听调试连接。设置一个单独的 `--user-data-dir` 会强制打开一个新的浏览器实例；如果不提供此标志，则该命令将打开任何正在运行的浏览器的新窗口，而不会进入调试模式。

接下来，在 `vscode/launch.json` 文件中添加一个新部分，如下所示：

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "msedge",
      "request": "attach",
      "name": "Attach to browser",
      "port": 9222
    }
  ]
}
```

现在，你可以按下 `kb(workbench.action.debug.start)` 或点击 **运行和调试** 视图中的 **开始** 按钮来附加到正在运行的浏览器。你甚至可以添加一个 `address` 属性来调试运行在其他机器上的浏览器。

### 启动配置属性

调试配置存储在位于工作区 `.vscode` 文件夹中的 `launch.json` 文件里。有关调试配置文件的创建和使用介绍，请参阅通用的 [调试](/docs/debugtest/debugging-configuration.md#launch-configurations) 文章。你可以选择用你的应用"启动"一个浏览器，或者"附加"到一个你已 [在调试模式下启动](#attaching-to-browsers) 的现有浏览器。

以下是针对浏览器调试的常用 `launch.json` 属性参考。你可以在 [vscode-js-debug 选项](https://github.com/microsoft/vscode-js-debug/blob/main/OPTIONS.md) 文档中查看完整的选项集。

* `webRoot` - 你的源代码的根目录。大多数情况下，默认的 `webRoot` 是你的工作区文件夹。此选项用于源码映射解析。
* `outFiles` - 用于定位生成的 JavaScript 文件的 [glob 模式](/docs/editor/glob-patterns.md) 数组。请参阅 [源映射](#source-maps) 部分。
* `smartStep` - 尝试自动跳过未映射到源文件的源代码。请参阅 [智能单步执行](/docs/nodejs/nodejs-debugging.md#smart-stepping) 部分。
* `skipFiles` - 自动跳过这些 [glob 模式](/docs/editor/glob-patterns.md) 覆盖的文件。请参阅 [跳过无关注代码](/docs/nodejs/nodejs-debugging.md#skipping-uninteresting-code) 部分。
* `trace` - 启用诊断输出。

以下属性仅适用于请求类型为 `launch` 的启动配置：

* `url` - 浏览器启动时自动打开的 URL。
* `runtimeExecutable` - 要使用的浏览器可执行文件的绝对路径，或者要使用的浏览器版本。有效版本包括 `stable`（默认）、`canary`、`beta` 和 `dev`。
* `runtimeArgs` - 启动浏览器时传递的可选参数。

以下属性仅适用于请求类型为 `attach` 的启动配置：

* `url` - 如果提供，VS Code 将附加到具有此 URL 的标签页。如果未提供，它将附加到所有浏览器标签页。
* `port` - 用于浏览器远程调试的端口，与启动浏览器时使用的 `--remote-debugging-port` 相匹配。请参阅 [附加到浏览器](#attaching-to-browsers) 部分。
* `address` - 被调试浏览器正在监听的 IP 地址或主机名。请参阅 [附加到浏览器](#attaching-to-browsers) 部分。

## WebAssembly 调试

浏览器中的 WebAssembly 调试与 Node.js 相同，[在此处阅读有关 WebAssembly 调试的更多信息](/docs/nodejs/nodejs-debugging.md#debugging-webassembly)。

## 源映射

VS Code 中的 JavaScript 调试器支持源映射，允许调试转换后的代码。例如，TypeScript 代码会被编译为 JavaScript，而许多 Web 应用会将所有 JavaScript 文件打包在一起。源映射帮助调试器找出如何在你的原始代码与浏览器中运行的代码之间进行映射。

大多数用于构建 Web 应用的现代工具都可以直接使用。如果不能，我们在 [Node.js 中的源映射](/docs/nodejs/nodejs-debugging.md#source-maps) 部分中包含的指导同样适用于浏览器调试。

### 加载源映射

每个 JavaScript 文件都可以通过 URL 或相对路径引用一个源映射。在处理 Web 应用时，你需要确保该 URL 是 VS Code 中运行的调试器可以访问的。如果无法访问，你将在 **调试控制台** 中看到错误，说明哪些源映射加载失败以及原因。

如果无法直接访问，VS Code 将尝试使用浏览器的网络栈来请求源映射。这为浏览器中的任何身份验证状态或网络设置应用于该请求提供了机会。例如，如果你的源映射位于受 Cookie 身份验证保护的位置，则当且仅当浏览器会话具有必要的 Cookie 时，VS Code 才能加载它们。

## 焦点模拟

当你调试 Web 应用并将焦点切换到 VS Code 时，浏览器页面会失去焦点。这会导致 `:focus` CSS 样式消失、`document.hasFocus()` 返回 `false`，以及焦点事件处理程序停止按预期触发。

在浏览器调试会话期间，**运行和调试** 视图中的 **调试选项** 面板提供了一个 **模拟聚焦页面** 选项。当你启用此选项时，页面会表现得好像仍然拥有焦点，即使 VS Code 处于前台。该设置会在调试会话之间保持。

## 后续步骤

* [调试](/docs/debugtest/debugging.md) - 阅读有关 VS Code 通用调试功能的内容。
* [调试方法](/docs/nodejs/debugging-recipes.md) - 为你喜欢的平台设置调试。
