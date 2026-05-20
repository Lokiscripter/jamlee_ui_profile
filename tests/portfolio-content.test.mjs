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
    "9+ 年系统工程经验",
    "4000 卡级训练优化经验",
    "32K 序列训练 MFU 达到 35.6%",
    "函数冷启动时延降低 92%",
    "盘古基模强化学习训练系统",
    "FunctionGraph 元戎 Serverless 内核",
    "Pangu Pro MoE",
  ]) {
    assert.match(profile, new RegExp(escapeRegExp(expected)));
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
