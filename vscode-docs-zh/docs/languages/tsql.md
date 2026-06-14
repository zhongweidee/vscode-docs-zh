---
ContentId: 5325cf50-e4c7-11e6-bf01-fe55135034f3
DateApproved: 6/10/2026
MetaDescription: 了解 Visual Studio Code 为 Transact-SQL 提供的编辑器功能（代码补全、调试、代码片段、代码检查）。
---
# Visual Studio Code 中的 Transact-SQL

通过 VS Code Marketplace 中的 [mssql] 扩展，将 Visual Studio Code 打造为强大的 [Transact-SQL]（T-SQL）开发编辑器。[mssql] 扩展经过优化，可与本地运行的 SQL Server、任何云中的 SQL Server、Azure SQL 数据库以及 Azure SQL 数据仓库协同工作。

连接到 SQL 数据库，编写 T-SQL 代码，执行 T-SQL 代码，查看结果，并将结果保存为 JSON 或 CSV 文件。在编写 T-SQL 代码时，您可以获得丰富的 T-SQL 语言功能，例如 T-SQL IntelliSense（代码补全）、语法高亮、代码检查、代码导航和代码片段。

> [下载 VS Code] - 如果您尚未下载 VS Code，请快速为您的平台（Linux、macOS 或 Windows）进行安装。

## 安装 T-SQL 支持

通过从 VS Code 市场安装 [mssql] 扩展，为 VS Code 添加 T-SQL 语言支持，步骤如下：

1. 从 VS Code 侧边栏打开**扩展**视图（`kb(workbench.view.extensions)`）。
2. 在搜索栏中输入"mssql"，点击**安装**，并在提示时重新加载 VS Code。

![install mssql extension](images/tsql/install-mssql.png)

## 连接并执行 T-SQL

轻松连接到本地运行的 SQL Server、任何云中的 SQL Server、Azure SQL 数据库以及 Azure SQL 数据仓库。然后，执行您的 T-SQL 语句和批处理以查看结果和消息——一切都在 VS Code 中完成。您最近的连接会跨会话保存，因此您可以快速重新连接到您的数据库。

![Execute T-SQL](images/tsql/execute.gif)

## 查看和保存结果

执行 T-SQL 代码时可以查看结果和消息。只需几次点击即可将结果保存为 JSON 或 CSV 文件，以便在应用程序中使用这些数据。

![Save T-SQL](images/tsql/save.gif)

## T-SQL IntelliSense

在编辑器中编写 T-SQL 代码时，VS Code 会为 T-SQL 关键字提供智能代码补全，为架构对象名称（表、列、视图）提供建议，并在连接到数据库时为函数和过程提供参数帮助。

![tsql intellisense](images/tsql/intellisense.gif)

## 代码检查

代码检查是对您的 T-SQL 代码进行潜在语法错误的分析。使用 Visual Studio Code 可以在编写代码时快速导航到 T-SQL 代码中的错误和警告。

![tsql linting](images/tsql/linting.gif)

## 速览定义/转到定义

使用**速览定义**或**转到定义**可以在编写 T-SQL 代码时快速浏览数据库中架构对象的定义，例如表、函数和过程。

![tsql peek definition](images/tsql/peekdefinition.gif)

## 代码片段

T-SQL 代码片段为常用的 T-SQL 语句提供代码模板。输入"sql"即可获取 T-SQL 代码片段列表。

![tsql snippets](images/tsql/snippets.gif)

## 后续步骤

* 下载免费的 [SQL Server 2017 Developer Edition]。
* 从 Visual Studio Code 市场安装 [mssql] 扩展。
* [构建应用] 使用 SQL Server——在 macOS、Linux 和 Windows 上使用您喜欢的编程语言开始使用 SQL Server。
* 在 [GitHub] 上为 mssql 扩展做出贡献。在我们的 [GitHub Issue Tracker] 上提交错误报告或功能建议。

## 延伸阅读

* [SQL Server 文档]
* [Linux 上的 SQL Server 文档]
* [SQL Server 博客]

[构建应用]: https://aka.ms/sqldev
[下载 VS Code]: https://code.visualstudio.com/download
[GitHub]: https://github.com/microsoft/vscode-mssql
[GitHub Issue Tracker]: https://github.com/microsoft/vscode-mssql/issues
[mssql]: https://aka.ms/mssql-marketplace
[SQL Server 2017 Developer Edition]: https://www.microsoft.com/sql-server/sql-server-downloads
[SQL Server 博客]: https://blogs.technet.microsoft.com/dataplatforminsider/
[SQL Server 文档]: https://learn.microsoft.com/sql/sql-server
[Linux 上的 SQL Server 文档]: https://learn.microsoft.com/sql/linux/sql-server-linux-overview/
[Transact-SQL]: https://learn.microsoft.com/sql/t-sql/language-reference
