---
ContentId: 6076911c-276b-41a3-8510-0022c03c0ef6
DateApproved: 1/4/2022
MetaDescription: 适用于 Visual Studio Code 的热门 Java 扩展
---
# 适用于 Visual Studio Code 的 Java 扩展

得益于 Visual Studio Code 周边庞大的 Java 社区，你可以使用各种扩展来增强你的 Java 开发体验。

> **提示：** 要了解如何安装和管理扩展，请参阅 [VS Code 扩展文档](/docs/configure/extensions/extension-marketplace.md)。

在本主题中，我们推荐了一系列适用于不同 Java 开发场景的热门扩展。

## 基础 Java 开发

如果你正在寻找 Visual Studio Code 上的核心 Java 开发体验（包括 Java 代码自动补全、运行/调试/测试 Java 应用程序、Java 项目管理等），我们推荐使用 [Extension Pack for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack)。此扩展包包含了一系列适用于基础 Java 开发的热门 Java 扩展：

1. [Language Support for Java™ by Red Hat](https://marketplace.visualstudio.com/items?itemName=redhat.java)
2. [Debugger for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-debug)
3. [Test Runner for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-test)
4. [Maven for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-maven)
5. [Project Manager for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-dependency)
6. [Visual Studio IntelliCode](https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.vscodeintellicode)

<a class="install-extension-btn" href="vscode:extension/vscjava.vscode-java-pack">安装 Extension Pack for Java</a>

要开始使用此扩展包，你可以访问 [Java 入门](/docs/java/java-tutorial.md) 教程。

你还可以安装 [SonarLint](https://marketplace.visualstudio.com/items?itemName=SonarSource.sonarlint-vscode) 扩展，它可以检测代码中的质量和安全问题。

## Spring Boot 扩展

Spring Boot 是一个开源的、基于微服务的 Java Web 框架，在 Java 开发者中非常流行。VMware 和 Microsoft 为 Spring Boot 开发提供了出色的扩展。

我们推荐安装 [Spring Boot Extension Pack](https://marketplace.visualstudio.com/items?itemName=vvmware.vscode-boot-dev-pack)，其中包含以下扩展：

1. [Spring Boot Tools](https://marketplace.visualstudio.com/items?itemName=vmware.vscode-spring-boot)
2. [Spring Initializr Java Support](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-spring-initializr)
3. [Spring Boot Dashboard](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-spring-boot-dashboard)

<a class="install-extension-btn" href="vscode:extension/vmware.vscode-boot-dev-pack">安装 Spring Boot Extension Pack</a>

更多 Spring Boot 相关信息可在 [Spring Boot](/docs/java/java-spring-boot.md) 页面找到。

## Gradle for Java

Visual Studio Code 通过 [Gradle for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-gradle) 扩展提供 Gradle 支持。要详细了解如何使用此扩展，请访问构建工具页面中的 [Gradle 部分](/docs/java/java-build.md#gradle)。

## 应用服务器（Tomcat / Jetty / 等）

[Community Server Connectors](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-community-server-connector) 是一个适用于 Tomcat 和 Jetty 等应用服务器的出色扩展。

要详细了解如何在 Visual Studio Code 中使用 Java 应用服务器，请参阅 [应用服务器](/docs/java/java-tomcat-jetty.md) 页面。

## MicroProfile / Quarkus

对 Eclipse MicroProfile 和 Quarkus 的支持通过以下扩展提供：

* [Extension pack for MicroProfile](https://marketplace.visualstudio.com/items?itemName=MicroProfile-Community.vscode-microprofile-pack)
* [Quarkus](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-quarkus)

## 其他 Java IDE 的键映射

社区为那些可能习惯其他 Java IDE 键盘快捷键的开发者提供了一些扩展。

* [Eclipse Keymap](https://marketplace.visualstudio.com/items?itemName=alphabotsec.vscode-eclipse-keybindings)
* [IntelliJ IDEA keyboard shortcuts](https://marketplace.visualstudio.com/items?itemName=k--kato.intellij-idea-keybindings)

键映射扩展将其他 IDE 或编辑器中的键盘快捷键应用到 VS Code 上，这样你就不必为新的键盘快捷键重新训练手指。

## 远程开发和容器支持

我们还想推荐一些其他扩展，它们在远程和容器开发场景中非常有用。

* [远程开发](/docs/remote/remote-overview.md) 扩展让你可以使用 VS Code 访问容器、远程计算机或适用于 Linux 的 Windows 子系统。
* 你可以使用 [Container Tools](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-containers) 扩展来构建 Docker 镜像并使用镜像注册表。
* [Kubernetes](https://marketplace.visualstudio.com/items?itemName=ms-kubernetes-tools.vscode-kubernetes-tools) 扩展提供了一个资源管理器视图来管理集群及其内部节点。它还提供了高级语法支持，用于编辑 Kubernetes 清单文件。
* [Live Share](https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare) 是一个出色的工具，当你需要与他人协作处理同一代码库时非常有用。

## Visual Studio Code 上的 Azure

适用于 Visual Studio Code 的 Azure 扩展提供了与 Azure 及云端的无缝集成。我们想推荐几个 Azure 扩展。

### 团队开发

* [Azure Repos](https://marketplace.visualstudio.com/items?itemName=ms-vsts.team) 扩展可以轻松连接到你的 Azure DevOps 服务器，让你能够轻松监控 TFVC 或 Git 源代码仓库的构建、拉取请求和工作项。

### 物联网

* 适用于 VS Code 的 [Azure IoT Toolkit](https://marketplace.visualstudio.com/items?itemName=vsciot-vscode.azure-iot-toolkit) 可以轻松开发并连接你的 [IoT 应用程序到 Azure](https://learn.microsoft.com/azure/?product=iot)。使用此扩展，你可以与 Azure IoT Hub 交互、管理连接到 Azure IoT Hub 的设备，并使用 Azure IoT Hub 的代码片段进行开发。

### 通用工具

* [Azure Tools Extension Pack](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack) 提供了一组丰富的扩展，可以轻松发现并交互 Azure 服务来驱动你的应用程序。
* [Azure Resource Manager Tools](https://marketplace.visualstudio.com/items?itemName=msazurermtools.azurerm-vscode-tools) 为 Azure Resource Manager 部署模板和模板语言表达式提供了丰富的编辑体验。例如，TLE 函数名称的 IntelliSense、参数引用、签名帮助、转到定义、速览定义和速览引用以及错误和警告，使得在 VS Code 中编写 Azure Resource Manager 模板变得快速而简单。

访问 [Azure 扩展](/docs/azure/extensions.md) 以查找更多 Azure 扩展。

## 搜索其他 Java 扩展

如果上述扩展不能满足你的需求，你还可以在 Visual Studio Code 中搜索其他 Java 相关扩展。步骤如下：

1. 转到 **扩展** 视图 (`kb(workbench.view.extensions)`)。
2. 通过输入"java"来筛选扩展列表。

![Java Extensions](images/extensions/extensions.png)

我们也欢迎对我们现有扩展的贡献，如果你在市场中找不到所需内容，也希望你能创建新的 Java 扩展。
