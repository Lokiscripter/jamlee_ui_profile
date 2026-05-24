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

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

test("profile data contains jamlee portfolio essentials", () => {
  assert.ok(existsSync(path.join(root, "src/data/profile.tsx")));
  const profile = read("src/data/profile.tsx");

  for (const expected of [
    "jamlee",
    "4000 卡级训练优化经验",
    "32K 序列训练 MFU 达到 35.6%",
    "异步流式框架降低Rollout时长 75%",
    "函数冷启动时延降低 92%",
    "盘古基模强化学习训练系统",
    "FunctionGraph 元戎 Serverless 内核",
    "Pangu Pro MoE",
  ]) {
    assert.match(profile, new RegExp(escapeRegExp(expected)));
  }
});

test("metrics emphasize training, rollout, and cold-start outcomes", () => {
  const profile = read("src/data/profile.tsx");
  const page = read("src/app/page.tsx");
  const trainingIndex = profile.indexOf("4000 卡级训练优化经验");
  const longContextIndex = profile.indexOf("32K 序列训练 MFU 达到 35.6%");
  const rolloutIndex = profile.indexOf("异步流式框架降低Rollout时长 75%");
  const coldStartIndex = profile.indexOf("函数冷启动时延降低 92%");

  assert.ok(trainingIndex >= 0);
  assert.ok(longContextIndex > trainingIndex);
  assert.ok(rolloutIndex > longContextIndex);
  assert.ok(coldStartIndex > rolloutIndex);
  assert.match(profile, /value: "时长降低 75%"/);
  assert.match(page, /value: 75, suffix: "% Rollout"/);
  assert.doesNotMatch(profile, /9\+ 年系统工程经验/);
  assert.doesNotMatch(profile, /8\+ 年系统工程经验/);
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
    assert.doesNotMatch(combined, new RegExp(escapeRegExp(forbidden)));
  }
});

test("blog starts without bundled example posts", () => {
  const posts = walkFiles("content").filter((file) => file.endsWith(".mdx"));
  assert.deepEqual(posts, []);
});

test("build does not depend on remote Google font fetching", () => {
  const files = walkFiles("src").filter((file) => /\.(tsx?|mdx?)$/.test(file));
  const combined = files.map((file) => read(file)).join("\n");

  assert.doesNotMatch(combined, /next\/font\/google/);
});

test("navbar section links navigate home from nested routes", () => {
  const navbar = read("src/components/navbar.tsx");

  for (const hash of ["home", "expertise", "work", "projects", "publications"]) {
    assert.match(navbar, new RegExp(`href: "/#${hash}"`));
    assert.doesNotMatch(navbar, new RegExp(`href: "#${hash}"`));
  }
});

test("skills render data-driven technology icons", () => {
  const profile = read("src/data/profile.tsx");
  const page = read("src/app/page.tsx");

  for (const iconName of [
    "Python",
    "Golang",
    "Docker",
    "Kubernetes",
    "Java",
    "Postgresql",
  ]) {
    assert.match(profile, new RegExp(`icon: ${iconName}`));
  }

  assert.match(page, /"icon" in skill/);
  assert.match(page, /<SkillIcon/);
});

test("homepage uses Magic UI components to break up dense text", () => {
  const page = read("src/app/page.tsx");

  for (const componentPath of [
    "src/components/magicui/bento-grid.tsx",
    "src/components/magicui/border-beam.tsx",
    "src/components/magicui/marquee.tsx",
    "src/components/magicui/number-ticker.tsx",
  ]) {
    assert.ok(existsSync(path.join(root, componentPath)));
  }

  for (const expected of [
    "BentoGrid",
    "BentoCard",
    "BorderBeam",
    "FlickeringGrid",
    "Marquee",
    "NumberTicker",
  ]) {
    assert.match(page, new RegExp(escapeRegExp(expected)));
  }
});

test("project cards use equal width and balanced summaries", () => {
  const page = read("src/app/page.tsx");

  assert.match(page, /projectSummaries/);
  assert.match(page, /description=\{projectSummaries\[index\] \?\? project\.description\}/);
  assert.match(page, /精度修复/);
  assert.match(page, /EP 分级通信/);
  assert.doesNotMatch(page, /md:col-span-3/);
  assert.doesNotMatch(page, /index === 1 \? "md:col-span-6"/);
});

test("repeated cards do not single out one item with border beams", () => {
  const page = read("src/app/page.tsx");

  assert.doesNotMatch(page, /index === 0 \? <BorderBeam/);
  assert.doesNotMatch(page, /index === 1 \? <BorderBeam/);
  assert.match(page, /<BorderBeam borderWidth=\{2\}/);
});

test("profile highlights pretraining experience without Timely emphasis", () => {
  const profile = read("src/data/profile.tsx");

  for (const expected of [
    "8K 序列 4000 卡 MFU 30.5%",
    "EP 分级通信",
    "Overlap 1F1B",
    "718B MoE",
    "dropless",
    "DeepSeekV3 Auxiliary Loss Free",
    "HELMET",
    "NIAH",
    "LongBench",
    "InfiniteBench",
  ]) {
    assert.match(profile, new RegExp(escapeRegExp(expected)));
  }

  for (const forbidden of ["Timely Dataflow", "Staleness=2", "Dataflow"]) {
    assert.doesNotMatch(profile, new RegExp(escapeRegExp(forbidden)));
  }
});
