import { runDomainAgent } from "./domain-agent.js";
import {
  startProgress,
  finishProgress,
} from "./progress.js";
import { writeWebsiteSpec } from "./spec-writer.js";

export async function generateWebsiteSpec(
  businessBrief: string,
  projectPath?: string
) {
  console.log("WebsiteOS AI generation started");

  startProgress(
    "Generating domain specification..."
  );

  try {
    const spec = await runDomainAgent(
      businessBrief
    );

    finishProgress(
      "Domain specification generated"
    );

    if (projectPath) {
      writeWebsiteSpec(projectPath, spec);

      console.log(
        "✓ Website specification saved"
      );
    }

    return spec;
  } catch (error) {
    finishProgress(
      "Domain specification generation failed",
      false
    );

    throw error;
  }
}