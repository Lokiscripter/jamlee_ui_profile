# jamlee Personal Portfolio Design

Date: 2026-05-19

## Goal

Build an independent personal homepage project in `/Users/loki/Github_Project/jamlee_ui_profile` by borrowing the structure and interaction style of `/Users/loki/Github_Project/magicuidesign/portfolio`, while replacing the example profile with jamlee's experience from `resume.md`.

The first version should be a Chinese technical portfolio rather than a generic resume clone. It should foreground system engineering, large-scale model training systems, Serverless kernel work, measurable outcomes, project experience, technical stack, and related publications or reports.

## Confirmed Decisions

- Project location: `/Users/loki/Github_Project/jamlee_ui_profile`.
- Reference project: `/Users/loki/Github_Project/magicuidesign/portfolio`; keep it unchanged.
- Language: Chinese-first.
- Maintenance model: keep `resume.md` as the source resume narrative and create a structured profile data file for the website.
- Homepage direction: lightly reorganized technical portfolio.
- Blog: preserve the `/blog` route and article-detail shell, but remove example English posts from the generated project for the first version.
- Contact data: allow empty email/social fields and hide empty contact UI instead of inventing links.

## Homepage Information Architecture

The homepage will use these sections:

1. Hero
   - Name: `jamlee`.
   - Role: senior system engineer focused on large-scale training systems, post-training, asynchronous RL, multi-agent training engines, and cloud-native infrastructure.
   - Avatar: optional. If no image is configured, show initials or a neutral fallback.
   - Contact/navigation: render only configured social or contact links.

2. Metrics
   - `9+ 年系统工程经验`
   - `4000 卡级训练优化经验`
   - `32K 序列训练 MFU 达到 35.6%`
   - `函数冷启动时延降低 92%`

3. Expertise
   - 大模型后训练与强化学习训练系统
   - 分布式训练效率优化
   - Serverless 内核与云服务工程化
   - 云原生交付与传统系统现代化

4. Work Experience
   - 华为中央研究院/诺亚方舟实验室/基础大模型部, 2024.08 - 至今.
   - 华为中央软件院/分布式与并行软件实验室, 2021.09 - 2024.08.
   - 华为计费软件产品线, 2017.09 - 2021.09.
   - Each role can expand to show detailed achievements.

5. Projects
   - 盘古基模强化学习训练系统
   - 盘古基模预训练系统
   - FunctionGraph 元戎 Serverless 内核

6. Skills
   - Grouped by category: languages, distributed training, reinforcement learning, cloud native, database/middleware, engineering systems.
   - Use text badges by default and optional icons only where the reference project already has suitable assets.

7. Related Work
   - Render links from `resume.md`, including Pangu Pro MoE, SelectiveRS, AdaptivePipe, openPangu-Embedded-1B, and DeepDiver V2.

8. Contact
   - Render configured contact methods only.
   - If all contact methods are empty, hide the contact section and related navbar icons.

## Data Model

Create a structured profile data file at `src/data/profile.tsx`.

Suggested top-level shape:

```ts
export const PROFILE = {
  hero,
  metrics,
  expertise,
  work,
  projects,
  skills,
  education,
  publications,
  contact,
  blog,
};
```

The file is the main website maintenance surface. `resume.md` remains at the repository root as the human-readable source resume. The first version will not implement an automatic Markdown parser or synchronization script because the current resume structure can be represented directly and reliably as structured data.

## Component Strategy

Borrow and adapt from the reference portfolio:

- Keep the Next.js, TypeScript, Tailwind, shadcn/ui, Magic UI, and dark-mode stack.
- Reuse or adapt `Navbar`, `Dock`, `ModeToggle`, `BlurFade`, `BlurFadeText`, core UI primitives, and blog route structure.
- Adapt the work accordion pattern so each job can show multiple bullet achievements.
- Adapt the project card pattern for technical projects, but do not require screenshots/videos for every item.
- Add focused section components for metrics, expertise, related work, and grouped skills if the original components do not fit cleanly.

Avoid large unrelated redesigns. The visual identity should remain lightweight, technical, and readable, with Chinese text fitting cleanly on desktop and mobile.

## Empty And Optional Data

The UI must tolerate missing optional fields:

- Missing avatar: show initials/fallback.
- Empty social/contact URL: hide that link in navbar and contact section.
- Missing project media: render a text-first project card without a blank broken media area.
- Empty blog posts: `/blog` should render an empty state instead of example content.

## Blog Behavior

Keep the blog route and MDX infrastructure from the reference project where practical, but remove bundled example posts from the generated project. The first release should not show English sample posts as if they belong to jamlee.

Future Chinese technical posts can be added under the existing content directory once the homepage is stable.

## Testing And Verification

Before considering implementation complete:

- Install dependencies if needed.
- Run lint and/or production build.
- Start the local dev server.
- Use browser verification on desktop and mobile widths.
- Check that Chinese text wraps cleanly and does not overflow.
- Check that empty contact fields are hidden.
- Check that the homepage contains no leftover sample-person identity.
- Check that `/blog` is reachable and does not show unrelated English example posts.

## Out Of Scope For First Version

- Automatic parsing from `resume.md` into website data.
- Multilingual switching.
- Deployment configuration beyond keeping the project compatible with Vercel-style Next.js deployment.
- New avatar or custom generated imagery.
- A full content management system.
