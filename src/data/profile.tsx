import { Docker } from "@/components/ui/svgs/docker";
import { Golang } from "@/components/ui/svgs/golang";
import { Java } from "@/components/ui/svgs/java";
import { Kubernetes } from "@/components/ui/svgs/kubernetes";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { Python } from "@/components/ui/svgs/python";

export type ContactLink = {
  name: string;
  url: string;
  navbar?: boolean;
};

export const PROFILE = {
  name: "jamlee",
  initials: "JL",
  url: "http://localhost:3000",
  location: "深圳",
  locationLink: "",
  role: "高级系统工程师",
  description:
    "长期工作在复杂系统一线，关注大模型后训练、异步 RL、多智能体训练引擎与大规模训练效率优化。",
  summary:
    "高级系统工程师，经历覆盖运营商计费系统云原生化、FunctionGraph 元戎 Serverless 内核、盘古基模预训练与强化学习训练系统。当前聚焦 RLHF、Agentic RL、异步 RL 框架、训推一致性和大规模训练效率。",
  avatarUrl: "",
  metrics: [
    {
      headline: "9+ 年系统工程经验",
      label: "系统工程经验",
      value: "9+ 年",
      detail: "从传统计费系统到 Serverless 内核，再到大模型训练系统",
    },
    {
      headline: "4000 卡级训练优化经验",
      label: "训练优化规模",
      value: "4000 卡级",
      detail: "面向盘古基模训练效率、显存峰值与长序列场景优化",
    },
    {
      headline: "32K 序列训练 MFU 达到 35.6%",
      label: "长序列训练效率",
      value: "35.6% MFU",
      detail: "32K 序列训练 MFU 达到 35.6%",
    },
    {
      headline: "函数冷启动时延降低 92%",
      label: "冷启动优化",
      value: "92%",
      detail: "基于 CRIU 快照技术降低函数冷启动时延",
    },
  ],
  expertise: [
    {
      title: "大模型后训练与强化学习训练系统",
      description:
        "覆盖 RLHF、Agentic RL、异步 RL、DeepDiver Online RFT、VeRL 先导验证与样本利用率优化。",
      keywords: ["RLHF", "Agentic RL", "VeRL", "Online RFT"],
    },
    {
      title: "分布式训练效率优化",
      description:
        "围绕 MoE、长序列、sequence packing、resharding、训推一致性和 MFU 提升做系统级优化。",
      keywords: ["MoE", "MFU", "Long Context", "Resharding"],
    },
    {
      title: "Serverless 内核与云服务工程化",
      description:
        "主导 GPU 函数、WebSocket 函数、ServiceBridge、资源隔离、调度和冷启动优化等核心能力。",
      keywords: ["Serverless", "GPU", "CRIU", "Kubernetes"],
    },
    {
      title: "云原生交付与系统现代化",
      description:
        "推动运营商计费系统容器化、微服务化、可靠性交付和大型传统系统云原生转型。",
      keywords: ["Helm", "Containerd", "Multi-active", "Reliability"],
    },
  ],
  work: [
    {
      company: "华为技术有限公司 · 中央研究院 · 诺亚方舟实验室 / 基础大模型部",
      href: "https://www.huawei.com/",
      badges: ["大模型训练", "强化学习"],
      location: "深圳",
      title: "高级工程师",
      logoUrl: "",
      start: "2024.08",
      end: "至今",
      description:
        "负责盘古基模预训练与强化学习训练系统研发，覆盖 RLHF、Agentic RL、异步 RL 框架与训练效率优化。",
      highlights: [
        "定位并修复 RL 框架历史精度问题，支持后训练规模 Scaling，评测效果提升 14%。",
        "设计并开发 Multi-Agent Agentic RL 训练引擎解耦方案，支持 Agent SFT 更新，落地 DeepDiver V2.0 Online RFT。",
        "主导 VeRL 框架先导验证，接入盘古训推系统，覆盖 7B/38B VL 及 72B MoE 模型的 math 场景 RL 训练穿刺。",
        "引入 mbridge 支持模型网络创建与 resharding，实现适配 pangu 前向的 sequence packing 并优化 CP 场景显存峰值；训推一致性 Pearson 系数 0.99+。",
        "参与基于 Timely Dataflow 的流式异步 RL 框架开发，支持多任务并行与非阻塞调用；Staleness=2 下吞吐提升超 1 倍。",
        "优化 VeRL 开源 DAPO 算法在 RL 框架中的实现，构建统一 ReplayBuffer 组件，使用 Dynamic Sampling 提升样本利用率 30%+。",
      ],
    },
    {
      company: "华为技术有限公司 · 中央软件院 · 分布式与并行软件实验室",
      href: "https://www.huawei.com/",
      badges: ["Serverless", "云服务内核"],
      location: "深圳",
      title: "工程师 / 高级工程师",
      logoUrl: "",
      start: "2021.09",
      end: "2024.08",
      description:
        "负责 FunctionGraph 元戎 Serverless 内核特性设计与开发，聚焦函数运行时、调度、资源隔离与云服务工程化。",
      highlights: [
        "主导 GPU 函数特性研发，设计显存 / 算力隔离方案与装箱调度策略，提升 GPU 资源利用率，降低运营成本 32%。",
        "从 0 到 1 构建 WebSocket 函数能力，打通用户运行时与管理面的双向通信链路，实现基于 HTTP 的实例调度分发。",
        "参与开发 ServiceBridge 统一后端接入架构，支撑 Mysql、Redis、MQ 等中间件接入。",
        "主导内部 ERP 微服务 Serverless 化改造，利用 CRIU 快照技术优化函数冷启动，启动时延降低 92%。",
      ],
    },
    {
      company: "华为技术有限公司 · 计费软件产品线",
      href: "https://www.huawei.com/",
      badges: ["云原生", "交付可靠性"],
      location: "东莞",
      title: "助理工程师 / 工程师",
      logoUrl: "",
      start: "2017.09",
      end: "2021.09",
      description:
        "负责运营商计费软件的部署特性开发，推进大型传统系统的容器化、微服务化与可靠性交付。",
      highlights: [
        "主导 10 余个模块微服务化改造，设计模块间依赖拓扑，开发 Helm 应用模板，搭建完整容器化交付框架。",
        "构建云原生可靠性体系，涵盖容灾、弹性伸缩、不中断升级及多活架构设计。",
        "完成裸金属容器与虚拟主机转型改造，适配 macvlan/canal 实现网络三层隔离。",
        "vCPU 成本降低 25%+，交付成本降低 32%。",
      ],
    },
  ],
  projects: [
    {
      title: "盘古基模强化学习训练系统",
      href: "",
      dates: "2025.06 - 至今",
      active: true,
      description:
        "面向基模后训练的强化学习训练系统，支持多智能体、异步 RL、训推一致性验证和大规模训练效率优化。",
      technologies: ["RLHF", "Agentic RL", "VeRL", "Dataflow"],
      links: [],
      image: "",
      video: "",
    },
    {
      title: "盘古基模预训练系统",
      href: "",
      dates: "2024.08 - 2025.06",
      active: true,
      description:
        "负责 72B MoE 模型训练 MFU 提升、718B MoE dropless 相关特性开发，以及长序列评测体系建设。",
      technologies: ["MoE", "Megatron-LM", "MFU", "Long Context"],
      links: [],
      image: "",
      video: "",
    },
    {
      title: "FunctionGraph 元戎 Serverless 内核",
      href: "",
      dates: "2021.09 - 2024.08",
      active: true,
      description:
        "围绕 GPU 函数、WebSocket 函数、ServiceBridge 和函数冷启动优化构建云服务内核能力。",
      technologies: ["Serverless", "GPU", "CRIU", "Kubernetes"],
      links: [],
      image: "",
      video: "",
    },
  ],
  skillGroups: [
    {
      title: "编程语言",
      skills: [
        { name: "Python", icon: Python },
        { name: "Golang", icon: Golang },
        { name: "Bash" },
        { name: "C++" },
        { name: "Java", icon: Java },
      ],
    },
    {
      title: "分布式训练框架",
      skills: [
        { name: "Megatron-LM" },
        { name: "FSDP" },
        { name: "DeepSpeed" },
      ],
    },
    {
      title: "强化学习框架",
      skills: [
        { name: "VeRL" },
        { name: "Slime" },
        { name: "ROLL" },
        { name: "Areal" },
      ],
    },
    {
      title: "云原生",
      skills: [
        { name: "Docker", icon: Docker },
        { name: "Kubernetes", icon: Kubernetes },
        { name: "Containerd" },
        { name: "Helm" },
        { name: "CRIU" },
      ],
    },
    {
      title: "数据库 / 缓存 / 中间件",
      skills: [
        { name: "Etcd" },
        { name: "Mysql" },
        { name: "PostgreSQL", icon: Postgresql },
        { name: "GaussDB" },
        { name: "Redis" },
        { name: "RocketMQ" },
      ],
    },
    {
      title: "工程体系",
      skills: [{ name: "Jenkins" }, { name: "Git" }, { name: "Maven" }],
    },
  ],
  skills: [
    { name: "Python", icon: Python },
    { name: "Golang", icon: Golang },
    { name: "Kubernetes", icon: Kubernetes },
    { name: "Docker", icon: Docker },
    { name: "Megatron-LM" },
    { name: "DeepSpeed" },
    { name: "VeRL" },
    { name: "CRIU" },
    { name: "Helm" },
    { name: "Redis" },
  ],
  education: [
    {
      school: "南京大学",
      href: "https://www.nju.edu.cn/",
      degree: "电子信息科学与技术 本科",
      logoUrl: "",
      start: "2013.09",
      end: "2017.06",
    },
  ],
  publications: [
    {
      title: "Pangu Pro MoE: Mixture of Grouped Experts for Efficient Sparsity",
      href: "https://arxiv.org/abs/2505.21411",
    },
    {
      title: "SelectiveRS",
      href: "https://gitcode.com/ascend-tribe/ascend-training-system/blob/main/StandaloneOptimization/SelectiveRS.pdf",
    },
    {
      title: "AdaptivePipe",
      href: "https://gitcode.com/ascend-tribe/ascend-training-system/blob/main/DistributedOptimization/AdaptivePipe.pdf",
    },
    {
      title: "openPangu-Embedded-1B Tech Report",
      href: "https://ai.gitcode.com/ascend-tribe/openPangu-Embedded-1B-V1.1/blob/main/docs/openPangu-Embedded-1B-report.pdf",
    },
    {
      title: "DeepDiver V2 Tech Report",
      href: "https://ai.gitcode.com/ascend-tribe/openPangu-Embedded-7B-DeepDiver/blob/main/docs/openpangu-deepdiver-v2-tech-report.pdf",
    },
  ],
  contact: {
    email: "",
    tel: "",
    social: {
      GitHub: {
        name: "GitHub",
        url: "",
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "",
        navbar: true,
      },
      X: {
        name: "X",
        url: "",
        navbar: true,
      },
      email: {
        name: "Email",
        url: "",
        navbar: false,
      },
    } satisfies Record<string, ContactLink>,
  },
  navbar: [],
  hackathons: [],
} as const;
