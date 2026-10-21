# Local Store Architecture

Status: confirmed architecture baseline; Unit 1 project scaffold established. Hosting-specific deployment choices remain `NEEDS_CONFIRMATION`.

## Confirmed decisions

- The Local Store is an independent client project and must not import WebsiteOS source at runtime.
- Build a single modular application: React + TypeScript + Vite frontend, Node.js + TypeScript + Express backend, and PostgreSQL persistence. This stack is confirmed and does not depend on selecting a hosting provider.
- Keep modules for merchant access, inventory/catalog, order processing, configuration/entitlements, and integrations within that application. Keep client-specific rules in this project.
- Keep external systems behind narrow project-owned boundaries. Do not select or assume providers for payments, WhatsApp, barcode product lookup, billing-system integration, NPL, or hosting.
- Validate stock and order calculations in trusted server-side logic. Enforce stock/order data integrity at persistence boundaries.
- WebsiteOS remains the root dependency manager. Root `package.json` and root `package-lock.json` declare/install project dependencies. Do not create project-local `node_modules` or a lockfile unless an actual deployment-isolation requirement is confirmed.
- Reuse `/components` or `/core` only after checking exact fit. The provider-neutral password and session-token cryptography used by Unit 2 now lives in `/core/auth`; merchant account schema, session persistence, access policy, and workflows remain Local Store-owned.
- Do not extract speculative or client-specific functionality into WebsiteOS.
- Keep maintenance and SEO maintenance as operational subscription services, distinct from software features and add-on entitlements.

## Hosting-specific decisions — `NEEDS_CONFIRMATION`

- Hosting provider, supported runtime, and production environment compatibility with the confirmed stack.
- Frontend/backend production topology and production domain.
- Release ownership, secrets management details, and backup/recovery expectations.

These choices block production deployment configuration only. They do not block project structure, local development, the confirmed backend/database selection, provider-neutral interfaces, or business logic whose required rules are confirmed.

## Account boundary requiring confirmation

Merchant registration and login are confirmed, and multi-tenancy is prohibited. Confirm the intended merchant/account cardinality and registration access model before implementing account isolation or registration. Do not infer a tenant model or permit unrelated merchants to access one another's data.

## External integration boundaries

- **Barcode product lookup:** Camera capture can be independent; fetching product details requires a compatible, approved external product-data source/API and supported barcode coverage.
- **WhatsApp:** Account connection, catalog access/sync, and automated messages depend on confirmed WhatsApp Business API/provider capabilities, permissions, and approved message/consent rules.
- **Payment:** Order payment is required, but provider, methods, payment states, and refund behavior remain unconfirmed.
- **Billing add-on:** Existing system identity, API availability, access, and contract remain unconfirmed.
- **NPL:** Keep the label exactly `NPL`; meaning, provider/interface, and data contract remain unconfirmed.

## Ownership and dependencies

- `projects/local-store/`: client-specific application, configuration, business rules, and project-owned integration adapters.
- `/components`: presentational WebsiteOS source assets only; copy/adapt into Local Store only if a specific component is suitable.
- `/core/auth`: contains the client-independent `@websiteos/auth-crypto` package. It is built before Local Store typechecking, development, and server builds; it contains no merchant policy or persistence behavior.
- Root workspace: shared dependency installation during WebsiteOS development. Dependencies are recorded at the root; no project-level dependency installation or lockfile by default.

## Module boundary proposal

Within the single application, keep merchant access, inventory/catalog, order calculation/state, merchant settings and add-on entitlements, and external integrations as distinct modules. This is a code organization boundary, not separate deployable services. Do not implement modules or integration clients before their respective units and material blockers are addressed.

## Unit 1 scaffold

- `client/` is the React/Vite application; its local Vite proxy targets the API's local-development port only.
- `server/` is the Express API; PostgreSQL pool creation requires `DATABASE_URL` at first database access and has no credential fallback.
- Root scripts provide separate client/API development, typecheck, and build commands.
- Unit 2 currently contains a provider-neutral merchant session boundary and protected application shell. Auth tables are created on first auth access; `/core/auth` supplies password hashing and opaque token hashing, while Local Store owns the HTTP-only cookie/session workflow. Registration remains blocked until access and verification rules are confirmed.
- Hosting-specific topology, domains, secrets configuration, and deployment files have intentionally not been added.
