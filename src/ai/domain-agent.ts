import { loadAgentInstructions } from "./agent-loader.js";
import { callLLM } from "./llm-client.js";
import { validateWebsiteSpec } from "./spec-validator.js";
import {
    getCachedResponse,
    setCachedResponse,
} from "./ai-cache.js";

export interface WebsiteSpec {
    domain: Record<string, unknown>;
    pages: Record<string, unknown>;
    services: Record<string, unknown>;
    workflows: Record<string, unknown>;
}

export async function runDomainAgent(
    businessBrief: string
): Promise<WebsiteSpec> {
    const cached = getCachedResponse<WebsiteSpec>(
        "domain-agent",
        businessBrief
    );

    if (cached) {
        console.log("/n ✓ Domain specification loaded from cache");
        return cached;
    }
    const agentInstructions =
        loadAgentInstructions("domain");

    const systemPrompt = `
You are the WebsiteOS Domain Agent.

Follow these instructions exactly:

${agentInstructions}

Your job is to transform the business brief into a
WebsiteOS domain specification.

IMPORTANT:

You are NOT designing an application architecture.

Do NOT invent:
- APIs
- endpoints
- databases
- backend services
- calendar integrations
- payment systems
- authentication systems
- infrastructure
- technical architectures

Return ONLY valid JSON.

The JSON MUST follow this exact structure:

{
  "domain": {
    "id": "string",
    "name": "string",
    "version": 1,
    "business": {
      "type": "string",
      "primary_goal": "string"
    },
    "audience": [],
    "primary_actions": [],
    "content": {
      "required": []
    },
    "trust": {
      "recommended": []
    },
    "automation": {},
    "seo": {},
    "constraints": []
  },

  "pages": {
    "pages": {
      "page_id": {
        "path": "string",
        "purpose": "string",
        "sections": []
      }
    },
    "navigation": {
      "primary": [],
      "primary_cta": {
        "label": "string",
        "target": "string"
      }
    },
    "footer": {
      "links": []
    }
  },

  "services": {
    "services": [
      {
        "id": "string",
        "name": "string",
        "description": "string",
        "featured": true
      }
    ],
    "rules": {
      "use_placeholders_when_client_data_missing": true
    }
  },

  The "workflows" property MUST have this exact structure:

"workflows": {
  "workflows": {
    "appointment_request": {
      "trigger": {
        "type": "form_submission",
        "form": "appointment"
      },
      "steps": [
        {
          "validate": {
            "required": [
              "name",
              "phone"
            ]
          }
        },
        {
          "create_lead": {
            "status": "new"
          }
        },
        {
          "notify_clinic": {
            "channel": "email"
          }
        }
      ]
    }
  },
  "rules": []
}


}
The value of workflows.workflows MUST ALWAYS be an object/map.
Never return an array for workflows.workflows.
STRICT RULES:

1. Follow the structure above exactly.
2. Do not add top-level keys.
3. Do not replace arrays with objects.
4. Do not invent API endpoints.
5. Do not invent client-specific facts.
6. Use placeholders when information is missing.
7. Do not invent pricing, reviews, doctors, credentials,
   addresses, opening hours or certifications.
8. Workflows describe business workflows, not technical APIs.
9. Pages describe website pages, not software architecture.
10. Services describe business services, not backend services.
11. Return JSON only.
12. Never invent services that were not provided by the user.
13. Never invent service descriptions containing specific treatments,
    procedures, guarantees, outcomes, or medical claims.
14. If service information is missing, use:
    "Placeholder service description."
15. Never invent business policies or constraints.
16. Only include facts explicitly provided by the user.
17. Recommendations such as suggested trust elements must be marked
    as recommendations, not presented as existing business facts.
18. Do not invent workflow integrations.
19. Only describe workflows that can be supported by the information in the business brief.
20. Use placeholders where required information is missing.
`;

    const response = await callLLM([
        {
            role: "system",
            content: systemPrompt,
        },
        {
            role: "user",
            content: businessBrief,
        },
    ]);

    const spec = parseWebsiteSpec(response);

    validateWebsiteSpec(spec);

    setCachedResponse(
        "domain-agent",
        businessBrief,
        spec
    );

    return spec;
}

function parseWebsiteSpec(
    response: string
): WebsiteSpec {
    let cleaned = response.trim();

    // Remove markdown code fences.
    cleaned = cleaned
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/\s*```$/i, "")
        .trim();

    // If the model added text before/after JSON,
    // extract the JSON object.
    const firstBrace = cleaned.indexOf("{");
    const lastBrace = cleaned.lastIndexOf("}");

    if (firstBrace !== -1 && lastBrace > firstBrace) {
        cleaned = cleaned.slice(
            firstBrace,
            lastBrace + 1
        );
    }

    let parsed: unknown;

    try {
        parsed = JSON.parse(cleaned);
    } catch {
        throw new Error(
            `Domain agent returned invalid JSON:\n${response}`
        );
    }

    if (
        typeof parsed !== "object" ||
        parsed === null ||
        !("domain" in parsed) ||
        !("pages" in parsed) ||
        !("services" in parsed) ||
        !("workflows" in parsed)
    ) {
        throw new Error(
            "Domain agent returned an invalid WebsiteSpec"
        );
    }

    return parsed as WebsiteSpec;
}