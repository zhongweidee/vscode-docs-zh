---
ContentId: 5dfd207f-fcee-42c3-b7fe-622b42b3397c
DateApproved: 6/10/2026
MetaDescription: 通过编写聊天提示词和提供上下文的实践技巧，优化您在 VS Code 中的开发体验。
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# VS Code 中的提示词工程

本文介绍了编写提示词的技巧，帮助您在 Visual Studio Code 中从 AI 获取更优质、更相关的响应。_提示词工程_（Prompt engineering）或_提示词编写_（prompt crafting）是讨论 AI 时常见的术语，指的是如何将信息打包并发送到 AI API 端点以及发送什么样的信息。

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/hh1nOX14TyY" title="Core principles of prompt engineering with GitHub Copilot" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

如果您是 VS Code 或 AI 的新手，建议先阅读 [VS Code 中的 AI 概述](/docs/agent-native/overview.md) 文章，或者直接参阅[入门教程](/docs/getstarted/getting-started.md)。

## 充分利用内联建议

内联建议通过自动提供代码补全、注释、测试等建议，帮助您提高编码效率。您可以做一些事情来帮助（"提示"）AI 提供尽可能好的建议。

### 提供上下文

当 AI 拥有足够的上下文来了解您在做什么以及需要什么帮助时，它的工作效果最好。就像您向同事介绍具体编程任务以寻求帮助时提供上下文一样，您也可以对 AI 做同样的事情。

#### 打开文件

对于内联建议，VS Code 会查看编辑器中的当前文件和已打开的文件，以分析上下文并生成合适的建议。在使用内联建议时，在 VS Code 中保持相关文件的打开状态有助于设置此上下文，并让 AI 看到项目的更全局视图。

#### 顶层注释

就像您向同事做一个简要、高层次的介绍一样，在您正在处理的文件中添加一个顶层注释可以帮助 AI 了解您正在构建内容的整体背景。

#### 合适的引用与依赖

最好手动设置工作所需的引用（include）或模块引用（module reference）。AI 可以提供建议，但您最清楚需要引入哪些依赖。这也可以帮助 AI 了解在生成建议时您希望它使用哪些框架、库及其版本。

在以下 TypeScript 示例中，我们想要记录 `add` 方法的输出。当没有任何引用时，AI 会建议使用 `console.log`：

![AI inline suggestion proposes Console.log when no imports in the file.](../images/prompt-engineering-guide/copilot-suggestion-console-log.png)
另一方面，当您添加了对 `Log4js` 的引用时，AI 会建议使用该框架来记录输出：

![AI inline suggestion proposes logging using the imported logging framework.](../images/prompt-engineering-guide/copilot-suggestion-framework-log.png)

#### 有意义的函数命名

就像名为 `fetchData()` 的方法对同事（或几个月后的您自己）没什么意义一样，`fetchData()` 对 AI 也没有帮助。使用有意义的函数名有助于 AI 提供符合您期望的函数体。

#### 具体且范围明确的函数注释

函数名在不变得过长的情况下只能具有有限的描述能力。函数注释可以帮助补充 AI 可能需要知道的细节。
<!-- Example of a meaningful function/method comment -->

#### 使用示例代码引导 AI

让 AI 步入正轨的一个技巧是将与您期望结果相近的示例代码复制并粘贴到打开的编辑器中。提供一个小型示例可以帮助 AI 生成与您期望的语言和任务相匹配的建议。一旦 AI 开始提供您想要并实际会使用的代码，您就可以从文件中删除示例代码。当 AI 默认提供旧版代码建议时，这种方法尤其有助于引导 AI 转向更新的库版本。

### 保持一致性并维持高质量标准

AI 会跟随您的代码风格来生成符合现有模式的建议，因此"垃圾进，垃圾出"这句格言在此适用。
始终维持高质量标准需要自律。特别是当您快速摸索代码以让程序跑起来时，您可能希望在"探索"模式下暂时禁用代码补全。要临时暂停内联建议，请在状态栏中选择 Copilot 菜单，然后选择**暂停**按钮，每次点击会将暂停时间增加五分钟。要恢复内联建议，请在 Copilot 菜单中选择**取消暂停**按钮。

![Screenshot of the Copilot menu in the Status Bar with Snooze and Cancel Snooze buttons.](../images/inline-suggestions/snooze-code-completions.png)

## 充分利用聊天功能

在使用聊天时，您可以做很多事情来优化您的体验。

### 添加相关上下文

您可以通过输入 `#` 后跟要引用的上下文项来显式地向提示词中添加上下文。VS Code 支持多种类型的上下文项：文件、文件夹、代码符号、工具、终端输出、源代码管理更改等。

在聊天输入框中输入 `#` 符号即可查看可用上下文项列表，或在聊天视图中选择**添加上下文**打开上下文选择器。

例如，使用 `#<文件名>` 或 `#<文件夹名>` 可以在聊天提示词中引用工作区中的特定文件或文件夹。这通过提供您正在处理的文件的上下文，帮助 Copilot Chat 的回答与您的代码更相关。您可以提出诸如"你能建议对 #package.json 的改进吗？"或"如何在 #devcontainer.json 中添加扩展？"之类的问题。

除了手动添加单个文件外，您还可以使用 `#codebase` 让 VS Code 自动从代码库中查找相关文件。这在您不知道哪些文件与您的问题相关时非常有用。

![Screenshot of Chat view, showing the Attach context button and context Quick Pick.](../images/prompt-engineering-guide/copilot-chat-view-attach-context.png)

详细了解[在聊天中使用上下文](/docs/chat/copilot-chat-context.md)。

### 具体明确且保持简洁

当您要求聊天执行某项操作时，请具体说明您的需求，并将大型任务分解为单独的小任务。例如，不要一次性要求聊天创建一个使用 TypeScript 和 Pug、并包含从 MongoDB 数据库获取数据的产品页面的 Express 应用。相反，首先请它创建使用 TypeScript 和 Pug 的 Express 应用，接着要求添加产品页面，最后再要求从数据库获取客户数据。

当您要求聊天执行具体任务时，请具体说明您期望的输入、输出、API 或框架。提示词越具体，结果就越好。例如，与其说"从数据库读取产品数据"，不如说"按类别读取所有产品，以 JSON 格式返回数据，并使用 Mongoose 库"。

### 在解决方案上迭代

向聊天寻求帮助时，您并不局限于第一个回复。您可以进行迭代，提示聊天改进解决方案。聊天同时拥有生成代码的上下文和您当前的对话记录。
以下是一个使用内联聊天创建斐波那契数列计算函数的示例：

![First response from AI for a function to calculate Fibonacci numbers](../images/prompt-engineering-guide/fibonacci-first.png)

也许您更喜欢不使用递归的解决方案：

![Ask AI to not use recursion and new result](../images/prompt-engineering-guide/fibonacci-second.png)

您甚至可以要求 AI 遵循编码规范或改进变量名：

![Ask AI to use better variable names and new result](../images/prompt-engineering-guide/fibonacci-third.png)

即使您已经接受了某个结果，您随时可以在之后要求 AI 对代码进行迭代改进。

## 关于 Copilot 提示词编写的更多资源

如果您想进一步了解如何高效使用 GitHub Copilot，可以关注以下视频和博客文章：

* [Effective Prompting for GitHub Copilot](https://www.youtube.com/watch?v=ImWfIDTxn7E)
* [Pragmatic techniques to get the most out of GitHub Copilot](https://www.youtube.com/watch?v=CwAzIpc4AnA)
* [Best practices for prompting GitHub Copilot in VS Code](https://www.linkedin.com/pulse/best-practices-prompting-github-copilot-vs-code-pamela-fox)
* [How to use GitHub Copilot: Prompts, tips, and use cases](https://github.blog/2023-06-20-how-to-write-better-prompts-for-github-copilot/)
