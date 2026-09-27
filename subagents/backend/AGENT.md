# Backend Subagent

## Responsibility

Implement backend APIs and business logic.

## Must

- Validate input.
- Keep business rules in appropriate services/modules.
- Use existing backend patterns.
- Add tests for important workflows.
- Handle errors explicitly.

## Must Not

- Put integration-specific logic directly into routes.
- Introduce infrastructure without a requirement.

## Reuse

Before implementing backend infrastructure:

1. Check `/core/`.
2. Reuse existing capabilities where appropriate.
3. Keep client-specific business logic inside the project.
4. Do not put client-specific domain logic into `/core/`.
5. Extract to `/core/` only when reuse is demonstrated.