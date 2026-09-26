import fs from "node:fs";
import path from "node:path";

export function loadAgentInstructions(
  agentName: string
): string {
  const filePath = path.resolve(
    process.cwd(),
    "agents",
    agentName,
    "AGENT.md"
  );

  if (!fs.existsSync(filePath)) {
    throw new Error(
      `Agent instructions not found: ${agentName}`
    );
  }

  return fs.readFileSync(filePath, "utf8");
}