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