# Local Store application scaffold

This is the independent Local Store application. It contains a React/TypeScript/Vite client and a Node.js/TypeScript/Express API in one modular project. PostgreSQL access is provided through the root-managed `pg` dependency.

No business feature, catalog data, tax/delivery default, or external provider is configured by this scaffold.

## Root-managed commands

From the WebsiteOS repository root:

- `npm run local-store:client:dev` starts the Vite client.
- `PORT=3001 npm run local-store:server:dev` starts the API for local development.
- `npm run local-store:typecheck` checks both TypeScript projects.
- `npm run local-store:build` builds the client and API.

The client dev server proxies `/api` requests to the local API on port `3001`. This is a local-development setting, not a hosting decision.

Set `DATABASE_URL` in the environment before code first requests a database pool. It is intentionally not supplied here; do not commit credentials. Hosting, production topology, domain, and deployment configuration remain `NEEDS_CONFIRMATION`.

## Project boundaries

- `client/` contains client-owned UI and Vite configuration.
- `server/` contains the Express app, project configuration, and PostgreSQL connection boundary.
- Keep merchant and customer business rules in this project. Do not import WebsiteOS source at runtime.
- Shared dependencies are installed and managed from the repository root. Do not add project-local `node_modules` or a lockfile unless deployment isolation is actually required.
