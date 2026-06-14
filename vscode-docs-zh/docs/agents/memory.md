---
ContentId: 3a7e9c4f-5d1b-4e8f-a2c6-8b0d3f5e7a9c
DateApproved: 6/10/2026
MetaDescription: 了解 VS Code 中的智能体如何使用记忆工具和 Copilot Memory 来保留上下文、学习偏好，并在对话过程中不断改进。
MetaSocialImage: ../images/shared/github-copilot-social.png
---

# VS Code 智能体的记忆功能

Visual Studio Code 中的智能体使用记忆功能在对话之间保留上下文。智能体不再每次会话都从零开始，而是会回忆你的偏好、应用之前任务中的经验教训，并随着时间推移积累对代码库的了解。

有关记忆功能如何融入智能体架构的背景信息，请参阅[智能体概念](/docs/agents/concepts/agents.md#memory)。

本文介绍了如何在 VS Code 中使用记忆工具、如何管理记忆文件，以及 Copilot Memory 如何将记忆功能扩展到整个开发工作流中。

## 记忆工具

> [!NOTE]
> 记忆工具目前处于预览阶段。

记忆工具是一个内置的智能体工具，允许智能体在工作时保存和回忆笔记。你也可以明确要求智能体记住某些内容。所有数据都存储在本地机器上。

### 记忆作用域

每个作用域都有不同的用途，具体取决于信息的持久时间和适用范围。

| 作用域 | 路径 | 跨会话持久 | 跨工作区持久 | 用途 |
|---|---|---|---|---|
| **用户** | `/memories/` | 是 | 是 | 偏好设置、编码模式、常用命令 |
| **仓库** | `/memories/repo/` | 是 | 否（工作区作用域） | 代码库约定、项目结构、构建命令 |
| **会话** | `/memories/session/` | 否（聊天结束时清除） | 否 | 特定任务上下文、进行中的计划 |

#### 用户记忆

用户记忆在所有工作区和对话中持久保留。每次会话开始时，前 200 行会自动加载到智能体的上下文中。用户记忆适用于通用偏好和见解，无论你在哪个项目中工作都适用。

例如，要求智能体记住某个编码偏好：

```prompt
Remember that I prefer tabs over spaces and always use single quotes in JavaScript
```

在后续对话中，即使是在不同的工作区，智能体也会回忆起这个偏好并将其应用于生成的代码。

#### 仓库记忆

仓库记忆的作用域限定为当前工作区，并在该工作区的各次对话中持久保留。仓库记忆适用于特定代码库的信息，例如架构决策、命名约定或构建命令。

例如：

```prompt
Remember that this project uses the repository pattern for data access and all API endpoints require authentication
```

#### 会话记忆

会话记忆的作用域限定为当前对话，并在对话结束时清除。会话记忆适用于临时工作笔记或智能体在执行多步骤任务时跟踪的特定任务上下文。

计划智能体使用会话记忆将其实现计划持久保存到 `plan.md` 文件中。该计划在会话期间可用，并可通过**聊天：显示记忆文件**命令查看，但在后续会话中不可用。详细了解[智能体计划功能](/docs/agents/planning.md)。

### 存储和检索记忆

要存储记忆，只需用自然语言要求智能体记住某些内容。智能体会确定合适的记忆作用域，并创建或更新相应的记忆文件。

```prompt
Remember that our team uses conventional commits for all commit messages
```

要检索记忆，只需在新的对话中询问相关内容。智能体会检查其记忆文件并回忆相关信息。

```prompt
What are our commit message conventions?
```

智能体聊天回复中的记忆文件引用是可点击的，因此你可以直接查看记忆文件的内容。

### 管理记忆文件

VS Code 提供了用于查看和管理记忆文件的命令：

* **聊天：显示记忆文件**：打开所有作用域中记忆文件的列表。选择一个文件即可查看其内容。
* **聊天：清除所有记忆文件**：删除所有作用域中的所有记忆文件。

> [!NOTE]
> 不支持单独删除记忆文件。使用**聊天：清除所有记忆文件**来删除所有记忆，或要求智能体更新特定的记忆文件以删除过时的信息。

## Copilot Memory

> [!NOTE]
> Copilot Memory 处于预览阶段，与上述本地记忆工具是独立的功能。

[Copilot Memory](https://docs.github.com/copilot/how-tos/use-copilot-agents/copilot-memory) 是一个由 GitHub 托管的记忆系统，允许 Copilot 在工作时学习和保留特定仓库的见解。与本地记忆工具不同，Copilot Memory 在多个 GitHub Copilot 界面之间共享，包括 Copilot 云端智能体、Copilot 代码审查以及 Copilot CLI。

### Copilot Memory 的工作原理

当 Copilot 智能体在你的仓库中工作时，它们会自动捕获称为"记忆"的精准见解。这些记忆具有以下特点：

* **仓库作用域**：记忆与特定仓库绑定，只能由具有写入权限的贡献者创建。
* **跨智能体共享**：一个 Copilot 智能体学到的内容可供其他智能体使用。例如，Copilot 代码审查发现的模式可以后续指导 Copilot 云端智能体。
* **使用前验证**：智能体会根据当前代码库验证记忆后再应用，防止过时或不正确的信息影响结果。
* **自动过期**：记忆会在 28 天后自动删除，以避免使用过时的信息。

### 启用 Copilot Memory

Copilot Memory 默认处于关闭状态，必须在 GitHub 设置中启用：

* **个人用户**（Copilot Pro 或 Pro+）：在 GitHub 上的[个人 Copilot 设置](https://github.com/settings/copilot)中启用 Copilot Memory。
* **组织和企业**：通过组织或企业设置中的策略设置启用。

仓库所有者可以在**仓库设置** > **Copilot** > **Memory** 中查看和删除存储的记忆。

有关详细的设置说明，请参阅 GitHub 文档中的[启用和管理 Copilot Memory](https://docs.github.com/copilot/how-tos/use-copilot-agents/copilot-memory)。

### 记忆工具与 Copilot Memory 对比

| | 记忆工具 | Copilot Memory |
|---|---|---|
| **存储** | 本地（机器上） | GitHub 托管（远程） |
| **作用域** | 用户、仓库、会话 | 仅仓库 |
| **跨 Copilot 界面共享** | 否（仅 VS Code） | 是（编码智能体、代码审查、CLI） |
| **创建方式** | 你或智能体在聊天中创建 | Copilot 智能体自动创建 |
| **默认启用** | 是 | 否（需主动选择） |
| **过期机制** | 手动管理 | 自动（28 天） |

这两个系统是互补的。使用本地记忆工具来管理 VS Code 中的个人偏好和会话特定上下文。使用 Copilot Memory 来管理对所有 Copilot 智能体在整个开发工作流中都有益的仓库知识。

## 相关资源

* [智能体计划功能](/docs/agents/planning.md)
* [智能体工具](/docs/chat/chat-tools.md)
* [启用和管理 Copilot Memory](https://docs.github.com/copilot/how-tos/use-copilot-agents/copilot-memory)（GitHub 文档）
* [为 GitHub Copilot 构建智能体记忆系统](https://github.blog/ai-and-ml/github-copilot/building-an-agentic-memory-system-for-github-copilot/)（GitHub 博客）
