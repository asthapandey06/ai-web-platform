import path from "node:path";

import type { DomainConfig } from "../core/domain-loader.js";
import type { ProjectConfig } from "../core/project-config.js";
import { writeJsonFile } from "./json-generator.js";

interface PageDefinition {
  path?: string;
  purpose?: string;
  sections?: string[];
}

export function generatePages(
  project: ProjectConfig,
  domain: DomainConfig
): void {
  const pages = domain.pages as Record<
    string,
    PageDefinition
  >;

  if (!pages || Object.keys(pages).length === 0) {
    throw new Error(
      "No pages defined in domain configuration"
    );
  }

  const directory = path.join(
    project.outputPath,
    "pages"
  );

  for (const [pageId, page] of Object.entries(pages)) {
    writeJsonFile(directory, `${pageId}.json`, {
      id: pageId,
      ...page,
    });
  }
}