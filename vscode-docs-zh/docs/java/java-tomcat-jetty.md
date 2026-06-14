---
ContentId: 4f5e169c-d91d-46b7-8c36-b695b5862313
DateApproved: 12/142021
MetaDescription: 面向使用 Visual Studio Code 的 Java 开发者的 Tomcat、Jetty 和 Open Liberty 扩展。
---
# 在 VS Code 中使用应用服务器

Visual Studio Code 是一个以代码编辑器为核心的开发工具，因此它不附带任何内嵌的应用服务器。对于大多数服务器，你需要使用命令行来部署它们，然后使用相应的调试器[配置](/docs/java/java-debugging.md#configure)来附加到服务器。

另一方面，我们知道对于某些 Java 工作负载，服务器集成非常有用。在 Visual Studio Code 中，你可以找到流行应用服务器的第三方扩展，例如 [Tomcat](https://tomcat.apache.org/)、[Jetty](https://www.eclipse.org/jetty/) 和 [Open Liberty](https://openliberty.io/)，这些扩展在本地使用这些服务器时非常有用。

对于 [Spring Boot 仪表板](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-spring-boot-dashboard)，请参阅 [Visual Studio Code 中的 Spring Boot](/docs/java/java-spring-boot.md)。

如果你在使用以下功能时遇到任何问题，可以通过提交 [issue](https://github.com/microsoft/vscode-java-pack/issues) 与我们联系。

## Community Server Connectors

[Community Server Connectors](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-community-server-connector) 扩展由 Red Hat 发布。它提供了一个基于远程服务器协议的服务器连接器，可以启动、停止、部署到以及以其他方式控制社区运行时和服务器，例如 [Apache Felix](https://felix.apache.org/documentation/index.html)、[Karaf](https://karaf.apache.org/) 和 [Tomcat](https://tomcat.apache.org/)。

<video src="images/java-tomcat-jetty/server-connector.mp4" autoplay loop muted playsinline controls title="Community server connectors">
</video>

## 其他服务器

[Open Liberty Tools](https://marketplace.visualstudio.com/items?itemName=Open-Liberty.liberty-dev-vscode-ext) 扩展允许你在 Open Liberty 上运行应用程序，从而在 Visual Studio Code 中部署、测试和调试你的应用程序。

Red Hat 的 [Server Connector](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-server-connector) 扩展允许你启动、停止和部署到 Red Hat 服务器和运行时产品，例如 WildFly、JBoss EAP、Minishift、CDK。

[Extension Pack for MicroProfile](https://marketplace.visualstudio.com/items?itemName=MicroProfile-Community.vscode-microprofile-pack) 提供了用于创建 MicroProfile 项目的工具，以便开发并部署到 Open Liberty、Quarkus 和 Payara 等运行时。
