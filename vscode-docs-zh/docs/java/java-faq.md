---
ContentId: 2ad03b46-0779-4c9a-897e-6e6b628f598a
DateApproved: 8/31/2021
MetaDescription: Visual Studio Code 上 Java 开发的常见问题解答与故障排除指南
---
# 常见问题解答

感谢您对 Visual Studio Code 上的 Java 开发感兴趣！此 FAQ 希望能解答您可能遇到的一些问题。

## 这些 Java 扩展是开源的吗？

是的。由 Red Hat、Microsoft 和 VMware 提供的所有 [Java 扩展](/docs/java/extensions.md) 均为开源，社区支持的大多数扩展也同样是开源的。您可以在 Marketplace 页面上找到它们对应的 GitHub 代码仓库。

## Java on Visual Studio Code 还会有其他新功能吗？

当然。我们使用 GitHub issues 来跟踪每个扩展的请求和计划中的工作。目前我们正在致力于添加更多的重构和代码检查功能以提升编辑效率，同时也在进行一些性能优化，使其运行更快。

我们的大部分工作都源自客户反馈收集和优先级排序。如果您有兴趣提供自己的想法，可以直接前往我们的项目仓库提交新的 issue 来分享您的意见。

我们的团队资源有限，真诚地希望能有更多来自优秀的 Java 社区的贡献。如果您对自己的想法充满热情，并愿意帮助其他 Java 开发者，欢迎加入我们！一些值得考虑的领域包括 Gradle 支持、代码分析和测试覆盖率工具、性能分析器，以及其他框架支持，包括 DropWizard、JavaFX、JPA、Play、Akka、OSGi。

## 我可以使用其他 IDE 的键盘快捷键吗？

当然可以。VS Code 中的 [键盘映射扩展](/docs/configure/keybindings.md#keymap-extensions) 可以修改 VS Code 的快捷键以匹配其他编辑器的快捷键。您可以在 Marketplace 的 [Keymaps 分类](https://marketplace.visualstudio.com/search?target=VSCode&category=Keymaps&sortBy=Installs) 中找到 [IntelliJ IDEA 键盘快捷键](https://marketplace.visualstudio.com/items?itemName=k--kato.intellij-idea-keybindings)、[Eclipse Keymap](https://marketplace.visualstudio.com/items?itemName=alphabotsec.vscode-eclipse-keybindings) 以及其他流行编辑器的键盘映射。

## 在哪里可以了解 Visual Studio Code 上 Java 支持的最新进展？

您可以关注我们的 [Java at Microsoft](https://devblogs.microsoft.com/java/) 博客，该博客将持续更新我们的进展。

当您在 VS Code 中使用 Java 时，更新 [Extension Pack for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack) 后，您可能还会看到**发行说明**部分。这些说明将为您概述扩展中包含的重要更新。

## 如何在 Visual Studio Code 中使用新的 Java 版本？

得益于 JDT 的上游更新，您现在也可以在 VS Code 中使用最高 Java 22 版本来构建项目。要使用实验性/预览语言功能，您需要修改项目设置。

Maven - 修改 `pom.xml`：

```xml
  <build>
    <pluginManagement>
      <plugins>
        <plugin>
          <artifactId>maven-compiler-plugin</artifactId>
          <configuration>
            <release>22</release>
            <compilerArgs>--enable-preview</compilerArgs>
          </configuration>
        </plugin>
      </plugins>
    </pluginManagement>
  </build>
```

Gradle：

```groovy
sourceCompatibility = 22
tasks.withType(JavaCompile) {
    options.compilerArgs += '--enable-preview'
}
tasks.withType(Test) {
    jvmArgs += "--enable-preview"
}
```

> 注意：如果您正在修改一个已在 VS Code 中打开的项目，可能需要强制清理工作区并重新加载。为此，请运行命令 **Java: Clean Java Language Server Workspace**。

## 如何在公司代理后使用它？

在公司代理后使用 Java 语言支持（redhat.java）扩展时，您可能需要让 Java 语言服务器知道如何连接互联网，以便通过该代理下载构建运行时、Java 依赖项及其源代码。

这可以通过在 VS Code 偏好设置中配置 `java.jdt.ls.vmargs` 设置来实现（全部写在一行中）：

```json
{
"java.jdt.ls.vmargs": "-Dhttp.proxyHost=webproxy.corp.net -Dhttp.proxyPort=proxyport -Dhttp.proxyUser=user -Dhttp.proxyPassword=password -Dhttps.proxyHost=webproxy.corp.net -Dhttps.proxyPort=proxyport -Dhttps.proxyUser=user -Dhttps.proxyPassword=password"
}
```

## 这会在 Visual Studio 中提供吗？

目前我们不打算将 Java 支持扩展到 Visual Studio。Java 已经有许多优秀的 IDE，我们将专注于 VS Code，在多语言编辑器中提供轻量级的体验。

## VS Code Java 支持其他显示语言吗？

目前，除英语外，我们还为一些扩展支持中文，包括 [Debugger for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-debug)、[Test Runner for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-test)、[Maven for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-maven) 和 [Project Manager for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-dependency)。要了解如何切换 VS Code 的显示语言，请参阅 [显示语言](/docs/configure/locales.md)。

如果您对其他显示语言支持感兴趣，可以为扩展仓库做出贡献。

## 如何对 Java 语言服务器进行故障排除和贡献

您可以访问 [Java for Visual Studio Code wiki](https://github.com/redhat-developer/vscode-java/wiki) 来查找关于以下方面的解答：

1. ["Classpath is incomplete" 警告](https://github.com/redhat-developer/vscode-java/wiki/%22Classpath-is-incomplete%22-warning)
2. [Maven 项目的注解处理支持](https://github.com/redhat-developer/vscode-java/wiki/Annotation-Processing-support-for-Maven-projects)
3. [贡献 Java 扩展](https://github.com/redhat-developer/vscode-java/wiki/Contribute-a-Java-Extension)
4. [格式化程序设置](https://github.com/redhat-developer/vscode-java/wiki/Formatter-settings)
5. [Lombok 支持](https://github.com/redhat-developer/vscode-java/wiki/Lombok-support)
6. [使用代理](https://github.com/redhat-developer/vscode-java/wiki/Using-a-Proxy)
7. [故障排除](https://github.com/redhat-developer/vscode-java/wiki/Troubleshooting)
