---
ContentId: 47979929-10b2-4e4d-acf3-00b32893ad1b
DateApproved: 1/9/2023
MetaDescription: 了解如何使用 Visual Studio Code 扩展在 Azure 机器学习中构建机器学习应用程序
MetaSocialImage: images/tutorial/python-social.png
---
# VS Code 中的 Azure 机器学习

Azure 机器学习是一个基于云的环境，可用于训练、部署、自动化、管理和跟踪机器学习模型。有关 Azure 机器学习的更多信息，请参阅[什么是 Azure 机器学习？](https://learn.microsoft.com/azure/machine-learning/overview-what-is-azure-machine-learning)

[Azure 机器学习](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.vscode-ai) VS Code 扩展使你可以使用 Visual Studio Code 中熟悉的特性来开发机器学习应用程序。

![Azure Machine Learning Visual Studio Code extension view](images/azure-machine-learning/azure-machine-learning-vscode-extension.png)

## 桌面版或 Web 版

你可以在 VS Code 桌面版或 [Web 版 VS Code](/docs/remote/vscode-web.md) 中使用 Azure 机器学习。Web 版 VS Code 提供了完全在浏览器中运行的免费、零安装的 VS Code 体验，访问地址为 [https://vscode.dev](https://vscode.dev)。请查看[启动 Azure 机器学习的指南](https://learn.microsoft.com/azure/machine-learning/how-to-launch-vs-code-remote?view=azureml-api-2&tabs=vscode-web)以了解更多信息。

## 连接到远程计算实例

[计算实例](https://learn.microsoft.com/azure/machine-learning/concept-compute-instance)是用于开发机器学习应用程序的托管式云端工作站。

Azure 机器学习 VS Code 扩展让你可以轻松地实时连接和访问计算实例中的资源。有关更多信息，请参阅[连接到 Azure 机器学习计算实例](https://learn.microsoft.com/azure/machine-learning/how-to-set-up-vs-code-remote?tabs=extension)。

## Azure 机器学习 2.0 CLI 支持（预览版）

Azure 机器学习 2.0 CLI 使你可以从命令行训练和部署模型。其功能可加速数据科学的扩展和推广，同时跟踪模型生命周期。

当你使用 Azure 机器学习规范文件时，VS Code 扩展提供对以下功能的支持：

- 规范文件编写
- 语言支持
- 资源自动补全

### 规范文件编写

使用命令面板 (`kb(workbench.action.showCommands)`) 中的 **Azure ML** 命令或 VS Code 中的 Azure 机器学习视图来简化规范文件的编写过程。

![Azure Machine Learning YAML specification file authoring](images/azure-machine-learning/specification-file-authoring.gif)

### 语言支持

Azure 机器学习扩展会将所有值与默认工作区中的资源进行交叉引用。如果扩展检测到错误指定的资源或缺少的属性，则会显示内联错误。

![Azure Machine Learning specification file language support](images/azure-machine-learning/language-support.gif)

### 资源自动补全

当你开始使用资源时，你会发现 Azure 机器学习扩展可以检查规范文件。该扩展使用你指定的默认工作区来为该工作区中的资源提供自动补全支持。

![Azure Machine Learning resource autocompletion](images/azure-machine-learning/resource-autocompletion.gif)

## 训练机器学习模型

在 Azure 机器学习中，你可以使用流行的框架来训练机器学习模型，例如 scikit-learn、PyTorch、TensorFlow 等。该扩展让提交和跟踪这些模型的生命周期变得轻松。

有关更多信息，请参阅[训练机器学习模型教程](https://learn.microsoft.com/azure/machine-learning/tutorial-train-deploy-image-classification-model-vscode)。

## 管理资源

你可以直接在 VS Code 中创建和管理 Azure 机器学习资源。有关更多信息，请参阅[如何在 VS Code 中管理资源](https://learn.microsoft.com/azure/machine-learning/how-to-manage-resources-vscode)。

## 远程 Jupyter 服务器

VS Code 为使用 Jupyter 笔记本进行开发提供了出色的支持。有关更多信息，请参阅 [VS Code 中的 Jupyter 笔记本](/docs/datascience/jupyter-notebooks.md)。

Azure 机器学习充分利用了 VS Code 强大的 Jupyter 笔记本支持。它使得连接到远程计算实例并将其用作远程 Jupyter 服务器变得无缝。有关更多信息，请参阅[将计算实例配置为远程笔记本服务器](https://learn.microsoft.com/azure/machine-learning/how-to-set-up-vs-code-remote?tabs=extension)。

## Git 集成

通过使用 Azure 机器学习 VS Code 扩展连接到远程计算实例，你将能够使用 VS Code 内置的 Git 支持。

## 后续步骤

- [设置 Azure 机器学习扩展](https://learn.microsoft.com/azure/machine-learning/how-to-setup-vs-code)
- [与 Azure 机器学习交互（桌面版或 Web 版）](https://learn.microsoft.com/azure/machine-learning/how-to-launch-vs-code-remote?view=azureml-api-2&tabs=vscode-web)
