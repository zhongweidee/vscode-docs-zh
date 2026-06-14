---
Order: 125
TOCTitle: MCP Apps 支持
PageTitle: "赋予智能体视觉表达能力：VS Code 中的 MCP Apps 支持"
MetaDescription: VS Code 现已支持 MCP Apps，使 AI 智能体能够显示交互式 UI，提供更丰富的开发者工作流程。
MetaSocialImage: mcp-apps-list-sort.png
Date: 2026-01-26
Author: Harald Kirschner, Connor Peet
---

# 赋予智能体视觉表达能力：VS Code 中的 MCP Apps 支持

2026年1月26日，作者 [Harald Kirschner](https://github.com/digitarald) 和 [Connor Peet](https://github.com/connor4312)

AI 编码智能体已经变得非常强大。开箱即用，它们可以搜索你的代码库、编辑文件、运行终端命令并响应编译错误。添加 [MCP 服务器](https://code.visualstudio.com/docs/agent-customization/mcp-servers)后，它们可以查询数据库、使用 Playwright 浏览网页、总结 GitHub 工单，并连接到你的云平台。模型甚至可以处理图像——你可以粘贴屏幕截图来调试布局问题，或者让 Playwright 捕获浏览器状态进行验证。

智能体可以格式化表格、结构化数据并渲染 ASCII 图表。但这些都不是交互式的。当你需要重新排序列表、确认带有具体细节的破坏性操作，或探索可视化结果时，你只能回到用文字描述的方式。

今天，MCP 社区宣布推出 [MCP Apps](https://modelcontextprotocol.github.io/ext-apps/api/)，这是首个官方的 MCP 扩展。工具调用现在可以返回直接在对话中渲染的交互式 UI 组件：仪表板、表单、可视化、多步骤工作流。这为人机协作创造了更丰富、更高效的机会。

**VS Code 是首个全面支持 MCP Apps 的主流 AI 代码编辑器。**该功能现已在 [VS Code Insiders](https://code.visualstudio.com/insiders/) 中可用——这是我们每日构建版本，新功能会最先在此落地。立即安装 Insiders 以体验 MCP Apps，预计该功能将在下周的发布中推送到 VS Code 稳定版。

## 演示：交互胜过文字的场景

我们构建了一些[演示](https://github.com/digitarald/mcp-apps-playground)，展示智能体在与开发者更丰富的协作中获益的场景。由于 MCP Apps 是新技术，我们期待看到整个生态系统中更多的采用。

### 交互式列表重排

**当前方式：**智能体根据其分析提出排序结果。你阅读文本输出，要求调整，然后反复沟通直到顺序符合你的偏好。

**使用 MCP Apps：**智能体会在建议排序结果旁边显示一个拖放界面。你可以直观地重新排序项目，或选择"让 AI 排序"让智能体应用其推理结果。

![截图：在 VS Code 智能体面板中展示带有拖放功能的交互式任务排序 UI。](mcp-apps-list-sort.png)

### 性能分析器可视化

**当前方式：**智能体分析 CPU 性能分析数据并以文本形式总结瓶颈。你看到摘要，但无法验证假设或探索智能体可能忽略的区域。

**使用 MCP Apps：**智能体渲染交互式火焰图。你可以深入调用栈、悬停查看时间细节，并用你自己的领域知识来确认或质疑智能体的分析。

![截图：展示由 MCP App 渲染的交互式火焰图可视化。](mcp-apps-flame-graph.png)

### 功能开关选择器

**当前方式：**智能体获取开关配置并列出已有内容。你需要结合部署上下文进行心理对照，然后要求智能体在单独的步骤中生成集成代码。

**使用 MCP Apps：**智能体显示一个可搜索的开关选择器，并附带实时环境状态。你可以选择开关、在生产/预发布/开发环境中切换视图，并生成 SDK 代码——所有这些都在一次交互中完成。

![截图：在智能体面板中展示带有环境选项卡的功能开关选择器。](mcp-apps-feature-flags.png)

## 合作伙伴聚焦：Storybook

[Storybook](https://storybook.js.org) 已在其开源 MCP 服务器中[添加了 MCP Apps 支持](https://github.com/storybookjs/mcp/pull/134)。只需告诉智能体*"使用我们的设计系统构建一个登录表单"*，而不必详尽描述期望的结果，智能体就会直接在 VS Code 中渲染交互式组件预览。

<iframe src="https://www.youtube-nocookie.com/embed/fbNH6_jdwQU?rel=0&amp;disablekb=0&amp;modestbranding=1&amp;showinfo=0" frameborder="0" allowfullscreen title="Storybook MCP Apps 演示"></iframe>

> "我们一直在与 VS Code 团队合作开发 MCP Apps，对成果感到非常兴奋。用户现在可以直接在智能体聊天中预览 Storybook 故事，无需在聊天和 Storybook 之间切换来查看更改。" – Jeppe Reinhold（Storybook 核心贡献者，Chromatic）

## 与 VS Code 的自然契合

VS Code 从来就不仅仅是一个文本编辑器。扩展通过 webview 面板、自定义编辑器和侧边栏视图将 UI 和交互带入编辑器。Jupyter 笔记本展示了将代码与丰富输出混合使用如何彻底改变工作流程。[GitHub Copilot 智能体](https://code.visualstudio.com/docs/agents/overview)赋予了 AI 在你的工作区中自主工作的能力。

MCP Apps 是下一层：赋予智能体视觉表达能力来进行反馈沟通。你可以看到正在发生的事情，自信地做出选择，并保持掌控。

## 快速开始

如果你正在构建 MCP 服务器，添加 MCP Apps 可以让它们更具交互性。VS Code 是你可以在其中开发并调试它们的地方，并享有完整的 MCP 支持。参加今天与 MCP 核心维护者 [Den Delimarsky 的 VS Code 直播](https://youtube.com/live/HWmC3T5Wwqw)，观看现场演示和问答。

- [MCP Apps 演示仓库](https://github.com/digitarald/mcp-apps-playground)
- [MCP Apps SDK 和示例](https://github.com/modelcontextprotocol/ext-apps/)
- [VS Code MCP 文档](https://code.visualstudio.com/docs/agent-customization/mcp-servers)
- [MCP 服务器开发指南](https://code.visualstudio.com/docs/agents/guides/mcp-developer-guide)
- [MCP Apps 公告](https://blog.modelcontextprotocol.io/posts/2026-01-26-mcp-apps/)

尝试构建你的第一个 MCP App，并与社区分享你的创作。有时展示比讲述更有说服力——现在你的智能体可以两者兼得了。

祝编码愉快！💙
