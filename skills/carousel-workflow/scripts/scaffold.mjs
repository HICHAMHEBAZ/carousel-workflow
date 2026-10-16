#!/usr/bin/env node
// Copy the engine into a new carousel folder.
//   node scaffold.mjs <slug> [target-dir]
import { cp, access } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const slug = process.argv[2];
if (!slug || !/^[a-z0-9][a-z0-9-]*$/i.test(slug)) {
  console.error("usage: node scaffold.mjs <slug> [target-dir]   (slug: letters, digits, dashes)");
  process.exit(1);
}

const engine = join(dirname(fileURLToPath(import.meta.url)), "..", "engine");
const dest = resolve(process.argv[3] ?? ".", slug);

try {
  await access(dest);
  console.error(`refusing to overwrite existing folder: ${dest}`);
  process.exit(1);
} catch {
  /* does not exist: good */
}

await cp(engine, dest, { recursive: true });
console.log(`created ${dest}\nnext: cd "${dest}" && npm install   (PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 if Chrome/Edge is installed)`);
