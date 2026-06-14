---
ContentId: 47a2e3b1-24f2-42e6-a6e6-272c2a0f3218
DateApproved: 02/04/2026
MetaDescription: 了解 Visual Studio Code 中的遥测数据收集以及如何选择退出。
---
# 遥测

Visual Studio Code 会收集遥测数据，用于帮助了解如何改进产品。例如，这些使用数据有助于调试问题（如启动缓慢），并有助于确定新功能的优先级。我们还使用这些数据在向所有用户[推出新功能](#feature-availability-and-telemetry)之前，先向部分用户子集推出。

虽然我们很重视这些数据提供的洞察，但我们也知道并非所有人都希望发送使用数据，你可以按照[禁用遥测报告](#disable-telemetry-reporting)中的说明禁用遥测。你也可以阅读我们的[隐私声明](https://go.microsoft.com/fwlink/?LinkID=528096&clcid=0x409)了解更多信息。

## 遥测数据类型

VS Code 及本页面将遥测相关的数据分为三种不同类型。

**崩溃报告** - 崩溃报告在 VS Code 崩溃时收集诊断信息，并将其发送给 Microsoft，以帮助了解崩溃发生的原因以及需要做出哪些更改来防止将来再次崩溃。

**错误遥测** - 错误遥测收集有关不会导致应用程序崩溃但属于异常情况的错误信息。

**使用数据** - 使用数据收集有关功能在 VS Code 中如何被使用以及性能表现的信息，这有助于我们确定未来产品改进的优先级。

## 禁用遥测报告

通过 `setting(telemetry.telemetryLevel)` 用户设置，你可以用一个设置来控制我们发送的不同类型的遥测数据。以下是 `setting(telemetry.telemetryLevel)` 每个值对应的不同类型数据发送情况：

|       | 崩溃报告              | 错误遥测      | 使用数据      |
|:------|:---------------------:|:---------------:|:--------------:|
| all   |            ✓          |        ✓        |        ✓       |
| error |            ✓          |        ✓        |        -       |
| crash |            ✓          |        -        |        -       |
| off   |            -          |        -        |        -       |

例如，如果你不想向 Microsoft 发送任何遥测数据，可以将 `setting(telemetry.telemetryLevel)` 用户设置设为 `off`。这将使 VS Code 之后的所有遥测事件静默。请注意，在你禁用该设置之前，遥测信息可能已经被收集并发送了。

![显示遥测已禁用的设置编辑器截图。](images/telemetry/disable-telemetry.png)

如果你使用 JSON 编辑器进行设置，请添加以下行：

```json
"telemetry.telemetryLevel": "off"
```

> [!IMPORTANT]
> 要参与 A/B 实验并抢先体验新功能，你必须通过将 `setting(telemetry.telemetryLevel)` 设置为 `all` 来启用使用数据。

## 功能可用性与遥测

VS Code 使用 A/B 实验系统在向所有用户普遍可用之前，先向部分用户子集推出新功能。这有助于我们在向所有人推出之前，验证新功能在多样化用户群体中是否按预期工作。通过参与实验，你可以帮助我们提高 VS Code 的质量，并通过早期反馈塑造产品的未来。

为了启用此实验系统，VS Code 使用使用遥测数据来确定哪些用户应该接收新功能，并验证功能的使用情况。如果你通过将 `setting(telemetry.telemetryLevel)` 设置为 `error`、`crash` 或 `off` 来禁用使用数据遥测，我们将无法评估功能的使用情况，因此实验对你来说将被禁用。因此，新功能对你推出可能会延迟，直到该功能普遍可用为止。

## 扩展与遥测

VS Code 允许你通过安装 Microsoft 和第三方扩展来为产品添加功能。这些扩展可能会收集自己的使用数据，并且不受 `setting(telemetry.telemetryLevel)` 设置的控制。请查阅特定扩展的文档以了解其遥测报告以及是否可以禁用。

扩展作者可以参考["面向扩展作者"](#for-extension-authors)部分，获取有关在其扩展中实现遥测最佳实践的指导。

## 遥测事件的输出通道

要在 VS Code 中查看遥测事件发送时的详情，请从命令面板运行**开发者：显示遥测**命令 (`kb(workbench.action.showTelemetry)`)。此命令会启用遥测事件跟踪，并在输出面板 (`kb(workbench.action.output.toggleOutput)`) 中打开**遥测**输出通道。当遥测事件发送时，输出通道会显示事件详细信息。

![输出面板日志遥测](images/telemetry/output-log-telemetry.png)

在跟踪遥测事件时，事件也会记录到本地文件 `telemetry.log` 中，你可以使用**开发者：打开日志...**命令并从下拉菜单中选择**遥测**来查看该文件。

![打开遥测日志文件](images/telemetry/open-telemetry-log.png)

要禁用跟踪遥测事件，请重新加载 VS Code 窗口（**开发者：重新加载窗口**命令）。

## 查看所有遥测事件

如果你想查看 VS Code 可能发送的所有遥测事件，可以在 CLI 中使用 `--telemetry` 标志。这将生成一个 JSON 报告，你随后可以在 VS Code 中查看。这些报告是按构建版本生成的，除非扩展作者在其根构建目录中添加了 `telemetry.json` 文件，否则不包含扩展遥测。

例如，运行 `code --telemetry > telemetry.json && code telemetry.json` 将在当前工作目录中创建一个 `telemetry.json` 文件，然后在 VS Code 中打开它。由于遥测报告的长度原因，你不能像这样通过管道输出：`code --telemetry | code -`。

以下部分详细说明了用于分类遥测、描述其用途以及指示任何特殊处理的事件元数据。

### 事件分类

`classification` 字段描述数据的类型。

* `SystemMetaData` - 由 VS Code 生成、不包含个人身份信息的值。
* `CallstackOrException` - 由程序执行失败导致的错误。这些包含已清除用户路径的堆栈跟踪。
* `PublicNonPersonalData` - 公开可用的用户生成数据，例如已发布的扩展 ID。
* `EndUserPseudonymizedInformation` - 用于标识唯一用户但无法识别用户身份的哈希值。例如，哈希化的 Mac 地址。

### 事件用途

`purpose` 字段描述收集数据的原因。

* `PerformanceAndHealth` - 确保 VS Code 产品和服务健康且快速。
* `FeatureInsight` - 了解功能使用情况以及应在何处继续进行开发投入。
* `BusinessInsight` - 为与 VS Code、Microsoft 和 GitHub 业务相关的决策提供依据。

### 事件端点

`endpoint` 字段描述数据被发送到哪个数据处理程序。这通常应用于需要额外清理和安全保护以保护用户隐私的特殊数据。

* `GoogleAnalyticsId` - 用于我们网站的 Google Analytics 和跟踪页面浏览量。这些数据以比我们普通数据更敏感的方式处理。
* `MacAddressHash` - 用于标识 VS Code 的用户。此值在客户端哈希一次，然后在管道端再次哈希，使得无法识别特定用户。在 [VS Code for the Web](/docs/remote/vscode-web.md) 上，为此情况生成 UUID。
* `none` - 数据不需要任何特殊处理。

## OpenTelemetry 对代理交互的支持

VS Code 中的 [Copilot Chat](/docs/agent-native/overview.md) 可以通过 [OpenTelemetry](https://opentelemetry.io/) (OTel) 导出跟踪、指标和事件，让你实时了解代理交互、LLM 调用、工具执行和令牌使用情况。你可以将这些遥测数据用于任何兼容 OTel 的后端。

详细了解如何[使用 OpenTelemetry 监控代理交互](https://github.com/microsoft/vscode-copilot-chat/blob/main/docs/monitoring/agent_monitoring.md)。

## GDPR 与 VS Code

除了支持通用数据保护条例 (GDPR) 之外，VS Code 团队非常重视隐私问题。无论是作为 Microsoft 公司整体，还是具体到 VS Code 团队内部，都是如此。

为确保 GDPR 合规，我们对 VS Code 进行了多项更新，包括：

* 通过在产品中为所有现有用户和新用户放置通知，使选择退出遥测收集变得更加容易。
* 审查和分类我们发送的遥测数据（记录在[我们的 OSS 代码库](https://github.com/microsoft/vscode/pull/34997)中）。
* 确保我们为收集的任何数据制定了有效的数据保留策略，例如崩溃转储。

简而言之，我们努力为所有用户做正确的事情，因为这些做法适用于所有地区，而不仅仅是欧洲。

我们预计人们会问的一个问题是查看我们收集的数据。然而，我们没有可靠的方法来实现这一点，因为 VS Code 没有可唯一标识用户的"登录"体验。我们确实会发送一些信息来帮助我们为诊断目的近似标识单个用户（这在桌面上基于网络适配器 NIC 的哈希值，在 Web 上基于随机分配的 UUID），但这不能保证是唯一的。例如，虚拟机 (VM) 经常轮换 NIC ID 或从池中分配。这种技术足以帮助我们在处理问题时工作，但不足以让我们可靠地"提供你的数据"。

随着我们对 GDPR 及用户期望的进一步了解，我们的方法预计会不断演变。我们非常感谢用户发送给我们的数据，因为它非常有价值，VS Code 也因此成为对每个人都更好的产品。再次强调，如果你担心隐私问题，我们提供了禁用发送遥测的功能，如[禁用遥测报告](#disable-telemetry-reporting)中所述。

你可以在 [Visual Studio Family Data Subject Requests for the GDPR](https://learn.microsoft.com/compliance/regulatory/gdpr-dsr-visual-studio-family) 中找到有关 Visual Studio 系列如何处理 GDPR 的更多信息。

## 管理在线服务

除了崩溃报告和遥测之外，VS Code 还出于各种其他目的使用在线服务，例如下载产品更新、查找、安装和更新扩展、设置同步或在设置编辑器中提供自然语言搜索。你可以选择打开/关闭使用这些服务的功能。

请注意，关闭这些功能并不会使 VS Code 进入离线模式。例如，如果你在**扩展**视图中搜索扩展，VS Code 仍会搜索在线 VS Code Marketplace。这些设置确保 VS Code 不会在你未请求的情况下与在线服务通信。

从**文件** > **首选项** > **设置**中，输入标签 `@tag:usesOnlineServices`。这将显示所有控制在线服务使用的设置，你可以单独打开或关闭它们。

![在线设置筛选](images/telemetry/online-settings.png)

> **注意**：VS Code 扩展也可能使用在线服务，并且可能不提供设置来配置这些在线服务的使用，或者它们可能不会注册其设置以便在搜索 `@tag:usesOnlineServices` 时显示。请查阅特定扩展的文档以了解其对在线服务的使用情况。

### VS Code 使用的非 Microsoft 在线服务

内置的 **VS Code npm 支持**扩展向 `https://registry.npmjs.org` 和 `https://registry.bower.io` 发送请求。

内置的 **TypeScript 和 JavaScript 语言功能**扩展查询 `https://registry.npmjs.org` 的 `@types` 域。

当你使用**开发者：切换开发人员工具**或**开发者：打开 Webview 开发人员工具**时，VS Code 可能会与 Google 服务器通信以获取启动开发人员工具所需的数据。

## 扩展推荐

VS Code 根据你的文件类型、工作区和环境提供扩展推荐。文件类型推荐可以是预先计算的，也可以是动态的。工作区和环境推荐始终是预先计算的。

如果你想知道某个扩展被推荐的原因，请打开该扩展的详细信息页面。你可以在页面标题中找到推荐原因。

![基于文件的扩展推荐](images/telemetry/extension-recommendation-based-on.png)

### 预先计算的推荐

VS Code 收集有关哪些扩展针对哪些文件类型以及哪些工作区/文件夹被激活的遥测数据。特定文件夹通过计算其每个 Git 远程仓库的哈希值来标识。

我们使用这些信息来预先计算匿名推荐。预先计算的推荐是指在何种条件下应该推荐某个扩展的指令。例如，当我们看到两个扩展 A 和 B 之间存在有趣的相关性时，一条指令可能是：如果用户已安装扩展 A 但未安装 B，则推荐扩展 B。

一些预先计算的推荐随产品一起发布，而其他预先计算的推荐则在运行时从 Microsoft 在线服务获取。VS Code 独立评估和执行预先计算的推荐，而不向任何在线服务发送任何用户信息。

### 动态推荐

当你打开一个文件类型，而 VS Code 对此没有预先计算的推荐时，它会向扩展市场查询声明支持此文件类型的扩展。如果查询返回了你未安装的扩展，VS Code 会提供通知。

## 面向扩展作者

请阅读[扩展指南遥测文档](/api/extension-guides/telemetry.md)。

## 相关资源

* [集中管理遥测日志级别](/docs/enterprise/telemetry.md#configure-telemetry-level) - 了解如何为你的组织设置遥测日志级别。
* [Visual Studio Code 常见问题](/docs/supporting/faq.md) - 查阅常见问题解答了解更多信息。
* [用户和工作区设置](/docs/configure/settings.md) - 了解自定义 VS Code 的可用选项。
