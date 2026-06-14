---
ContentId: 36ee3e12-9bcc-4f01-9672-857ad2733c2d
DateApproved: 12/9/2021
MetaDescription: Visual Studio Code 中的 Java 代码重构与源代码操作
---
# Java 重构与源代码操作

Visual Studio Code 提供了许多选项来重构源代码，以及在你编程时生成代码和修复问题的源代码操作。要使用它们，请点击出现的 `灯泡` 💡。或者右键单击编辑器视图并选择**源代码操作...**。

## 支持的代码操作列表

- [重构](#重构)
  - [赋值给变量](#赋值给变量)
  - [将匿名类转换为嵌套类](#将匿名类转换为嵌套类)
  - [转换为匿名类创建](#转换为匿名类创建)
  - [转换为增强 for 循环](#转换为增强-for-循环)
  - [转换为 lambda 表达式](#转换为-lambda-表达式)
  - [转换为静态导入](#转换为静态导入)
  - 提取重构
    - [提取为常量](#提取为常量)
    - [提取为字段](#提取为字段)
    - [提取为方法](#提取为方法)
    - [提取为局部变量](#提取为局部变量)
  - 内联重构
    - [内联常量](#内联常量)
    - [内联局部变量](#内联局部变量)
    - [内联方法](#内联方法)
  - 反转布尔值
    - [反转条件](#反转条件)
    - [反转局部变量](#反转局部变量)
  - [移动](#移动)
  - [重命名](#重命名)
  - 类型更改
    - [将解析类型更改为 var 类型](#将解析类型更改为-var-类型)
    - [将 var 类型更改为解析类型](#将-var-类型更改为解析类型)
- [源代码操作](#源代码操作)
  - [生成构造函数](#生成构造函数)
  - [生成委托方法](#生成委托方法)
  - [重写/实现方法](#重写实现方法)
  - [组织导入](#组织导入)
  - [生成 getter 和 setter](#生成-getter-和-setter)
  - [生成 `hashCode()` 和 `equals()`](#生成-hashcode-和-equals)
  - [生成 `toString()`](#生成-tostring)
  - [尽可能将修饰符改为 final](#尽可能将修饰符改为-final)
- 支持的其他代码操作
  - [修复无法访问的引用](#修复无法访问的引用)
  - [创建不存在的包](#创建不存在的包)
  - [更多...](#支持的其他代码操作)

## 重构

Java 程序重构的目标是在不影响程序行为的情况下进行系统范围的代码更改。VS Code 的 Java 语言支持提供了许多易于使用的重构选项。

### 调用重构

重构命令可从编辑器的上下文菜单中获得。选择要重构的元素，右键单击打开上下文菜单，然后选择**重构...**：

![调用重构](images/java-refactoring/refactoring_menu.png)

然后你将看到所有可用的重构选项。

### 赋值给变量

将表达式赋值给局部变量或字段。

#### 示例

##### 之前

```java
Arrays.asList("apple", "lemon", "banana");
```

##### 之后

```java
List<String> fruits = Arrays.asList("apple", "lemon", "banana");
```

它也可以用于将参数赋值给构造函数中未使用参数的新字段。

<video src="images/java-refactoring/assign-to-field.mp4" autoplay loop muted playsinline controls title="将参数赋值给新字段">
</video>

### 将匿名类转换为嵌套类

将匿名内部类转换为成员类。

#### 示例

让我们将匿名类 `Interface(){...}` 转换为类 `Clazz` 的成员。

##### 之前

```java
public class Clazz {
  public Interface method() {
    final boolean isValid = true;
    return new Interface() {
      public boolean isValid() {
        return isValid;
      }
    };
  }
}
```

##### 之后

```java
public class Clazz {
  private final class MyInterface extends Interface {
    private final boolean isValid;

    private MyInterface(boolean isValid) {
      this.isValid = isValid;
    }

    public boolean isValid() {
      return isValid;
    }
  }

  public Interface method() {
    final boolean isValid = true;
    return new MyInterface(isValid);
  }
}
```

### 转换为匿名类创建

将 lambda 表达式转换为匿名类创建。

#### 示例

变量 `runnable` 被分配了一个 lambda 表达式。让我们将其转换为匿名类创建。

##### 之前

```java
public void method() {
  Runnable runnable = () -> {
    // do something
  };
}
```

##### 之后

```java
public void method() {
  Runnable runnable = new Runnable() {
    @Override
    public void run() {
      // do something
    }
  };
}
```

> 另请参阅：[转换为 lambda 表达式](#转换为-lambda-表达式)

### 转换为增强 for 循环

将简单的 `for` 循环转换为 `for-each` 风格。

#### 示例

##### 之前

```java
public void order(String[] books) {
  for (int i = 0; i < books.length; i++) {
    // do something
  }
}
```

##### 之后

```java
public void order(String[] books) {
  for (String book : books) {
    // do something
  }
}
```

<video src="images/java-refactoring/convert-for-loop.mp4" autoplay loop muted playsinline controls title="转换为增强 for 循环">
</video>

### 转换为 lambda 表达式

将匿名类创建转换为 lambda 表达式。

#### 示例

让我们将匿名类 `Runnable(){...}` 转换为 lambda 表达式。

##### 之前

```java
public void method() {
  Runnable runnable = new Runnable(){
    @Override
    public void run() {
      // do something
    }
  };
}
```

##### 之后

```java
public void method() {
    Runnable runnable = () -> {
      // do something
    };
  }
```

> 另请参阅：[转换为匿名类创建](#转换为匿名类创建)

### 转换为静态导入

将字段或方法转换为静态导入。

#### 示例

让我们将 `Assert.assertEquals()` 调用转换为静态导入。

##### 之前

```java
import org.junit.Assert;
...
public void test() {
  Assert.assertEquals(expected, actual);
}
```

##### 之后

```java
import static org.junit.Assert.assertEquals;
...
public void test() {
  assertEquals(expected, actual);
}
```

<video src="images/java-refactoring/convert-static-imports.mp4" autoplay loop muted playsinline controls title="转换为静态导入">
</video>

### 提取为常量

从选定的表达式创建一个静态 final 字段，并用字段引用替换，然后重写出现相同表达式的其他位置。

#### 示例

让我们将 π 的值 `3.14` 提取为常量。

##### 之前

```java
public double getArea(double r) {
  return 3.14 * r * r;
}
```

##### 之后

```java
private static final double PI = 3.14;

public double getArea(double r) {
  return PI * r * r;
}
```

> 另请参阅：[内联常量](#内联常量)

### 提取为字段

声明一个新字段并用选定的表达式初始化它。原始表达式将被替换为该字段的使用。

#### 示例

让我们将变量 `area` 提取为类 `Square` 的字段。

##### 之前

```java
class Square {
  public void calculateArea() {
    int height = 1;
    int width = 2;
    int area = height * width;
  }
}
```

##### 之后

```java
class Square {
  private int area;

  public void calculateArea() {
    int height = 1;
    int width = 2;
    area = height * width;
  }
}
```

<video src="images/java-refactoring/extract-field.mp4" autoplay loop muted playsinline controls title="提取为字段">
</video>

当选择一个变量声明时，可以将该变量转换为字段。

<video src="images/java-refactoring/convert-field.mp4" autoplay loop muted playsinline controls title="将变量转换为字段">
</video>

### 提取为方法

创建一个包含当前所选语句或表达式的新方法，并将所选内容替换为对新方法的引用。此功能对于清理冗长、杂乱或过于复杂的方法非常有用。

#### 示例

让我们将表达式 `height * width` 提取为一个新方法。

##### 之前

```java
public void method() {
  int height = 1;
  int width = 2;
  int area = height * width;
}
```

##### 之后

```java
public void method() {
  int height = 1;
  int width = 2;
  int area = getArea(height, width);
}

private int getArea(int height, int width) {
  return height * width;
}
```

<video src="images/java-refactoring/refactor.mp4" autoplay loop muted playsinline controls title="提取为方法">
</video>

> 另请参阅：[内联方法](#内联方法)

### 提取为局部变量

创建一个新变量并将其赋值给当前选定的表达式，然后将所选内容替换为对新变量的引用。

#### 示例

让我们将表达式 `platform.equalsIgnoreCase("MAC")` 提取为一个新变量。

##### 之前

```java
public void method() {
  if (platform.equalsIgnoreCase("MAC")) {
    // do something
  }
}
```

##### 之后

```java
public void method() {
  boolean isMac = platform.equalsIgnoreCase("MAC");
  if (isMac) {
    // do something
  }
}
```

<video src="images/java-refactoring/extract-local-variable.mp4" autoplay loop muted playsinline controls title="提取为局部变量">
</video>

提取之后，你还可以在同一事务中执行重命名。

<video src="images/java-refactoring/extract-rename.mp4" autoplay loop muted playsinline controls title="提取后重命名局部变量">
</video>

> 另请参阅：[内联局部变量](#内联局部变量)

### 内联常量

用其定义的值替换常量引用。

#### 示例

让我们将常量 `PI` 替换为其定义的值 `3.14`。

##### 之前

```java
private static final double PI = 3.14;

public double getArea(double r) {
  return PI * r * r;
}
```

##### 之后

```java
private static final double PI = 3.14;

public double getArea(double r) {
  return 3.14 * r * r;
}
```

> 另请参阅：[提取为常量](#提取为常量)

### 内联局部变量

用其初始化表达式替换冗余变量。

#### 示例

让我们将变量 `isMac` 直接替换为布尔表达式。

##### 之前

```java
public void method() {
  boolean isMac = platform.equalsIgnoreCase("MAC");
  if (isMac) {
    // do something
  }
}
```

##### 之后

```java
public void method() {
  if (platform.equalsIgnoreCase("MAC")) {
    // do something
  }
}
```

> 另请参阅：[提取为局部变量](#提取为局部变量)

### 内联方法

用方法体替换对该方法的调用。

#### 示例

让我们将方法 `getArea(int height, int width)` 直接替换为表达式 `height * width`。

##### 之前

```java
public void method() {
  int height = 1;
  int width = 2;
  int area = getArea(height, width);
}

private int getArea(int height, int width) {
  return height * width;
}
```

##### 之后

```java
public void method() {
  int height = 1;
  int width = 2;
  int area = height * width;
}
```

<video src="images/java-refactoring/inline.mp4" autoplay loop muted playsinline controls title="用方法体替换对方法的调用">
</video>

> 另请参阅：[提取为方法](#提取为方法)

### 反转条件

反转条件中的布尔表达式。

#### 示例

让我们反转 if 语句中的布尔表达式。

##### 之前

```java
public void method(int value) {
  if (value > 5 && value < 15) {
    // do something
  }
}
```

##### 之后

```java
public void method(int value) {
  if (value <= 5 || value >= 15) {
    // do something
  }
}
```

### 反转局部变量

反转局部布尔变量。

#### 示例

让我们反转变量 `valid`。

##### 之前

```java
public void method(int value) {
  boolean valid = value > 5 && value < 15;
}
```

##### 之后

```java
public void method(int value) {
  boolean notValid = value <= 5 || value >= 15;
}
```

<video src="images/java-refactoring/invert-variable.mp4" autoplay loop muted playsinline controls title="反转局部变量">
</video>

### 移动

移动选定的元素并修正对该元素的所有引用（也包括其他文件中的）。可用操作包括：

- 将类移动到另一个包
- 将静态或实例方法移动到另一个类
- 将内部类移动到新文件

#### 示例

让我们将静态方法 `print()` 从类 `Office` 移动到类 `Printer`。

##### 之前

```java
public class Office {
  public static void main(String[] args) {
    print();
  }

  public static void print() {
    System.out.println("This is printer");
  }

  static class Printer { }
}
```

##### 之后

```java
public class Office {
  public static void main(String[] args) {
    Printer.print();
  }

  static class Printer {
    public static void print() {
      System.out.println("This is printer");
    }
  }
}
```

对静态方法进行移动重构，当它在另一个类中的使用比在自己的类中更多时。

<video src="images/java-refactoring/move-static-method.mp4" autoplay loop muted playsinline controls title="对静态方法进行重构">
</video>

将类移动到另一个包。目前，文件资源管理器不支持移动重构。

<video src="images/java-refactoring/move-class.mp4" autoplay loop muted playsinline controls title="将类移动到另一个包">
</video>

将内部类移动到新文件。

<video src="images/java-refactoring/move-inner-type.mp4" autoplay loop muted playsinline controls title="将内部类移动到新文件">
</video>

### 重命名

默认快捷键：`kb(editor.action.rename)`

重命名选定的元素并修正对该元素的所有引用（也包括其他文件中的）。

#### 示例

让我们将类 `Foo` 重命名为 `Bar`

##### 之前

```java
public class Foo {
  // ...
}

public void myMethod() {
  Foo myClass = new Foo();
}
```

##### 之后

```java
public class Bar {
  // ...
}

public void myMethod() {
  Bar myClass = new Bar();
}
```

调用重命名重构的快捷键是 `kb(editor.action.rename)`。当你在编辑器中的标识符上调用快捷键时，编辑器本身会显示一个小框，你可以在其中更改标识符名称。当你按下 `kbstyle(Enter)` 时，对该标识符的所有引用也会被更改。

<video src="images/java-refactoring/rename.mp4" autoplay loop muted playsinline controls title="调用重命名重构的快捷键">
</video>

文件资源管理器中的文件夹和文件也支持重命名重构。在请求更改后，将提供受影响文件的预览，你可以决定如何应用这些更改。

![从资源管理器重命名](images/java-refactoring/rename-explorer.gif)

### 将解析类型更改为 var 类型

使用 `var` 来声明局部变量。

#### 示例

##### 之前

```java
String s = "";
```

##### 之后

```java
var s = "";
```

> 另请参阅：[将 var 类型更改为解析类型](#将-var-类型更改为解析类型)

---

### 将 var 类型更改为解析类型

使用解析类型来声明局部变量。

#### 示例

##### 之前

```java
var s = "";
```

##### 之后

```java
String s = "";
```

> 另请参阅：[将解析类型更改为 var 类型](#将解析类型更改为-var-类型)

## 源代码操作

源代码操作可用于生成常见的代码结构和重复出现的元素。其中一些是快速修复，可以帮助你即时解决代码问题。

### 生成构造函数

为类添加构造函数。

<video src="images/java-refactoring/generate-constructor.mp4" autoplay loop muted playsinline controls title="生成构造函数">
</video>

### 生成委托方法

生成委托方法。

<video src="images/java-refactoring/generate-delegate-methods.mp4" autoplay loop muted playsinline controls title="生成委托方法">
</video>

### 重写/实现方法

通过此源代码操作，所有候选项都会以清单形式呈现给你。然后你可以决定要重写或实现哪些内容。

<video src="images/java-refactoring/override-implement-methods.mp4" autoplay loop muted playsinline controls title="重写/实现方法">
</video>

### 组织导入

你可以使用此源代码操作来清理导入。它还可以处理模糊的导入，在这种情况下，将显示一个下拉列表供你选择正确的导入。同时还会显示带有未解析类型的代码行，以帮助你做出决定。

<video src="images/java-refactoring/resolve-ambiguous-imports.mp4" autoplay loop muted playsinline controls title="组织导入">
</video>

### 生成 getter 和 setter

你可以批量为所有新成员变量生成 getter 和 setter。如果类有多个字段，源代码操作将提示一个快速选择列表，让你选择要生成访问器方法的目标字段。

<video src="images/java-refactoring/advancedgettersetter.mp4" autoplay loop muted playsinline controls title="生成 getter 和 setter">
</video>

### 生成 `hashCode()` 和 `equals()`

`hashCode()` 和 `equals()` 可以使用默认实现生成。所有非静态成员变量都会列出，你可以使用复选框自定义生成的代码。

有两个选项可以自定义生成的代码：

- 如果你使用 Java 7+，可以将 `java.codeGeneration.hashCodeEquals.useJava7Objects` 设置为 `true`，以生成调用 `Objects.hash` 和 `Objects.equals` 的更简短代码。
- 你还可以将 `java.codeGeneration.hashCodeEquals.useInstanceof` 设置为 `true`，以使用 `instanceOf` 运算符来检查对象类型，而不是调用 `Object.getClass()`。

<video src="images/java-refactoring/generate-hashcode-equals.mp4" autoplay loop muted playsinline controls title="生成 hashCode() 和 equals()">
</video>

### 生成 `toString()`

有一个新的源代码操作用于生成 `toString()` 方法。可以通过所有成员变量的清单进行自定义。

<video src="images/java-refactoring/generate-tostring.mp4" autoplay loop muted playsinline controls title="生成 toString()">
  <source type="video/mp4">
</video>

### 尽可能将修饰符改为 final

将 `final` 修饰符添加到当前源文件中的所有变量和参数。

#### 示例

##### 之前

```java
public class Clazz {
  public void method(int value) {
    boolean notValid = value > 5;
    if (notValid) {
      // do something
    }
  }
}
```

##### 之后

```java
public class Clazz {
  public void method(final int value) {
    final boolean notValid = value > 5;
    if (notValid) {
      // do something
    }
  }
}
```

### 修复无法访问的引用

此快速修复帮助你修复无法访问的引用。

<video src="images/java-refactoring/fix-non-access-reference.mp4" autoplay loop muted playsinline controls title="修复无法访问的引用">
</video>

### 创建不存在的包

当你的包名与文件夹名不匹配时，你可以选择在源代码中更改包名，或者在文件系统中移动文件夹（即使目标文件夹尚不存在）。

<video src="images/java-refactoring/create-non-exist-package.mp4" autoplay loop muted playsinline controls title="创建不存在的包">
</video>

### 支持的其他代码操作

VS Code 支持的代码操作列表不断增加，以上仅列出了最常用的一些。其他值得注意的支持操作包括（但不仅限于）：

- 创建未解析的类型
- 移除 `final` 修饰符
- 移除不必要的强制转换
- 移除冗余接口
- 在 switch 语句中添加缺失的 case 标签
- 跳转到 break/continue 的定义
- 修正对静态元素的访问
