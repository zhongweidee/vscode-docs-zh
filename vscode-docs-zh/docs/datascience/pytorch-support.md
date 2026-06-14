---
ContentId: 7B5266AD-3D3E-491F-BD7C-B883C592D943
DateApproved: 1/9/2023
MetaDescription: 本文重点介绍了 Visual Studio Code 中可用的一些 PyTorch 功能。
MetaSocialImage: images/tutorial/python-social.png
---
# Visual Studio Code 中的 PyTorch 支持

除了对 [Jupyter Notebooks](/docs/datascience/jupyter-notebooks.md) 的支持，Visual Studio Code 还提供了许多 PyTorch 开发者特别感兴趣的功能。本文将介绍其中一些功能，并说明它们如何帮助您完成项目。如果您不熟悉 PyTorch 开发，Microsoft Learn 提供了一个[PyTorch 入门](https://learn.microsoft.com/training/paths/pytorch-fundamentals)学习路径，涵盖了使用 PyTorch 进行深度学习的基础知识。

## 张量和数据切片的数据查看器支持

VS Code 提供了一个[数据查看器](/docs/datascience/jupyter-notebooks.md#variable-explorer-and-data-viewer)，允许您浏览代码和笔记本中的变量，包括 PyTorch 和 TensorFlow 的 `Tensor` 数据类型。此外，数据查看器还支持数据切片，允许您查看高维数据的任意二维切片。

要访问数据查看器，您可以从笔记本变量资源管理器中打开它，方法是单击任何张量变量旁边显示的数据查看器图标。您还会注意到变量资源管理器也显示了张量的形状/维度。

![从变量资源管理器访问数据查看器](images/pytorch-support/variable-explorer-data-viewer.png)

或者，您也可以在 Python 调试会话中打开它，方法是在调试器中右键单击任何张量变量，然后选择**在数据查看器中查看值**。

![从 Python 调试器访问数据查看器](images/pytorch-support/debugger-data-viewer.png)

如果您有三维或更高维的数据（numpy `ndarray`、PyTorch `Tensor` 或 TensorFlow `EagerTensor` 类型），数据查看器中默认会打开一个数据切片面板。使用该面板，您可以通过输入框使用 Python 切片语法以编程方式指定切片，也可以使用交互式的**轴**和**索引**下拉菜单进行切片。

![带数据切片和张量的数据查看器](images/pytorch-support/data-slicing.png)

除了切片之外，您还可以通过在每个列名下方的筛选器中搜索 "inf" 或 "NaN" 等关键词来查找感兴趣的值。

## TensorBoard 集成

[TensorBoard](https://www.tensorflow.org/tensorboard) 是一个数据科学配套仪表板，可帮助 [PyTorch](https://pytorch.org/) 和 [TensorFlow](https://www.tensorflow.org/) 开发者可视化数据集和模型训练。通过将 TensorBoard 直接集成到 VS Code 中，您可以抽查模型预测、查看模型架构、分析模型随时间的损失和准确率变化，以及分析代码性能以找出最慢的部分。

![TensorBoard 与 VS Code 的集成](images/pytorch-support/tensorboard-integration.png)

要启动 TensorBoard 会话，请打开**命令面板**（`kb(workbench.action.showCommands)`）并搜索命令 **Python: Launch TensorBoard**。之后，系统会提示您选择 TensorBoard 日志文件所在的文件夹。默认情况下，VS Code 使用您当前的工作目录，并自动检测所有子目录中的 TensorBoard 日志文件。不过，您也可以指定自己的目录。然后，VS Code 将打开一个包含 TensorBoard 的新选项卡，并在您工作时管理其生命周期。

您也可以使用设置 `python.tensorboard.logDirectory` 为您的文件夹/工作区设置默认的 TensorBoard 日志目录。

## PyTorch Profiler 集成

除了 TensorBoard，VS Code 和 Python 扩展还集成了 PyTorch Profiler，使您能够在一个地方更好地分析您的 PyTorch 模型。有关性能分析器的更多信息，请参阅 [PyTorch Profiler 文档](https://pytorch.org/blog/introducing-pytorch-profiler-the-new-and-improved-performance-tool/)。

![PyTorch Profiler 与 VS Code 的集成](images/pytorch-support/pytorch-profiler.png)

## 通过 Pylance 语言服务器提供 IntelliSense

VS Code 中的 Python 编辑体验在 Pylance 的强大功能加持下，为 PyTorch 提供了代码补全和其他丰富的功能。为获得最佳体验，请将 PyTorch 更新到 1.10.1 版本，以获得对 nn、cuda 和 optim 等子模块的改进代码补全。

![Pylance 对 PyTorch 的支持](images/pytorch-support/pytorch-pylance.gif)
