import fs from "node:fs";
import path from "node:path";

import type { DomainConfig } from "../core/domain-loader.js";
import type { ProjectConfig } from "../core/project-config.js";

export function generateReactData(
  project: ProjectConfig,
  domain: DomainConfig
): void {
  const dataPath = path.resolve(
    process.cwd(),
    project.outputPath,
    "src/data"
  );

  fs.mkdirSync(dataPath, { recursive: true });

  fs.writeFileSync(
    path.join(dataPath, "domain.json"),
    JSON.stringify(domain.domain, null, 2),
    "utf8"
  );

  fs.writeFileSync(
    path.join(dataPath, "pages.json"),
    JSON.stringify(domain.pages, null, 2),
    "utf8"
  );

  fs.writeFileSync(
    path.join(dataPath, "services.json"),
    JSON.stringify(domain.services, null, 2),
    "utf8"
  );
}