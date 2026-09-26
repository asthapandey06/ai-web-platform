import path from "node:path";

import type { DomainConfig } from "../core/domain-loader.js";
import type { ProjectConfig } from "../core/project-config.js";
import { writeJsonFile } from "./json-generator.js";

interface PageDefinition {
  path?: string;
  purpose?: string;
  sections?: string[];
}

interface PagesConfig {
  pages?: Record<string, PageDefinition>;
}

export function generatePages(
  project: ProjectConfig,
  domain: DomainConfig
): void {
  const pagesConfig = domain.pages as PagesConfig;

  if (!pagesConfig.pages) {
    throw new Error("No pages defined in domain configuration");
  }

  const directory = path.join(project.outputPath, "pages");

  for (const [pageId, page] of Object.entries(pagesConfig.pages)) {
    writeJsonFile(directory, `${pageId}.json`, {
      id: pageId,
      ...page,
    });
  }
}