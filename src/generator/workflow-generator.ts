import path from "node:path";

import type { DomainConfig } from "../core/domain-loader.js";
import type { ProjectConfig } from "../core/project-config.js";
import { writeJsonFile } from "./json-generator.js";

interface WorkflowDefinition {
  trigger?: Record<string, unknown>;
  steps?: unknown[];
  [key: string]: unknown;
}

export function generateWorkflows(
  project: ProjectConfig,
  domain: DomainConfig
): void {
  const workflows = domain.workflows as Record<
    string,
    WorkflowDefinition
  >;

  if (!workflows || Object.keys(workflows).length === 0) {
    throw new Error(
      "No workflows defined in domain configuration"
    );
  }

  const directory = path.join(
    project.outputPath,
    "workflows"
  );

  for (const [workflowId, workflow] of Object.entries(
    workflows
  )) {
    writeJsonFile(
      directory,
      `${workflowId}.json`,
      {
        id: workflowId,
        ...workflow,
      }
    );
  }
}