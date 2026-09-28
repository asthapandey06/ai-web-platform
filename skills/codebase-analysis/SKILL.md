# Codebase Analysis Skill

## Purpose

Provide agents with a fast, focused way to understand an existing project before making changes.

The goal is to identify the smallest relevant part of the codebase that must be inspected for the current task, instead of reading the entire repository.

Codebase analysis is a navigation and impact-analysis capability.

It does NOT replace:
- project requirements
- architecture documentation
- source code
- tests
- human-approved instructions

---

## Source-of-Truth Hierarchy

Use information in this order:

1. Root `AGENTS.md`
2. Project-level `AGENTS.md`
3. `docs/PROJECT_CONTEXT.md`
4. `docs/ARCHITECTURE.md`
5. `docs/PLAN.md`
6. `docs/requirements.yaml`
7. `docs/PROGRESS.md`
8. Actual source code
9. Tests
10. Graph/codebase analysis output
11. External tool output

Graph/codebase analysis is navigation evidence, not architectural authority.

If analysis output conflicts with source code or project documentation, inspect the actual source and report the discrepancy.

---

## Core Principle

Never inspect the entire repository by default.

Start from the current task and determine:

- What feature is being changed?
- What existing module owns it?
- Which files define the relevant behavior?
- Which files call or depend on that behavior?
- Which tests cover it?
- Which configuration or database structures may be affected?

Read only the relevant files required to answer those questions.

Expand the inspection scope only when evidence requires it.

---

## Graphify Usage

When Graphify is available for the current project:

1. Check whether the graph is stale.
2. Update it when required.
3. Use Graphify to locate relevant files, symbols, dependencies, callers, and relationships.
4. Use Graphify to identify possible impact areas.
5. Open and inspect the actual source files identified by Graphify.
6. Treat Graphify results as navigation assistance only.

Typical commands:

```bash
graphify update .
```

## Graphify Availability

Graphify is an optional codebase-analysis tool.

Do not assume Graphify is installed or available in every environment.

If the `graphify` command is available, use it when it can reduce repository-wide inspection.

If Graphify is unavailable, fall back to:

- targeted search
- imports/exports
- symbol references
- tests
- project documentation

Do not install additional tooling merely to complete a routine task unless explicitly required.

Graphify output must never be treated as complete. It may contain missing or weak relationships.

Source code remains authoritative for implementation behavior.

## Reusable Capability Check

When analyzing a change that introduces new functionality:

1. Locate the relevant client implementation.
2. Check `/core`, `/components`, and `/templates` for existing capabilities.
3. Determine whether an existing capability can be reused.
4. If no suitable capability exists, determine whether the new functionality
   is genuinely reusable or client-specific.
5. Do not extract code solely based on theoretical reuse.