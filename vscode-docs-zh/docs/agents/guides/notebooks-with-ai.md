---
ContentId: 101027aa-e73c-4d1b-a93f-b8ce10e1f946
DateApproved: 6/10/2026
MetaDescription: 了解如何在 Visual Studio Code 中使用 GitHub Copilot 通过 AI 编辑 Jupyter 笔记本。
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# 在 VS Code 中使用 AI 编辑 Jupyter 笔记本

Visual Studio Code 原生支持使用 [Jupyter 笔记本](/docs/datascience/jupyter-notebooks.md)以及通过 [Python 代码文件](/docs/python/jupyter-support-py.md)进行工作。VS Code 中的 AI 功能可以帮助你创建和编辑笔记本，以及分析和可视化数据。本文介绍如何使用 VS Code 中的 AI 功能来处理 Jupyter 笔记本。

## 快速搭建新笔记本

为了加速新笔记本的入门过程，你可以使用 VS Code 中的 AI 功能来快速搭建一个新笔记本。使用自然语言提供有关想要添加的功能以及想要使用的库的详细信息。

要使用 AI 创建新笔记本，请选择以下任一选项：

* 在聊天输入框中输入 `/newNotebook` 斜杠命令，后跟要创建的笔记本的详细信息。

* 选择[代理模式](vscode://GitHub.Copilot-Chat/chat?mode=agent)并输入自然语言提示，要求创建一个新笔记本。

请参阅[提示词示例](/docs/agents/guides/prompt-examples.md#working-with-jupyter-notebooks)一文，了解有效的笔记本提示词。

以下屏幕截图显示了代理模式对提示词 *创建一个 Jupyter 笔记本来读取 #housing.csv 中的数据*（你可以从 [Kaggle](https://www.kaggle.com/search?q=housing+dataset+in%3Adatasets) 获取此数据集）的输出：

![屏幕截图，显示由代理模式创建的新笔记本，该笔记本读取工作区中的 'housing.csv' 文件。](../images/notebooks-with-ai/agent-mode-create-new-notebook.png)

请注意，系统会创建一个新的 `.ipynb` 文件，其中包含用于读取 CSV 文件并显示数据前几行的 Markdown 和代码单元格。

现在，你可以手动进一步编辑笔记本，或使用 AI 进行内联编辑或发送后续聊天请求来修改笔记本。

## 在笔记本单元格中进行内联编辑

如果你已经有一个笔记本并且想要在单元格中进行一些内联更改，可以使用内联聊天，就像在代码文件中一样。

要在单元格中进行内联编辑，请按 `kb(notebook.cell.chat.start)`。这将打开内联聊天视图，你可以在其中输入提示词。

> [!TIP]
> 你可以在聊天提示词中引用内核变量。输入 `#` 后跟变量名称即可引用它。例如，如果你有一个名为 `df` 的变量，可以在聊天提示词中输入 `#df` 来引用它。

![屏幕截图，显示笔记本单元格中的内联聊天视图。](../images/notebooks-with-ai/notebook-inline-chat.png)

生成响应后，请注意笔记本单元格中的代码已更新。你可以**接受**更改，并决定**接受并运行**单元格更改。

要使用 AI 生成新单元格，请选择笔记本视图中的**生成**按钮，或者不聚焦在任何单元格上并按 `kb(notebook.cell.chat.start)` 来打开新单元格的内联聊天视图。

## 跨多个单元格进行编辑

要进行跨多个单元格的较大规模编辑，你可以切换到在聊天视图中使用[代理模式](vscode://GitHub.Copilot-Chat/chat?mode=agent)。提供提示词以请求对笔记本进行更改，代理模式将遍历各项任务来实现这些更改。

![屏幕截图，显示聊天对提示词“绘制价格分布的图表”的响应。](../images/notebooks-with-ai/notebook-agent-mode-plot-prices.png)

请注意，你可以使用叠加控件在不同的编辑建议之间导航，以及保留或撤销更改。

## 询问有关笔记本内容的问题

你可以使用聊天界面来询问有关笔记本内容的问题。这对于获取代码、数据或可视化的说明非常有用。你可以为聊天请求添加额外的上下文，例如单元格输出、图表或错误。

以下示例展示了如何询问有关笔记本中可视化内容的问题。

1. 选择图表旁边的 `...`，然后选择**将单元格输出添加到聊天**，将图表作为上下文添加到你的聊天请求中。

    ![屏幕截图，显示笔记本单元格中图表的上下文菜单。](../images/notebooks-with-ai/notebook-ask-mode-add-cell-output.png)

1. 在聊天输入字段中输入提示词*解释这个图表*。

    请注意，你会得到该图表的详细解释。

    ![屏幕截图，显示聊天对提示词“解释这个图表”的响应。](../images/notebooks-with-ai/notebook-ask-mode-explain-chart.png)

## 执行数据分析和可视化

你可以通过在聊天中使用代理模式来完成对数据集的完整数据分析和可视化笔记本。代理模式会分析数据集，然后搭建一个新笔记本，实现用于执行数据分析的代码，并运行单元格来处理和可视化数据。根据需要，代理模式会调用相关的工具和终端命令来完成其任务。

例如，要对住房数据集执行数据分析：

1. 从聊天视图的代理模式选择器中选择[代理模式](vscode://GitHub.Copilot-Chat/chat?mode=agent)。

1. 在聊天输入字段中输入以下提示词：*对 #housing.csv 中的数据进行数据分析*。

    请注意，代理模式会遍历不同的任务。在需要时，批准工具和命令的调用。
1. 结果是一个新笔记本，其中包含对数据集的完整数据分析，包括数据清洗、数据可视化和统计分析。

    ![屏幕截图，显示聊天对提示词“对 housing.csv 中的数据进行数据分析”的响应。](../images/notebooks-with-ai/notebook-agent-mode-data-analysis.png)

现在，你可以手动进一步编辑笔记本，或使用 AI 进行内联编辑或发送后续聊天请求来修改笔记本。

## 后续步骤

* [详细了解 VS Code 中的 Jupyter 笔记本](/docs/datascience/jupyter-notebooks.md)
* [详细了解 VS Code 中的 AI 功能](/docs/copilot/overview.md)
* [详细了解 VS Code 中的聊天功能](/docs/chat/chat-overview.md)
