import "dotenv/config";

import { env } from "../config/env.js";
import { loadDomain } from "../core/domain-loader.js";
import { createProjectConfig } from "../core/project-config.js";
import { writeProject } from "./project-writer.js";
import { generatePages } from "./page-generator.js";
import { generateServices } from "./service-generator.js";
import { generateWorkflows } from "./workflow-generator.js";
import { generateReactProject } from "./template-generator.js";
import { generateReactData } from "./data-generator.js";


const domainId = process.argv[2] ?? "dental-clinic";
const projectId = process.argv[3] ?? `${domainId}-demo`;

const domain = loadDomain(domainId);

const config = createProjectConfig(
  projectId,
  domainId,
  `projects/${projectId}`
);

// Generate the project files
writeProject(config, domain);
generatePages(config, domain);
generateServices(config, domain);
generateWorkflows(config, domain);

// Generate the React project template
generateReactProject(config);
generateReactData(config, domain);


console.log("WebsiteOS generation completed");

console.log({
  environment: env.nodeEnv,
  project: config,
  outputPath: config.outputPath,
});