# WebsiteOS Operating Rules

## Mission

WebsiteOS is an internal AI-assisted production system for creating automated,
conversion-focused business websites and business systems.

The objective is to make client project delivery significantly faster through
reusable skills, subagents, components, templates, integrations and proven
engineering patterns.

## Primary Rule

Build the smallest reusable system that can produce the current demo.

Do not build platform features without a demonstrated need.

## Architecture

- `subagents/` contains agent responsibilities and operating instructions.
- `skills/` contains reusable domain knowledge and capabilities.
- `domains/` contains business-domain specifications.
- `components/` contains reusable website components.
- `templates/` contains reusable website starting points.
- `automation/` contains website/business workflow definitions.
- `src/` contains WebsiteOS engine code.
- `config/` contains schemas and configuration.
- `docs/` contains architecture and process documentation.
- `scripts/` contains development and generation utilities.
- `core/` contains reusable backend engineering primitives and infrastructure.
- `projects/` contains generated/client websites and business applications.


## Workspace and Project Structure

WebsiteOS is the root development workspace and dependency manager.

- Root `node_modules/` is the default dependency installation location.
- Client projects must not create their own `node_modules/` during WebsiteOS development.
- Client projects may contain `package.json` files describing their dependencies.
- Do not create separate lockfiles inside client projects unless a real deployment requirement requires isolated dependency management.

Reusable code ownership:

- `components/` contains reusable frontend/UI components.
- `core/` contains reusable backend engineering primitives and infrastructure.
- `skills/` contains reusable engineering/domain knowledge.
- `subagents/` contains reusable execution responsibilities.
- `templates/` contains reusable project starting structures.
- `projects/` contains independent client projects.
- `src/` contains WebsiteOS engine code.

Client projects may copy/adapt reusable WebsiteOS components and core capabilities, but must remain independent after generation.

Do not make a generated client project depend directly on WebsiteOS source files at runtime unless explicitly required by the architecture.

## Agent Rules

Agents must:

1. Follow the root rules and relevant skill instructions.
2. Prefer reuse over duplication.
3. Make the smallest change required.
4. Preserve existing working behavior.
5. Avoid inventing business requirements.
6. Flag uncertainty instead of guessing.
7. Validate their output before handing it to another agent.

## Product Rules

The generated websites should prioritize:

- clear business value
- conversion
- mobile usability
- accessibility
- local SEO
- fast performance
- trustworthy content
- useful automation

A website should not be treated as merely a static brochure when automation
can provide meaningful customer value.

## Project Priority

### Local Store — Stage 2

The first implementation project should demonstrate:

Website
→ product/category discovery
→ customer ordering
→ location/delivery rules
→ WhatsApp/customer communication
→ repeat-customer rewards
→ relevant business automation

Keep the implementation focused on the actual local-store requirements.

Do not build a generic AI platform, CRM, ecommerce platform, or multi-tenant SaaS.

### Dental Clinic — Stage 3

The second implementation project should demonstrate:

Website
→ visitor questions
→ lead capture
→ appointment request/booking workflow
→ clinic-side notification

Use the project to validate which Local Store capabilities are genuinely reusable across business types.

## AI / Lovable Boundary

AI coding/design tools may accelerate implementation.

They must not determine the core WebsiteOS architecture.

WebsiteOS specifications, domain configuration, reusable components,
automation definitions, and business rules remain under repository control.

## Reuse Rule

Determine code ownership before implementation.

### Clearly reusable

If functionality is clearly client-independent and has a stable responsibility,
place it in the appropriate WebsiteOS reusable area:

- Backend reusable primitives → `/core`
- Frontend reusable capabilities → `/components`
- Reusable project starting structures → `/templates`

Do not duplicate an existing reusable capability inside a client project.

### Client-specific

Keep functionality inside `projects/<project>/` when it contains:

- client-specific business rules
- client-specific workflows
- client-specific data models
- client-specific integrations
- client-specific UI or domain behavior

### Uncertain reuse

If functionality may be reusable but the correct abstraction is not yet clear:

1. Implement the smallest correct client-local version.
2. Mark it as a promotion candidate.
3. Do not create speculative shared infrastructure.

### Project completion promotion

When a client project is completed, review its promotion candidates before
starting the next client project.

Promote genuinely reusable capabilities into WebsiteOS without modifying the
completed client project merely to extract code.

Completed client projects must remain independently maintainable and must not
acquire runtime dependencies on WebsiteOS.

The purpose of promotion is to improve future project execution, not to
refactor previously delivered client projects.

## Quality Gate

Before considering a website complete, verify:

- responsive layout
- accessibility basics
- SEO basics
- performance basics
- forms/workflows
- error states
- mobile experience
- clear calls to action
- factual/content consistency

## Anti-Overengineering

Do not introduce:

- microservices
- complex orchestration
- unnecessary databases
- unnecessary APIs
- unnecessary abstractions
- generic frameworks for hypothetical future requirements

Build for today's customer and extract reusable architecture from evidence.

## Agent Selection

Before implementing any task, determine the smallest set of relevant skills and subagents.

Do not load all skills or subagent instructions.

Use the orchestrator routing rules when selecting them.

The current PLAN.md implementation unit is the primary source for determining required capabilities.

## Project Documentation and Source of Truth

Each client project must keep AI/project-control documentation under:

```text
projects/<project>/docs/
├── ARCHITECTURE.md
├── PLAN.md
├── PROJECT_CONTEXT.md
├── PROGRESS.md
└── requirements.yaml
```

## Codebase Analysis

When working on an existing client project, perform focused codebase analysis before modifying code.

Use the `codebase-analysis` skill when the task involves:

- modifying existing functionality
- debugging existing behavior
- refactoring
- understanding dependencies
- determining change impact
- working with unfamiliar project code
- investigating regressions
- modifying shared modules

The `codebase-analysis` skill may use Graphify when available.

Graphify is a codebase navigation and dependency-analysis tool. It helps agents locate:

- relevant files
- symbols
- callers
- dependencies
- relationships
- potential impact areas

Graphify is not a source of truth.

Agents must inspect the actual source code and tests before making implementation decisions.

Do not use Graphify as a replacement for project documentation, source code, tests, or human-approved instructions.

For trivial isolated changes where the affected file and behavior are already known, full codebase analysis may be unnecessary.

## Project vs Reusable Code Boundary

Client projects contain client-specific implementation and business logic.

Before creating new functionality inside `projects/<project>/`, determine whether
an appropriate reusable WebsiteOS capability already exists.

Code belongs in a client project when it contains:
- client-specific business rules
- client-specific workflows
- client-specific data models
- client-specific integrations
- client-specific UI or domain behavior

Code belongs in WebsiteOS reusable areas when it is:
- independent of a specific client domain
- stable enough to have a clear reusable API
- genuinely applicable to multiple projects
- not dependent on client-specific business rules

Reusable frontend code belongs under:
- `/components`
- `/templates` when it is part of a reusable project template

Reusable backend primitives belong under:
- `/core`

WebsiteOS engine code belongs under:
- `/src`

Domain definitions/configuration belong under:
- `/domains`

Do not create speculative abstractions merely because code might eventually be
reused.

Before creating a new reusable capability, check whether an existing capability
already provides the required behavior.

If functionality is potentially reusable but its abstraction is not yet proven,
keep it in the client project and flag it for later extraction rather than
creating speculative shared infrastructure.

Agents must not duplicate an existing reusable WebsiteOS capability inside a
client project without a documented reason.

### Placement Decision

For new functionality, determine:

1. Is this WebsiteOS engine behavior?
   → `/src`

2. Is this a stable reusable backend primitive?
   → `/core`

3. Is this a reusable frontend capability?
   → `/components`

4. Is this a reusable project starting point?
   → `/templates`

5. Is this domain configuration?
   → `/domains`

6. Is this client-specific application behavior?
   → `/projects/<project>/`

When uncertain, prefer the smallest client-local implementation and mark it as
a promotion candidate. Review promotion candidates when the project is
completed, before beginning the next client project.

Do not modify a completed client project merely to extract reusable code.