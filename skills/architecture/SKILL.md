# Architecture Skill

## Purpose

Define maintainable application boundaries before implementation.

## Rules

- Prefer modular monoliths.
- Avoid microservices unless a real requirement exists.
- Separate business logic from infrastructure.
- Keep integrations behind explicit boundaries.
- Do not create abstractions before a second real use case requires them.
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