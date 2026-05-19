# jamlee Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Chinese-first jamlee technical portfolio in `/Users/loki/Github_Project/jamlee_ui_profile` using the local Magic UI portfolio as a reference scaffold.

**Architecture:** Copy the reference Next.js portfolio scaffold into the current project, then replace the generic `DATA` model with a focused `PROFILE` model and rewrite the homepage sections around metrics, expertise, work, projects, skills, publications, optional contact, and an empty Blog shell. Add a small Node test suite that verifies the generated project does not retain sample identity/content and that the first version exposes the expected jamlee data.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, shadcn/ui primitives, Magic UI components, content-collections, Node built-in test runner.

---

### Task 1: Add Portfolio Content Guard Tests

**Files:**
- Create: `tests/portfolio-content.test.mjs`

- [ ] **Step 1: Write failing tests before copying or editing production code**

```js
import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();

function read(relativePath) {
  return readFileSync(path.join(root, relativePath), "utf8");
}

function walkFiles(relativeDir) {
  const dir = path.join(root, relativeDir);
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const relativePath = path.join(relativeDir, entry.name);
    const absolutePath = path.join(root, relativePath);
    if (entry.isDirectory()) return walkFiles(relativePath);
    if (entry.isFile() && statSync(absolutePath).isFile()) return [relativePath];
    return [];
  });
}

test("profile data contains jamlee portfolio essentials", () => {
  assert.ok(existsSync(path.join(root, "src/data/profile.tsx")));
  const profile = read("src/data/profile.tsx");

  for (const expected of [
    "jamlee",
    "9+ 年系统工程经验",
    "4000 卡级训练优化经验",
    "32K 序列训练 MFU 达到 35.6%",
    "函数冷启动时延降低 92%",
    "盘古基模强化学习训练系统",
    "FunctionGraph 元戎 Serverless 内核",
    "Pangu Pro MoE",
  ]) {
    assert.match(profile, new RegExp(expected.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("generated project does not expose sample portfolio identity", () => {
  const files = walkFiles("src")
    .concat(walkFiles("content"))
    .filter((file) => /\.(tsx?|mdx?)$/.test(file));

  const combined = files.map((file) => read(file)).join("\n");

  for (const forbidden of [
    "Dillion Verma",
    "Atomic Finance",
    "Hack Western",
    "Check out my latest work",
    "My thoughts on software development, life, and more.",
  ]) {
    assert.doesNotMatch(combined, new RegExp(forbidden.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("blog starts without bundled example posts", () => {
  const posts = walkFiles("content").filter((file) => file.endsWith(".mdx"));
  assert.deepEqual(posts, []);
});
```

- [ ] **Step 2: Run tests to verify RED**

Run: `node --test tests/portfolio-content.test.mjs`

Expected: FAIL because `src/data/profile.tsx` and the generated project files do not exist yet.

- [ ] **Step 3: Commit the tests**

Run:

```bash
git add tests/portfolio-content.test.mjs
git commit -m "test: add portfolio content guards"
```

### Task 2: Copy Reference Scaffold

**Files:**
- Create/modify: project scaffold copied from `/Users/loki/Github_Project/magicuidesign/portfolio`
- Preserve: `resume.md`, `docs/superpowers/**`, `.git`, `.gitignore`, `tests/portfolio-content.test.mjs`

- [ ] **Step 1: Copy scaffold**

Run:

```bash
rsync -a --exclude .git --exclude node_modules --exclude .next --exclude .content-collections /Users/loki/Github_Project/magicuidesign/portfolio/ /Users/loki/Github_Project/jamlee_ui_profile/
```

- [ ] **Step 2: Restore project-specific ignored files**

Ensure `.gitignore` includes:

```gitignore
.superpowers/
node_modules/
.next/
.content-collections/
```

- [ ] **Step 3: Run tests**

Run: `node --test tests/portfolio-content.test.mjs`

Expected: still FAIL because the scaffold still contains sample identity and bundled example posts.

- [ ] **Step 4: Commit scaffold**

Run:

```bash
git add .
git commit -m "chore: add portfolio scaffold"
```

### Task 3: Replace Profile Data And Homepage

**Files:**
- Create: `src/data/profile.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `src/components/navbar.tsx`
- Modify/Create section components under `src/components/section/`
- Modify: `src/components/project-card.tsx` so projects without image or video render as text-first cards without a large blank media area.

- [ ] **Step 1: Implement `PROFILE` data from `resume.md`**

Create `src/data/profile.tsx` with structured data for hero, metrics, expertise, work, projects, skills, education, publications, and empty contact/social fields. Use exact Chinese content from `resume.md` where practical.

- [ ] **Step 2: Rewrite homepage around `PROFILE`**

Replace sample sections with:

1. hero
2. metrics
3. expertise
4. work experience
5. projects
6. skills
7. education
8. related work
9. optional contact

- [ ] **Step 3: Update layout metadata**

Use `PROFILE.name`, `PROFILE.description`, and `PROFILE.url` with a local-safe default URL.

- [ ] **Step 4: Update navbar**

Point navbar sections to homepage anchors and hide empty contact/social links.

- [ ] **Step 5: Run tests**

Run: `node --test tests/portfolio-content.test.mjs`

Expected: still FAIL only if Blog sample posts remain; profile and sample identity assertions should pass.

- [ ] **Step 6: Commit profile and homepage**

Run:

```bash
git add src
git commit -m "feat: add jamlee portfolio homepage"
```

### Task 4: Empty Blog Shell

**Files:**
- Delete: `content/*.mdx`
- Modify: `src/app/blog/page.tsx`
- Modify: `src/app/blog/[slug]/page.tsx` only if imports still point to removed `DATA`

- [ ] **Step 1: Remove bundled example posts**

Delete all `.mdx` files under `content/`.

- [ ] **Step 2: Localize Blog empty state**

Use Chinese copy such as:

```tsx
<h1>技术文章</h1>
<p>后续会在这里记录大模型训练系统、Serverless 和云原生工程实践。</p>
<p>暂时还没有公开文章。</p>
```

- [ ] **Step 3: Run tests**

Run: `node --test tests/portfolio-content.test.mjs`

Expected: PASS.

- [ ] **Step 4: Commit Blog cleanup**

Run:

```bash
git add content src/app/blog
git commit -m "feat: localize empty blog shell"
```

### Task 5: Install, Build, And Browser Verify

**Files:**
- Modify: `package.json` if adding `"test": "node --test tests/*.test.mjs"` is useful.
- Modify: any source file required by lint/build feedback.

- [ ] **Step 1: Install dependencies**

Run: `pnpm install`

- [ ] **Step 2: Run tests**

Run: `node --test tests/portfolio-content.test.mjs`

Expected: PASS.

- [ ] **Step 3: Run lint**

Run: `pnpm lint`

Expected: 0 errors.

- [ ] **Step 4: Run production build**

Run: `pnpm build`

Expected: exit 0.

- [ ] **Step 5: Start dev server**

Run: `pnpm dev`

Expected: local URL, usually `http://localhost:3000`.

- [ ] **Step 6: Browser QA**

Open the local URL and verify desktop and mobile:

- Chinese text wraps cleanly.
- Homepage has no sample-person identity.
- Empty contact/social fields do not render broken links.
- `/blog` is reachable and shows the Chinese empty state.

- [ ] **Step 7: Commit verification fixes**

If any code changes were needed after lint/build/browser QA, commit them:

```bash
git add .
git commit -m "fix: polish portfolio verification issues"
```
