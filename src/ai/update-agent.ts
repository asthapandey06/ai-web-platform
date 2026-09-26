import { loadAgentInstructions } from "./agent-loader.js";
import { callLLM } from "./llm-client.js";
import type { WebsiteSpec } from "./domain-agent.js";

export interface WebsiteSpecUpdate {
    pages?: Record<string, unknown>;
    services?: Record<string, unknown>;
    workflows?: Record<string, unknown>;
    domain?: Record<string, unknown>;
}

export async function runUpdateAgent(
    existingSpec: WebsiteSpec,
    changeRequest: string
): Promise<WebsiteSpecUpdate> {
    const agentInstructions =
        loadAgentInstructions("domain");

    const systemPrompt = `
You are the WebsiteOS Update Agent.

WebsiteOS already has an existing website specification.

Your job is to modify ONLY what the developer explicitly requested.

Do NOT regenerate the entire website specification.

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
10. If adding contact information requirements, modify only the relevant content/page structure.
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