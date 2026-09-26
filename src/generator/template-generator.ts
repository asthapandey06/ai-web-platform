import fs from "node:fs";
import path from "node:path";

import type { ProjectConfig } from "../core/project-config.js";

export function generateReactProject(
  project: ProjectConfig
): void {
  const templatePath = path.resolve(
    process.cwd(),
    "templates/react"
  );

  const outputPath = path.resolve(
    process.cwd(),
    project.outputPath
  );

  if (!fs.existsSync(templatePath)) {
    throw new Error("React template not found");
  }

  fs.cpSync(templatePath, outputPath, {
    recursive: true,
    force: true,
  });
}