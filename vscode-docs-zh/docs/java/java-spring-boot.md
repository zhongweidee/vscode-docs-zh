---
ContentId: d37118cf-1b5b-4aee-9727-52fcfcac16bd
DateApproved: 12/22/2021
MetaDescription: 面向使用 Visual Studio Code 编辑器的 Java 开发者的 Spring Boot 扩展。
---
# Visual Studio Code 中的 Spring Boot

Visual Studio Code 是 Spring Boot 应用程序开发者的理想轻量级开发环境，以下是一些有用的 VS Code 扩展：

* [Spring Boot Tools](https://marketplace.visualstudio.com/items?itemName=vmware.vscode-spring-boot)
* [Spring Initializr](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-spring-initializr)
* [Spring Boot Dashboard](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-spring-boot-dashboard)

我们建议安装 [Spring Boot 扩展包](https://marketplace.visualstudio.com/items?itemName=vmware.vscode-boot-dev-pack)，其中包含上述所有扩展。

如果你在使用以下功能时遇到任何问题，可以通过[提交 issue](https://github.com/microsoft/vscode-java-pack/issues) 联系我们。

## 先决条件

要在 Visual Studio Code 中开发 Spring Boot 应用程序，你需要安装以下内容：

* [Java Development Kit (JDK)](https://www.microsoft.com/openjdk)
* [Extension Pack for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack)
* [Spring Boot 扩展包](https://marketplace.visualstudio.com/items?itemName=vmware.vscode-boot-dev-pack)

<a class="install-extension-btn" href="vscode:extension/vscjava.vscode-java-pack">安装 Extension Pack for Java</a>

<a class="install-extension-btn" href="vscode:extension/vmware.vscode-boot-dev-pack">安装 Spring Boot 扩展包</a>

>**注意**：有关如何入门的更多信息，请参阅 [Java 入门](/docs/java/java-tutorial.md) 教程。

为了帮助你开始 Java Spring Boot 开发，你可以使用 [Java Spring 配置文件模板](/docs/configure/profiles.md#java-spring-profile-template)，其中包含有用的扩展、设置和 Java Spring Boot 代码片段。

## 创建项目

[Spring Initializr](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-spring-initializr) 扩展允许你搜索依赖项并生成新的 Spring Boot 项目。

要安装，请启动 VS Code，在扩展视图（`kb(workbench.view.extensions)`）中搜索 `vscode-spring-initializr`。

安装扩展后，打开**命令面板**（`kb(workbench.action.showCommands)`）并输入 `Spring Initializr` 以开始生成 Maven 或 Gradle 项目，然后按照向导操作。

<video src="images/java-spring-boot/spring-initializr.mp4" autoplay loop muted playsinline controls video="创建项目">
</video>

## 编辑项目

[Spring Initializr](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-spring-initializr) 扩展允许你在生成新的 Spring Boot 项目后添加依赖项。

导航到你的 `pom.xml` 文件，右键点击选择**添加启动器...**。下拉菜单将显示你已有的依赖项，以 `√` 开头。你可以搜索要添加到项目的其他依赖项。或者你可以点击现有依赖项来移除它们。

<video src="images/java-spring-boot/spring-initializr-add-starters.mp4" autoplay loop muted playsinline controls title="编辑项目">
</video>

## 开发应用程序

[Spring Boot Tools](https://marketplace.visualstudio.com/items?itemName=vmware.vscode-spring-boot) 扩展包含丰富的语言支持，用于处理 Spring Boot 的 `application.properties`、`application.yml` 和 `.java` 文件。

该扩展支持以下功能：

* 快速导航到工作区中的 Spring 元素
* 针对 Spring 特定组件的智能代码补全
* 快速访问正在运行的 Spring 应用
* 实时应用程序信息
* 代码模板

类似的代码补全和验证功能也适用于 `.properties` 和 `.yml` 文件。

要了解如何使用这些功能，你可以访问此[详细使用指南](https://github.com/spring-projects/sts4/tree/main/vscode-extensions/vscode-spring-boot#usage)。

以下是一个展示实时应用程序信息的示例。

<video src="images/java-spring-boot/spring-live-info.mp4" autoplay loop muted playsinline controls title="实时应用程序信息和指标">
</video>

## 运行应用程序

除了使用 `kb(workbench.action.debug.start)` 运行应用程序外，还有 [Spring Boot Dashboard](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-spring-boot-dashboard) 扩展，它允许你查看和管理工作区中所有可用的 Spring Boot 项目，以及快速启动、停止或调试你的项目。

<video src="images/java-spring-boot/spring-dashboard.mp4" autoplay loop muted playsinline controls title="从 Spring Boot 仪表板运行 Spring Boot 应用程序">
</video>

## 后续步骤

* [Java Spring 配置文件模板](/docs/configure/profiles.md#java-spring-profile-template) - 使用一组精心挑选的扩展、设置和代码片段创建一个新的[配置文件](/docs/configure/profiles)。
* 要部署你的 Web 应用，请参阅 [使用 VS Code 部署 Java Web 应用](/docs/java/java-webapp.md)。
* 要将 Web 应用容器化并部署为 Docker 容器，请查看 [VS Code 中的 Docker](/docs/containers/overview.md)。
* 要了解更多关于 Java 调试功能的信息，请参阅 [运行和调试 Java](/docs/java/java-debugging.md)。
