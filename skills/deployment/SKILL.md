# Deployment Skill

## Purpose

Deploy client projects reliably with the simplest infrastructure that satisfies the project.

## Rules

- Keep deployment reproducible.
- Separate environment configuration from source code.
- Never commit secrets.
- Verify production builds before deployment.
- Use environment variables for deployment-specific configuration.
- Keep deployment architecture proportional to project requirements.
- Prefer existing deployment patterns before introducing new infrastructure.
- Provide rollback or recovery where practical.
- Do not introduce Kubernetes, microservices or complex CI/CD without a concrete requirement.

## Pre-Deployment

- Run tests.
- Run production build.
- Verify environment variables.
- Verify database migrations.
- Verify external integrations.
- Verify production URLs/configuration.

## Post-Deployment

- Verify application health.
- Verify critical user workflows.
- Verify integrations.
- Check logs for deployment errors.