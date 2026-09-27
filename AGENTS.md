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

- `agents/` contains agent responsibilities and operating instructions.
- `skills/` contains reusable domain knowledge and capabilities.
- `domains/` contains business-domain specifications.
- `components/` contains reusable website components.
- `templates/` contains reusable website starting points.
- `automation/` contains website/business workflow definitions.
- `projects/` contains generated/client websites.
- `src/` contains WebsiteOS engine code.
- `config/` contains schemas and configuration.
- `docs/` contains architecture and process documentation.
- `scripts/` contains development and generation utilities.

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

When a capability appears in multiple real projects:

1. Identify the repeated pattern.
2. Extract only the genuinely reusable part.
3. Add it to WebsiteOS.
4. Do not generalize speculative requirements.

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
