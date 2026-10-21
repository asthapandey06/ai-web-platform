# Graph Report - ai-web-platform  (2026-09-28)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 306 nodes · 482 edges · 23 communities (15 shown, 8 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `30f131a7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- package.json
- generate.ts
- generate-ai-website.ts
- react/src/App.tsx
- domain-agent.ts
- react/package.json
- compilerOptions
- compilerOptions
- client/src/main.tsx
- compilerOptions
- scripts
- orchestrator.ts
- src/index.ts
- client/vite.config.ts
- spec-validator.ts
- env.ts
- components/forms/AppointmentForm.tsx
- components/layout/Footer.tsx
- components/layout/Header.tsx
- components/sections/CTA.tsx
- components/sections/Hero.tsx
- components/sections/Services.tsx
- components/sections/Trust.tsx

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 15 edges
2. `compilerOptions` - 14 edges
3. `scripts` - 11 edges
4. `compilerOptions` - 11 edges
5. `runDomainAgent()` - 9 edges
6. `validateWebsiteSpec()` - 8 edges
7. `App()` - 8 edges
8. `WebsiteSpec` - 7 edges
9. `DomainConfig` - 7 edges
10. `ProjectConfig` - 7 edges

## Surprising Connections (you probably didn't know these)
- `generateWebsiteSpec()` --calls--> `runDomainAgent()`  [EXTRACTED]
  src/ai/orchestrator.ts → src/ai/domain-agent.ts
- `runDomainAgent()` --calls--> `validateWebsiteSpec()`  [EXTRACTED]
  src/ai/domain-agent.ts → src/ai/spec-validator.ts
- `generateFromSpec()` --calls--> `specToDomain()`  [EXTRACTED]
  src/generator/generate-from-spec.ts → src/ai/spec-to-domain.ts
- `generateFromSpec()` --calls--> `createProjectConfig()`  [EXTRACTED]
  src/generator/generate-from-spec.ts → src/core/project-config.ts
- `generateFromSpec()` --calls--> `generateReactData()`  [EXTRACTED]
  src/generator/generate-from-spec.ts → src/generator/data-generator.ts

## Import Cycles
- None detected.

## Communities (23 total, 8 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.04
Nodes (44): author, bugs, url, dependencies, dotenv, express, pg, react (+36 more)

### Community 1 - "generate.ts"
Cohesion: 0.17
Nodes (22): ref_node_fs, ref_node_path, WebsiteSpec, specToDomain(), DomainConfig, loadDomain(), loadYaml(), createProjectConfig() (+14 more)

### Community 2 - "generate-ai-website.ts"
Cohesion: 0.11
Nodes (25): ref_node_child_process, absoluteProjectPath, args, projectExists, projectId, projectPath, IMPORTANT:, request (+17 more)

### Community 3 - "react/src/App.tsx"
Cohesion: 0.10
Nodes (22): ref_react_dom, App(), navigation, Service, serviceEntries, trustItems, Footer(), FooterProps (+14 more)

### Community 4 - "domain-agent.ts"
Cohesion: 0.16
Nodes (19): ref_node_crypto, loadAgentInstructions(), CACHE_DIR, getCachedResponse(), getCacheKey(), setCachedResponse(), parseWebsiteSpec(), runDomainAgent() (+11 more)

### Community 5 - "react/package.json"
Cohesion: 0.11
Nodes (17): react-dom, @vitejs/plugin-react, dependencies, react, react-dom, vite, @vitejs/plugin-react, devDependencies (+9 more)

### Community 6 - "compilerOptions"
Cohesion: 0.12
Nodes (16): compilerOptions, allowImportingTsExtensions, esModuleInterop, isolatedModules, jsx, lib, module, moduleResolution (+8 more)

### Community 7 - "compilerOptions"
Cohesion: 0.12
Nodes (16): compilerOptions, esModuleInterop, forceConsistentCasingInFileNames, jsx, module, moduleResolution, outDir, paths (+8 more)

### Community 8 - "client/src/main.tsx"
Cohesion: 0.14
Nodes (8): ContainerProps, App(), rootElement, projects_local_store_client_src_styles, ref_react, AppointmentForm(), AppointmentFormProps, ContainerProps

### Community 9 - "compilerOptions"
Cohesion: 0.15
Nodes (12): compilerOptions, esModuleInterop, forceConsistentCasingInFileNames, module, moduleResolution, outDir, rootDir, skipLibCheck (+4 more)

### Community 10 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, ai:generate, build, dev, local-store:build, local-store:client:build, local-store:client:dev, local-store:server:build (+3 more)

### Community 11 - "orchestrator.ts"
Cohesion: 0.36
Nodes (6): dotenv, generateWebsiteSpec(), finishProgress(), frames, startProgress(), writeWebsiteSpec()

### Community 12 - "src/index.ts"
Cohesion: 0.32
Nodes (5): app, getPort(), port, server, express

### Community 13 - "client/vite.config.ts"
Cohesion: 0.40
Nodes (4): projectRoot, ref_node_url, ref_vite, ref_vitejs_plugin_react

### Community 14 - "spec-validator.ts"
Cohesion: 0.80
Nodes (5): isObject(), validatePages(), validateServices(), validateWebsiteSpec(), validateWorkflows()

## Knowledge Gaps
- **145 isolated node(s):** `PageDefinition`, `ServiceDefinition`, `WorkflowDefinition`, `AppointmentFormProps`, `FooterProps` (+140 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 165 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dotenv` connect `orchestrator.ts` to `package.json`, `generate.ts`, `generate-ai-website.ts`?**
  _High betweenness centrality (0.181) - this node is a cross-community bridge._
- **Why does `scripts` connect `scripts` to `package.json`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **What connects `PageDefinition`, `ServiceDefinition`, `WorkflowDefinition` to the rest of the system?**
  _145 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.0425531914893617 - nodes in this community are weakly interconnected._
- **Should `generate-ai-website.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11397849462365592 - nodes in this community are weakly interconnected._
- **Should `react/src/App.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.09655172413793103 - nodes in this community are weakly interconnected._
- **Should `react/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._