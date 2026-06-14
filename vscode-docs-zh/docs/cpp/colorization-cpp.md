---
ContentId: 2C406EA6-87DC-4A2D-AEC2-90BAA491697C
DateApproved: 2/23/2023
MetaDescription: 如何在 Visual Studio Code 中自定义 C++ 代码的语义着色。
Keywords:
- C++
- Bunny
---
# 增强着色

当 IntelliSense 启用时，Visual Studio Code C/C++ 扩展现在支持语义着色。增强着色功能由 `C_Cpp.enhancedColorization` 设置控制。此设置默认启用。

```json
"C_Cpp.enhancedColorization": "enabled"
```

## 主题

可以使用 VS Code 中现有的主题化和颜色自定义支持来关联颜色。有关更多信息，请参阅 [VS Code 主题文档](/docs/configure/themes.md)。

颜色与[语义标记](https://code.visualstudio.com/api/extension-guides/color-theme#semantic-colors)以及 [TextMate 作用域](https://macromates.com/manual/en/language_grammars#naming_conventions)相关联。

### C/C++ 主题扩展

我们创建了一组 VS Code 主题，这些主题与 Visual Studio 中的默认浅色和深色主题非常相似，并且包含了语义标记的颜色。这些主题可以在[此处](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools-themes)找到。

## IntelliSense 标记和作用域

| 标记 | 语义标记名称 | 后备 TextMate 作用域 |
| ------------- |:-------------:|:-------------:|
| 类模板 | templateType | entity.name.type.class.templated |
| 枚举器 | enumMember | variable.other.enummember |
| 事件 (C++/CLI) | event | variable.other.event |
| 函数 | function | entity.name.function |
| 函数模板 | templateFunction | entity.name.function.templated |
| 泛型类型 (C++/CLI) | genericType | entity.name.type.class.generic |
| 全局变量 | variable.global | variable.other.global |
| 标签 | label | entity.name.label |
| 局部变量 | variable.local | variable.other.local |
| 宏 | macro | entity.name.function.preprocessor |
| 成员字段 | property | variable.other.property |
| 成员函数 | method | entity.name.function.member |
| 命名空间 | namespace | entity.name.namespace |
| New / Delete | newOperator | keyword.operator.new |
| 运算符重载函数 | operatorOverload | entity.name.function.operator |
| 运算符重载成员 | memberOperatorOverload | entity.name.function.operator.member |
| 参数 | parameter | variable.parameter |
| 属性 (C++/CLI) | cliProperty | variable.other.property.cli |
| 引用类型 (C++/CLI) | referenceType | entity.name.type.class.reference |
| 静态成员字段 | property.static | variable.other.property.static |
| 静态成员函数 | method.static | entity.name.function.member.static |
| 类型 | type | entity.name.type |
| 用户定义字面量 - 数字 | numberLiteral | entity.name.operator.custom-literal.number |
| 用户定义字面量 - 原始 | customLiteral | entity.name.operator.custom-literal |
| 用户定义字面量 - 字符串 | stringLiteral | entity.name.operator.custom-literal.string |
| 值类型 (C++/CLI) | valueType | entity.name.type.class.value |

## 在设置中自定义颜色

颜色也可以在设置中全局覆盖：

```json
    "editor.semanticTokenColorCustomizations": {
        "rules": {
            "templateType": {
                "foreground": "#ff0000",
                "fontStyle": "italic bold underline"
            }
        }
    }
```

或者，按特定主题覆盖：

```json
    "editor.semanticTokenColorCustomizations": {
        "[Visual Studio Dark]": {
            "rules": {
                "templateType": {
                    "foreground": "#ff0000",
                    "fontStyle": "italic bold underline"
                }
            }
        }
    }
```
