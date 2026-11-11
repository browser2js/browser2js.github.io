import { cp, mkdir, readFile, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const source = new URL("../src/", import.meta.url);
const output = new URL("../dist/", import.meta.url);
const dependency = new URL("../vendor/dragscroll/", import.meta.url);
const pinnedCommit = "bb4cd42f3f850bedf9f9fd99a388017a09e29b52";
const actualCommit = execFileSync("git", ["-C", fileURLToPath(dependency), "rev-parse", "HEAD"], { encoding: "utf8" }).trim();
if (actualCommit !== pinnedCommit) {
  throw new Error(`Expected dragscroll ${pinnedCommit}; run git submodule update --init --recursive`);
}
const dependencyChanges = execFileSync("git", ["-C", fileURLToPath(dependency), "status", "--porcelain"], { encoding: "utf8" }).trim();
if (dependencyChanges) throw new Error("The pinned dragscroll submodule has uncommitted changes");

await mkdir(output, { recursive: true });
await cp(source, output, { recursive: true });
await cp(new URL("dragscroll.js", dependency), new URL("assets/dragscroll.js", output));
await cp(new URL("LICENSE", dependency), new URL("assets/dragscroll.LICENSE", output));
await writeFile(new URL(".nojekyll", output), "", "utf8");
const html = await readFile(new URL("index.html", output), "utf8");
for (const match of html.matchAll(/(?:src|href)="(assets\/[^"]+)"/g)) {
  await readFile(new URL(match[1], output));
}
console.log(`Built static HTML, CSS and JavaScript in ${root}dist`);
console.log(`dragscroll pinned at ${pinnedCommit}`);
