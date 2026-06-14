---
ContentId: 82be3b78-2c09-4571-abec-69f95f111e0f
DateApproved: 2/11/2022
MetaDescription: 了解如何在 Visual Studio Code 中测试你的 Java 代码。
MetaSocialImage:
---
# 使用 Visual Studio Code 测试 Java

在 Visual Studio Code 中测试 Java 需通过 [Test Runner for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-test) 扩展来启用。它是一个轻量级扩展，用于运行和调试 Java 测试用例。

## 概述

该扩展支持以下测试框架：

- [JUnit 4](https://junit.org/junit4/) (v4.8.0+)
- [JUnit 5](https://junit.org/junit5/) (v5.1.0+)
- [TestNG](https://testng.org/) (v6.9.13.3+)

[Test Runner for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-test) 与 [Language Support for Java™ by Red Hat](https://marketplace.visualstudio.com/items?itemName=redhat.java) 和 [Debugger for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-debug) 扩展配合使用，提供以下功能：

- 运行/调试测试用例
- 自定义测试配置
- 查看测试报告
- 在测试资源管理器中查看测试

## 要求

- JDK（版本 1.8 或更高）
- Visual Studio Code（版本 1.59.0 或更高）
- [Extension Pack for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack)

<a class="install-extension-btn" href="vscode:extension/vscjava.vscode-java-pack">安装 Extension Pack for Java</a>

## 项目设置

> **注意**：如果你已经在项目中设置好了 Java 测试框架，可以跳至[功能](#features)部分。

### 启用测试并为项目添加测试框架 JAR

从 Test Runner for Java 版本 0.34.0 开始，你可以在**测试**资源管理器中通过几个步骤为非托管文件夹项目（没有任何构建工具的项目）启用测试框架：

<video src="images/java-testing/enable-tests.mp4" autoplay loop muted playsinline controls title="启用测试并为项目添加测试框架 JAR">
</video>

> **注意**：目前此功能仅支持不包含任何测试依赖的非托管文件夹。

### JUnit 4

#### Maven

将以下配置添加到你的 `pom.xml` 中：

```xml
<dependency>
  <groupId>junit</groupId>
  <artifactId>junit</artifactId>
  <version>(YOUR_JUNIT_VERSION)</version>
  <scope>test</scope>
</dependency>
```

#### Gradle

确保在 `build.gradle` 中添加以下行：

```groovy
plugins {
    java
}

dependencies {
    testImplementation('junit:junit:(YOUR_JUNIT_VERSION)')
}
```

#### 非托管文件夹

如果你的项目不使用任何构建工具，你可以通过[测试资源管理器](#启用测试并为项目添加测试框架-jar)启用 JUnit 4，或者手动下载以下 JAR 并将它们添加到项目 classpath 中（通过设置 `java.project.referencedLibraries`，查看[依赖管理](/docs/java/java-project.md#dependency-management)了解更多信息）：

- [junit.jar](https://search.maven.org/search?q=g:junit%20AND%20a:junit)
- [hamcrest-core.jar](https://search.maven.org/artifact/org.hamcrest/hamcrest-core/1.3/jar)

> 你可以查看[官方 JUnit Wiki](https://github.com/junit-team/junit4/wiki/Download-and-Install) 以获取有关如何设置 JUnit 4 的更多信息。

### JUnit 5

JUnit 5 团队提供了一系列使用不同构建工具的示例项目。如果你的项目使用 Maven 或 Gradle 作为构建工具，请查看 [junit5-sample 仓库](https://github.com/junit-team/junit5-samples)。

#### 非托管文件夹

如果你的项目不使用任何构建工具，你可以通过[测试资源管理器](#启用测试并为项目添加测试框架-jar)启用 JUnit 5，或者手动将 [junit-platform-console-standalone](https://repo1.maven.org/maven2/org/junit/platform/junit-platform-console-standalone/) JAR 添加到项目 classpath 中（通过设置 `java.project.referencedLibraries`，查看[依赖管理](/docs/java/java-project.md#dependency-management)了解更多信息）。

### TestNG

#### Maven

将以下配置添加到你的 `pom.xml` 中：

```xml
<dependency>
  <groupId>org.testng</groupId>
  <artifactId>testng</artifactId>
  <version>(YOUR_TESTNG_VERSION)</version>
  <scope>test</scope>
</dependency>
```

#### Gradle

确保在 `build.gradle` 中添加以下行：

```groovy
plugins {
    java
}

dependencies {
    testImplementation('org.testng:testng:(YOUR_TESTNG_VERSION)')
}
```

#### 非托管文件夹

如果你的项目不使用任何构建工具，你可以通过[测试资源管理器](#启用测试并为项目添加测试框架-jar)启用 TestNG，或者手动下载以下 JAR 并将它们添加到项目 classpath 中（通过设置 `java.project.referencedLibraries`，查看[依赖管理](/docs/java/java-project.md#dependency-management)了解更多信息）：

- [testng.jar](https://search.maven.org/search?q=g:org.testng%20AND%20a:testng)
- [jcommander.jar](https://search.maven.org/search?q=g:com.beust%20AND%20a:jcommander)
- [slf4j-api.jar](https://search.maven.org/search?q=g:org.slf4j%20AND%20a:slf4j-api)

## 功能

### 运行/调试测试用例

Test Runner for Java 扩展将在类和方法的定义左侧生成快捷方式（绿色播放按钮）。要运行目标测试用例，选择绿色播放按钮即可。你也可以右键单击它以查看更多选项。

<video src="images/java-testing/gutter-icon.mp4" autoplay loop muted playsinline controls title="运行/调试测试用例">
</video>

### 测试资源管理器

测试资源管理器是一个树状视图，用于显示工作区中的所有测试用例。你可以选择 Visual Studio Code 左侧活动栏上的烧杯按钮来打开它。你也可以从那里运行/调试你的测试用例并查看它们的测试结果。

<video src="images/java-testing/test-explorer.mp4" autoplay loop muted playsinline controls title="测试资源管理器">
</video>

### 自定义测试配置

有时你可能想要自定义运行测试用例的配置。为此，你可以在工作区[设置](/docs/configure/settings.md)中的 `java.test.config` 部分下添加配置。

![自定义测试配置](images/java-testing/configuration.png)

目前支持的配置项有：

- **args**：指定将传递给测试运行器的命令行参数。
- **classPaths**：此设置中定义的 classpath 将追加到已解析的 classpath 中。
- **env**：通过键值对象指定运行测试时的额外环境变量。
- **envFile**：指定包含环境变量定义的文件绝对路径。
- **modulePaths**：此设置中定义的模块路径将追加到已解析的模块路径中。
- **name**：指定配置项的名称。你可以通过设置 `java.test.defaultConfig` 来设置默认配置名称。
- **preLaunchTask**：指定 `tasks.json` 中任务（位于工作区的 `.vscode` 文件夹中）的标签。该任务将在测试开始之前启动。
- **sourcePaths**：指定调试测试时的额外源代码路径。
- **vmArgs**：指定 JVM 的额外选项和系统属性。
- **workingDirectory**：指定运行测试时的工作目录。
- **testKind**：指定此测试配置的目标测试框架。支持的值为 `junit`、`testng`。
- **filters**：指定测试过滤器。
  - **tags**：指定要包含或排除的标签。前缀为 `!` 的标签将被**排除**。注意：此设置仅在 `testKind` 设置为 `junit` 时生效。

更多详细信息可在 [vscode-java-test Wiki](https://github.com/Microsoft/vscode-java-test/wiki/Run-with-Configuration) 上找到。

### 查看测试结果

运行/调试测试用例后，相关测试项的状态将在编辑器装饰和测试资源管理器中更新。

<video src="images/java-testing/test-result.mp4" autoplay loop muted playsinline controls title="查看测试结果">
</video>

你可以触发命令 **Test: Peek Output** 来预览结果视图。你可以选择堆栈跟踪中的链接以导航到源代码位置。

### 生成测试

该扩展提供了帮助你快速搭建测试用例的功能。你可以在编辑器上下文菜单中找到入口。选择 **Source Action...**，然后选择 **Generate Tests...**。

如果你从主源代码（测试目标）触发此源代码操作，系统会要求你提供测试类的完全限定名称以及你想要测试的方法。然后扩展将为你生成测试代码：

<video src="images/java-testing/generate-tests-from-main.mp4" autoplay loop muted playsinline controls title="生成测试">
</video>

如果你从测试源代码触发此源代码操作，系统会询问你想要添加哪些类型的测试方法，包括生命周期方法和测试方法：

<video src="images/java-testing/generate-tests-from-test.mp4" autoplay loop muted playsinline controls title="从测试生成测试">
</video>

### 测试导航

该扩展提供了一些功能，帮助你导航于测试和测试目标之间。如果你的源代码位于 `src/main/java` 或 `src/test/java` 中，你可以在编辑器上下文菜单中找到名为 **Go to Test** 或 **Go to Test Subject** 的入口：

<video src="images/java-testing/test-navigation.mp4" autoplay loop muted playsinline controls title="测试导航">
</video>

你还可以在命令面板（`kb(workbench.action.showCommands)`）中搜索 **Java: Go to Test** 来找到该命令。

### VS Code 测试命令

还有其他测试命令（例如 **Run Tests in Current File**），可以通过在命令面板（`kb(workbench.action.showCommands)`）中搜索 'Test:' 来找到。

![命令面板中的测试命令](images/java-testing/command_palette.png)

### VS Code 测试设置

VS Code 中有一些专门用于测试的设置，可以在设置编辑器（`kb(workbench.action.openSettings)`）中搜索 'testing' 来找到。

![设置编辑器中的测试设置](images/java-testing/settings.png)

## 常见问题

如果你在使用该扩展时遇到任何问题，可以查看 [FAQ](https://github.com/microsoft/vscode-java-test/wiki/FAQ) 和我们的[问题列表](https://github.com/microsoft/vscode-java-test/issues)，检查是否有针对你的问题的答案。

## 贡献与反馈

如果你有兴趣提供反馈或直接为代码库做贡献，请阅读[为 Test Runner for Java 做贡献](https://github.com/Microsoft/vscode-java-test/blob/main/CONTRIBUTING.md)，其中涵盖了以下内容：

- [问题与反馈](https://github.com/Microsoft/vscode-java-test/blob/main/CONTRIBUTING.md#questions-and-feedback)
- [报告问题](https://github.com/Microsoft/vscode-java-test/blob/main/CONTRIBUTING.md#reporting-issues)
- [贡献修复](https://github.com/Microsoft/vscode-java-test/blob/main/CONTRIBUTING.md#contributing-fixes)

## 后续步骤

继续阅读以下内容了解更多：

- [调试](/docs/java/java-debugging.md) - 了解如何使用 VS Code 调试你的 Java 项目。
- [Java 扩展](/docs/java/extensions.md) - 了解 VS Code 中更多有用的 Java 扩展。
