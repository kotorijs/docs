# LLMs 支持

Kotori 为 LLM（大语言模型）提供了良好的开发支持。通过遵循 Kotori 的插件规范，你可以轻松开发出由 LLM 驱动的聊天机器人模块，也可以借助 LLM 辅助生成 Kotori 插件代码。

## 面向 LLM 的开发指南

我们提供了一份专门面向 LLM 的 Kotori 插件开发指南文档，其中涵盖了从模块基本结构到高级特性（事件系统、指令系统、中间件、上下文、服务、装饰器等）的完整说明。该文档旨在作为 LLM 的 system prompt 或知识库使用，帮助 LLM 准确理解 Kotori 的 API 与约定，从而生成正确、可用的插件代码。

- [LLM 开发指南（llm-dev-plugin.txt）](/llm-dev-plugin.txt)

> [!TIP]
> 该文档为纯文本格式，可直接作为 prompt 上下文注入，也可用于构建 RAG 知识库或微调数据集。

## 相关资源

- [LLM 开发指南（llm-dev-plugin.txt）](/llm-dev-plugin.txt) —— 面向 LLM 的完整 Kotori 插件 API 参考
- [接口文档](/api/) —— 查阅 Kotori 所有公开 API 类型定义
- [深入了解](/advanced/) —— Kotori 架构与二次开发指南
