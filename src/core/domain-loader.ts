import fs from "node:fs";
import path from "node:path";
import yaml from "yaml";

export interface DomainConfig {
  domain: Record<string, unknown>;
  pages: Record<string, unknown>;
  services: Record<string, unknown>;
  workflows: Record<string, unknown>;
}

function loadYaml(filePath: string): Record<string, unknown> {
  const content = fs.readFileSync(filePath, "utf8");
  return yaml.parse(content) as Record<string, unknown>;
}

export function loadDomain(domainId: string): DomainConfig {
  const domainPath = path.resolve(
    process.cwd(),
    "domains",
    domainId
  );

  if (!fs.existsSync(domainPath)) {
    throw new Error(`Domain not found: ${domainId}`);
  }

  return {
    domain: loadYaml(path.join(domainPath, "domain.yaml")),
    pages: loadYaml(path.join(domainPath, "pages.yaml")),
    services: loadYaml(path.join(domainPath, "services.yaml")),
    workflows: loadYaml(path.join(domainPath, "workflows.yaml")),
  };
}