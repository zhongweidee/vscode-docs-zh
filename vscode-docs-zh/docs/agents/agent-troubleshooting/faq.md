---
ContentId: e02ded07-6e5a-4f94-b618-434a2c3e8f09
DateApproved: 6/10/2026
MetaDescription: 在 Visual Studio Code 中使用 GitHub Copilot 的常见问题解答。
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# GitHub Copilot 常见问题解答

本文解答在 Visual Studio Code 中使用 GitHub Copilot 的常见问题。

## GitHub Copilot 订阅

### 如何获取 Copilot 订阅？

有多种方式可以获取 GitHub Copilot 访问权限：

| 用户类型                   | 描述 |
|--------------------------------|-------------|
| 个人用户                     | <ul><li>设置 GitHub Copilot Free，免费探索基本功能，每月享有内联建议和 AI 额度的配额。</li><li>注册付费的 GitHub Copilot 计划，获得更大的灵活性和高级功能的访问权限。</li><li>请参阅[为自己设置 GitHub Copilot](https://docs.github.com/en/copilot/setting-up-github-copilot/setting-up-github-copilot-for-yourself) 了解所有选项。</li></ul> |
| 组织/企业成员 | <ul><li>如果您是拥有 GitHub Copilot 订阅的组织或企业的成员，可以通过访问 <https://github.com/settings/copilot> 并在"从组织获取 Copilot"下请求访问权限。</li><li>请参阅[为您的组织设置 GitHub Copilot](https://docs.github.com/en/copilot/setting-up-github-copilot/setting-up-github-copilot-for-your-organization) 以为您的组织启用 Copilot。</li></ul> |

### 使用 GitHub 帐户登录有什么优势？

使用有权访问 GitHub Copilot 的 GitHub 帐户登录具有以下优势：

* [更高的每月 AI 额度配额](https://docs.github.com/en/copilot/get-started/plans#comparing-copilot-plans)
* [在聊天中访问高级语言模型](https://docs.github.com/en/copilot/reference/ai-models/supported-models#supported-ai-models-per-copilot-plan)，超越自动模型选择
* [使用自带模型密钥](/docs/agent-customization/language-models.md#bring-your-own-language-model-key)（BYOK）访问更多模型
* [远程仓库索引和语义代码搜索](/docs/agents/reference/workspace-context.md#remote-index)
* [Copilot 代码审查](https://docs.github.com/en/copilot/concepts/agents/code-review)
* [Copilot 内容排除](https://docs.github.com/en/copilot/how-tos/configure-content-exclusion/exclude-content-from-copilot)
* [将任务委托给 Copilot 云端代理](/docs/agents/agent-types/cloud-agents.md#github-copilot-cloud-agent)进行后台执行

根据您的 Copilot 计划，您可能拥有不同级别的访问权限和限制。请参阅 [GitHub Copilot 计划](https://docs.github.com/en/copilot/get-started/plans)了解更多信息。

### 如何监控我的 Copilot 使用情况？

您可以在 Copilot 状态仪表板中查看当前的 Copilot 使用情况，该仪表板可通过 VS Code 状态栏访问。仪表板显示以下信息：

* **内联建议**：您在当前月份已使用的内联建议配额的百分比。付费计划对内联建议拥有无限配额。
* **AI 额度**：您在当前月份已使用的每月 AI 额度配额的百分比。

请访问 GitHub Copilot 文档，了解有关[监控使用情况与权益](https://docs.github.com/en/copilot/managing-copilot/monitoring-usage-and-entitlements/monitoring-your-copilot-usage-and-entitlements)的更多信息。有关减少额度消耗的技巧，请参阅[优化 AI 额度使用](/docs/agents/guides/optimize-usage.md)。

### 我的内联建议或 AI 额度已达到上限

您的内联建议配额和 AI 额度配额每月重置。如果您只达到了 AI 额度上限，您仍然可以使用内联建议。同样，如果您达到了内联建议的上限，您仍然可以使用聊天。

对于 Copilot Free 用户，要获取更多的内联建议和 AI 额度，您可以直接从 VS Code 注册[付费计划](https://docs.github.com/en/copilot/concepts/billing/usage-based-billing-for-individuals)。或者，您可以等到下个月继续免费使用 Copilot。

<!-- TODO: add screenshot -->

如果您使用的是付费计划且 AI 额度已用完，您可以设置额外使用的预算并继续工作，或者等到下一个每月周期额度重置。在 GitHub Copilot 文档中了解[如果超出包含的 AI 额度会发生什么](https://docs.github.com/en/copilot/concepts/billing/usage-based-billing-for-individuals#what-happens-if-i-exceed-my-included-ai-credits)的更多信息。

有关减少额度消耗的技巧，请参阅[优化 AI 额度使用](/docs/agents/guides/optimize-usage.md)。

### 我的 Copilot 订阅在 VS Code 中未被检测到

要在 Visual Studio Code 中使用聊天，您必须使用有权访问 GitHub Copilot 的 GitHub 帐户登录到 Visual Studio Code。

- 如果您的 Copilot 订阅关联的是另一个 GitHub 帐户，请注销当前 GitHub 帐户并使用另一个帐户登录。使用活动栏中的**帐户**菜单注销您当前的 GitHub 帐户。请参阅[为 Copilot 使用不同的 GitHub 帐户](/docs/setup/copilot.md#use-a-different-github-account-with-copilot)了解更多信息。

- 在 [GitHub Copilot 设置](https://github.com/settings/copilot)中验证您的 Copilot 订阅是否仍然有效。

- 如果您使用的是 GHE.com 上的托管用户帐户的 Copilot 计划，则需要在登录前更新一些设置。请参阅[在 GHE.com 上使用 GitHub Copilot 帐户](https://docs.github.com/en/copilot/managing-copilot/configure-personal-settings/using-github-copilot-with-an-account-on-ghecom)。

### 如何为 Copilot 切换帐户

如果您的 Copilot 订阅关联的是另一个 GitHub 帐户，请在 VS Code 中注销您的 GitHub 帐户，然后使用另一个帐户登录。

请参阅[为 Copilot 使用不同的 GitHub 帐户](/docs/setup/copilot.md#use-a-different-github-account-with-copilot)了解更多信息。

## 通用 Copilot 问题

### 如何从 VS Code 中移除 Copilot？

您可以使用 `setting(chat.disableAIFeatures)` 设置禁用 VS Code 中的内置 AI 功能，这与配置 VS Code 中的其他功能类似。这会禁用并隐藏 VS Code 中的聊天或内联建议等功能，并禁用 Copilot 扩展。您可以在工作区或用户级别配置此设置。

或者，使用标题栏中聊天菜单中的**了解如何隐藏 AI 功能**操作来访问该设置。

> [!NOTE]
> 如果您之前已禁用内置 AI 功能，在更新到新版本的 VS Code 时，您的选择将得到保留。

### Copilot 的网络和防火墙配置

- 如果您或您的组织采用了防火墙或代理服务器等安全措施，将某些域名 URL 添加到"允许列表"并打开特定的端口和协议可能会有所帮助。了解有关[为 GitHub Copilot 排查防火墙设置问题](https://docs.github.com/en/copilot/troubleshooting-github-copilot/troubleshooting-firewall-settings-for-github-copilot)的更多信息。

- 如果您在公司设备上工作并连接到公司网络，您可能通过 VPN 或 HTTP 代理服务器连接到互联网。在某些情况下，这些类型的网络设置可能会阻止 GitHub Copilot 连接到 GitHub 的服务器。了解有关[为 GitHub Copilot 排查网络错误](https://docs.github.com/en/copilot/troubleshooting-github-copilot/troubleshooting-network-errors-for-github-copilot)的更多信息。

### 我的请求受限速影响

此错误表明您已超出 Copilot 请求的速率限制。GitHub 使用速率限制来确保每个人都能公平访问 Copilot 服务，并防止滥用。

请参阅 [GitHub Copilot 的速率限制](https://docs.github.com/en/copilot/troubleshooting-github-copilot/rate-limits-for-github-copilot)了解更多有关速率限制以及遇到速率限制时该如何处理的信息。

### Copilot 扩展有预发布版本吗？

是的，您可以切换到 Copilot 扩展的预发布（每夜）版本，以体验最新的功能和修复。在扩展视图中，右键单击或选择齿轮图标打开上下文菜单，然后选择**切换到预发布版本**：

![扩展视图上下文菜单中的"切换到预发布版本"选项](../images/faq/switch-to-pre-release.png)

您可以通过扩展详情中的"预发布"徽章来判断您是否正在运行预发布版本：

![GitHub Copilot 扩展的预发布版本](../images/faq/copilot-ext-pre-release.png)

## 内联建议

### 如何启用或禁用内联建议？

您可以使用 VS Code 状态栏中 Copilot 状态仪表板中的复选框在 VS Code 中启用或禁用内联建议。您可以全局启用或禁用内联建议，也可以仅针对当前编辑器的文件类型进行设置。

![显示 VS Code 状态栏的截图，突出显示指示 Copilot 处于活动状态的 Copilot 图标。](../images/faq/copilot-disable-completions.png)

或者，分别使用 `setting(github.copilot.enable)` 和 `setting(github.copilot.nextEditSuggestions.enabled)` 设置来启用或禁用内联建议和下一步编辑建议。您可以在工作区或用户级别配置这些设置。

### 内联建议在编辑器中不起作用

- 验证 [GitHub Copilot 未被全局禁用或针对此语言禁用](#如何启用或禁用内联建议)
- 验证您的 [GitHub Copilot 订阅是否有效且已被检测到](#我的-copilot-订阅在-vs-code-中未被检测到)
- 验证您的[网络设置](#copilot-的网络和防火墙配置)是否已配置为允许连接到 GitHub Copilot。
- 验证您是否已达到 [Copilot Free 计划](https://docs.github.com/copilot/managing-copilot/managing-copilot-as-an-individual-subscriber/about-github-copilot-free)的当月内联建议上限。

## 聊天

### 聊天功能对我不起作用

验证以下要求以确保聊天功能在 Visual Studio Code 中正常工作：

- 确保您使用的是最新版本的 Visual Studio Code（运行**代码：检查更新**）。
- 确保您拥有 [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) 和 [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) 扩展的最新版本。
- 您登录到 VS Code 的 GitHub 帐户必须拥有有效的 Copilot 订阅。检查您的 [Copilot 订阅](https://github.com/settings/copilot)。
- 验证您是否已达到 [Copilot Free 计划](https://docs.github.com/copilot/managing-copilot/managing-copilot-as-an-individual-subscriber/about-github-copilot-free)当月的 AI 额度上限。

### 代理在聊天中不可用

验证代理是否在您的 VS Code 设置中启用：`setting(chat.agent.enabled)`。可能您的组织已禁用此功能，请与管理 员确认以启用代理。

### 代理在 VS Code 中能做什么？

代理可以自主处理完整的编码任务。它们规划多步骤实现，跨多个文件执行协调的更改，运行终端命令，调用工具，并在遇到错误时自我修正。使用代理进行功能实现、架构级别的重构、框架迁移、调试和测试生成。了解更多关于[使用代理](/docs/agents/overview.md)的信息。

### Copilot 是否适用于大型代码库和单体仓库？

是的。VS Code 会自动使用语义搜索、语言智能（LSP）和 GitHub 代码搜索为您的 工作区建立索引，以提供对仓库的深度理解。对于大型仓库，[远程索引](/docs/agents/reference/workspace-context.md#remote-index)使用 GitHub 的索引在相关仓库中提供快速、全面的结果。在单体仓库中使用[多根工作区](/docs/editing/workspaces/multi-root-workspaces.md)来限定上下文范围，并使用[自定义指令](/docs/agent-customization/custom-instructions.md)来描述您项目的架构。请参阅[大型代码库的最佳实践](/docs/agents/best-practices.md#work-with-large-codebases)。

### 我的组织能否控制 AI 功能和代理访问？

可以。组织管理员可以通过[企业 AI 设置](/docs/enterprise/ai-settings.md)和[策略](/docs/enterprise/policies.md)管理 Copilot，包括启用或禁用代理、控制模型访问、配置内容排除和强制执行信任边界。有关合规性的详细信息，请参阅 [GitHub Copilot 信任中心](https://resources.github.com/copilot-trust-center/)。

### 代理是否有使用限制？

代理会消耗您的 Copilot 计划中的 AI 额度。付费计划包含每月 AI 额度配额，如果需要，您可以设置额外使用的预算。您可以在本地、后台和云端环境中并行运行多个代理会话。免费计划的用户拥有每月 AI 额度配额。了解更多关于[按使用量计费](https://docs.github.com/en/copilot/concepts/billing/usage-based-billing-for-individuals)和 [GitHub Copilot 计划](https://docs.github.com/en/copilot/get-started/plans)的信息。

### 并非所有模型都出现在语言模型选择器中

您可以选择哪些模型在语言模型选择器中可用。了解如何[自定义语言模型选择器](/docs/agent-customization/language-models.md#customize-the-model-picker)。

组织可以限制对某些模型的访问。如果您认为某个模型应该可用，请联系您的组织管理员。

### 如何防止聊天视图自动打开？

默认情况下，聊天视图在辅助侧边栏中打开。当您为某个工作区关闭聊天视图时，VS Code 会记住此设置，并在您下次打开该工作区时不再自动打开聊天视图。

您可以直接从聊天视图更改默认可见性：

1. 打开聊天视图（`kb(workbench.action.chat.open)`）。
1. 选择聊天视图右上角的 `...` 图标。
1. 选择**默认显示视图**以启用或禁用聊天视图的自动打开。

您还可以使用 `setting(workbench.secondarySideBar.defaultVisibility)` 设置来控制辅助侧边栏的默认可见性。将其设置为 `hidden` 可防止聊天视图自动打开。

## 故障排除和反馈

### 如何提供有关 Copilot 的反馈？

我们在 [microsoft/vscode](https://github.com/microsoft/vscode) GitHub 仓库中跟踪 VS Code 中 GitHub Copilot 的问题和功能请求。您可以在此仓库中创建问题，或使用 VS Code 中的以下反馈机制：

- **幽灵文本建议**

    在编辑器中悬停幽灵文本建议时，使用**发送 Copilot 完成反馈**操作。在问题报告器中，清晰地详细描述问题，包括重现步骤。

    ![在编辑器中显示发送 Copilot 幽灵文本反馈操作的截图。](../images/faq/code-completions-feedback.png)

- **下一步编辑建议**

    在编辑器边栏中下一步编辑建议菜单中选择**反馈**操作。在问题报告器中，清晰地详细描述问题，包括重现步骤。

    ![在编辑器边栏中显示下一步编辑建议菜单的截图。](../images/faq/nes-feedback.png)

- **一般问题**

    打开 VS Code 问题报告器（**帮助菜单** > **报告问题**），选择 **VS Code 扩展**来源，然后选择 **GitHub Copilot Chat** 扩展。清晰地详细描述问题，包括重现步骤。

    ![显示选择了 GitHub Copilot Chat 的 VS Code 问题报告器的截图。](../images/faq/issue-reporter.png)

当您报告问题时，请遵循我们 [wiki](https://github.com/microsoft/vscode/wiki/Copilot-Issues) 中的指南，以确保您的问题具有可操作性。

如果您要报告问题，包含来自 Copilot 日志的信息可能会有所帮助。了解如何[查看日志和收集诊断信息](/docs/agents/agent-troubleshooting/troubleshooting.md)。

## 其他资源

- [GitHub Copilot 信任中心](https://resources.github.com/copilot-trust-center/)
- [VS Code 中 AI 的安全注意事项](/docs/agents/security.md)
- GitHub 文档中的 [GitHub Copilot 常见问题](https://github.com/features/copilot#faq)
