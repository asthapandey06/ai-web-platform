# Planning Skill

## Purpose

Create the smallest clear implementation plan needed to turn business requirements into a working project.

## Core Principle

Plan the work before implementation, but do not over-plan.

The plan must make execution easier, not become documentation for its own sake.

## Planning Process

1. Understand the business objective.
2. Identify users and primary workflows.
3. Define MVP scope.
4. Inspect existing project structure.
5. Identify reusable skills, components, modules and integrations.
6. Identify required frontend work.
7. Identify required backend work.
8. Identify required data changes.
9. Identify external integrations.
10. Define implementation order.
11. Define acceptance criteria.
12. Identify blockers and open questions.
13. Explicitly define out-of-scope work.

## Rules

- Requirements are the source of truth.
- Never invent business requirements.
- Reuse existing capabilities before creating new ones.
- Prefer the smallest implementation that proves the requirement.
- Separate required work from future improvements.
- Do not plan infrastructure without a concrete need.
- Do not split work into artificial tasks.
- Keep dependencies explicit.
- Plans must be executable by other subagents.

## MVP Rule

For every proposed feature ask:

> What is the smallest version that proves demand or satisfies the client requirement?

If a feature is not required for the MVP, move it to future scope.

## Output Quality

A plan must answer:

- What are we building?
- Why is it required?
- What already exists?
- What needs to be built?
- In what order?
- Who/which subagent handles it?
- How do we know it is complete?
- What are we deliberately not building?

Before proposing new implementation:

1. Check `components/` for reusable frontend capabilities.
2. Check `core/` for reusable backend capabilities.
3. Check `templates/` for reusable project structure.
4. Check existing skills and subagents.
5. Only propose new reusable code when an existing capability cannot satisfy the requirement.

## Workspace Dependency Rule

During WebsiteOS development:

- Use the root workspace dependency installation.
- Do not create project-local `node_modules/`.
- Do not create project-local lockfiles unless explicitly required for deployment isolation.