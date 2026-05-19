+++
title = "Resume"
description = "jamlee 的结构化履历"
date = "2026-05-18"
author = "jamlee"
+++

## 个人简介

高级系统工程师，长期工作在复杂系统的一线：从运营商计费系统云原生化、Serverless 内核，到盘古基模预训练与强化学习训练系统。当前关注大模型后训练、异步 RL、多智能体训练引擎，以及大规模训练效率优化。

关键经历：

- 9+ 年系统工程经验。
- 4000 卡级训练优化经验。
- 32K 序列训练 MFU 达到 35.6%。
- 函数冷启动时延降低 92%。

## 工作经历

### 高级工程师，华为技术有限公司 · 中央研究院 · 诺亚方舟实验室 / 基础大模型部

2024.08 - 至今 · 深圳

负责盘古基模预训练与强化学习训练系统研发，覆盖 RLHF、Agentic RL、异步 RL 框架与训练效率优化。

- 定位并修复 RL 框架历史精度问题，支持后训练规模 Scaling，评测效果提升 14%。
- 设计并开发 Multi-Agent Agentic RL 训练引擎解耦方案，支持 Agent SFT 更新，落地 DeepDiver V2.0 Online RFT。
- 主导 VeRL 框架先导验证，接入盘古训推系统，覆盖 7B/38B VL 及 72B MoE 模型的 math 场景 RL 训练穿刺。
- 引入 mbridge 支持模型网络创建与 resharding，实现适配 pangu 前向的 sequence packing 并优化 CP 场景显存峰值；训推一致性 Pearson 系数 0.99+。
- 参与基于 Timely Dataflow 的流式异步 RL 框架开发，支持多任务并行与非阻塞调用；Staleness=2 下吞吐提升超 1 倍。
- 优化 VeRL 开源 DAPO 算法在 RL 框架中的实现，构建统一 ReplayBuffer 组件，使用 Dynamic Sampling 提升样本利用率 30%+。

### 工程师 / 高级工程师，华为技术有限公司 · 中央软件院 · 分布式与并行软件实验室

2021.09 - 2024.08 · 深圳

负责 FunctionGraph 元戎 Serverless 内核特性设计与开发，聚焦函数运行时、调度、资源隔离与云服务工程化。

- 主导 GPU 函数特性研发，设计显存 / 算力隔离方案与装箱调度策略，提升 GPU 资源利用率，降低运营成本 32%。
- 从 0 到 1 构建 WebSocket 函数能力，打通用户运行时与管理面的双向通信链路，实现基于 HTTP 的实例调度分发。
- 参与开发 ServiceBridge 统一后端接入架构，支撑 Mysql、Redis、MQ 等中间件接入。
- 主导内部 ERP 微服务 Serverless 化改造，利用 CRIU 快照技术优化函数冷启动，启动时延降低 92%。

### 助理工程师 / 工程师，华为技术有限公司 · 计费软件产品线

2017.09 - 2021.09 · 东莞

负责运营商计费软件的部署特性开发，推进大型传统系统的容器化、微服务化与可靠性交付。

- 主导 10 余个模块微服务化改造，设计模块间依赖拓扑，开发 Helm 应用模板，搭建完整容器化交付框架。
- 构建云原生可靠性体系，涵盖容灾、弹性伸缩、不中断升级及多活架构设计。
- 完成裸金属容器与虚拟主机转型改造，适配 macvlan/canal 实现网络三层隔离。
- vCPU 成本降低 25%+，交付成本降低 32%。

## 项目经历

### 盘古基模强化学习训练系统

2025.06 - 至今

关键词：RLHF · Agentic RL · VeRL · Dataflow

面向基模后训练的强化学习训练系统，支持多智能体、异步 RL、训推一致性验证和大规模训练效率优化。

### 盘古基模预训练系统

2024.08 - 2025.06

关键词：MoE · Megatron-LM · MFU · Long Context

负责 72B MoE 模型训练 MFU 提升、718B MoE dropless 相关特性开发，以及长序列评测体系建设。

### FunctionGraph 元戎 Serverless 内核

2021.09 - 2024.08

关键词：Serverless · GPU · CRIU · Kubernetes

围绕 GPU 函数、WebSocket 函数、ServiceBridge 和函数冷启动优化构建云服务内核能力。

## 技术栈

- 编程语言：Python、Golang、Bash、C++、Java。
- 分布式训练框架：Megatron-LM、FSDP、DeepSpeed。
- 强化学习框架：VeRL、Slime、ROLL、Areal。
- 云原生：Docker、Kubernetes、Containerd、Helm、CRIU。
- 数据库 / 缓存 / 中间件：Etcd、Mysql、GaussDB、Redis、RocketMQ。
- 工程体系：Jenkins、Git、Maven。

## 教育背景

南京大学 · 电子信息科学与技术 本科 · 2013.09 - 2017.06

## 相关工作

- [Pangu Pro MoE: Mixture of Grouped Experts for Efficient Sparsity](https://arxiv.org/abs/2505.21411)
- [SelectiveRS](https://gitcode.com/ascend-tribe/ascend-training-system/blob/main/StandaloneOptimization/SelectiveRS.pdf)
- [AdaptivePipe](https://gitcode.com/ascend-tribe/ascend-training-system/blob/main/DistributedOptimization/AdaptivePipe.pdf)
- [openPangu-Embedded-1B Tech Report](https://ai.gitcode.com/ascend-tribe/openPangu-Embedded-1B-V1.1/blob/main/docs/openPangu-Embedded-1B-report.pdf)
- [DeepDiver V2 Tech Report](https://ai.gitcode.com/ascend-tribe/openPangu-Embedded-7B-DeepDiver/blob/main/docs/openpangu-deepdiver-v2-tech-report.pdf)
