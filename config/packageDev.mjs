#!/usr/bin/env node
// Packages the calling visual as a development build, leaving its pbiviz.json untouched
import { execSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const devConfig = ".tmp/pbiviz.dev.json";
const config = JSON.parse(readFileSync("pbiviz.json", "utf8"));
config.visual.name += "_DEV";
config.visual.displayName += " (Dev)";
config.visual.guid += "_DEV";
mkdirSync(".tmp", { recursive: true });
writeFileSync(devConfig, JSON.stringify(config));
execSync(`npm run package -- --pbiviz-file ${devConfig}`, { stdio: "inherit" });
