---
ContentId: e1e49b32-272f-4aef-a73b-56920112057d
DateApproved: 10/03/2025
MetaDescription: Foundry Toolkit 托管一个本地服务器用于收集跟踪数据。该收集器服务器兼容 OTLP，大多数语言模型 SDK 要么直接支持 OTLP，要么有第三方插桩库来提供支持。
---

# Foundry Toolkit 中的跟踪

Foundry Toolkit 提供跟踪功能，帮助您监控和分析 AI 应用程序的性能。您可以跟踪 AI 应用程序的执行过程，包括与生成式 AI 模型的交互，以深入了解其行为和性能。

Foundry Toolkit 托管一个本地 HTTP 和 gRPC 服务器用于收集跟踪数据。该收集器服务器兼容 OTLP（OpenTelemetry 协议），大多数语言模型 SDK 要么直接支持 OTLP，要么有非 Microsoft 的插桩库来提供支持。使用 Foundry Toolkit 可以可视化收集到的插桩数据。

所有支持 OTLP 并遵循[生成式 AI 系统语义约定](https://opentelemetry.io/docs/specs/semconv/gen-ai/)的框架或 SDK 都受支持。下表列出了经过兼容性测试的常见 AI SDK。

| | Azure AI Inference | Foundry Agent Service | Anthropic | Gemini | LangChain | OpenAI SDK <sub>3</sub> | OpenAI Agents SDK |
|---|---|---|---|---|---|---|---|
| **Python** | ✅ | ✅ | ✅ ([traceloop](https://github.com/traceloop/openllmetry)、[monocle](https://github.com/monocle2ai/monocle))<sub>1,2</sub> | ✅ ([monocle](https://github.com/monocle2ai/monocle)) | ✅ ([LangSmith](https://github.com/langchain-ai/langsmith-sdk)、[monocle](https://github.com/monocle2ai/monocle))<sub>1,2</sub> | ✅ ([opentelemetry-python-contrib](https://github.com/open-telemetry/opentelemetry-python-contrib)、[monocle](https://github.com/monocle2ai/monocle))<sub>1</sub> | ✅ ([Logfire](https://github.com/pydantic/logfire)、[monocle](https://github.com/monocle2ai/monocle))<sub>1,2</sub>  |
| **TS/JS** | ✅ | ✅ | ✅ ([traceloop](https://github.com/traceloop/openllmetry))<sub>1,2</sub>| ❌ |✅ ([traceloop](https://github.com/traceloop/openllmetry))<sub>1,2</sub> |✅ ([traceloop](https://github.com/traceloop/openllmetry))<sub>1,2</sub>|❌|

> 1. 括号中的 SDK 是非 Microsoft 工具，用于添加 OTLP 支持，因为官方 SDK 不支持 OTLP。
> 1. 这些工具未完全遵循 OpenTelemetry 关于生成式 AI 系统的规则。
> 1. 对于 OpenAI SDK，仅支持 [Chat Completions API](https://platform.openai.com/docs/api-reference/chat)。尚不支持 [Responses API](https://platform.openai.com/docs/api-reference/responses)。

## 如何开始使用跟踪

1. 在树视图中选择**跟踪（Tracing）**以打开跟踪网页视图。
1. 选择**启动收集器（Start Collector）**按钮以启动本地 OTLP 跟踪收集器服务器。

    ![显示跟踪网页视图中启动收集器按钮的截图。](./images/tracing/trace_start.png)

1. 使用代码片段启用插桩。有关不同语言和 SDK 的代码片段，请参阅[设置插桩](#设置插桩)部分。

1. 运行您的应用程序以生成跟踪数据。

1. 在跟踪网页视图中，选择**刷新（Refresh）**按钮以查看新的跟踪数据。

    ![显示跟踪网页视图中跟踪列表的截图。](./images/tracing/trace_list.png)

## 设置插桩

在您的 AI 应用程序中设置跟踪以收集跟踪数据。以下代码片段展示了如何为不同的 SDK 和语言设置跟踪：

所有 SDK 的设置过程类似：

- 将跟踪添加到您的 LLM 或代理应用程序。
- 设置 OTLP 跟踪导出器以使用 AITK 本地收集器。

<details>
<summary>Azure AI Inference SDK - Python</summary>

**安装：**
```bash
pip install opentelemetry-sdk opentelemetry-exporter-otlp-proto-http azure-ai-inference[opentelemetry]
```

**设置：**
```python
import os
os.environ["AZURE_TRACING_GEN_AI_CONTENT_RECORDING_ENABLED"] = "true"
os.environ["AZURE_SDK_TRACING_IMPLEMENTATION"] = "opentelemetry"

from opentelemetry import trace, _events
from opentelemetry.sdk.resources import Resource
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.sdk._logs import LoggerProvider
from opentelemetry.sdk._logs.export import BatchLogRecordProcessor
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk._events import EventLoggerProvider
from opentelemetry.exporter.otlp.proto.http._log_exporter import OTLPLogExporter

resource = Resource(attributes={
    "service.name": "opentelemetry-instrumentation-azure-ai-agents"
})
provider = TracerProvider(resource=resource)
otlp_exporter = OTLPSpanExporter(
    endpoint="http://localhost:4318/v1/traces",
)
processor = BatchSpanProcessor(otlp_exporter)
provider.add_span_processor(processor)
trace.set_tracer_provider(provider)

logger_provider = LoggerProvider(resource=resource)
logger_provider.add_log_record_processor(
    BatchLogRecordProcessor(OTLPLogExporter(endpoint="http://localhost:4318/v1/logs"))
)
_events.set_event_logger_provider(EventLoggerProvider(logger_provider))

from azure.ai.inference.tracing import AIInferenceInstrumentor
AIInferenceInstrumentor().instrument(True)
```

</details>

<details>
<summary>Azure AI Inference SDK - TypeScript/JavaScript</summary>

**安装：**
```bash
npm install @azure/opentelemetry-instrumentation-azure-sdk @opentelemetry/api @opentelemetry/exporter-trace-otlp-proto @opentelemetry/instrumentation @opentelemetry/resources @opentelemetry/sdk-trace-node
```

**设置：**
```javascript
const { context } = require("@opentelemetry/api");
const { resourceFromAttributes } = require("@opentelemetry/resources");
const {
  NodeTracerProvider,
  SimpleSpanProcessor,
} = require("@opentelemetry/sdk-trace-node");
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-proto');

const exporter = new OTLPTraceExporter({
    url: "http://localhost:4318/v1/traces",
});
const provider = new NodeTracerProvider({
    resource: resourceFromAttributes({
        "service.name": "opentelemetry-instrumentation-azure-ai-inference",
    }),
    spanProcessors: [
        new SimpleSpanProcessor(exporter)
    ],
});
provider.register();

const { registerInstrumentations } = require("@opentelemetry/instrumentation");
const { createAzureSdkInstrumentation } = require("@azure/opentelemetry-instrumentation-azure-sdk");

registerInstrumentations({
  instrumentations: [createAzureSdkInstrumentation()],
});
```
</details>

<details>
<summary>Foundry Agent Service - Python</summary>

**安装：**
```bash
pip install opentelemetry-sdk opentelemetry-exporter-otlp-proto-http azure-ai-inference[opentelemetry]
```

**设置：**
```python
import os
os.environ["AZURE_TRACING_GEN_AI_CONTENT_RECORDING_ENABLED"] = "true"
os.environ["AZURE_SDK_TRACING_IMPLEMENTATION"] = "opentelemetry"

from opentelemetry import trace, _events
from opentelemetry.sdk.resources import Resource
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.sdk._logs import LoggerProvider
from opentelemetry.sdk._logs.export import BatchLogRecordProcessor
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk._events import EventLoggerProvider
from opentelemetry.exporter.otlp.proto.http._log_exporter import OTLPLogExporter

resource = Resource(attributes={
    "service.name": "opentelemetry-instrumentation-azure-ai-agents"
})
provider = TracerProvider(resource=resource)
otlp_exporter = OTLPSpanExporter(
    endpoint="http://localhost:4318/v1/traces",
)
processor = BatchSpanProcessor(otlp_exporter)
provider.add_span_processor(processor)
trace.set_tracer_provider(provider)

logger_provider = LoggerProvider(resource=resource)
logger_provider.add_log_record_processor(
    BatchLogRecordProcessor(OTLPLogExporter(endpoint="http://localhost:4318/v1/logs"))
)
_events.set_event_logger_provider(EventLoggerProvider(logger_provider))

from azure.ai.agents.telemetry import AIAgentsInstrumentor
AIAgentsInstrumentor().instrument(True)
```
</details>

<details>
<summary>Foundry Agent Service - TypeScript/JavaScript</summary>

**安装：**
```bash
npm install @azure/opentelemetry-instrumentation-azure-sdk @opentelemetry/api @opentelemetry/exporter-trace-otlp-proto @opentelemetry/instrumentation @opentelemetry/resources @opentelemetry/sdk-trace-node
```

**设置：**
```javascript
const { context } = require("@opentelemetry/api");
const { resourceFromAttributes } = require("@opentelemetry/resources");
const {
  NodeTracerProvider,
  SimpleSpanProcessor,
} = require("@opentelemetry/sdk-trace-node");
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-proto');

const exporter = new OTLPTraceExporter({
    url: "http://localhost:4318/v1/traces",
});
const provider = new NodeTracerProvider({
    resource: resourceFromAttributes({
        "service.name": "opentelemetry-instrumentation-azure-ai-inference",
    }),
    spanProcessors: [
        new SimpleSpanProcessor(exporter)
    ],
});
provider.register();

const { registerInstrumentations } = require("@opentelemetry/instrumentation");
const { createAzureSdkInstrumentation } = require("@azure/opentelemetry-instrumentation-azure-sdk");

registerInstrumentations({
  instrumentations: [createAzureSdkInstrumentation()],
});
```

</details>

<details>
<summary>Anthropic - Python</summary>

### OpenTelemetry

**安装：**
```bash
pip install opentelemetry-sdk opentelemetry-exporter-otlp-proto-http opentelemetry-instrumentation-anthropic
```

**设置：**
```python
from opentelemetry import trace, _events
from opentelemetry.sdk.resources import Resource
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.sdk._logs import LoggerProvider
from opentelemetry.sdk._logs.export import BatchLogRecordProcessor
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk._events import EventLoggerProvider
from opentelemetry.exporter.otlp.proto.http._log_exporter import OTLPLogExporter

resource = Resource(attributes={
    "service.name": "opentelemetry-instrumentation-anthropic-traceloop"
})
provider = TracerProvider(resource=resource)
otlp_exporter = OTLPSpanExporter(
    endpoint="http://localhost:4318/v1/traces",
)
processor = BatchSpanProcessor(otlp_exporter)
provider.add_span_processor(processor)
trace.set_tracer_provider(provider)

logger_provider = LoggerProvider(resource=resource)
logger_provider.add_log_record_processor(
    BatchLogRecordProcessor(OTLPLogExporter(endpoint="http://localhost:4318/v1/logs"))
)
_events.set_event_logger_provider(EventLoggerProvider(logger_provider))

from opentelemetry.instrumentation.anthropic import AnthropicInstrumentor
AnthropicInstrumentor().instrument()
```

### Monocle

**安装：**
```bash
pip install opentelemetry-sdk opentelemetry-exporter-otlp-proto-http monocle_apptrace
```

**设置：**
```python
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter

# Import monocle_apptrace
from monocle_apptrace import setup_monocle_telemetry

# Setup Monocle telemetry with OTLP span exporter for traces
setup_monocle_telemetry(
    workflow_name="opentelemetry-instrumentation-anthropic",
    span_processors=[
        BatchSpanProcessor(
            OTLPSpanExporter(endpoint="http://localhost:4318/v1/traces")
        )
    ]
)
```
</details>

<details>
<summary>Anthropic - TypeScript/JavaScript</summary>

**安装：**
```bash
npm install @traceloop/node-server-sdk
```

**设置：**
```javascript
const { initialize } = require("@traceloop/node-server-sdk");
const { trace } = require("@opentelemetry/api");

initialize({
    appName: "opentelemetry-instrumentation-anthropic-traceloop",
    baseUrl: "http://localhost:4318",
    disableBatch: true,
});
```
</details>

<details>
<summary>Google Gemini - Python</summary>

### OpenTelemetry

**安装：**
```bash
pip install opentelemetry-sdk opentelemetry-exporter-otlp-proto-http opentelemetry-instrumentation-google-genai
```

**设置：**
```python
from opentelemetry import trace, _events
from opentelemetry.sdk.resources import Resource
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.sdk._logs import LoggerProvider
from opentelemetry.sdk._logs.export import BatchLogRecordProcessor
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk._events import EventLoggerProvider
from opentelemetry.exporter.otlp.proto.http._log_exporter import OTLPLogExporter

resource = Resource(attributes={
    "service.name": "opentelemetry-instrumentation-google-genai"
})
provider = TracerProvider(resource=resource)
otlp_exporter = OTLPSpanExporter(
    endpoint="http://localhost:4318/v1/traces",
)
processor = BatchSpanProcessor(otlp_exporter)
provider.add_span_processor(processor)
trace.set_tracer_provider(provider)

logger_provider = LoggerProvider(resource=resource)
logger_provider.add_log_record_processor(
    BatchLogRecordProcessor(OTLPLogExporter(endpoint="http://localhost:4318/v1/logs"))
)
_events.set_event_logger_provider(EventLoggerProvider(logger_provider))

from opentelemetry.instrumentation.google_genai import GoogleGenAiSdkInstrumentor
GoogleGenAiSdkInstrumentor().instrument(enable_content_recording=True)
```

### Monocle

**安装：**
```bash
pip install opentelemetry-sdk opentelemetry-exporter-otlp-proto-http monocle_apptrace
```

**设置：**
```python
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter

# Import monocle_apptrace
from monocle_apptrace import setup_monocle_telemetry

# Setup Monocle telemetry with OTLP span exporter for traces
setup_monocle_telemetry(
    workflow_name="opentelemetry-instrumentation-google-genai",
    span_processors=[
        BatchSpanProcessor(
            OTLPSpanExporter(endpoint="http://localhost:4318/v1/traces")
        )
    ]
)
```
</details>

<details>
<summary>LangChain - Python</summary>

### LangSmith

**安装：**
```bash
pip install langsmith[otel]
```

**设置：**
```python
import os
os.environ["LANGSMITH_OTEL_ENABLED"] = "true"
os.environ["LANGSMITH_TRACING"] = "true"
os.environ["OTEL_EXPORTER_OTLP_ENDPOINT"] = "http://localhost:4318"
```

### Monocle

**安装：**
```bash
pip install opentelemetry-sdk opentelemetry-exporter-otlp-proto-http monocle_apptrace
```

**设置：**
```python
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter

# Import monocle_apptrace
from monocle_apptrace import setup_monocle_telemetry

# Setup Monocle telemetry with OTLP span exporter for traces
setup_monocle_telemetry(
    workflow_name="opentelemetry-instrumentation-langchain",
    span_processors=[
        BatchSpanProcessor(
            OTLPSpanExporter(endpoint="http://localhost:4318/v1/traces")
        )
    ]
)
```
</details>

<details>
<summary>LangChain - TypeScript/JavaScript</summary>

**安装：**
```bash
npm install @traceloop/node-server-sdk
```

**设置：**
```javascript
const { initialize } = require("@traceloop/node-server-sdk");
initialize({
    appName: "opentelemetry-instrumentation-langchain-traceloop",
    baseUrl: "http://localhost:4318",
    disableBatch: true,
});
```
</details>

<details>
<summary>OpenAI - Python</summary>

### OpenTelemetry

**安装：**
```bash
pip install opentelemetry-sdk opentelemetry-exporter-otlp-proto-http opentelemetry-instrumentation-openai-v2
```

**设置：**
```python
from opentelemetry import trace, _events
from opentelemetry.sdk.resources import Resource
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.sdk._logs import LoggerProvider
from opentelemetry.sdk._logs.export import BatchLogRecordProcessor
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk._events import EventLoggerProvider
from opentelemetry.exporter.otlp.proto.http._log_exporter import OTLPLogExporter
from opentelemetry.instrumentation.openai_v2 import OpenAIInstrumentor
import os

os.environ["OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT"] = "true"

# Set up resource
resource = Resource(attributes={
    "service.name": "opentelemetry-instrumentation-openai"
})

# Create tracer provider
trace.set_tracer_provider(TracerProvider(resource=resource))

# Configure OTLP exporter
otlp_exporter = OTLPSpanExporter(
    endpoint="http://localhost:4318/v1/traces"
)

# Add span processor
trace.get_tracer_provider().add_span_processor(
    BatchSpanProcessor(otlp_exporter)
)

# Set up logger provider
logger_provider = LoggerProvider(resource=resource)
logger_provider.add_log_record_processor(
    BatchLogRecordProcessor(OTLPLogExporter(endpoint="http://localhost:4318/v1/logs"))
)
_events.set_event_logger_provider(EventLoggerProvider(logger_provider))

# Enable OpenAI instrumentation
OpenAIInstrumentor().instrument()
```

### Monocle

**安装：**
```bash
pip install opentelemetry-sdk opentelemetry-exporter-otlp-proto-http monocle_apptrace
```

**设置：**
```python
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter

# Import monocle_apptrace
from monocle_apptrace import setup_monocle_telemetry

# Setup Monocle telemetry with OTLP span exporter for traces
setup_monocle_telemetry(
    workflow_name="opentelemetry-instrumentation-openai",
    span_processors=[
        BatchSpanProcessor(
            OTLPSpanExporter(endpoint="http://localhost:4318/v1/traces")
        )
    ]
)
```
</details>

<details>
<summary>OpenAI - TypeScript/JavaScript</summary>

**安装：**
```bash
npm install @traceloop/instrumentation-openai @traceloop/node-server-sdk
```

**设置：**
```javascript
const { initialize } = require("@traceloop/node-server-sdk");
initialize({
    appName: "opentelemetry-instrumentation-openai-traceloop",
    baseUrl: "http://localhost:4318",
    disableBatch: true,
});
```
</details>

<details>
<summary>OpenAI Agents SDK - Python</summary>

### Logfire

**安装：**
```bash
pip install logfire
```

**设置：**
```python
import logfire
import os

os.environ["OTEL_EXPORTER_OTLP_TRACES_ENDPOINT"] = "http://localhost:4318/v1/traces"

logfire.configure(
    service_name="opentelemetry-instrumentation-openai-agents-logfire",
    send_to_logfire=False,
)
logfire.instrument_openai_agents()
```

### Monocle

**安装：**
```bash
pip install opentelemetry-sdk opentelemetry-exporter-otlp-proto-http monocle_apptrace
```

**设置：**
```python
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter

# Import monocle_apptrace
from monocle_apptrace import setup_monocle_telemetry

# Setup Monocle telemetry with OTLP span exporter for traces
setup_monocle_telemetry(
    workflow_name="opentelemetry-instrumentation-openai-agents",
    span_processors=[
        BatchSpanProcessor(
            OTLPSpanExporter(endpoint="http://localhost:4318/v1/traces")
        )
    ]
)
```
</details>

## 示例 1：使用 OpenTelemetry 设置 Azure AI Inference SDK 的跟踪

以下端到端示例使用 Azure AI Inference SDK（Python）并展示如何设置跟踪提供程序和插桩。

### 先决条件

要运行此示例，您需要以下先决条件：

- [Visual Studio Code](https://code.visualstudio.com/)
- [Foundry Toolkit 扩展](https://marketplace.visualstudio.com/items?itemName=ms-windows-ai-studio.windows-ai-studio)
- [Azure AI Inference SDK](https://pypi.org/project/azure-ai-inference/)
- [OpenTelemetry](https://opentelemetry.io/)
- [最新版 Python](https://www.python.org/downloads)
- [GitHub 账户](https://github.com/)

### 设置您的开发环境

使用以下说明部署一个包含运行此示例所需的所有依赖项的预配置开发环境。

1. 设置 GitHub 个人访问令牌

    使用免费的 [GitHub Models](https://docs.github.com/en/github-models) 作为示例模型。

    打开 [GitHub 开发者设置](https://github.com/settings/tokens)，选择**生成新令牌（Generate new token）**。

    > [!IMPORTANT]
    > 该令牌需要 `models:read` 权限，否则会返回未授权错误。该令牌会发送到 Microsoft 服务。

1. 创建环境变量

    创建一个环境变量，使用以下代码片段之一将您的令牌设置为客户端代码的密钥。将 `<your-github-token-goes-here>` 替换为您实际的 GitHub 令牌。

    bash:

    ```bash
    export GITHUB_TOKEN="<your-github-token-goes-here>"
    ```

    powershell:

    ```powershell
    $Env:GITHUB_TOKEN="<your-github-token-goes-here>"
    ```

    Windows 命令提示符:

    ```cmd
    set GITHUB_TOKEN=<your-github-token-goes-here>
    ```

1. 安装 Python 包

    以下命令安装使用 Azure AI Inference SDK 进行跟踪所需的 Python 包：

    ```bash
    pip install opentelemetry-sdk opentelemetry-exporter-otlp-proto-http azure-ai-inference[opentelemetry]
    ```

1. 设置跟踪

    1. 在您的计算机上为项目创建一个新的本地目录。

        ```shell
        mkdir my-tracing-app
        ```

    1. 导航到您创建的目录。

        ```shell
        cd my-tracing-app
        ```

    1. 在该目录中打开 Visual Studio Code：

        ```shell
        code .
        ```

1. 创建 Python 文件

    1. 在 `my-tracing-app` 目录中，创建一个名为 `main.py` 的 Python 文件。

        您将添加用于设置跟踪和与 Azure AI Inference SDK 交互的代码。

    1. 将以下代码添加到 `main.py` 并保存文件：

        ```python
        import os

        ### Set up for OpenTelemetry tracing ###
        os.environ["AZURE_TRACING_GEN_AI_CONTENT_RECORDING_ENABLED"] = "true"
        os.environ["AZURE_SDK_TRACING_IMPLEMENTATION"] = "opentelemetry"

        from opentelemetry import trace, _events
        from opentelemetry.sdk.resources import Resource
        from opentelemetry.sdk.trace import TracerProvider
        from opentelemetry.sdk.trace.export import BatchSpanProcessor
        from opentelemetry.sdk._logs import LoggerProvider
        from opentelemetry.sdk._logs.export import BatchLogRecordProcessor
        from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
        from opentelemetry.sdk._events import EventLoggerProvider
        from opentelemetry.exporter.otlp.proto.http._log_exporter import OTLPLogExporter

        github_token = os.environ["GITHUB_TOKEN"]

        resource = Resource(attributes={
            "service.name": "opentelemetry-instrumentation-azure-ai-inference"
        })
        provider = TracerProvider(resource=resource)
        otlp_exporter = OTLPSpanExporter(
            endpoint="http://localhost:4318/v1/traces",
        )
        processor = BatchSpanProcessor(otlp_exporter)
        provider.add_span_processor(processor)
        trace.set_tracer_provider(provider)

        logger_provider = LoggerProvider(resource=resource)
        logger_provider.add_log_record_processor(
            BatchLogRecordProcessor(OTLPLogExporter(endpoint="http://localhost:4318/v1/logs"))
        )
        _events.set_event_logger_provider(EventLoggerProvider(logger_provider))

        from azure.ai.inference.tracing import AIInferenceInstrumentor
        AIInferenceInstrumentor().instrument()
        ### Set up for OpenTelemetry tracing ###

        from azure.ai.inference import ChatCompletionsClient
        from azure.ai.inference.models import UserMessage
        from azure.ai.inference.models import TextContentItem
        from azure.core.credentials import AzureKeyCredential

        client = ChatCompletionsClient(
            endpoint = "https://models.inference.ai.azure.com",
            credential = AzureKeyCredential(github_token),
            api_version = "2024-08-01-preview",
        )

        response = client.complete(
            messages = [
                UserMessage(content = [
                    TextContentItem(text = "hi"),
                ]),
            ],
            model = "gpt-4.1",
            tools = [],
            response_format = "text",
            temperature = 1,
            top_p = 1,
        )

        print(response.choices[0].message.content)
        ```

1. 运行代码

    1. 在 Visual Studio Code 中打开一个新的终端。

    1. 在终端中，使用命令 `python main.py` 运行代码。

1. 在 Foundry Toolkit 中检查跟踪数据

    运行代码并刷新跟踪网页视图后，列表中会显示一条新的跟踪记录。

    选择该跟踪以打开跟踪详情网页视图。

    ![显示从跟踪网页视图的跟踪列表中选择一条跟踪的截图。](./images/tracing/trace_list.png)

    在左侧的 span 树视图中检查应用程序的完整执行流程。

    在右侧的 span 详情视图中选择一个 span，在**输入 + 输出**选项卡中查看生成式 AI 消息。

    选择**元数据**选项卡查看原始元数据。

    ![显示跟踪网页视图中跟踪详情视图的截图。](./images/tracing/trace_details.png)

## 示例 2：使用 Monocle 设置 OpenAI Agents SDK 的跟踪

以下端到端示例使用 OpenAI Agents SDK（Python）配合 Monocle，并展示如何为多代理旅行预订系统设置跟踪。

### 先决条件

要运行此示例，您需要以下先决条件：

- [Visual Studio Code](https://code.visualstudio.com/)
- [Foundry Toolkit 扩展](https://marketplace.visualstudio.com/items?itemName=ms-windows-ai-studio.windows-ai-studio)
- [Okahu Trace Visualizer](https://marketplace.visualstudio.com/items?itemName=OkahuAI.okahu-ai-observability)
- [OpenAI Agents SDK](https://github.com/openai/agents)
- [OpenTelemetry](https://opentelemetry.io/)
- [Monocle](https://github.com/monocle2ai/monocle)
- [最新版 Python](https://www.python.org/downloads)
- OpenAI API 密钥

### 设置您的开发环境

使用以下说明部署一个包含运行此示例所需的所有依赖项的预配置开发环境。

1. 创建环境变量

    使用以下代码片段之一为您的 OpenAI API 密钥创建环境变量。将 `<your-openai-api-key>` 替换为您实际的 OpenAI API 密钥。

    bash:

    ```bash
    export OPENAI_API_KEY="<your-openai-api-key>"
    ```

    powershell:

    ```powershell
    $Env:OPENAI_API_KEY="<your-openai-api-key>"
    ```

    Windows 命令提示符:

    ```cmd
    set OPENAI_API_KEY=<your-openai-api-key>
    ```

    或者，在您的项目目录中创建一个 `.env` 文件：

    ```
    OPENAI_API_KEY=<your-openai-api-key>
    ```

1. 安装 Python 包

    创建一个包含以下内容的 `requirements.txt` 文件：

    ```
    opentelemetry-sdk
    opentelemetry-exporter-otlp-proto-http
    monocle_apptrace
    openai-agents
    python-dotenv
    ```

    使用以下命令安装这些包：

    ```bash
    pip install -r requirements.txt
    ```

1. 设置跟踪

    1. 在您的计算机上为项目创建一个新的本地目录。

        ```shell
        mkdir my-agents-tracing-app
        ```

    1. 导航到您创建的目录。

        ```shell
        cd my-agents-tracing-app
        ```

    1. 在该目录中打开 Visual Studio Code：

        ```shell
        code .
        ```

1. 创建 Python 文件

    1. 在 `my-agents-tracing-app` 目录中，创建一个名为 `main.py` 的 Python 文件。

        您将添加用于设置 Monocle 跟踪和与 OpenAI Agents SDK 交互的代码。

    1. 将以下代码添加到 `main.py` 并保存文件：

        ```python
        import os

        from dotenv import load_dotenv

        # Load environment variables from .env file
        load_dotenv()

        from opentelemetry.sdk.trace.export import BatchSpanProcessor
        from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter

        # Import monocle_apptrace
        from monocle_apptrace import setup_monocle_telemetry

        # Setup Monocle telemetry with OTLP span exporter for traces
        setup_monocle_telemetry(
            workflow_name="opentelemetry-instrumentation-openai-agents",
            span_processors=[
                BatchSpanProcessor(
                    OTLPSpanExporter(endpoint="http://localhost:4318/v1/traces")
                )
            ]
        )

        from agents import Agent, Runner, function_tool

        # Define tool functions
        @function_tool
        def book_flight(from_airport: str, to_airport: str) -> str:
            """Book a flight between airports."""
            return f"Successfully booked a flight from {from_airport} to {to_airport} for 100 USD."

        @function_tool
        def book_hotel(hotel_name: str, city: str) -> str:
            """Book a hotel reservation."""
            return f"Successfully booked a stay at {hotel_name} in {city} for 50 USD."

        @function_tool
        def get_weather(city: str) -> str:
            """Get weather information for a city."""
            return f"The weather in {city} is sunny and 75°F."

        # Create specialized agents
        flight_agent = Agent(
            name="Flight Agent",
            instructions="You are a flight booking specialist. Use the book_flight tool to book flights.",
            tools=[book_flight],
        )

        hotel_agent = Agent(
            name="Hotel Agent",
            instructions="You are a hotel booking specialist. Use the book_hotel tool to book hotels.",
            tools=[book_hotel],
        )

        weather_agent = Agent(
            name="Weather Agent",
            instructions="You are a weather information specialist. Use the get_weather tool to provide weather information.",
            tools=[get_weather],
        )

        # Create a coordinator agent with tools
        coordinator = Agent(
            name="Travel Coordinator",
            instructions="You are a travel coordinator. Delegate flight bookings to the Flight Agent, hotel bookings to the Hotel Agent, and weather queries to the Weather Agent.",
            tools=[
                flight_agent.as_tool(
                    tool_name="flight_expert",
                    tool_description="Handles flight booking questions and requests.",
                ),
                hotel_agent.as_tool(
                    tool_name="hotel_expert",
                    tool_description="Handles hotel booking questions and requests.",
                ),
                weather_agent.as_tool(
                    tool_name="weather_expert",
                    tool_description="Handles weather information questions and requests.",
                ),
            ],
        )

        # Run the multi-agent workflow
        if __name__ == "__main__":
            import asyncio

            result = asyncio.run(
                Runner.run(
                    coordinator,
                    "Book me a flight today from SEA to SFO, then book the best hotel there and tell me the weather.",
                )
            )
            print(result.final_output)
        ```

1. 运行代码

    1. 在 Visual Studio Code 中打开一个新的终端。

    1. 在终端中，使用命令 `python main.py` 运行代码。

1. 在 Foundry Toolkit 中检查跟踪数据

    运行代码并刷新跟踪网页视图后，列表中会显示一条新的跟踪记录。

    选择该跟踪以打开跟踪详情网页视图。

    ![显示从跟踪网页视图的跟踪列表中选择一条跟踪的截图。](./images/tracing/trace_list_openai_agents_monocle.png)

    在左侧的 span 树视图中检查应用程序的完整执行流程，包括代理调用、工具调用和代理委派。

    在右侧的 span 详情视图中选择一个 span，在**输入 + 输出**选项卡中查看生成式 AI 消息。

    选择**元数据**选项卡查看原始元数据。

    ![显示跟踪网页视图中跟踪详情视图的截图。](./images/tracing/trace_details_openai_agents_monocle.png)

## 您学到了什么

在本文中，您学会了如何：

- 使用 Azure AI Inference SDK 和 OpenTelemetry 在您的 AI 应用程序中设置跟踪。
- 配置 OTLP 跟踪导出器以将跟踪数据发送到本地收集器服务器。
- 运行您的应用程序以生成跟踪数据，并在 Foundry Toolkit 网页视图中查看跟踪记录。
- 在多个 SDK 和语言中使用跟踪功能，包括 Python 和 TypeScript/JavaScript，以及通过 OTLP 使用非 Microsoft 工具。
- 使用提供的代码片段为各种 AI 框架（Anthropic、Gemini、LangChain、OpenAI 等）进行插桩。
- 使用跟踪网页视图 UI，包括**启动收集器**和**刷新**按钮，来管理跟踪数据。
- 设置您的开发环境，包括环境变量和包安装，以启用跟踪。
- 使用 span 树和详情视图分析应用程序的执行流程，包括生成式 AI 消息流和元数据。
