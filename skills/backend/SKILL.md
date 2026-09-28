# Backend Skill

## Supported Stack

- Node.js
- TypeScript
- Express
- PHP
- Laravel

## Rules

- Follow the existing project's backend stack.
- Do not migrate frameworks unless explicitly required.
- Separate routes/controllers, business logic and infrastructure where useful.
- Validate external input.
- Return predictable API responses.
- Keep business rules in services/domain logic.
- Do not put integration logic directly in routes.
- Handle errors explicitly.
- Add tests for business-critical behavior.

## Reuse

- Check the root `core/` library before implementing common backend infrastructure.
- Reuse existing database, HTTP, validation, error handling, logging, queue, webhook and integration primitives where appropriate.
- Keep business-specific domain logic inside the client project.
- Do not move client-specific business logic into `core/`.
- Extract functionality into `core/` only when it is genuinely reusable.

## Capability vs. Client Workflow

Distinguish a reusable backend capability from the application workflow that
uses it. A reusable capability has a client-independent contract and behavior,
such as password hashing or a narrowly defined error helper. Merchant
registration rules, session persistence, entitlements, inventory policies, and
provider configuration belong to the client project when they encode that
client's requirements.

Before extracting code from a client project, identify a second real use case,
remove client-specific assumptions, define the public contract, and verify the
boundary with focused tests. If those conditions are not met, keep the code
local and record the possible future extraction.