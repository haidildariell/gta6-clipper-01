// gta6-clipper-01 — entrypoint for the make.fun clip bounty.
//
// The whole entry is a single YouTube Short (see README.md). The platform
// only needs one artefact from us at run time: VIDEO.json, which points at
// the uploaded clip. This program copies VIDEO.json from the bot directory
// (the repo root) into the make.fun output directory.
//
// Node 22, standard library only — no dependencies, no build step.

import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? ".";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const source = join(botDir, "VIDEO.json");
if (!existsSync(source)) {
  console.error(`VIDEO.json not found in bot dir: ${source}`);
  process.exit(1);
}

// Validate before copying: the file must be JSON with an http(s) "url"
// field, otherwise the platform would ingest a pointer to nothing.
let parsed: unknown;
try {
  parsed = JSON.parse(readFileSync(source, "utf8"));
} catch {
  console.error(`VIDEO.json is not valid JSON: ${source}`);
  process.exit(1);
}
const url = (parsed as { url?: unknown }).url;
if (typeof url !== "string" || !/^https?:\/\//.test(url)) {
  console.error('VIDEO.json must contain an "url" field with an http(s) link');
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });

const target = join(outputDir, "VIDEO.json");
copyFileSync(source, target);
console.log(`Copied ${source} -> ${target}`);
