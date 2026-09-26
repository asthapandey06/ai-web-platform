import fs from "node:fs";
import path from "node:path";

import type { WebsiteSpec } from "../ai/domain-agent.js";
import { specToDomain } from "../ai/spec-to-domain.js";
import { generateReactData } from "./data-generator.js";
import { createProjectConfig } from "../core/project-config.js";

export function generateFromSpec(
  projectId: string,
  specPath: string
): void {
  const absoluteSpecPath = path.resolve(
    process.cwd(),
    specPath
  );

  if (!fs.existsSync(absoluteSpecPath)) {
    throw new Error(
      `WebsiteSpec not found: ${specPath}`
    );
  }

  const spec = JSON.parse(
    fs.readFileSync(absoluteSpecPath, "utf8")
  ) as WebsiteSpec;

  const domain = specToDomain(spec);

  const config = createProjectConfig(
    projectId,
    String(spec.domain.id ?? "generated-domain"),
    `projects/${projectId}`
  );

  generateReactData(config, domain);

  console.log(
    `✓ React data generated for ${projectId}`
  );
}