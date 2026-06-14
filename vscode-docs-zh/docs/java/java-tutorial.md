---
ContentId: 12d8264b-643f-4745-a7ea-8433dedb1331
DateApproved: 1/4/2022
MetaDescription: Java 教程，展示 Visual Studio Code 编辑器中基本的 Java 语言支持
---
# VS Code 中的 Java 入门

本教程将向你展示如何在 Visual Studio Code 中编写和运行 Java Hello World 程序。它还会涵盖一些高级功能，你可以通过阅读本节中的其他文档来探索这些功能。

有关 VS Code 中可用 Java 功能的概述，请参阅 [Java 语言概述](/docs/languages/java.md)。

如果你在按照本教程操作时遇到任何问题，可以通过提交 [issue](https://github.com/microsoft/vscode-java-pack/issues) 联系我们。

## 为 Java 开发配置 VS Code

### Coding Pack for Java

为了帮助你快速设置，你可以安装 **Coding Pack for Java**，其中包含 VS Code、Java 开发工具包（JDK）和必要的 Java 扩展。Coding Pack 可用作全新安装，也可用于更新或修复现有开发环境。

<a class="install-extension-btn" onclick="pushCodingPackEvent('java', 'win')" href="https://aka.ms/vscode-java-installer-win">安装 Coding Pack for Java - Windows</a>

<a class="install-extension-btn" onclick="pushCodingPackEvent('java', 'mac')" href="https://aka.ms/vscode-java-installer-mac">安装 Coding Pack for Java - macOS</a><br>

> **注意**：Coding Pack for Java 仅适用于 Windows 和 macOS。对于其他操作系统，你需要手动安装 JDK、VS Code 和 Java 扩展。

### 安装扩展

如果你是现有的 VS Code 用户，也可以通过安装 [Extension Pack for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack) 来添加 Java 支持，其中包含以下扩展：

* [Language Support for Java™ by Red Hat](https://marketplace.visualstudio.com/items?itemName=redhat.java)
* [Debugger for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-debug)
* [Test Runner for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-test)
* [Maven for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-maven)
* [Project Manager for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-dependency)
* [Visual Studio IntelliCode](https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.vscodeintellicode)

<a class="install-extension-btn" href="vscode:extension/vscjava.vscode-java-pack">安装 Extension Pack for Java</a>

[Extension Pack for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack) 提供了一个快速入门指南以及代码编辑和调试的技巧。它还包含一个常见问题解答（FAQ），回答了一些经常被问到的问题。使用命令面板（`kb(workbench.action.showCommands)`）中的 **Java：初学者提示** 命令来启动该指南。

![Java Getting Started](images/java-tutorial/getting-started.png)

你也可以单独安装各个扩展。**扩展指南** 可以帮助你完成此操作。你可以使用 **Java：扩展指南** 命令来启动该指南。

对于本教程，唯一必需的扩展是：

* [Language Support for Java™ by Red Hat](https://marketplace.visualstudio.com/items?itemName=redhat.java)
* [Debugger for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-debug)

## 安装和设置 Java 开发工具包（JDK）

要在 Visual Studio Code 中使用 Java，你需要在本地环境中安装 Java 开发工具包（JDK）。JDK 是用于开发 Java 应用程序的软件开发环境。

### 支持的 Java 版本

[Extension Pack for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack) 支持 Java 1.8 或更高版本。

> **注意**：要为项目配置 JDK，请参阅 [配置项目的运行时环境](/docs/java/java-project.md#configure-runtime-for-projects)。要启用 Java 预览功能，请参阅 [如何在新 Java 版本中使用 VS Code](/docs/java/java-faq.md#how-can-i-use-visual-studio-code-with-new-java-versions)。

### 安装 Java 开发工具包（JDK）

如果你之前从未安装过 JDK 且需要安装，我们建议你从以下来源中选择一个：

* [Amazon Corretto](https://aws.amazon.com/corretto)
* [Azul Zulu](https://www.azul.com/downloads/?package=jdk)
* [Eclipse Adoptium's Temurin](https://adoptium.net/)
* [IBM Semeru Runtimes](https://developer.ibm.com/languages/java/semeru-runtimes)
* [Microsoft Build of OpenJDK](https://www.microsoft.com/openjdk)
* [Oracle Java SE](https://www.oracle.com/java/technologies/javase-downloads.html)
* [Red Hat build of OpenJDK](https://developers.redhat.com/products/openjdk/download)
* [SapMachine](https://sapmachine.io)

## 创建源代码文件

为你的 Java 程序创建一个文件夹，并用 VS Code 打开该文件夹。然后在 VS Code 中，创建一个新文件并将其保存为 `Hello.java`。当你打开该文件时，Java 语言服务器会自动开始加载，你应该会在状态栏右侧看到一个带有加载图标的状态项，显示语言状态正忙。加载完成后，你可以将鼠标悬停在该状态项上，查看加载过程是否已成功完成。你还可以选择将该状态项固定在状态栏中。

<video src="images/java-tutorial/JavaHelloWorld.Standalone.mp4" autoplay loop muted playsinline controls title="Creating a source code file">
</video>

>**注意**：如果你在 VS Code 中打开一个 Java 文件而没有打开其所在的文件夹，Java 语言服务器可能无法正常工作。

VS Code 还会尝试为新类型确定正确的包名，并根据模板填充新文件。请参阅 [创建新文件](/docs/java/java-editing.md#create-new-file)。

你还可以使用 **Java：创建 Java 项目** 命令来创建 Java 项目。打开 **命令面板**（`kb(workbench.action.showCommands)`），然后输入 `java` 来搜索此命令。选择该命令后，系统将提示你输入项目的位置和名称。你还可以从此命令中选择构建工具。

<video src="images/java-tutorial/JavaHelloWorld.Project.mp4" autoplay loop muted playsinline controls title="Create Java Project">
</video>

Visual Studio Code 还支持更复杂的 Java 项目 — 请参阅 [项目管理](/docs/java/java-project.md)。

## 编辑源代码

你可以使用代码片段来快速搭建类和方法的框架。VS Code 还提供了用于代码补全的 IntelliSense，以及各种重构方法。

<video src="images/java-tutorial/edit-code.mp4" autoplay loop muted playsinline controls title="Editing source code">
</video>

要了解更多关于编辑 Java 的信息，请参阅 [Java 编辑](/docs/java/java-editing.md)。

## 运行和调试程序

要运行和调试 Java 代码，请设置断点，然后按键盘上的 `kb(workbench.action.debug.start)` 或使用 **运行** > **开始调试** 菜单项。你也可以使用编辑器中的 **运行|调试** CodeLens 选项。代码编译后，你可以在 **运行和调试** 视图中查看所有变量和线程。

<video src="images/java-tutorial/run-debug.mp4" autoplay loop muted playsinline controls title="Running and debugging your program">
</video>

调试器还支持高级功能，例如 [热代码替换](/docs/java/java-debugging.md#hot-code-replace) 和条件断点。

有关更多信息，请参阅 [Java 调试](/docs/java/java-debugging.md)。

## 更多功能

编辑器还具有更多功能来协助你完成 Java 相关工作。

* [Java 编辑](/docs/java/java-editing.md) 更详细地解释了如何导航和编辑 Java 代码
* [调试](/docs/java/java-debugging.md) 介绍了 Java 调试器的所有关键功能
* [测试](/docs/java/java-testing.md) 提供了对 JUnit 和 TestNG 框架的全面支持
* [Java 项目管理](/docs/java/java-project.md) 向你展示如何使用项目视图以及如何使用 Maven
* [Spring Boot](/docs/java/java-spring-boot.md) 和 [Tomcat 与 Jetty](/docs/java/java-tomcat-jetty.md) 演示了出色的框架支持
* [Java Web 应用](/docs/java/java-webapp.md) 展示了如何在 VS Code 中使用 Java Web 应用
