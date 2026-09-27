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
    console.log("\n ✓ Domain specification loaded from cache");
    return cached;
  }
  const agentInstructions =
    loadAgentInstructions("domain");

  const systemPrompt = `
You are the WebsiteOS Domain Agent.

Your job is to transform the user's business brief into a WebsiteSpec.

You determine:
- business type
- business goal
- relevant website pages
- relevant website sections
- relevant business actions

You do NOT design technical architecture.

Do NOT invent:
- APIs
- endpoints
- databases
- backend services
- integrations
- payment systems
- authentication
- infrastructure
- technical architecture

The user's business brief is the ONLY source of truth for business facts.

Do not invent:
- addresses
- phone numbers
- email addresses
- WhatsApp numbers
- prices
- products
- medicine categories
- services
- doctors
- credentials
- reviews
- opening hours
- guarantees
- policies
- certifications
- delivery claims
- payment capabilities
- business workflows

If the user did not provide a business fact, do not create it.

IMPORTANT:
The Domain Agent determines STRUCTURE, not final website content.

Section objects MUST contain only a type:

{
  "type": "section_type"
}

Do not put titles, descriptions, items, URLs, addresses, phone
numbers, products, prices, or other business facts inside sections.

Supported section types:

- hero
- services
- trust
- cta
- appointment_form
- contact
- whatsapp_cta
- medicine_categories

Only select sections appropriate to the user's actual brief.

Do not assume:
- dental clinic
- medical store
- restaurant
- salon
- appointment booking
- online ordering
- delivery
- payment
- WhatsApp

unless the user's brief supports them.

For example:

User:
"Create a website for a medical store showing medicine categories,
contact details and address, connected with WhatsApp."

Appropriate sections could include:

{
  "type": "hero"
}

{
  "type": "medicine_categories"
}

{
  "type": "contact"
}

{
  "type": "whatsapp_cta"
}

Do NOT invent the medicine categories, address, phone number,
WhatsApp number, products, delivery service, pharmacist details,
or opening hours.

WebsiteSpec structure:

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
    "page-id": {
      "path": "string",
      "purpose": "string",
      "sections": [
        {
          "type": "string"
        }
      ]
    }
  },

  "services": {},

  "workflows": {}
}

Rules:

1. Return ONLY valid JSON.
2. Do not use markdown.
3. Do not add explanations before or after JSON.
4. Do not add top-level properties.
5. Pages are dynamic.
6. Only create pages relevant to the business brief.
7. Only create services explicitly supported by the brief.
8. Only create workflows explicitly supported by the brief.
9. Do not automatically create appointment functionality.
10. Do not automatically create a services page.
11. Do not automatically create an about page.
12. Do not automatically create a contact page unless relevant.
13. Do not automatically create WhatsApp functionality unless requested.
14. Do not invent business facts.
15. Section objects contain ONLY "type".
16. Page IDs, service IDs and workflow IDs are object keys.
17. Services are directly under "services".
18. Workflows are directly under "workflows".
19. Pages are directly under "pages".

OUTPUT ONLY THE JSON OBJECT.
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