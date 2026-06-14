---
ContentId: 8488ca7b-6f92-4894-9029-1bae431784e9
DateApproved: 04/04/2024
MetaDescription: Visual Studio Code 中 Data Wrangler 扩展的完整文档。
---
# VS Code 中的 Data Wrangler 入门

[Data Wrangler](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.datawrangler) 是一个以代码为中心的数据查看和清理工具，已集成到 VS Code 和 VS Code Jupyter Notebook 中。它提供了丰富的用户界面来查看和分析数据，显示有洞察力的列统计信息和可视化图表，并在您清理和转换数据时自动生成 Pandas 代码。

以下示例展示了从 Notebook 中打开 Data Wrangler，使用内置操作分析和清理数据，然后将自动生成的代码导出回 Notebook 的过程。

![a gif of opening Data Wrangler from a notebook, looking through the data, switching from Viewing to Editing mode, applying data transformations, and exporting the generated Python code back into the notebook](images/data-wrangler/full-dw-loop.gif)


本文档涵盖以下内容：

-   安装和设置 Data Wrangler
-   从 Notebook 启动 Data Wrangler
-   从数据文件启动 Data Wrangler
-   使用 Data Wrangler 探索数据
-   使用 Data Wrangler 对数据执行操作和清理
-   编辑数据整理代码并将其导出到 Notebook
-   问题排查和提供反馈

## 设置您的环境

1. 如果尚未安装，请安装 [Python](https://www.python.org/downloads/)。
   **重要提示：** Data Wrangler 仅支持 Python 3.8 或更高版本。
2. 安装 [Visual Studio Code](https://code.visualstudio.com/download)。
3. <a class="install-extension-btn" href="vscode:extension/ms-toolsai.datawrangler">安装 Data Wrangler 扩展</a>

首次启动 Data Wrangler 时，它会询问您要连接到哪个 Python 内核。它还会检查您的机器和环境，以确认是否安装了所需的 Python 包，例如 Pandas。

以下是 Python 和 Python 包所需的版本要求，以及它们是否由 Data Wrangler 自动安装：

| 名称   | 最低要求版本 | 自动安装 |
| ------ | ------------ | -------- |
| Python | 3.8          | 否       |
| pandas | 0.25.2       | 是       |

如果在您的环境中未找到这些依赖项，Data Wrangler 将尝试使用 `pip` 为您安装它们。如果 Data Wrangler 无法安装这些依赖项，最简单的变通方法是手动运行 `pip install`，然后重新启动 Data Wrangler。这些依赖项是 Data Wrangler 所必需的，以便它能生成 Python 和 Pandas 代码。

## 打开 Data Wrangler
在 Data Wrangler 中操作时，您始终处于*沙盒*环境中，这意味着您可以安全地探索和转换数据。原始数据集在您明确导出更改之前不会被修改。

### 从 Jupyter Notebook 启动 Data Wrangler

从 Jupyter Notebook 启动 Data Wrangler 有三种方式

![a screenshot showing the entry point into Data Wrangler from a notebook](images/data-wrangler/entrypoint-full.png)

1. 在 **Jupyter** > **Variables** 面板中，在任何受支持的数据对象旁边，您可以看到一个用于启动 Data Wrangler 的按钮。
2. 如果您的 Notebook 中有 Pandas DataFrame，在运行输出 DataFrame 的代码后，您可以在单元格底部看到一个**在 Data Wrangler 中打开 'df'** 按钮（其中 'df' 是您的 DataFrame 的变量名）。这包括 1) `df.head()`、2) `df.tail()`、3) `display(df)`、4) `print(df)`、5) `df`。
3. 在 Notebook 工具栏中，选择**查看数据**会弹出 Notebook 中所有受支持数据对象的列表。然后您可以选择要在 Data Wrangler 中打开哪个变量。

### 直接从文件启动 Data Wrangler

您也可以直接从本地文件（例如 `.csv` 文件）启动 Data Wrangler。为此，请在 VS Code 中打开包含您要打开的文件的文件夹。在文件资源管理器视图中，右键单击文件并单击**在 Data Wrangler 中打开**。

![a screenshot showing the entry point into Data Wrangler from a file](images/data-wrangler/open-from-file.png)

Data Wrangler 目前支持以下文件类型
- `.csv`/`.tsv`
- `.xls`/`.xlsx`
- `.parquet`

根据文件类型，您可以指定文件的分隔符和/或工作表。

![a screenshot showing the parameters you can set in Data Wrangler when opening directly from a file](images/data-wrangler/csv-parameters.png)

您也可以将这些文件类型设置为默认使用 Data Wrangler 打开。

## 界面导览

在处理数据时，Data Wrangler 有两种模式。每种模式的详细信息将在下面的后续章节中说明。

1. **查看模式：** 查看模式优化了界面，使您可以快速查看、筛选和排序数据。此模式非常适合对数据集进行初步探索。
2. **编辑模式：** 编辑模式优化了界面，使您可以对数据集应用转换、清理或修改操作。当您在界面中应用这些转换时，Data Wrangler 会自动生成相关的 Pandas 代码，这些代码可以导出回您的 Notebook 以供复用。

注意：默认情况下，Data Wrangler 以查看模式打开。您可以在设置编辑器 `kb(workbench.settings.dataWrangler.startInEditModeForNotebookEntrypoints)` 中更改此行为。

![a screenshot of the setting in Visual Studio Code for setting the default mode of Data Wrangler](images/data-wrangler/edit-view-mode-default.png)

### 查看模式界面

![a screenshot showing the different components in the UI for Data Wrangler in Viewing mode](images/data-wrangler/view-mode-ui.png)

1. **数据摘要**面板显示整个数据集或所选列的详细汇总统计信息。

2. 您可以从列的标题菜单中对列应用任何**数据筛选/排序**。

3. 在 Data Wrangler 的**查看**或**编辑**模式之间切换，以访问内置的数据操作。

4. **快速洞察**标题区域可以让您快速查看每列的有价值信息。根据列的数据类型，快速洞察会显示数据分布或数据点的频率，以及缺失值和不同值的数量。

5. **数据网格**提供了一个可滚动的面板，您可以在其中查看整个数据集。

---

### 编辑模式界面

切换到编辑模式会启用 Data Wrangler 中的额外功能和用户界面元素。在以下截图截图中，我们使用 Data Wrangler 将最后一列中的缺失值替换为该列的中位数。

![a screenshot showing the different components in the UI for Data Wrangler in Editing mode](images/data-wrangler/edit-mode-ui.png)

1. **操作**面板是您可以搜索 Data Wrangler 所有内置数据操作的地方。这些操作按类别组织。

2. **清理步骤**面板显示所有先前应用的操作列表。它允许用户撤销特定操作或编辑*最近*的操作。选择一个步骤将在数据差异视图中高亮显示更改，并显示与该操作相关联的生成代码。

3. **导出菜单**允许您将代码导出回 Jupyter Notebook 或将数据导出为新文件。

4. 当您选择了一个操作并正在预览其对数据的效果时，网格将覆盖一层**数据差异**视图，显示您对数据所做的更改。

5. **代码预览**部分显示当选择了某个操作时 Data Wrangler 生成的 Python 和 Pandas 代码。当未选择任何操作时，它保持为空。您可以编辑生成的代码，这会导致数据网格高亮显示对数据的效果。

## Data Wrangler 操作

内置的 Data Wrangler 操作可以从**操作**面板中选择。

![a screenshot of the Data Wrangler Operations panel](images/data-wrangler/operations.gif)

下表列出了 Data Wrangler 初始版本中当前支持的操作。我们计划在不久的将来添加更多操作。

| 操作                           | 描述                                                                           |
| ------------------------------ | ------------------------------------------------------------------------------ |
| 排序                           | 按升序或降序排序列                                                             |
| 筛选                           | 根据一个或多个条件筛选行                                                       |
| 计算文本长度                   | 创建一个新列，其值等于文本列中每个字符串值的长度                               |
| One-hot 编码                   | 将分类数据拆分为每个类别一个新列                                               |
| 多标签二值化器                 | 使用分隔符将分类数据拆分为每个类别一个新列                                     |
| 从公式创建列                   | 使用自定义 Python 公式创建列                                                   |
| 更改列类型                     | 更改列的数据类型                                                               |
| 删除列                         | 删除一个或多个列                                                               |
| 选择列                         | 选择要保留的一个或多个列，并删除其余列                                         |
| 重命名列                       | 重命名一个或多个列                                                             |
| 克隆列                         | 创建一个或多个列的副本                                                         |
| 删除缺失值                     | 删除包含缺失值的行                                                             |
| 删除重复行                     | 删除在一个或多个列中具有重复值的所有行                                         |
| 填充缺失值                     | 用新值替换包含缺失值的单元格                                                   |
| 查找和替换                     | 用匹配的模式替换单元格                                                         |
| 按列分组并聚合                 | 按列分组并聚合结果                                                             |
| 去除空白字符                   | 删除文本开头和结尾的空白字符                                                   |
| 拆分文本                       | 根据用户定义的分隔符将一列拆分为多列                                           |
| 首字母大写                     | 将第一个字符转换为大写，其余转换为小写                                         |
| 将文本转换为小写               | 将文本转换为小写                                                               |
| 将文本转换为大写               | 将文本转换为大写                                                               |
| 按示例进行字符串转换           | 当从您提供的示例中检测到模式时，自动执行字符串转换                             |
| 按示例进行日期时间格式化       | 当从您提供的示例中检测到模式时，自动执行 DateTime 格式化                       |
| 按示例创建新列                 | 当从您提供的示例中检测到模式时，自动创建一列                                   |
| 缩放最小/最大值                | 将数值列缩放到最小值和最大值之间                                               |
| 四舍五入                       | 将数字四舍五入到指定的小数位数 |
| 向下取整（floor）              | 将数字向下舍入到最接近的整数 |
| 向上取整（ceiling）            | 将数字向上舍入到最接近的整数 |
| 自定义操作                     | 基于示例和现有列的推导自动创建新列                                             |

如果有缺失且您希望在 Data Wrangler 中受支持的操作，请在我们的 [Data Wrangler GitHub 仓库](https://github.com/microsoft/vscode-data-wrangler/issues)中提交功能请求。

## 修改之前的步骤

生成的代码的每个步骤都可以通过**清理步骤**面板进行修改。首先，选择您要修改的步骤。然后，当您对操作进行更改时（通过代码或操作面板），您的更改对数据的效果会在网格视图中高亮显示。

![a screenshot showing how to modify previous steps](images/data-wrangler/update-previous-step.gif)

## 编辑和导出代码

在 Data Wrangler 中完成数据清理步骤后，有三种方式从 Data Wrangler 导出您清理后的数据集。

1. **将代码导出回 Notebook 并退出：** 这会在您的 Jupyter Notebook 中创建一个新单元格，其中包含您生成的所有数据清理代码，并打包为一个 Python 函数。
2. **将数据导出到文件：** 这将清理后的数据集保存为您机器上的新 CSV 或 Parquet 文件。
3. **将代码复制到剪贴板：** 这将复制 Data Wrangler 为数据清理操作生成的所有代码。

![a screenshot of the export menu in Data Wrangler](images/data-wrangler/export-menu.png)

## 搜索列

要在数据集中查找特定列，请从 Data Wrangler 工具栏中选择**转到列**并搜索相应的列。

![a screenshot of the search for columns feature](images/data-wrangler/go-to-column.gif)

## 问题排查

### 一般内核连接问题

对于一般的连接问题，请参阅上文"连接到 Python 内核"部分了解替代连接方法。要调试与本地 Python 解释器选项相关的问题，一种可能的解决方法是安装不同版本的 Jupyter 和 Python 扩展。例如，如果安装了稳定版扩展，您可以安装预发布版本（反之亦然）。

要清除已缓存的内核，您可以从命令面板 `kb(workbench.action.showCommands)` 运行 `Data Wrangler: Clear cached runtime` 命令。

### 打开数据文件时出现 `UnicodeDecodeError`

如果您直接从 Data Wrangler 打开数据文件时遇到 `UnicodeDecodeError`，则可能是由以下两个问题引起的：

1. 您尝试打开的文件具有除 `UTF-8` 之外的编码
2. 文件已损坏。

要解决此错误，您需要从 Jupyter Notebook 而不是直接从数据文件打开 Data Wrangler。使用 Jupyter Notebook 通过 Pandas 读取文件，例如使用 [read_csv](https://pandas.pydata.org/docs/reference/api/pandas.read_csv.html) 方法。在 `read` 方法中，使用 `encoding` 和/或 `encoding_errors` 参数来定义要使用的编码或如何处理编码错误。如果您不知道哪种编码可能适用于此文件，可以尝试使用诸如 [chardet](https://github.com/chardet/chardet) 之类的库来推断可用的编码。

## 问题与反馈

如果您遇到问题、有功能请求或有任何其他反馈，请在我们的 GitHub 仓库提交 Issue：[https://github.com/microsoft/vscode-data-wrangler/issues/new/choose](https://github.com/microsoft/vscode-data-wrangler/issues/new/choose)

## 数据与遥测

Microsoft Data Wrangler for Visual Studio Code 扩展会收集使用数据并将其发送给 Microsoft，以帮助改进我们的产品和服务。阅读我们的[隐私声明](https://go.microsoft.com/fwlink/?LinkId=521839)了解更多信息。此扩展遵循 `telemetry.telemetryLevel` 设置，您可以在 https://code.visualstudio.com/docs/configure/telemetry 了解更多信息。
