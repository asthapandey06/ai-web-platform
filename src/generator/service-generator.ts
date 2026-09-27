import path from "node:path";

import type { DomainConfig } from "../core/domain-loader.js";
import type { ProjectConfig } from "../core/project-config.js";
import { writeJsonFile } from "./json-generator.js";

interface ServiceDefinition {
  name: string;
  description?: string;
  featured?: boolean;
  [key: string]: unknown;
}

export function generateServices(
  project: ProjectConfig,
  domain: DomainConfig
): void {
  const services = domain.services as Record<
    string,
    ServiceDefinition
  >;

  if (!services || Object.keys(services).length === 0) {
    throw new Error(
      "No services defined in domain configuration"
    );
  }

  const directory = path.join(
    project.outputPath,
    "services"
  );

  for (const [serviceId, service] of Object.entries(
    services
  )) {
    writeJsonFile(
      directory,
      `${serviceId}.json`,
      {
        id: serviceId,
        ...service,
      }
    );
  }
}