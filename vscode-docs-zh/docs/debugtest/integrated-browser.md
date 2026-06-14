---
ContentId: f8e2a7c1-9d3b-4e5f-a6c8-1b2d3e4f5a6b
DateApproved: 6/10/2026
MetaDescription: 使用 VS Code 中的集成浏览器预览和调试 Web 应用，导航到 URL，并将页面元素、屏幕截图或控制台日志作为上下文添加到 AI 聊天中。
MetaSocialImage: images/debugging/debugging-social.png
---
# 集成浏览器

集成浏览器使你能够直接在 VS Code 中打开和与网页进行交互。使用它来预览 Web 应用程序、测试身份验证流，以及选择页面元素作为上下文添加到 AI 聊天提示中。

![Screenshot of the integrated browser in VS Code displaying a web page.](images/integrated-browser/integrated-browser.png)

>[!NOTE]
> 集成浏览器目前是实验性功能，可能会在未来版本中发生变化。

## 打开浏览器

有几种方式可以打开集成浏览器：

* 从命令面板（`kb(workbench.action.showCommands)`）运行**浏览器: 打开集成浏览器**命令。
* 从菜单栏中选择**查看** > **浏览器**，或使用 `kb(workbench.action.browser.openOrList)` 键盘快捷键。
* 选择 VS Code 标题栏中的地球图标。使用 `setting(workbench.browser.showInTitleBar)` 设置来控制是否显示地球图标。
* 在 VS Code 中的任意位置选择 `localhost` 链接，例如终端或聊天中。通过 `setting(workbench.browser.openLocalhostLinks)` 设置启用此行为。
* 让智能体打开或与网页交互。请参阅[适用于智能体的浏览器工具](#browser-tools-for-agents)。
* 使用 `editor-browser` 调试类型启动调试会话。请参阅[调试](#debugging)。

你可以同时打开多个浏览器实例，每个实例都在各自的编辑器选项卡中。当浏览器选项卡已打开时，**查看** > **浏览器**菜单项和标题栏地球图标会打开[选项卡管理](#tab-management)快速选择器，而不是创建新的浏览器选项卡。

## 导航

浏览器支持 `http://`、`https://` 和 `file://` URL。使用地址栏导航到任何 URL，或使用页面内链接在网站内导航。

* 常规导航和锚点链接按预期工作
* `kbstyle(Ctrl+单击)`（macOS 上为 `kbstyle(Cmd+单击)`）在新浏览器选项卡中打开链接
* 弹窗被阻止，但允许新选项卡

### 地址栏和建议

当你选择地址栏时，会打开一个建议选择器帮助你导航。在新的浏览器选项卡上，选择器会自动打开。输入 URL 并按 `kbstyle(Enter)` 进行导航。输入时，选择器会筛选你的收藏夹和其他建议。

要随时聚焦地址栏并打开选择器，请运行**浏览器: 聚焦 URL 输入**命令或按 `kb(browser.focusUrlInput)`。

![Screenshot of a popup around the browser URL bar showing favorites and opened tabs.](images/integrated-browser/browser-url-bar.png)

你可以用键盘控制选择器：

* 按 `kbstyle(Esc)` 关闭选择器并切换到纯文本输入。输入内容以重新打开选择器，按 `kbstyle(Enter)` 导航，或再次按 `kbstyle(Esc)` 聚焦已加载的页面。
* 按 `kbstyle(Tab)` 将焦点沿浏览器工具栏移动。

### 收藏夹

要将当前页面添加到收藏夹，打开地址栏并选择星形图标。星形图标会一直显示在地址栏中，表示该页面已被收藏。收藏的页面会出现在建议选择器中，并在你输入时进行筛选。选择一个收藏即可导航到它。

![Screenshot of the integrated browser highlighting a star button labeled "Add to Favorites" in the browser URL bar.](images/integrated-browser/browser-favorite-button.png)

### 打开的选项卡

在尚未导航到页面的新浏览器选项卡上，建议选择器还会列出你其他已打开的浏览器选项卡。选择一个选项卡以切换到它。VS Code 会关闭新选项卡并激活你选择的那个。

### 最近记录和历史记录

当你打开新的浏览器选项卡时，建议选择器会显示一个**最近记录**组，其中包含你最近显式导航到的三个页面，例如通过输入 URL 导航的页面。通过点击链接到达的页面不会出现在最近记录中。

在地址栏中输入时，**历史记录**组会显示你浏览器历史记录中最多六个匹配的页面。选择某条建议上的删除图标可以将该页面从历史记录中删除。

要浏览或搜索完整的历史记录，请参阅[浏览器历史记录](#browser-history)。

## 浏览器历史记录

集成浏览器会保留你访问过的页面的历史记录，以便你以后重新访问。历史记录在所有[会话存储](#session-storage)模式下都可用，除了临时模式。

要打开历史记录视图，请按 `kb(workbench.action.browser.showHistory)` 或从命令面板运行**浏览器: 历史记录**命令。你也可以从工具栏溢出菜单中将**历史记录**按钮添加到浏览器工具栏。

历史记录视图按天分组列出访问过的页面，最近的页面排在最前面。在输入框中输入内容可按页面标题或 URL 筛选列表，然后选择一个页面即可导航到它。

要从历史记录中删除页面：

* 选择单个条目上的**从历史记录中删除**按钮。
* 选择日期标题上的**清除当天的条目**按钮，删除该天所有的页面。
* 选择视图顶部的**清除所有历史记录**按钮，删除整个历史记录。

清除浏览器存储也会清除该存储范围内的历史记录。

历史记录按每个存储范围单独跟踪。全局会话在工作区之间共享历史记录，而每个工作区会话保留各自的历史记录。

默认情况下，浏览器每个存储范围最多保留 200 条历史记录，在达到上限时删除最早的条目。使用 `setting(workbench.browser.maxHistoryEntries)` 设置更改上限。将其设置为 `0` 可禁用历史记录。

## 选项卡管理

使用**浏览器: 快速打开浏览器选项卡...**命令（`kb(workbench.action.browser.quickOpen)`）快速在打开的浏览器选项卡之间切换。快速选择器列出所有打开的选项卡，按编辑器组分组，你可以输入内容按选项卡名称或 URL 进行筛选。

通过快速选择器，你可以：

* 选择一个选项卡以切换到它
* 选择**新建集成浏览器选项卡**打开一个新的浏览器选项卡
* 选择选项卡上的关闭按钮来关闭它
* 选择**全部关闭**按钮关闭所有浏览器选项卡

你还可以使用以下命令关闭浏览器选项卡：

| 命令 | 描述 |
|---------|-------------|
| **浏览器: 关闭所有浏览器选项卡** | 关闭所有编辑器组中的所有浏览器选项卡。 |
| **浏览器: 关闭组中的所有浏览器选项卡** | 关闭当前编辑器组中的所有浏览器选项卡。 |

**关闭所有浏览器选项卡**选项也可在浏览器编辑器选项卡的右键上下文菜单中使用。

## 开发者工具

从浏览器工具栏切换浏览器的开发者工具，以检查元素、查看控制台输出和调试页面问题。

## 调试

你可以使用 `launch.json` 配置中的 `editor-browser` 调试类型直接在集成浏览器中调试 Web 应用程序。启动带有调试器的新浏览器选项卡，或附加到已打开的选项卡。这可以在 Visual Studio Code Desktop 支持的任何地方使用，即使没有安装外部浏览器也可以。

> [!NOTE]
> `editor-browser` 调试类型尚未在**运行和调试**自动检测流程中可用。你需要手动将其添加到 `launch.json` 文件中。

### 启动调试会话

要启动新的集成浏览器选项卡并开始调试，请将启动配置添加到 `.vscode/launch.json` 文件中：

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "editor-browser",
      "request": "launch",
      "name": "Launch in integrated browser",
      "url": "http://localhost:8000"
    }
  ]
}
```

按 `kb(workbench.action.debug.start)` 在集成浏览器中打开 URL 并附加调试器。标准的调试功能如断点、单步执行和变量检查都按预期工作。当你停止调试会话时，浏览器选项卡会自动关闭。

### 附加到现有选项卡

要将调试器附加到已打开的集成浏览器选项卡，请使用附加配置：

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "editor-browser",
      "request": "attach",
      "name": "Attach to integrated browser"
    }
  ]
}
```

当你启动此配置时：

* 如果没有集成浏览器选项卡打开，VS Code 会创建一个新选项卡并附加到它。
* 如果有一个选项卡打开，VS Code 会自动附加到它。
* 如果有多个选项卡打开，会显示一个选择器让你选择要附加到哪个选项卡。

停止调试会话时，浏览器选项卡保持打开状态。

要自动附加到具有特定 URL 的选项卡，请在配置中添加 `urlFilter` 属性：

```json
{
  "type": "editor-browser",
  "request": "attach",
  "name": "Attach to localhost",
  "urlFilter": "http://localhost:3000/*"
}
```

如果有一个选项卡匹配筛选条件，VS Code 会直接附加到它。如果有多个选项卡匹配，选择器只显示筛选后的结果。

有关启动配置属性的完整参考，请参阅 [VS Code 中的浏览器调试](/docs/nodejs/browser-debugging.md#launch-configuration-attributes)。

## 独立窗口

通过右键单击编辑器选项卡并选择**移动到新窗口**，将浏览器移动到自己的浮动窗口中。从浮动窗口的标题栏使用**设置为始终置顶**使其保持可见。

## 将上下文添加到 AI 聊天

浏览器工具栏有一个**添加到聊天**拆分按钮，其中的操作允许你从当前页面捕获不同类型的上下文并将其附加到聊天提示中。这些操作也可以从命令面板中使用。

<!-- TODO: add screenshot of the "Add to Chat" split-button dropdown showing the three actions -->

### 添加元素

从网页中选择元素，将它们作为上下文添加到聊天提示中。这对于获取特定 HTML 元素、CSS 样式或调试 UI 问题的帮助非常有用。

1. 打开集成浏览器并导航到你的 Web 应用。
1. 选择浏览器工具栏中的**将元素添加到聊天**按钮进入选择模式。
1. 悬停在元素上并选择以将其添加到聊天提示中。

配置包含哪些信息：

| 设置                                          | 描述                               |
|--------------------------------------------------|-------------------------------------------|
| `setting(chat.sendElementsToChat.attachCSS)`     | 包含所选元素的 CSS 样式  |
| `setting(chat.sendElementsToChat.attachImages)`  | 包含所选元素的屏幕截图  |

### 添加屏幕截图

捕获页面的屏幕截图并将其作为图像附加到聊天提示中。使用此功能可以询问布局问题、获取设计反馈或展示 Web 应用的当前状态。屏幕截图在聊天面板打开之前捕获，因此它反映的是你看到的页面状态。

浏览器工具栏中的**添加到聊天**下拉菜单提供了三种捕获模式：

| 模式 | 描述 |
|------|-------------|
| **将屏幕截图添加到聊天** | 捕获当前浏览器视口。 |
| **将区域屏幕截图添加到聊天** | 拖动以选择页面上的矩形区域，然后仅捕获该区域。 |
| **将整页屏幕截图添加到聊天（实验性）** | 捕获整个可滚动页面，包括当前视口之外的内容。 |

每种模式也可以作为**浏览器:**命令在命令面板中使用。

> [!NOTE]
> 整页屏幕截图模式是实验性的。要启用它，请将 `setting(workbench.browser.experimentalUserTools.enabled)` 设置为 `true`。

### 添加控制台日志

捕获当前页面的控制台输出并将其作为上下文附加到聊天提示中。这对于调试 Web 应用中的运行时错误或意外行为非常有用。

从浏览器工具栏中选择**将控制台日志添加到聊天**或运行**浏览器: 将控制台日志添加到聊天**命令。

详细了解[将上下文添加到聊天](/docs/chat/copilot-chat-context.md)。

## 权限

出于安全考虑，浏览器会自动拒绝大多数权限请求（摄像头、麦克风、地理位置）。通知、剪贴板访问和文件选择是被允许的。

## 会话存储

通过 `setting(workbench.browser.dataStorage)` 设置控制集成浏览器如何存储会话数据，例如 cookie、登录信息、localStorage 和缓存。

| 模式 | 描述 |
|------|-------------|
| `global` | 数据持久化并在所有浏览器选项卡和工作区之间共享。 |
| `workspace` | 数据在工作区内持久化，但在工作区之间隔离。 |
| `ephemeral` | 数据不在选项卡之间共享，也不持久化。类似于无痕模式。 |

要清除已存储的数据，请选择浏览器工具栏中的菜单，然后根据当前的存储模式选择**清除存储（全局）**或**清除存储（工作区）**。清除存储后重新加载浏览器选项卡以应用更改。

> [!NOTE]
> 在不受信任的工作区中，无论设置如何，浏览器始终使用临时模式，以保护你的数据。

## 与 Live Preview 扩展配合使用

Live Preview 扩展可以使用集成浏览器预览网页。启用 `setting(livePreview.useIntegratedBrowser)` 设置将其用作默认预览浏览器。

## 适用于智能体的浏览器工具

> [!NOTE]
> 适用于智能体的浏览器工具目前是实验性的。

智能体可以使用内置浏览器工具读取集成浏览器中的页面并与之交互。启用后，智能体可以打开浏览器页面、导航到 URL、读取页面内容和控制台错误、截取屏幕截图、点击元素、输入文本、悬停在元素上、拖动元素、处理对话框以及运行 Playwright 代码，所有这些都无需外部 MCP 服务器。

浏览器工具与[将上下文添加到 AI 聊天](#add-context-to-ai-chat)不同。添加到聊天操作让你手动选择页面元素、捕获屏幕截图或将控制台日志附加为聊天提示的上下文。而浏览器工具让智能体自主地与网页交互以完成任务。

要启用浏览器工具，请将 `setting(workbench.browser.enableChatTools)` 设置设置为 `true`。然后这些工具就会自动对智能体可用。

### 与智能体共享浏览器页面

要让智能体读取和与你打开的页面交互，请选择浏览器工具栏中的**与智能体共享**按钮。在智能体获得访问权限之前，会显示一个确认对话框要求你批准共享。

![Screenshot showing the integrated browser, highlighting the Share with Agent button. The Chat view shows that the agent can see the shared browser page.](images/integrated-browser/share-with-agent.png)

浏览器选项卡上的可视化指示器显示页面当前正在被共享。要停止共享，请再次选择**与智能体共享**按钮。这会立即撤销智能体对该页面的访问权限。

你现在可以让智能体读取页面内容或与之交互。例如，你可以问"页面的标题是什么？"或"点击登录按钮并告诉我它是否有效。"

共享的页面使用你现有的浏览器会话，包括 cookie 和登录状态。智能体打开的页面使用隔离的临时会话，因此它们不会与你其他浏览器选项卡共享 cookie 或存储。

### 智能体发起的共享请求

当你有未共享的已打开浏览器选项卡时，智能体可以检测到存在未共享的选项卡并提示你共享一个。例如，如果你问"这个浏览器页面上有什么？"且没有共享任何选项卡，智能体会显示一个问题轮播，让你选择是否共享一个选项卡。

当智能体尝试打开一个新页面而你已经在同一域名上有打开的选项卡时，会提示你共享现有选项卡而不是打开新选项卡。只列出具有匹配域名和端口的选项卡。如果你选择**否**，智能体会打开一个新选项卡，并且只有新选项卡被共享。

在自动驾驶模式下，共享请求会自动拒绝以保护你的隐私。

## 相关内容

* [VS Code 中的浏览器调试](/docs/nodejs/browser-debugging.md)
* [使用浏览器智能体工具测试 Web 应用](/docs/agents/guides/browser-agent-testing-guide.md)
* [将上下文添加到 AI 聊天](/docs/chat/copilot-chat-context.md)
* [端口转发](/docs/debugtest/port-forwarding.md)
