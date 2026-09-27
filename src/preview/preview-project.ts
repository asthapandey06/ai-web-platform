import { spawn, ChildProcess } from "node:child_process";
import path from "node:path";
import fs from "node:fs";

const runningProjects = new Map<string, ChildProcess>();

export interface PreviewOptions {
  projectPath: string;
  port?: number;
}

export function startPreview({
  projectPath,
  port = 5173,
}: PreviewOptions): ChildProcess {
  if (!fs.existsSync(projectPath)) {
    throw new Error(`Project not found: ${projectPath}`);
  }

  const projectName = path.basename(projectPath);
  const existingProcess = runningProjects.get(projectName);

  if (existingProcess && !existingProcess.killed) {
    console.log(`✓ Preview already running: ${projectName}`);
    console.log(`→ http://localhost:${port}`);
    return existingProcess;
  }

  const absoluteProjectPath = path.resolve(projectPath);

  console.log(`→ Starting preview: ${projectName}`);

  const child = spawn(
    "npx",
    [
      "vite",
      absoluteProjectPath,
      "--host",
      "127.0.0.1",
      "--port",
      String(port),
    ],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    }
  );

  runningProjects.set(projectName, child);

  child.on("exit", () => {
    runningProjects.delete(projectName);
  });

  child.on("error", (error) => {
    runningProjects.delete(projectName);
    console.error(`✗ Preview failed for ${projectName}: ${error.message}`);
  });

  console.log(`✓ Preview starting`);
  console.log(`→ http://localhost:${port}`);

  return child;
}