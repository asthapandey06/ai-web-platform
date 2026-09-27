# Testing Skill

## Purpose

Verify business-critical behavior without creating unnecessary test overhead.

## Test Priority

1. Business-critical workflows
2. Integration boundaries
3. API behavior
4. Data integrity
5. UI behavior

## Rules

- Test behavior, not implementation details.
- Add regression tests for discovered bugs.
- Keep tests deterministic.
- Test important failure paths.
- Test validation and authorization.
- Test retry/idempotency behavior where applicable.
- Do not write tests for speculative features.
- Prefer focused tests over excessive coverage.

## Minimum Requirement

Every completed business workflow must have a clear verification method.

Critical backend behavior should have automated tests where practical.