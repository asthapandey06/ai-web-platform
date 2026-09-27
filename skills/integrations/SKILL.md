# Integrations Skill

## Purpose

Integrate external business systems without coupling application logic to a vendor.

## Rules

- Define the smallest required integration interface.
- Keep provider-specific code behind an adapter.
- Handle authentication securely.
- Handle rate limits.
- Handle transient failures.
- Use idempotency where duplicate operations are possible.
- Log meaningful integration failures.
- Never assume an external API supports a capability until verified.