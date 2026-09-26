import "dotenv/config";

import { generateWebsiteSpec } from "./orchestrator.js";

const businessBrief =
  process.argv.slice(2).join(" ") ||
  `
Create a website for a dental clinic.
The goal is to generate appointment leads.
`;

const spec = await generateWebsiteSpec(
  businessBrief,
  "projects/ai-dental-demo"
);

console.log(
  JSON.stringify(spec, null, 2)
);