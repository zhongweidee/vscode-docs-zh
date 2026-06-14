---
ContentId: 99a5d36e-ce14-4040-b1cf-7345b7fa2c7d
DateApproved: 10/9/2025
MetaDescription: 开始使用适用于 Visual Studio Code 的 Microsoft Fabric 扩展来开发数据工程和分析解决方案
MetaSocialImage: images/datascience/fabric-social.png
---

# 使用 Visual Studio Code 在 Microsoft Fabric 中进行数据科学

你可以在 VS Code 中为 [Microsoft Fabric](https://learn.microsoft.com/fabric/) 构建和开发数据科学与数据工程解决方案。适用于 VS Code 的 [Microsoft Fabric](https://marketplace.visualstudio.com/items?itemName=fabric.vscode-fabric) 扩展为处理 Fabric 项目、Lakehouse、笔记本和用户数据函数提供了集成开发体验。

## 什么是 Microsoft Fabric？

[Microsoft Fabric](http://app.fabric.microsoft.com/) 是一个企业级的一站式分析平台。它统一了数据移动、数据处理、数据摄取、数据转换、实时事件路由和报告构建。它通过数据工程、数据工厂、数据科学、实时智能、数据仓库和数据库等集成服务来支持这些能力。[免费注册](https://app.fabric.microsoft.com/?pbi_source=learn-vscodedocs-microsoft-fabric-quickstart)并探索 Microsoft Fabric 60 天——无需信用卡。

![Diagram that shows what is Microsoft Fabric?](images/microsoft-fabric/microsoft-fabric.png)

## 先决条件

在开始使用适用于 VS Code 的 Microsoft Fabric 扩展之前，你需要准备：

* **Visual Studio Code**：安装最新版 [VS Code](https://code.visualstudio.com/)。
* **Microsoft Fabric 账户**：你需要有 Microsoft Fabric 工作区的访问权限。你可以[注册免费试用](https://app.fabric.microsoft.com/?pbi_source=learn-vscodedocs-microsoft-fabric-quickstart)来开始使用。
* **Python**：安装 [Python 3.8 或更高版本](https://python.org/downloads/)，以便在 VS Code 中使用[笔记本](https://learn.microsoft.com/fabric/data-engineering/author-notebook-with-vs-code)和[用户数据函数](https://learn.microsoft.com/fabric/data-engineering/user-data-functions/create-user-data-functions-vs-code)。

## 安装与设置

你可以从 [Visual Studio Marketplace](https://marketplace.visualstudio.com/VSCode) 或在 VS Code 中直接查找并安装这些扩展。选择**扩展**视图（`kb(workbench.view.extensions)`）并搜索 **Microsoft Fabric**。

### 选择使用哪些扩展

| 扩展                  | 最适合 | 关键功能 | 推荐给你的场景是… |文档|
|-----------------------------|-----------------------------|-----------------------------|--------------------------| --------------------------|
| **Microsoft Fabric 扩展**   | 通用工作区管理、项目管理以及使用项目定义 | - 管理 Fabric 项目（Lakehouses、笔记本、管道）<br>- Microsoft 账户登录和租户切换<br>- 统一或分组项目视图<br>- 使用 IntelliSense 编辑 Fabric 笔记本<br>- 命令面板集成（`Fabric:` 命令） | 你希望使用单个扩展直接从 VS Code 管理工作区、笔记本和 Fabric 中的项目。 | [什么是 Fabric VS Code 扩展](https://learn.microsoft.com/fabric/data-engineering/set-up-fabric-vs-code-extension)|
| **Fabric 用户数据函数** | 构建自定义转换和工作流的开发者 | - 在 Fabric 中编写无服务器函数<br>- 使用断点进行本地调试<br>- 管理数据源连接<br>- 安装/管理 Python 库<br>- 将函数直接部署到 Fabric 工作区 | 你构建自动化或数据转换逻辑，并需要在 VS Code 中进行调试和部署。 | [在 VS Code 中开发用户数据函数](https://learn.microsoft.com/fabric/data-engineering/user-data-functions/create-user-data-functions-vs-code)|
| **Fabric 数据工程** | 处理大规模数据和 Spark 的数据工程师 | - 探索 Lakehouses（表、原始文件）<br>- 开发/调试 Spark 笔记本<br>- 构建/测试 Spark 作业定义<br>- 在本地 VS Code 和 Fabric 之间同步笔记本<br>- 预览架构和示例数据 | 你使用 Spark、Lakehouses 或大规模数据管道，并希望在本地探索、开发和调试。 | [在 VS Code 中开发 Fabric 笔记本](https://learn.microsoft.com/fabric/data-engineering/setup-vs-code-extension) |

## 入门

完成扩展的安装和登录后，你就可以开始处理 Fabric 工作区和项目了。在命令面板（`kb(workbench.action.showCommands)`）中，输入 **Fabric** 来列出专用于 Microsoft Fabric 的命令。

![Diagram that shows all microsoft Fabric commands](images/microsoft-fabric/fabric-command-palette.png)

## Fabric 工作区和项目资源管理器

Fabric 扩展提供了一种无缝的方式来处理远程和本地的 Fabric 项目。

* 在 Fabric 扩展中，**Fabric 工作区**部分列出来自远程工作区的所有项目，按类型（Lakehouses、笔记本、管道等）进行组织。
* 在 Fabric 扩展中，**本地文件夹**部分显示在 VS Code 中打开的 Fabric 项目文件夹。它反映了你在 VS Code 中打开的每种类型的 Fabric 项目定义的结构。这使你能够在本地进行开发并将更改发布到当前或新的工作区。

![Screenshot that shows how to view your workspaces and items?](images/microsoft-fabric/view-workspaces-and-items.png)

## 使用用户数据函数进行数据科学

1. 在命令面板（`kb(workbench.action.showCommands)`）中，输入 **Fabric: 创建项目**。
1. 选择你的工作区，然后选择**用户数据函数**。提供一个名称并选择 **Python** 语言。
1. 你会收到设置 Python 虚拟环境的通知，请继续在本地进行设置。
1. 使用 `pip install` 安装库，或在 Fabric 扩展中选择用户数据函数项目来添加库。更新 `requirements.txt` 文件来指定依赖项：

    ```txt
    fabric-user-data-functions ~= 1.0
    pandas == 2.3.1
    numpy == 2.3.2
    requests == 2.32.5
    scikit-learn=1.2.0
    joblib=1.2.0
    ```

1. 打开 `functions_app.py`。以下是一个使用 scikit-learn 开发数据科学用户数据函数的示例：

    ```python
    import datetime
    import fabric.functions as fn
    import logging

    # Import additional libraries
    import pandas as pd
    from sklearn.ensemble import RandomForestClassifier
    from sklearn.preprocessing import StandardScaler
    from sklearn.model_selection import train_test_split
    from sklearn.metrics import accuracy_score
    import joblib

    udf = fn.UserDataFunctions()
    @udf.function()
    def train_churn_model(data: list, targetColumn: str) -> dict:
        '''
        Description: Train a Random Forest model to predict customer churn using pandas and scikit-learn.

        Args:
        - data (list): List of dictionaries containing customer features and churn target
        Example: [{"Age": 25, "Income": 50000, "Churn": 0}, {"Age": 45, "Income": 75000, "Churn": 1}]
        - targetColumn (str): Name of the target column for churn prediction
        Example: "Churn"

        Returns: dict: Model training results including accuracy and feature information
        '''
        # Convert data to DataFrame
        df = pd.DataFrame(data)

        # Prepare features and target
        numeric_features = df.select_dtypes(include=['number']).columns.tolist()
        numeric_features.remove(targetColumn)

        X = df[numeric_features]
        y = df[targetColumn]

        # Split and scale data
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        scaler = StandardScaler()
        X_train_scaled = scaler.fit_transform(X_train)
        X_test_scaled = scaler.transform(X_test)

        # Train model
        model = RandomForestClassifier(n_estimators=100, random_state=42)
        model.fit(X_train_scaled, y_train)

        # Evaluate and save
        accuracy = accuracy_score(y_test, model.predict(X_test_scaled))
        joblib.dump(model, 'churn_model.pkl')
        joblib.dump(scaler, 'scaler.pkl')

        return {
            'accuracy': float(accuracy),
            'features': numeric_features,
            'message': f'Model trained with {len(X_train)} samples and {accuracy:.2%} accuracy'
        }

    @udf.function()
    def predict_churn(customer_data: list) -> list:
        '''
        Description: Predict customer churn using trained Random Forest model.

        Args:
        - customer_data (list): List of dictionaries containing customer features for prediction
        Example: [{"Age": 30, "Income": 60000}, {"Age": 55, "Income": 80000}]

        Returns: list: Customer data with churn predictions and probability scores
        '''
        # Load saved model and scaler
        model = joblib.load('churn_model.pkl')
        scaler = joblib.load('scaler.pkl')

        # Convert to DataFrame and scale features
        df = pd.DataFrame(customer_data)
        X_scaled = scaler.transform(df)

        # Make predictions
        predictions = model.predict(X_scaled)
        probabilities = model.predict_proba(X_scaled)[:, 1]

        # Add predictions to original data
        results = customer_data.copy()
        for i, (pred, prob) in enumerate(zip(predictions, probabilities)):
            results[i]['churn_prediction'] = int(pred)
            results[i]['churn_probability'] = float(prob)

        return results
    ```

1. 按 `kbstyle(F5)` 在本地测试你的函数。
1. 在 Fabric 扩展中的**本地文件夹**下，选择该函数并发布到你的工作区。

    ![Screenshot that shows how to publish your user data functions item](./images/microsoft-fabric/publish-user-data-function.png)

详细了解如何从以下方式调用该函数：

* [Fabric 数据管道](https://learn.microsoft.com/fabric/data-engineering/user-data-functions/create-functions-activity-data-pipelines)
* [Fabric 笔记本](https://learn.microsoft.com/fabric/data-engineering/notebook-utilities#user-data-function-udf-utilities)
* [外部应用程序](https://learn.microsoft.com/fabric/data-engineering/user-data-functions/tutorial-invoke-from-python-app)

## 使用 Fabric 笔记本进行数据科学

Fabric 笔记本是 Microsoft Fabric 中的交互式工作簿，用于并排编写和运行代码、可视化效果和 Markdown。笔记本支持多种语言（Python、Spark、SQL、Scala 等），非常适合在 Fabric 中使用 OneLake 中的现有数据进行数据探索、转换和模型开发。

### 示例

下面的单元格使用 Spark 读取 CSV，将其转换为 pandas，并使用 scikit-learn 训练逻辑回归模型。请将列名和路径替换为你数据集中的值。

```python
def train_logistic_from_spark(spark, csv_path):
    # Read CSV with Spark, convert to pandas
    sdf = spark.read.option("header", "true").option("inferSchema", "true").csv(csv_path)
    df = sdf.toPandas().dropna()

    # Adjust these to match your dataset
    X = df[['feature1', 'feature2']]
    y = df['label']

    from sklearn.model_selection import train_test_split
    from sklearn.linear_model import LogisticRegression
    from sklearn.metrics import accuracy_score

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model = LogisticRegression(max_iter=200)
    model.fit(X_train, y_train)

    preds = model.predict(X_test)
    return {'accuracy': float(accuracy_score(y_test, preds))}

# Example usage in a Fabric notebook cell
# train_logistic_from_spark(spark, '/path/to/data.csv')
```

请参阅 [Microsoft Fabric 笔记本](https://learn.microsoft.com/fabric/data-engineering/how-to-use-notebook)文档了解更多信息。

## Git 集成

Microsoft Fabric 支持 Git 集成，可在数据和数据分析项目之间实现版本控制和协作。你可以将 Fabric 工作区连接到 Git 仓库（主要是 Azure DevOps 或 GitHub），并且仅同步受支持的项目。此集成还支持 CI/CD 工作流，使团队能够高效管理发布并维护高质量的分析环境。

![GIF that shows how to use Git integration with User data functions](./images/microsoft-fabric/fabric-git-integration.gif)

## 后续步骤

现在你已在 VS Code 中设置好 Microsoft Fabric 扩展，可以通过以下资源来深化你的知识：

* [了解用于数据科学的 Microsoft Fabric](https://learn.microsoft.com/en-us/fabric/data-science/tutorial-data-science-introduction)。
* [设置你的 Fabric 试用容量](https://learn.microsoft.com/fabric/fundamentals/fabric-trial)
* [Microsoft Fabric 基础知识](https://learn.microsoft.com/fabric/fundamentals/fabric-overview)

要参与社区并获取支持：

* [Microsoft Fabric 社区论坛](https://community.fabric.microsoft.com/)
* [Fabric 示例和模板](https://github.com/microsoft/fabric-samples)
* [Visual Studio Marketplace 评价和反馈](https://marketplace.visualstudio.com/items?itemName=ms-fabric.vscode-fabric)
