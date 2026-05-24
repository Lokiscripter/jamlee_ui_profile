import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { BorderBeam } from "@/components/magicui/border-beam";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { Marquee } from "@/components/magicui/marquee";
import { NumberTicker } from "@/components/magicui/number-ticker";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { PROFILE } from "@/data/profile";
import {
  Activity,
  ArrowUpRight,
  BookOpen,
  Boxes,
  BriefcaseBusiness,
  Cpu,
  Database,
  Gauge,
  GraduationCap,
  Layers3,
  Mail,
  Network,
  Sparkles,
  Terminal,
  Wrench,
  Zap,
} from "lucide-react";
import Link from "next/link";

const BLUR_FADE_DELAY = 0.04;
const metricIcons = [Gauge, Network, Activity, Zap];
const metricFigures = [
  { value: 4000, suffix: " 卡级", decimalPlaces: 0 },
  { value: 35.6, suffix: "% MFU", decimalPlaces: 1 },
  { value: 75, suffix: "% Rollout", decimalPlaces: 0 },
  { value: 92, suffix: "%", decimalPlaces: 0 },
];
const skillGroupIcons = [Terminal, Cpu, Sparkles, Boxes, Database, Wrench];
const projectSignals = [
  ["异步流式RL框架", "DAPO算法优化", "训推一致性"],
  ["4000 卡MoE预训练", "20.2% to 35.6% MFU", "长序列评测"],
  ["云服务 32% 成本降低", "Serverless实例 92% 冷启动优化", "GPU 函数创收"],
];
const projectSummaries = [
  "围绕基模后训练的 RL 训练系统，覆盖精度修复、Multi-Agent Agentic RL 训练引擎、VeRL 接入、DAPO 优化与 ReplayBuffer 样本利用率提升。",
  "围绕 72B/718B MoE 预训练效率，覆盖并行策略切换、EP 分级通信、Overlap 1F1B、dropless 迁移与 HELMET 长序列评测建设。",
  "围绕 FunctionGraph 云服务内核，构建 GPU 函数、WebSocket 函数、ServiceBridge 与 CRIU 冷启动优化，支撑 Serverless 工程化落地。",
];

const availableContacts = Object.values(PROFILE.contact.social).filter(
  (item) => item.url
);
const stackItems = PROFILE.skillGroups.flatMap((group) =>
  group.skills.map((skill) => ({ ...skill, group: group.title }))
);

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-medium text-muted-foreground">{eyebrow}</p>
      <h2 className="text-2xl font-semibold">{title}</h2>
    </div>
  );
}

export default function Page() {
  return (
    <main className="relative flex min-h-dvh flex-col gap-16">
      <section id="home" className="relative scroll-mt-24 overflow-hidden py-3">
        <FlickeringGrid
          className="absolute inset-0 -z-10 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_86%)]"
          color="var(--foreground)"
          flickerChance={0.12}
          gridGap={8}
          maxOpacity={0.18}
          squareSize={3}
        />
        <div className="relative flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="order-2 flex flex-col gap-5 md:order-1">
            <BlurFadeText
              delay={BLUR_FADE_DELAY}
              className="max-w-2xl text-4xl font-semibold sm:text-5xl"
              yOffset={8}
              text={PROFILE.name}
            />
            <BlurFade delay={BLUR_FADE_DELAY * 2}>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="h-7 rounded-md px-3">
                  {PROFILE.role}
                </Badge>
                <Badge variant="outline" className="h-7 rounded-md px-3">
                  {PROFILE.location}
                </Badge>
              </div>
            </BlurFade>
            <BlurFadeText
              className="max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg"
              delay={BLUR_FADE_DELAY * 3}
              text={PROFILE.description}
            />
            <BlurFade delay={BLUR_FADE_DELAY * 4}>
              <div className="flex flex-wrap gap-1.5">
                {["Pangu", "RLHF", "MoE", "Serverless"].map((keyword) => (
                  <Badge
                    key={keyword}
                    variant="secondary"
                    className="h-7 rounded-md bg-background/80 px-3 backdrop-blur"
                  >
                    {keyword}
                  </Badge>
                ))}
              </div>
            </BlurFade>
          </div>
          <BlurFade delay={BLUR_FADE_DELAY} className="order-1 md:order-2">
            <div className="relative rounded-full">
              <Avatar className="size-24 rounded-full border shadow-lg ring-4 ring-muted md:size-32">
                <AvatarImage alt={PROFILE.name} src={PROFILE.avatarUrl} />
                <AvatarFallback>{PROFILE.initials}</AvatarFallback>
              </Avatar>
              <BorderBeam borderWidth={2} duration={10} radius={999} size={60} />
            </div>
          </BlurFade>
        </div>
      </section>

      <section id="metrics" className="scroll-mt-24">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {PROFILE.metrics.map((metric, index) => {
            const Icon = metricIcons[index] ?? Gauge;
            const figure = metricFigures[index] ?? metricFigures[0];
            return (
              <BlurFade key={metric.label} delay={BLUR_FADE_DELAY * 4 + index * 0.04}>
                <div className="relative flex h-full flex-col gap-3 overflow-hidden rounded-lg border bg-card p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-md border bg-background text-muted-foreground">
                      <Icon className="size-4" aria-hidden />
                    </span>
                  </div>
                  <div className="flex items-end gap-1 text-3xl font-semibold leading-none">
                    <NumberTicker
                      decimalPlaces={figure.decimalPlaces}
                      delay={index * 0.08}
                      value={figure.value}
                    />
                    <span className="pb-0.5 text-base font-medium text-muted-foreground">
                      {figure.suffix}
                    </span>
                  </div>
                  <p className="text-sm font-medium">{metric.headline}</p>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {metric.detail}
                  </p>
                </div>
              </BlurFade>
            );
          })}
        </div>
      </section>

      <section id="about" className="scroll-mt-24">
        <BlurFade delay={BLUR_FADE_DELAY * 5}>
          <div className="flex flex-col gap-4">
            <SectionHeading eyebrow="ABOUT" title="复杂系统一线经验" />
            <p className="max-w-2xl text-base leading-8 text-muted-foreground">
              {PROFILE.summary}
            </p>
          </div>
        </BlurFade>
      </section>

      <section id="expertise" className="scroll-mt-24">
        <div className="flex flex-col gap-6">
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <SectionHeading eyebrow="EXPERTISE" title="能力专题" />
          </BlurFade>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {PROFILE.expertise.map((item, index) => {
              const Icon = [Sparkles, Cpu, Boxes, Layers3][index] ?? Sparkles;
              return (
                <BlurFade key={item.title} delay={BLUR_FADE_DELAY * 7 + index * 0.04}>
                  <article className="flex h-full flex-col gap-4 rounded-lg border bg-card p-5">
                    <div className="flex size-9 items-center justify-center rounded-md border bg-background text-muted-foreground">
                      <Icon className="size-4" aria-hidden />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm leading-6 text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    <div className="mt-auto flex flex-wrap gap-1.5">
                      {item.keywords.map((keyword) => (
                        <Badge key={keyword} variant="secondary" className="rounded-md">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </article>
                </BlurFade>
              );
            })}
          </div>
        </div>
      </section>

      <section id="work" className="scroll-mt-24">
        <div className="flex flex-col gap-6">
          <BlurFade delay={BLUR_FADE_DELAY * 8}>
            <SectionHeading eyebrow="WORK" title="工作经历" />
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <Accordion type="single" collapsible defaultValue={PROFILE.work[0]?.company}>
              {PROFILE.work.map((work) => (
                <AccordionItem key={work.company} value={work.company} className="border-b-0">
                  <AccordionTrigger className="rounded-lg px-0 hover:no-underline">
                    <div className="flex w-full items-start gap-3 text-left">
                      <div className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-md border bg-card text-muted-foreground">
                        <BriefcaseBusiness className="size-4" aria-hidden />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                          <div className="min-w-0">
                            <h3 className="font-semibold leading-6">{work.company}</h3>
                            <p className="text-sm text-muted-foreground">{work.title}</p>
                          </div>
                          <p className="shrink-0 text-xs text-muted-foreground">
                            {work.start} - {work.end}
                          </p>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          {work.description}
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-12">
                    <ul className="flex list-disc flex-col gap-2 pl-4 text-sm leading-6 text-muted-foreground">
                      {work.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </BlurFade>
        </div>
      </section>

      <section id="projects" className="scroll-mt-24">
        <div className="flex flex-col gap-6">
          <BlurFade delay={BLUR_FADE_DELAY * 10}>
            <SectionHeading eyebrow="PROJECTS" title="项目经历" />
          </BlurFade>
          <BentoGrid>
            {PROFILE.projects.map((project, index) => {
              const signals = projectSignals[index] ?? [];
              return (
                <BlurFade
                  key={project.title}
                  className="md:col-span-6"
                  delay={BLUR_FADE_DELAY * 11 + index * 0.04}
                >
                  <BentoCard
                    className="h-full"
                    description={projectSummaries[index] ?? project.description}
                    icon={Cpu}
                    name={project.title}
                    cta={
                      project.href ? (
                      <Link
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex size-8 shrink-0 items-center justify-center rounded-md border text-muted-foreground transition-colors hover:text-foreground"
                        aria-label={`打开 ${project.title}`}
                      >
                        <ArrowUpRight className="size-4" aria-hidden />
                      </Link>
                      ) : null
                    }
                  >
                    <div className="mt-auto flex flex-col gap-4">
                      <div className="flex flex-wrap gap-2">
                        {signals.map((signal) => (
                          <div
                            key={signal}
                            className="min-w-32 flex-1 whitespace-nowrap rounded-md border bg-background/70 px-3 py-2 text-sm font-medium"
                          >
                            {signal}
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((technology) => (
                          <Badge key={technology} variant="outline" className="rounded-md">
                            {technology}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </BentoCard>
                </BlurFade>
              );
            })}
          </BentoGrid>
        </div>
      </section>

      <section id="skills" className="scroll-mt-24">
        <div className="flex flex-col gap-6">
          <BlurFade delay={BLUR_FADE_DELAY * 12}>
            <SectionHeading eyebrow="STACK" title="技术栈" />
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 12.5}>
            <div className="relative overflow-hidden rounded-lg border bg-card py-3">
              <Marquee pauseOnHover repeat={3} className="[--duration:32s] [--gap:0.5rem]">
                {stackItems.map((skill) => {
                  const SkillIcon = "icon" in skill ? skill.icon : null;
                  return (
                    <Badge
                      key={`${skill.group}-${skill.name}`}
                      variant="secondary"
                      className="h-8 gap-1.5 rounded-md bg-background px-3"
                    >
                      {SkillIcon ? (
                        <SkillIcon className="size-3.5 shrink-0" aria-hidden />
                      ) : null}
                      <span>{skill.name}</span>
                    </Badge>
                  );
                })}
              </Marquee>
              <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-card" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-card" />
            </div>
          </BlurFade>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {PROFILE.skillGroups.map((group, index) => {
              const Icon = skillGroupIcons[index] ?? Terminal;
              return (
                <BlurFade key={group.title} delay={BLUR_FADE_DELAY * 13 + index * 0.04}>
                  <div className="h-full rounded-lg border bg-card p-5">
                    <div className="flex items-center gap-3">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-md border bg-background text-muted-foreground">
                        <Icon className="size-4" aria-hidden />
                      </span>
                      <h3 className="font-semibold">{group.title}</h3>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {group.skills.map((skill) => {
                        const SkillIcon = "icon" in skill ? skill.icon : null;
                        return (
                          <Badge
                            key={skill.name}
                            variant="secondary"
                            className="h-7 gap-1.5 rounded-md px-2.5"
                          >
                            {SkillIcon ? (
                              <SkillIcon className="size-3.5 shrink-0" aria-hidden />
                            ) : null}
                            <span>{skill.name}</span>
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                </BlurFade>
              );
            })}
          </div>
        </div>
      </section>

      <section id="education" className="scroll-mt-24">
        <div className="flex flex-col gap-6">
          <BlurFade delay={BLUR_FADE_DELAY * 14}>
            <SectionHeading eyebrow="EDUCATION" title="教育背景" />
          </BlurFade>
          {PROFILE.education.map((education, index) => (
            <BlurFade key={education.school} delay={BLUR_FADE_DELAY * 15 + index * 0.04}>
              <Link
                href={education.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg border bg-card p-5 transition-colors hover:bg-accent/40"
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-md border bg-background text-muted-foreground">
                  <GraduationCap className="size-4" aria-hidden />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold">{education.school}</h3>
                  <p className="text-sm text-muted-foreground">{education.degree}</p>
                </div>
                <p className="text-right text-xs text-muted-foreground">
                  {education.start} - {education.end}
                </p>
              </Link>
            </BlurFade>
          ))}
        </div>
      </section>

      <section id="publications" className="scroll-mt-24">
        <div className="flex flex-col gap-6">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <SectionHeading eyebrow="RELATED WORK" title="相关工作" />
          </BlurFade>
          <div className="flex flex-col gap-2">
            {PROFILE.publications.map((publication, index) => (
              <BlurFade
                key={publication.title}
                delay={BLUR_FADE_DELAY * 17 + index * 0.04}
              >
                <Link
                  href={publication.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg border bg-card p-4 text-sm transition-colors hover:bg-accent/40"
                >
                  <BookOpen className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                  <span className="min-w-0 flex-1">{publication.title}</span>
                  <ArrowUpRight className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                </Link>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {availableContacts.length > 0 ? (
        <section id="contact" className="scroll-mt-24">
          <BlurFade delay={BLUR_FADE_DELAY * 18}>
            <div className="rounded-lg border bg-card p-6">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-md border bg-background text-muted-foreground">
                  <Mail className="size-4" aria-hidden />
                </div>
                <SectionHeading eyebrow="CONTACT" title="保持联系" />
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {availableContacts.map((contact) => (
                  <Link
                    key={contact.name}
                    href={contact.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md border px-3 py-2 text-sm transition-colors hover:bg-accent/50"
                  >
                    {contact.name}
                  </Link>
                ))}
              </div>
            </div>
          </BlurFade>
        </section>
      ) : null}
    </main>
  );
}
