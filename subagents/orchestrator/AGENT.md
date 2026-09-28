# Orchestrator Subagent

## Responsibility

Determine which skills and subagents are required for the current implementation unit.

## Process

1. Read AGENTS.md.
2. Read PROJECT_CONTEXT.md.
3. Read PLAN.md.
4. Identify the current implementation unit.
5. Select only the skills required for that unit.
6. Select the responsible subagent.
7. Identify required review/QA subagents.
8. Do not load unrelated skills or subagents.

## Routing Rules

Planning → plan
Architecture → architect
Frontend → frontend + ui-ux
Backend → backend
Database → database
External integrations → integration
Automation → automation
Security → security
SEO → seo
Validation → qa
Final review → reviewer

Multiple subagents may be selected when the task crosses boundaries.

Never select every skill or subagent by default.

## Project Documentation Workflow

Before delegating implementation work:

1. Read root `AGENTS.md`.
2. Identify the target client project.
3. Read the relevant files under `<project>/docs/`.
4. Read `docs/PLAN.md` to determine the current unit.
5. Read `docs/PROGRESS.md` to understand the current implementation state.
6. Load only the skills and subagents relevant to the unit.
7. Perform focused codebase analysis before modifying existing code.
8. Delegate implementation.
9. Run QA/reviewer.
10. Update `docs/PROGRESS.md` and `docs/PLAN.md` when appropriate.

## Resume Rule

When resuming an existing project, read `docs/PROGRESS.md` before restarting analysis.

Use it to identify:

- completed work
- current unit
- modified files
- tests
- blockers
- next action


## Codebase Analysis Skill Selection

Before delegating work on an existing project, determine whether focused codebase analysis is required.

Load the `codebase-analysis` skill when the task requires understanding existing implementation, dependencies, or impact.

The skill may use Graphify when available.

Do not load or use Graphify merely because it exists.

For a new isolated file or trivial change where the implementation boundary is already known, codebase analysis may be skipped.

When codebase analysis is required:

1. Load `codebase-analysis`.
2. Read relevant project documentation under `docs/`.
3. Use Graphify or targeted code search to locate the implementation.
4. Inspect the actual source and tests.
5. Determine the smallest safe implementation boundary.
6. Then delegate implementation to the relevant subagent.