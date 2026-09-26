import fs from "node:fs";
import path from "node:path";

import type { DomainConfig } from "../core/domain-loader.js";
import type { ProjectConfig } from "../core/project-config.js";

export function writeProject(
  project: ProjectConfig,
  domain: DomainConfig
): void {
  const outputPath = path.resolve(process.cwd(), project.outputPath);

  fs.mkdirSync(outputPath, { recursive: true });

  fs.writeFileSync(
    path.join(outputPath, "project.json"),
    JSON.stringify(project, null, 2),
    "utf8"
  );

  fs.writeFileSync(
    path.join(outputPath, "domain.json"),
    JSON.stringify(domain, null, 2),
    "utf8"
  );
}