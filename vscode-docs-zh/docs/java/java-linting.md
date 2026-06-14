---
ContentId: dd4fa82e-0021-404c-87e4-3b69f1e12463
DateApproved: 12/12/2021
MetaDescription: Visual Studio Code 中 Java 的格式化、代码检查和代码分析
---
# Java 格式化与代码检查

[Language Support for Java™ by Red Hat](https://marketplace.visualstudio.com/items?itemName=redhat.java) 也提供了[格式化设置](https://github.com/redhat-developer/vscode-java/wiki/Formatter-settings)。你可以导出一个 Eclipse 格式化文件，然后在 VS Code 中用于你的项目。

此外，还有 [Checkstyle for Java](https://marketplace.visualstudio.com/items?itemName=shengchen.vscode-checkstyle) 和 [SonarLint](https://marketplace.visualstudio.com/items?itemName=SonarSource.sonarlint-vscode) 扩展，它们提供了实时代码检查和代码分析功能。

## 格式化器

你可以使用 **Format Document** 命令来格式化 Java 文件。如果你之前没有指定格式化配置文件，Java 文件将使用默认设置进行格式化。

<video src="images/java-linting/formatting.mp4" autoplay loop muted playsinline controls title="Format document">
</video>

### 应用格式化设置

你可以轻松地从现有的 Eclipse 方案格式化配置文件中应用格式化设置。例如，如果你想为你的 Java 项目应用 [Google Style](https://raw.githubusercontent.com/google/styleguide/gh-pages/eclipse-java-google-style.xml)，可以在 `settings.json` 中设置以下属性：

```json
"java.format.settings.url": "https://raw.githubusercontent.com/google/styleguide/gh-pages/eclipse-java-google-style.xml",
```

该属性可以设置为一个 URL 或本地文件路径。如果格式化 XML 文件包含多个配置文件，你可以指定配置文件名称：

```json
"java.format.settings.profile": "GoogleStyle",
```

设置格式化配置文件后，**Format Document** 命令将使用指定的配置文件来格式化你的 Java 文件。

### 编辑格式化设置

[Extension Pack for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack) 提供了一个编辑器，帮助用户编辑现有的格式化配置文件。你可以使用命令 **Java: Open Java Formatter Settings with Preview** 打开编辑器。在编辑器中，你可以更改格式化设置并预览效果。保存当前编辑器后，更改将保存到格式化配置文件中。

<video src="images/java-linting/formatting-editing.mp4" autoplay loop muted playsinline controls title="Editing formatter settings">
</video>

> 注意：格式化设置编辑器仅支持本地格式化配置文件。如果你的工作区包含远程格式化配置文件，它会引导你将其下载到 `.vscode` 文件夹中。

在编辑器中编辑设置时，你可以在右侧的 **Preview** 面板中预览更改效果。

<video src="images/java-linting/formatting-preview.mp4" autoplay loop muted playsinline controls title="Preview formatting effects">
</video>

你还可以撤销和重做更改。

<video src="images/java-linting/formatting-undoredo.mp4" autoplay loop muted playsinline controls title="Undo and redo changes to formatting effects">
</video>

## SonarLint

[SonarLint](https://marketplace.visualstudio.com/items?itemName=SonarSource.sonarlint-vscode) 是一个易于使用的扩展，帮助你在编写代码时查找并修复 bug 和安全问题。该扩展在后台运行，就像拼写检查器一样，会高亮显示存在质量或安全问题的源代码问题。该扩展不仅告诉你问题是什么，还提供上下文指导，说明为什么该问题是有害的以及如何修复它，并附带示例。该扩展支持 [500 多条 Java 规则](https://rules.sonarsource.com/java)，并包含多个[快速修复](https://rules.sonarsource.com/java/quickfix)，可自动修复某些质量问题。

### 即时代码分析

问题会在编辑器中直接高亮显示，并带有悬停提示以提供详细说明。

<video src="images/java-linting/sonarlint.mp4" autoplay loop muted playsinline controls title="Code analysis on the fly">
</video>

在打开文件中发现的问题也可以通过 VS Code 的 Problems 面板进行查看。在适用的情况下，会提及辅助代码位置，以便你了解问题源自何处（例如，导致 bug 的代码路径）。

### 规则文档与修复指导

对于检测到的任何问题，SonarLint 提供关于所违反规则的完整文档及其相关的最佳编码实践。这使你能够理解为什么会出现该问题以及如何修复它。

<video src="images/java-linting/sonarlint-description.mp4" autoplay loop muted playsinline controls title="Rule documentation and remediation guidance">
</video>

### 启用更多质量和安全规则

默认情况下，SonarLint 提供了大量用于检测 bug 和漏洞的规则。可以通过 **SonarLint Rules** 视图启用更多检查。

<video src="images/java-linting/sonarlint-rules.mp4" autoplay loop muted playsinline controls title="Enabling more quality and security rules">
</video>

有关 [SonarLint for VS Code 扩展](https://marketplace.visualstudio.com/items?itemName=SonarSource.sonarlint-vscode)的更多详细信息，请访问 [SonarLint 网站](https://www.sonarlint.org/vscode/)。

## Checkstyle

使用 [Checkstyle for Java](https://marketplace.visualstudio.com/items?itemName=shengchen.vscode-checkstyle) 扩展，你可以为项目使用现有的 `checkstyle` 配置（Google's Check 或 Sun's Check），也可以使用自己定制的文件。在编辑 Java 文件时，该扩展将检查文件格式，并尽可能实时提供快速修复。

使用 **Checkstyle: Set the Checkstyle Configuration File** 命令设置 Checkstyle 配置文件，并从下拉菜单中选择 Checkstyle 文件。

<video src="images/java-linting/checkstyle.mp4" autoplay loop muted playsinline controls title="Set checkstyle configuration file command">
</video>

[Checkstyle for Java](https://marketplace.visualstudio.com/items?itemName=shengchen.vscode-checkstyle) 扩展支持实时代码检查。

<video src="images/java-linting/checkstyle-live-linting.mp4" autoplay loop muted playsinline controls title="Live linting">
</video>

以及批量检查。

<video src="images/java-linting/checkstyle-batch.mp4" autoplay loop muted playsinline controls title="Batch check">
</video>

当你点击状态栏中的 Checkstyle 状态图标时，Problems 面板将会打开。

### 设置 Checkstyle 配置文件

要设置配置文件，右键点击 `.xml` 文件并选择 **Set the Checkstyle Configuration File**。

![Set Checkstyle configuration file](images/java-linting/set_config.png)

你也可以触发 **Checkstyle: Set Checkstyle Configuration File** 命令，在文件资源管理器中选择配置文件。该扩展会在你的工作区中查找 `checkstyle.xml` 文件，以使 Checkstyle 配置更简单。你还将看到两个内置配置：

* **Google's Check**
* **Sun's Check**

命令 **Checkstyle: Set the Checkstyle Configuration** 会检测潜在的 **Checkstyle** 配置文件并将其列出。你也可以通过在输入框中直接输入 URL 来提供配置文件。

<video src="images/java-linting/checkstyle-configuration.mp4" autoplay loop muted playsinline controls title="Set checkstyle configuration">
</video>

你还可以使用 **Checkstyle: Set the Checkstyle Version** 命令来设置 Checkstyle 版本。

该命令将：

* 列出主仓库中的最新 Checkstyle 版本。
* 列出所有已下载的版本。
* 列出所有受支持的版本。
* 用勾选符号标记当前使用的版本。

此外，你还可以通过配置其路径来引入任何第三方 Checkstyle 模块。例如，使用下面的配置后，你可以将 `<module name="SingleBreakOrContinueCheck"/>` 或 `<module name="com.github.sevntu.checkstyle.checks.naming.SingleBreakOrContinueCheck"/>` 添加到 `checkstyle.xml` 中以使用这些检查。

```json
"java.checkstyle.modules": [ "${workspaceFolder}/src/main/resources/sevntu-checks-1.35.0.jar" ]
```

### 检查代码风格并修复违规

在编辑 Java 文件时，该扩展将检查文件格式，并尽可能提供快速修复。你可以点击编辑器中的灯泡按钮来显示可用的快速修复。

![Fix style violation](images/java-linting/quick_fix.png)

有关 [Checkstyle for Java](https://marketplace.visualstudio.com/items?itemName=shengchen.vscode-checkstyle) 的更多详细信息，请访问其 [GitHub 仓库](https://github.com/jdneo/vscode-checkstyle)。
