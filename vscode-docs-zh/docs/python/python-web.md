---
ContentId: 366e4bbf-fa87-4813-9dfc-6c831b20a4d2
DateApproved: 02/04/2026
MetaDescription: 在 Web 上运行和调试 Python 代码。
---
# 在 Web 上运行和调试 Python

我们很高兴地宣布，在 Web 上运行 Python 代码的**实验性**支持现已可用。要试用此功能，请从 Marketplace 安装最新预发布版本的 [Experimental - Python for the Web](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-python-web-wasm) 扩展。此功能基于 Python 中的 WASM 实现，该技术目前仍在开发中。要了解更多关于其工作原理和最新进展的信息，可以阅读[将 Python 编译为 WebAssembly (WASM)](https://pythondev.readthedocs.io/wasm.html)。

## 先决条件

使用此扩展需要满足以下先决条件：

* 需要安装 [GitHub Repositories](https://marketplace.visualstudio.com/items?itemName=GitHub.remotehub) 扩展。
* 需要通过 GitHub 进行身份验证。
* 需要使用支持[跨源隔离](https://developer.chrome.com/docs/extensions/mv3/cross-origin-isolation/)的浏览器。此扩展已在 Microsoft Edge 和 Google Chrome 浏览器上进行了测试。
* 需要使用 [VS Code for the Web](/docs/remote/vscode-web.md) 的 Insiders 版本（例如 `https://insiders.vscode.dev/`）
* 源代码必须托管在本地文件系统上，或通过 [GitHub Repositories](https://marketplace.visualstudio.com/items?itemName=GitHub.remotehub) 扩展访问的 GitHub 仓库中。
* 启动 [VS Code for the Web](/docs/remote/vscode-web.md) 时，需要在 URL 末尾添加以下查询参数：`?vscode-coi=`。

## 运行 Hello World

下面的截图展示了在浏览器中执行一个简单 Python 程序的效果。该程序由两个文件组成，分别为 `app.py` 和 `hello.py`，存储在本地文件系统中。

![Execution of Python code stored on a local disk](images/web/execution-local-files.png)

## 启动 REPL

该扩展附带一个集成的 Python REPL。要激活它，请运行命令 **Python WASM: Start REPL**。

![Start Python Repl](images/web/repl.png)

## 调试

该扩展支持在 Web 上调试 Python 文件，并使用与 VS Code Desktop 调试相同的用户界面。请参考[调试](/docs/python/debugging.md)文档。目前已支持的功能包括：

* 设置断点
* 单步进入和跳出函数
* 跨模块调试
* 在调试控制台中评估变量
* 在集成终端中调试程序

下面的截图展示了一个正在进行的调试会话。文件直接托管在 GitHub 上的此[示例仓库](https://github.com/dbaeumer/python-sample)中。

![Debugging a Python program](images/web/debug.png)

## 创建自己的 Python 环境

该扩展使用一个基于 [CPython WebAssembly 构建版本](https://github.com/tiran/cpython-wasm-test/releases)的预配置 Python 环境。所使用的构建版本为 `Python-3.11.0-wasm32-wasi-16.zip`。

你可以按照以下步骤创建自己的 Python 环境，包括源码 wheel Python 包：

* 创建一个新的 GitHub 仓库。
* 从 [cpython-wasm-test/releases](https://github.com/tiran/cpython-wasm-test/releases) 下载一个 wasm-wasi-16 构建版本，并将其解压到仓库的根目录。
* 要添加源码 wheel 包，请执行以下操作：
  * 在根目录中创建一个 `site-packages` 文件夹。
  * 使用以下命令安装包：`pip install my_package --target ./site-packages`。请注意，你的操作系统中需要安装 Python 及 pip。
* 提交更改。
* 更改 `python.wasm.runtime` 设置以指向你的 GitHub 仓库。例如：

  ```json
  {
    "python.wasm.runtime": "https://github.com/dbaeumer/python-3.11.0"
  }
  ```

## 限制

Python for the Web 支持并不提供在本地机器上运行源代码时可用的所有功能。Python 解释器的主要限制包括：

* 不支持 socket。
* 不支持线程。因此，也不支持异步功能。
* 不支持 pip。
* 不支持原生 Python 模块。

## 致谢

没有 Python 社区的支持，这项工作是不可能完成的。他们正在构建和维护 CPython 所需的 WASM 文件。

## 反馈

如果你在使用 Python for the Web 扩展时遇到问题，可以在 [vscode-python-web-wasm](https://github.com/microsoft/vscode-python-web-wasm) 仓库中提交问题。
