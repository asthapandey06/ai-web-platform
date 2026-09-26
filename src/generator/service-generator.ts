import path from "node:path";

import type { DomainConfig } from "../core/domain-loader.js";
import type { ProjectConfig } from "../core/project-config.js";
import { writeJsonFile } from "./json-generator.js";

interface ServiceDefinition {
  id: string;
  name: string;
  description?: string;
  featured?: boolean;
}

interface ServicesConfig {
  services?: ServiceDefinition[];
}

export function generateServices(
  project: ProjectConfig,
  domain: DomainConfig
): void {
  const servicesConfig = domain.services as ServicesConfig;

  if (!servicesConfig.services) {
    throw new Error("No services defined in domain configuration");
  }

  const directory = path.join(project.outputPath, "services");

  for (const service of servicesConfig.services) {
    writeJsonFile(
      directory,
      `${service.id}.json`,
      service
    );
  }
}