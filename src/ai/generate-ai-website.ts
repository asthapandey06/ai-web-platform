import "dotenv/config";

import fs from "node:fs";
import path from "node:path";

import { generateWebsiteSpec } from "./orchestrator.js";
import { specToDomain } from "./spec-to-domain.js";
import { generateFromSpec } from "../generator/generate-from-spec.js";

const businessBrief = process.argv
    .slice(2)
    .join(" ")
    .trim();

if (!businessBrief) {
    throw new Error(
        "Usage: npm run ai:generate -- \"business brief\""
    );
}

const projectId = "ai-generated-site";

const projectPath = path.join(
    "projects",
    projectId
);

const spec = await generateWebsiteSpec(
    businessBrief,
    projectPath
);
const domain = specToDomain(spec);

console.log(
    `✓ WebsiteOS domain model ready`
);

console.log(
    `✓ Pages: ${Object.keys(
        (domain.pages.pages ?? {}) as Record<string, unknown>
    ).length}`
);

console.log(
    `✓ Services: ${Array.isArray(domain.services.services)
        ? domain.services.services.length
        : 0
    }`
);
const specPath = path.resolve(
    process.cwd(),
    projectPath,
    "website-spec.json"
);

if (!fs.existsSync(specPath)) {
    throw new Error(
        "Website specification was not generated"
    );
}
generateFromSpec(
  projectId,
  `${projectPath}/website-spec.json`
);
console.log(
    `\n✓ AI specification ready: ${specPath}`
);

console.log(
    `✓ Domain: ${String(spec.domain.name ?? "Unnamed")}`
);