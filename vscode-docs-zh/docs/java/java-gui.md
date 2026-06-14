---
ContentId: 517db620-d166-4f72-99c1-fa046710dffe
DateApproved: 10/11/2022
MetaDescription: 如何在 Visual Studio Code 中开发 Java GUI 应用程序（JavaFX、AWT、Swing）
---
# 在 VS Code 中使用 GUI 应用程序

你可以轻松地在 Visual Studio Code 中开发 Java GUI 应用程序。为此，你需要安装 [Extension Pack for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack)，其中包含了开发 Java GUI 应用程序所需的所有扩展。

<a class="install-extension-btn" href="vscode:extension/vscjava.vscode-java-pack">安装 Extension Pack for Java</a>

如果你在使用以下功能时遇到任何问题，可以通过提交 [issue](https://github.com/microsoft/vscode-java-pack/issues) 与我们联系。

## 开发 JavaFX 应用程序

### 创建新的 JavaFX 项目

在 VS Code 中，只需几个步骤即可创建新的 JavaFX 应用程序：

- 步骤 1：安装 [Extension Pack for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack)。
- 步骤 2：在 Visual Studio Code 中，打开命令面板 (`kb(workbench.action.showCommands)`)，然后选择命令 **Java: Create Java Project**。
- 步骤 3：在列表中选择 **JavaFX** 选项，按照向导操作，这将通过 Maven Archetype 帮助你搭建新的 JavaFX 项目。

![创建 JavaFX 项目](images/java-gui/create-javafx.png)

### 运行 JavaFX 应用程序

> 注意：以下指南仅适用于由 Maven 管理的项目。生成的项目至少需要 JDK 11 才能启动。请确保你已在本地安装 JDK 11，并在设置 [`java.configuration.runtimes`](https://github.com/redhat-developer/vscode-java#project-jdks) 中配置安装路径。

要运行 JavaFX 应用程序，你可以打开 **Maven** 资源管理器，展开 `hellofx` > `Plugins` > `javafx`，然后运行 Maven 目标：`javafx:run`。

> **注意**：请确保你已安装 [Maven for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-maven) 扩展。如果你找不到 **Maven** 资源管理器，请打开命令面板 (`kb(workbench.action.showCommands)`)，然后选择命令 **Explorer: Focus on Maven View**。

<video src="images/java-gui/run-javafx.mp4" autoplay loop muted playsinline controls title="运行 JavaFX 应用程序">
</video>

### 更多 JavaFX 示例

更多 JavaFX 项目示例可以在 [openjfx samples repository](https://github.com/openjfx/samples/tree/master/IDE/VSCode) 中找到，其中涵盖了不同的项目结构（例如 Gradle 和非托管文件夹项目）。每个示例都附有说明文档，描述了如何运行程序。

## 开发 AWT 应用程序

默认情况下，Abstract Window Toolkit (AWT) 的类型是隐藏的。你可能会注意到，在开发 AWT 应用程序时，代码补全无法正常工作。要启用补全功能，你可以打开命令面板 (`kb(workbench.action.showCommands)`)，然后选择命令 **Java: Help Center**。转到 **Student** 部分，然后选择 **Enable AWT Development**。

<video src="images/java-gui/enable-awt.mp4" autoplay loop muted playsinline controls title="开发 AWT 应用程序">
</video>

> 注意：此操作将在 `.vscode\settings.json` 中的工作区级别更新设置 `java.completion.filteredTypes`，因此请确保在 VS Code 中已打开工作区。

你可以使用下面的示例代码在 VS Code 中运行一个简单的 Java AWT 应用程序。

```java
import java.awt.*;
import java.awt.event.*;

public class AwtExample extends Frame {
  public AwtExample() {
    Button btn = new Button("Button");
    btn.setBounds(50, 50, 50, 50);
    add(btn);
    setSize(150, 150);
    setTitle("This is my First AWT example");
    setLayout(new FlowLayout());
    setVisible(true);
    addWindowListener(new WindowAdapter() {
        public void windowClosing(WindowEvent we) {
            dispose();
        }
    });
  }

  public static void main(String args[]){
    new AwtExample();
  }
}
```

## 开发 Swing 应用程序

Swing 应用程序开发默认受支持。你可以直接编写 Swing 应用程序代码，无需任何设置。

你可以在 [Oracle Swing 文档](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html) 中找到更多 Swing 示例。
