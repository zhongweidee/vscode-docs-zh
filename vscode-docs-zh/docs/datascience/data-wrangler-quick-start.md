---
ContentId: 0227288a-2698-47bd-b97a-3a1736acb473
DateApproved: 04/04/2024
MetaDescription: 帮助你在 Visual Studio Code 中快速上手使用 Data Wrangler 扩展的快速入门指南。
---
# VS Code 中 Data Wrangler 快速入门指南

[Data Wrangler](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.datawrangler) 是一款以代码为中心的数据查看和清理工具，集成在 VS Code 和 VS Code Jupyter Notebook 中。它提供了丰富的用户界面来查看和分析数据，展示有洞察力的列统计信息和可视化图表，并在你清理和转换数据时自动生成 Pandas 代码。

下面是一个从 Notebook 中打开 Data Wrangler，使用内置操作分析和清理数据，然后将自动生成的代码导出回 Notebook 的示例。

![a gif of opening Data Wrangler from a notebook, looking through the data, switching from Viewing to Editing mode, applying data transformations, and exporting the generated Python code back into the notebook](images/data-wrangler-quick-start/full-dw-loop.gif)

本页面的目标是帮助你快速上手使用 Data Wrangler。

## 配置你的环境

1. 如果你尚未安装，请安装 [Python](https://www.python.org/downloads/)
   （**注意：** Data Wrangler 仅支持 Python 3.8 或更高版本）。
2. <a class="install-extension-btn" href="vscode:extension/ms-toolsai.datawrangler">安装 Data Wrangler 扩展</a>

当你首次启动 Data Wrangler 时，它会询问你要连接到哪个 Python 内核。它还会检查你的计算机和环境，以确认是否安装了所需的 Python 包（例如 Pandas）。

## 打开 Data Wrangler

无论何时使用 Data Wrangler，你都处于一个*沙盒*环境中，这意味着你可以安全地探索和转换数据。在你明确导出更改之前，原始数据集不会被修改。

### 从 Jupyter Notebook 启动 Data Wrangler

如果你的 Notebook 中有 Pandas 数据框，当你运行 `df.head()`、`df.tail()`、`display(df)`、`print(df)` 或 `df` 中的任意代码后，单元格底部会出现一个 **在 Data Wrangler 中打开 'df'** 按钮（其中 `df` 是你的数据框的变量名）。

![a screenshot showing the entry point into Data Wrangler from a notebook](images/data-wrangler-quick-start/entrypoint-quick-start.png)

### 直接从文件启动 Data Wrangler

你也可以直接从本地文件（例如 `.csv` 文件）启动 Data Wrangler。为此，请在 VS Code 中打开包含你要打开文件的文件夹。在文件资源管理器视图中，右键单击该文件并点击**在 Data Wrangler 中打开**。

![a screenshot showing the entry point into Data Wrangler from a file](images/data-wrangler-quick-start/open-from-file.png)

## 用户界面导览

Data Wrangler 在处理数据时有两种模式。每种模式的详细信息将在后续章节中说明。

1. **查看模式：** 查看模式优化了界面，方便你快速查看、筛选和排序数据。此模式非常适合对数据集进行初步探索。
2. **编辑模式：** 编辑模式优化了界面，方便你对数据集应用转换、清理或修改操作。在界面中应用这些转换时，Data Wrangler 会自动生成相应的 Pandas 代码，这些代码可以导出回 Notebook 以便重用。

注意：默认情况下，Data Wrangler 以查看模式打开。你可以在设置编辑器 `kb(workbench.settings.dataWrangler.startInEditModeForNotebookEntrypoints)` 中更改此行为。

### 查看模式界面

![a screenshot showing the different components in the UI for Data Wrangler in Viewing mode](images/data-wrangler-quick-start/view-mode-ui.png)

1. **数据摘要**面板显示整个数据集或所选列的详细摘要统计信息。

2. 你可以通过列标题菜单对列应用**数据筛选/排序**。

3. 在 Data Wrangler 的**查看**或**编辑**模式之间切换，以访问内置的数据操作。

4. **快速见解**标题栏可以让你快速查看每列的有价值信息。根据列的数据类型不同，快速见解会显示数据的分布情况或数据点的频率，以及缺失值和不同值的数量。

5. **数据网格**提供了一个可滚动的窗格，你可以在其中查看整个数据集。

---

### 编辑模式界面

切换到编辑模式会在 Data Wrangler 中启用额外的功能和用户界面元素。在以下截图中，我们使用 Data Wrangler 将最后一列中的缺失值替换为该列的中位数。

![a screenshot showing the different components in the UI for Data Wrangler in Editing mode](images/data-wrangler-quick-start/edit-mode-ui.png)

1. **操作**面板是你可以搜索 Data Wrangler 所有内置数据操作的地方。这些操作按类别组织。

2. **清理步骤**面板显示了所有之前已应用操作的列表。它允许用户撤销特定操作或编辑*最近*的操作。选择一个步骤会在数据网格中高亮显示更改，并显示与该操作关联的生成代码。

3. **导出菜单**让你可以将代码导出回 Jupyter Notebook，或将数据导出到新文件。

4. 当你选择了一个操作并预览其对数据的影响时，网格上会叠加显示你对数据所做更改的**数据差异**视图。

5. **代码预览**部分显示在选择某个操作时 Data Wrangler 生成的 Python 和 Pandas 代码。当没有选择操作时，该部分保持为空。你可以编辑生成的代码，这会使数据网格高亮显示对数据的影响。

## 示例：替换数据集中的缺失值

处理数据中存在的缺失值是常见的数据清理任务之一。以下示例展示了如何使用 Data Wrangler 将列中的缺失值替换为该列的中位数。在通过界面完成转换的同时，Data Wrangler 还会自动生成替换缺失值所需的 Python 和 Pandas 代码。

![an example of using Data Wrangler to replace missing values in your dataset](images/data-wrangler-quick-start/operation-example.gif)

1. 在**操作面板**中，搜索**填充缺失值**操作。
2. 在参数中指定你希望用什么值来替换缺失值。在这个例子中，我们将用该列的中位数来替换缺失值。
3. 验证数据网格是否在数据差异中显示了正确的更改。
4. 验证 Data Wrangler 生成的代码是否符合你的预期。
5. 应用该操作，它将被添加到你的清理步骤历史记录中。

## 后续步骤

本页面介绍了如何快速入门使用 Data Wrangler。有关 Data Wrangler 的完整文档和教程，包括 Data Wrangler 当前支持的所有内置操作，请参阅以下页面。

[使用 Data Wrangler](/docs/datascience/data-wrangler.md)
