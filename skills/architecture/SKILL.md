# Architecture Skill

## Purpose

Define maintainable application boundaries before implementation.

## Rules

- Prefer modular monoliths.
- Avoid microservices unless a real requirement exists.
- Separate business logic from infrastructure.
- Keep integrations behind explicit boundaries.
- Clearly reusable capabilities should be implemented in the reusable WebsiteOS
  layer; uncertain reuse should remain client-local until the boundary is clear.
- Keep client-specific business logic inside the client project.
- WebsiteOS owns reusable capabilities and generation infrastructure.
- Client projects own their actual business workflows.

## Decision Order

1. Requirement
2. Simplest architecture satisfying it
3. Existing reusable capability
4. Extension only if required
5. New abstraction only when justified

## Workspace Structure

- WebsiteOS is the root workspace.
- Prefer root-level dependency management during WebsiteOS development.
- Do not create per-project `node_modules/` without a concrete requirement.
- Reuse `components/` for frontend capabilities.
- Reuse `core/` for backend capabilities.
- Keep client-specific business logic inside the client project.
- Generated client projects must remain independently maintainable.
- Do not create runtime coupling between client projects and WebsiteOS source code unless explicitly required.

## Core Design Patterns

The `core/` directory contains reusable backend capabilities.

Use established design patterns when they solve a real architectural problem.
Do not introduce patterns for structural decoration.

### Strategy

Use Strategy when the same operation has multiple interchangeable algorithms or business behaviors.

Examples:
- delivery pricing strategies
- payment providers
- notification providers
- product lookup providers

The calling code should depend on the strategy contract rather than provider-specific behavior.

### Factory

Use Factory when object/provider creation depends on configuration, provider type, or runtime selection.

Examples:
- selecting a payment provider
- selecting a WhatsApp provider
- selecting a product-data provider
- selecting a delivery strategy

Factories should remain small and deterministic.

### Adapter

Use Adapter at external-system boundaries.

Examples:
- WhatsApp Business APIs
- payment providers
- billing systems
- barcode/product-data APIs

External APIs must not leak provider-specific models into core business logic.

### Repository

Use Repository only when it provides meaningful separation between business logic and persistence or when multiple persistence implementations are genuinely required.

Do not create repositories for trivial CRUD solely for pattern consistency.

### Policy

Use Policy for isolated business rules that need explicit evaluation.

Examples:
- delivery eligibility
- free-delivery thresholds
- stock availability
- order eligibility

### State

Use State when an entity has meaningful lifecycle transitions.

Examples:
- order status
- payment status
- subscription status

Do not use State pattern for simple enum/status fields.

### Pattern Selection Rule

Before introducing a pattern ask:

1. What problem does the pattern solve?
2. Is there currently more than one behavior/provider/variant?
3. Will the pattern reduce coupling or make future change safer?
4. Does the additional abstraction justify its complexity?

Prefer the simplest pattern that solves the actual problem.

## Code Placement

Before creating a module, determine its ownership.

### WebsiteOS engine
Use `/src` for functionality required to operate WebsiteOS itself:
- generation
- orchestration
- specification processing
- domain loading
- CLI/runtime engine

### Reusable backend

Use `/core` only for stable, client-independent backend primitives.

Examples:
- authentication primitives
- shared error handling
- logging primitives
- reusable validation utilities

Do not move client business logic into `/core`.

Do not move a client module into `/core` merely because it has a generic name
or could be useful later. Keep the client-owned composition and policy local.

### Reusable frontend
Use `/components` for stable, reusable UI capabilities.

Use `/templates` for reusable project structures or starting points.

### Client project
Use `projects/<project>/` for:
- business rules
- domain workflows
- client-specific data models
- client-specific integrations
- client-specific UI behavior

### Reusable Capability Promotion

Determine ownership before implementation.

#### Clearly reusable

If functionality is clearly client-independent and has a stable responsibility,
place it in the appropriate WebsiteOS reusable layer:

- Backend → `/core`
- Frontend → `/components`
- Reusable project structure → `/templates`

Do not duplicate an existing reusable capability inside a client project.

#### Client-specific

Keep functionality inside the client project when it contains:

- business rules
- domain workflows
- client-specific data models
- client-specific integrations
- client-specific policies
- client-specific UI behavior

#### Uncertain reuse

If reuse is plausible but the correct abstraction is not yet clear:

1. Implement the smallest correct client-local version.
2. Mark it as a promotion candidate.
3. Do not create speculative generic infrastructure.

#### Promotion

At completion of a client project, review promotion candidates before starting
the next client project.

Promote genuinely reusable capabilities into WebsiteOS without requiring changes
to the completed client project.

The completed client project remains independently maintainable and must not
acquire a runtime dependency on WebsiteOS.

The goal is to improve WebsiteOS for future projects, not to refactor completed
client projects.

## Backend Code Placement

Before adding backend functionality to a client project:

1. Check `/core` for an existing reusable capability.
2. Determine whether the functionality is client-specific.
3. If reusable and stable, place it in `/core`.
4. If client-specific, keep it under the project's server source.
5. If reuse is uncertain, keep it local and mark it as a promotion candidate.

Do not duplicate reusable backend primitives across client projects.

Do not put client business logic into `/core`.

Do not create generic infrastructure solely for hypothetical future projects.

Examples:

Generic password hashing abstraction
→ `/core/auth/`

Local Store merchant registration rules
→ `projects/local-store/server/src/auth/`

Local Store inventory rules
→ `projects/local-store/server/src/inventory/`

Shopify-specific OAuth
→ client/integration-specific location, not `/core/auth/`