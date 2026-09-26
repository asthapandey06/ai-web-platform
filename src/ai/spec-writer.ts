import fs from "node:fs";
import path from "node:path";

import type { WebsiteSpec } from "./domain-agent.js";

export function writeWebsiteSpec(
  projectPath: string,
  spec: WebsiteSpec
): void {
  const outputPath = path.resolve(
    process.cwd(),
    projectPath
  );

  fs.mkdirSync(outputPath, { recursive: true });

  fs.writeFileSync(
    path.join(outputPath, "website-spec.json"),
    JSON.stringify(spec, null, 2),
    "utf8"
  );
}