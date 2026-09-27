import { loadAgentInstructions } from "./agent-loader.js";
import { callLLM } from "./llm-client.js";
import type { WebsiteSpec } from "./domain-agent.js";
import type { FeatureRecord } from "../project/project-metadata.js";

export interface WebsiteSpecUpdate {
    pages?: Record<string, unknown>;
    services?: Record<string, unknown>;
    workflows?: Record<string, unknown>;
    domain?: Record<string, unknown>;
}

export async function runUpdateAgent(
    existingSpec: WebsiteSpec,
    changeRequest: string,
    protectedFeatures: FeatureRecord[]
): Promise<WebsiteSpecUpdate> {
    const agentInstructions =
        loadAgentInstructions("domain");

    const protectedFeatureContext = protectedFeatures.length
        ? JSON.stringify(
            protectedFeatures.map((feature) => ({
                id: feature.id,
                name: feature.name,
                description: feature.description,
                version: feature.version,
            })),
            null,
            2
        )
        : "No protected features.";

    const systemPrompt = `
You are the WebsiteOS Update Agent.

WebsiteOS already has an existing website specification.

Your job is to modify ONLY what the developer explicitly requested.

IMPORTANT — PROTECTED FEATURES:

${protectedFeatureContext}

PROTECTION RULES:

1. Previously accepted features are protected.
2. Do NOT modify, remove, replace, or regenerate a protected feature.
3. Preserve all protected features when handling unrelated requests.
4. A protected feature may only be changed when the developer explicitly requests
   a modification to that specific feature.
5. Do not infer permission to modify a protected feature.
6. If the developer requests an unrelated change, preserve every protected feature.
7. If the developer explicitly requests a protected feature change, modify only
   the requested part of that feature.

Existing WebsiteSpec:

${JSON.stringify(existingSpec, null, 2)}

Developer change request:

${changeRequest}

Rules:

1. Preserve everything that is not explicitly related to the request.
2. Return ONLY the fields that need to change.
3. Do not return unchanged fields.
4. Do not invent client-specific facts.
5. Do not invent APIs, databases, infrastructure or backend architecture.
6. Do not remove existing pages, services or workflows unless explicitly requested.
7. Do not modify unrelated features.
8. Preserve existing structure.
9. If adding footer links, modify only pages.footer.
10. If adding contact information requirements, modify only the relevant
    content/page structure.
11. Never invent actual social URLs unless the developer provides them.
12. Return valid JSON only.

${agentInstructions}

Expected format:

{
  "pages": {},
  "services": {},
  "workflows": {},
  "domain": {}
}
WEBSITE SPEC STRUCTURE:

The canonical WebsiteSpec structure is:

{
  "domain": {},
  "pages": {},
  "services": {},
  "workflows": {}
}

PAGES:

Pages are stored directly inside "pages".

Correct:

{
  "pages": {
    "landing": {
      "path": "/landing",
      "purpose": "...",
      "sections": []
    }
  }
}

Incorrect:

{
  "pages": {
    "pages": {
      "landing": {}
    }
  }
}

SERVICES:

Services are stored directly inside "services".

Correct:

{
  "services": {
    "general-dentistry": {
      "name": "General Dentistry",
      "description": "..."
    }
  }
}

Incorrect:

{
  "services": {
    "services": [
      {
        "id": "general-dentistry",
        "name": "General Dentistry"
      }
    ]
  }
}

The service ID is the key. Do not add a redundant "id" field unless it already exists
in the existing specification and preserving it is required.

WORKFLOWS:

Workflows are stored directly inside "workflows".

Correct:

{
  "workflows": {
    "appointment_request": {
      "trigger": {},
      "steps": []
    }
  }
}

Incorrect:

{
  "workflows": {
    "workflows": {
      "appointment_request": {}
    }
  }
}

When modifying a page, service, or workflow, modify the item directly under its
respective top-level collection.

Do not create nested "pages", "services", or "workflows" collections.

Only include the sections that actually need modification.
`;

    const response = await callLLM([
        {
            role: "system",
            content: systemPrompt,
        },
        {
            role: "user",
            content: changeRequest,
        },
    ]);

    return parseUpdate(response);
}

function parseUpdate(
    response: string
): WebsiteSpecUpdate {
    let cleaned = response.trim();

    cleaned = cleaned
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/\s*```$/i, "")
        .trim();

    const firstBrace = cleaned.indexOf("{");
    const lastBrace = cleaned.lastIndexOf("}");

    if (firstBrace !== -1 && lastBrace > firstBrace) {
        cleaned = cleaned.slice(
            firstBrace,
            lastBrace + 1
        );
    }

    try {
        const parsed = JSON.parse(cleaned);

        if (
            typeof parsed !== "object" ||
            parsed === null ||
            Array.isArray(parsed)
        ) {
            throw new Error();
        }

        return parsed as WebsiteSpecUpdate;
    } catch {
        throw new Error(
            `Update agent returned invalid JSON:\n${response}`
        );
    }
}