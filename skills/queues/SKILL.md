# Queues Skill

## Default

Use a queue only when asynchronous processing provides a real benefit.

## Rules

- Jobs must be idempotent where possible.
- Define retry behavior explicitly.
- Avoid infinite retries.
- Log failed jobs.
- Keep job payloads small.
- Do not introduce distributed infrastructure for simple workflows.