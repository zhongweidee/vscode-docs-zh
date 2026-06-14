---
ContentId: 3f9e2b7d-6a8c-4d1e-9f2a-8c4b5d7e9f1a
DateApproved: 6/10/2026
MetaDescription: 了解如何在 VS Code 中使用浏览器代理工具，借助 AI 构建并自动测试 Web 应用程序。
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- ai
- copilot
- agents
- browser
- integrated browser
- testing
- automation
- guide
- tutorial
---
# 使用浏览器代理工具构建和测试 Web 应用

浏览器代理工具使 AI 能够在封闭的开发循环中自主构建和验证 Web 应用程序。代理可以创建 HTML、CSS 和 JavaScript，在集成浏览器中打开应用，与其交互以验证功能，通过控制台错误和视觉检查识别问题，并在无需人工干预的情况下修复问题。

本指南将引导你使用浏览器代理工具构建一个计算器应用，并观察代理如何通过自动化测试发现并修复 bug。

> [!NOTE]
> 浏览器代理工具目前处于实验阶段，可能会在未来版本中发生更改。

## 先决条件

要完成本指南，你需要：

* [在计算机上安装 Visual Studio Code](/download)
* [GitHub Copilot 订阅](/docs/setup/copilot.md)
* 通过 `setting(workbench.browser.enableChatTools)` 设置启用浏览器代理工具

## 浏览器代理工具的工作原理

启用浏览器代理工具后，代理将获得一些工具的访问权限，使其能够读取集成浏览器中的页面并与之交互。这些工具包括：

* **页面导航：** `openBrowserPage`、`navigatePage`
* **页面内容和外观：** `readPage`、`screenshotPage`
* **用户交互：** `clickElement`、`hoverElement`、`dragElement`、`typeInPage`、`handleDialog`
* **自定义浏览器自动化：** `runPlaywrightCode`

默认情况下，代理打开的页面在私有的内存会话中运行，不与其他浏览器标签页共享 Cookie 或存储数据。这使你可以控制代理可以访问哪些浏览数据。

详细了解 [VS Code 中的集成浏览器](/docs/debugtest/integrated-browser.md)。

## 步骤 1：为代理启用浏览器工具

在代理可以使用浏览器工具之前，你必须在聊天工具选择器中显式启用它们。

1. 打开聊天视图（`kb(workbench.action.chat.open)`），然后从代理下拉菜单中选择 **Agent**。

1. 选择聊天输入区域中的 **工具** 按钮以打开工具选择器。

1. 确认所有浏览器工具都已启用（它们分组在 **内置** > **浏览器** 下）。

    ![显示聊天工具选择器中已启用浏览器工具的截图。](../images/browser-agent-testing-guide/enable-browser-tools.png)

现在，代理可以使用这些工具与网页进行交互。

## 步骤 2：让代理构建一个计算器

启用浏览器工具后，让代理创建一个简单的计算器应用程序。

1. 创建一个新项目文件夹并在 VS Code 中打开它。

1. 在聊天视图中，输入以下提示：

    ```prompt
    Create a calculator with buttons for digits 0-9, operations (add, subtract, multiply, divide), clear, and equals. Use HTML, CSS, and JavaScript. Style it with a clean, modern design.
    ```

1. 当代理创建 `index.html`、`styles.css` 和 `script.js` 时，查看生成的文件。

1. 选择 **保留** 将文件保存到你的工作区。

代理已经构建了计算器应用程序的基本结构。

## 步骤 3：让代理测试计算器

现在让代理在集成浏览器中打开计算器并验证其是否正常工作。

1. 在聊天视图中，输入以下提示：

    ```prompt
    Open the calculator in the browser and test if all the operations work correctly.
    ```

1. 观察代理在集成浏览器中打开 `index.html`，解析页面内容以了解结构，并通过模拟点击和检查结果来系统地测试每个按钮和操作。

    <video src="../images/browser-agent-testing-guide/agent-testing-calculator.mp4" title="显示代理在集成浏览器中测试计算器的视频。" autoplay loop controls muted></video>

代理会报告哪些操作正常运行，并指出发现的任何问题。

## 步骤 4：观察代理调试并修复问题

如果代理在测试过程中发现 bug，它会自动分析问题并实施修复。

1. 让我们通过移除除零检查来引入一个 bug：

    ```javascript
    function calculate() {
        if (!operator || shouldReset) return;

        const a = parseFloat(previous);
        const b = parseFloat(current);
        let result;

        switch (operator) {
        case '+': result = a + b; break;
        case '-': result = a - b; break;
        case '*': result = a * b; break;
        case '/': result = a / b; break;
    }
    ```

1. 让代理测试除法运算并修复发现的任何问题：

    ```prompt
    Verify the division operation works correctly. If you find any issues, fix them.
    ```

1. 观察代理在除以零时遇到错误，然后分析并修复代码，最后验证 bug 修复是否成功。

代理通过浏览器自动化完成了一个完整的开发周期：构建、测试、调试和修复。

## 步骤 5：与代理共享浏览器页面（可选）

你也可以手动打开网页并显式地与代理共享，以便其进行分析或交互。默认情况下，代理只能与它自己打开的网页进行交互。

1. 通过从命令面板（`kb(workbench.action.showCommands)`）运行 **浏览器：打开集成浏览器** 命令来打开集成浏览器。

1. 导航到你希望代理分析或交互的网页。

1. 选择浏览器工具栏中的 **与代理共享** 按钮。

    浏览器标签页上的视觉指示器会显示该页面正在与代理主动共享。

1. 让代理对共享页面执行操作：

    ```prompt
    What is the main heading on this page? Click the first link and tell me where it goes.
    ```

现在，代理可以访问共享页面并代表你执行交互。完成后，再次选择 **与代理共享** 按钮以撤销访问权限。

> [!TIP]
> 共享页面使用你现有的浏览器会话，包括 Cookie 和登录状态。代理打开的页面使用隔离的临时会话，因此它们不与其他浏览器标签页共享 Cookie 或存储数据。

## 尝试这些场景

现在你已经了解了浏览器代理工具的工作原理，可以尝试以下场景来探索不同的用例：

* **表单验证测试**：让代理通过构建和测试联系表单来验证验证规则、错误消息和成功提交

* **响应式布局验证**：让代理在不同视口尺寸下截取页面截图，并验证响应式行为（例如，带有导航菜单的落地页）

* **身份验证流程测试**：让代理在登录页面中测试凭据验证、错误处理和成功重定向

* **交互功能测试**：让代理验证用户交互和状态管理

* **无障碍审核**：让代理检查任何网页中缺失的替代文本、标题层级、键盘导航和颜色对比度问题

## 相关资源

* [集成浏览器](/docs/debugtest/integrated-browser.md)
* [VS Code 中 AI 的核心概念](/docs/agents/concepts/overview.md)
* [代理概述](/docs/agents/overview.md)
* [使用 Copilot 进行测试](/docs/agents/guides/test-with-copilot.md)
