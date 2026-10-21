# Local Store Implementation Plan

## Objective

Deliver the confirmed Local Store business model and workflows without inventing business values or external systems. Requirements and architecture live in [`requirements.yaml`](requirements.yaml) and [`ARCHITECTURE.md`](ARCHITECTURE.md).

## Guardrails

- Use confirmed React + TypeScript + Vite, Node.js + TypeScript + Express, and PostgreSQL.
- One modular application; no microservices, multi-tenancy, generic CRM, or generic ecommerce platform.
- No WebsiteOS runtime dependency. Reuse `/components` or `/core` only when justified; do not create speculative shared functionality.
- Root WebsiteOS dependency management; no project-local `node_modules` or lockfile unless deployment isolation is actually required.
- Do not invent GST, merchant account model, product data, delivery values, reward values, providers, NPL meaning, or hosting.
- Record unresolved business/technical decisions as `NEEDS_CONFIRMATION`; continue independent work where possible.
- Subscription operations (maintenance and SEO maintenance) are service delivery, not software features.

## Status

- **Requirements capture:** documented; material questions remain open.
- **Architecture baseline:** confirmed and recorded in [`ARCHITECTURE.md`](ARCHITECTURE.md).
- **Unit 1:** complete. The independent client/server project structure and root-managed local development/build commands are scaffolded.
- **Current implementation unit:** Unit 2, merchant access and application shell. Protected login/logout/session handling and the shell are implemented; registration access/verification, roles, recovery, and account cardinality remain `NEEDS_CONFIRMATION`.

## Ordered implementation units

### Unit 1 — Establish independent project structure and local application scaffold

- **Objective:** Set up the client-owned project structure for the confirmed frontend/backend/database stack, root-managed dependencies, configuration boundaries, and module seams.
- **Dependencies:** Confirmed technical baseline; no external provider or hosting decision.
- **Skills / owner:** Architecture, frontend, backend; Architect with frontend/backend subagents.
- **Status:** Done.
- **Acceptance:** Structure supports the single modular application; no project-local install/lockfile; no WebsiteOS runtime import; environment-specific configuration is not committed; no provider-specific or business-policy defaults are introduced. Hosting-specific deployment files remain deferred.

### Unit 2 — Resolve merchant account boundary and implement merchant access/app shell

- **Objective:** Provide merchant registration, login/logout, and Inventory / Scanner / Settings navigation; show Dashboard only when entitled.
- **Dependencies:** Unit 1; client decision on merchant/account cardinality, registration access/verification, role needs, and recovery. This must remain consistent with the explicit no-multi-tenancy constraint.
- **Skills / owner:** Authentication, security, UI/UX, backend; Architect and backend/frontend subagents.
- **Acceptance:** The unblocked session boundary is implemented: unauthenticated users cannot access merchant routes, logout invalidates access, no cross-merchant tenancy behavior is assumed, and navigation reflects the currently unconfirmed dashboard entitlement.
- **Current gate:** Confirm whether this is one merchant/account for the deployment or another explicitly non-multi-tenant registration model, and confirm who may register. Do not implement merchant registration or data isolation until resolved. UI shell and route/module boundaries can proceed without this decision.
- **Status:** Partial — login/logout/session and protected shell complete; merchant registration intentionally returns `NEEDS_CONFIRMATION` until access and verification rules are supplied.

### Unit 3 — Build manual SKU and inventory management

- **Objective:** Let an authenticated merchant create SKUs manually and update product details, quantity, and price.
- **Dependencies:** Units 1–2; client-confirmed SKU fields and uniqueness behavior for final schema.
- **Skills / owner:** Backend, database, frontend, security, testing; backend/database/frontend subagents.
- **Acceptance:** Merchant can create/edit SKU and inventory fields; server validates input and protects merchant data; catalog stock/price source is the persisted inventory; no product facts or prices are fabricated.

### Unit 4 — Add camera barcode capture and optional product lookup boundary

- **Objective:** Scan a barcode using a supported camera and use an approved product-data source to prefill details only when that source is available.
- **Dependencies:** Unit 3. Camera capture can proceed independently; automatic lookup depends on confirming and obtaining access to a compatible source/API and supported barcode coverage.
- **Skills / owner:** Frontend, integrations, security, testing; frontend and integration subagents.
- **Acceptance:** Camera permission/unsupported-device/error paths are handled; scan output can be reviewed and edited; no claim of product lookup without a confirmed source; lookup failures do not prevent manual SKU entry.

### Unit 5 — Build customer catalog and product selection

- **Objective:** Present merchant-managed available products and allow customers to select products.
- **Dependencies:** Units 1 and 3; approved catalog fields/content and visibility rules for production data.
- **Skills / owner:** Frontend, UI/UX, accessibility, content; frontend and UI/UX subagents.
- **Acceptance:** Catalog reflects the merchant inventory source and availability; customer can browse/select; responsive, keyboard-accessible states include empty/loading/error. No invented catalog, taxonomy, or product claims.

### Unit 6 — Implement stock validation, order summary, and configured calculation

- **Objective:** Validate inventory before accepting orders; calculate order totals, configured GST when applicable, and distance-based delivery charges; auto-decline unavailable stock when enabled; apply configured free-delivery minimum/radius behavior.
- **Dependencies:** Units 2, 3, and 5; confirmed stock contention/decrement timing, GST rules/configuration, delivery origin/location and distance method, free-radius/minimum interaction, distance bands/charges, and out-of-area policy.
- **Skills / owner:** Backend, database, API, security, testing; backend/database subagents.
- **Acceptance:** Server-side logic—not client totals—determines availability and calculation; configured rules are applied consistently; unavailable-stock behavior follows the merchant setting and alerts follow approved destination/channel; order summary clearly shows components; calculation and stock validation are transaction-safe. No unapproved GST or delivery defaults.

### Unit 7 — Implement payment and downloadable receipt

- **Objective:** Collect payment for an accepted order and provide a downloadable receipt.
- **Dependencies:** Unit 6; approved payment provider/methods, payment lifecycle/failure behavior, and receipt/tax-document requirements.
- **Skills / owner:** Integrations, backend, security, testing; integration and backend subagents.
- **Acceptance:** Payment outcome is handled according to provider-confirmed behavior; failed/duplicate operations do not falsely indicate paid; receipt is available only in the confirmed lifecycle and contains only approved fields/tax treatment. Provider remains unset until confirmed.

### Unit 8 — Connect WhatsApp Business, catalog access, and automated communication

- **Objective:** Support customer catalog access through WhatsApp, merchant account connection, and optional automated messages.
- **Dependencies:** Units 2, 3, and 5; approved provider/API, account permissions, catalog capability, message events/content, and consent requirements.
- **Skills / owner:** Integrations, automation, backend, security, testing; integration/automation subagents.
- **Acceptance:** Merchant can enable/disable approved automated messages; catalog and communication behavior is limited to verified provider capabilities; provider errors and retry/duplicate behavior are explicit; no provider is assumed.

### Unit 9 — Implement NPL ordering add-on

- **Objective:** Accept orders through NPL only when that add-on is enabled, using the shared stock validation and order calculation path.
- **Dependencies:** Unit 6; NPL meaning, technical interface/provider, order contract, and entitlement activation confirmed.
- **Skills / owner:** Integrations, backend, testing; integration/backend subagents.
- **Acceptance:** NPL is not expanded or reinterpreted; NPL-origin orders use the same trusted stock/calculation rules; disabled entitlement blocks NPL intake; provider/interface is not invented.

### Unit 10 — Implement subscription/add-on entitlements and service operations

- **Objective:** Represent the confirmed ₹1,000/month subscription and ₹500-per-feature add-on entitlements; distinguish software gating from included maintenance/SEO services.
- **Dependencies:** Units 1–2; confirmation of subscription collection/lifecycle, add-on billing cadence and activation, and operational service scope/ownership.
- **Skills / owner:** Backend, database, security, automation; backend/database subagents.
- **Acceptance:** Dashboard, billing integration, and NPL access are gated by their enabled entitlements; displayed prices match confirmed amounts; no billing provider or add-on cadence is assumed; maintenance/SEO are tracked as service responsibilities, not implemented as software features.

### Unit 11 — Implement sales dashboard add-on

- **Objective:** Display weekly, monthly, and yearly sales graphs when the dashboard entitlement is enabled.
- **Dependencies:** Units 6, 7, and 10; confirm sales metric definitions, date boundaries, and which order/payment states count.
- **Skills / owner:** Frontend, backend, database, accessibility, testing; frontend/backend subagents.
- **Acceptance:** Graphs show only confirmed metrics from persisted order data; date ranges and calculations are tested; unauthorized/disabled access is denied; no inferred sales metrics.

### Unit 12 — Implement existing billing-system integration add-on

- **Objective:** Integrate the merchant’s existing billing system if its API is available.
- **Dependencies:** Units 6 and 10; system identity, API availability/access, capabilities, and data contract.
- **Skills / owner:** Integrations, backend, security, testing; integration subagent.
- **Acceptance:** Integration operates only against verified API capabilities; secrets are protected; transient failures and duplicate operations are handled; absence of API leaves the add-on unavailable rather than simulated.

### Unit 13 — Implement repeat-customer points/rewards

- **Objective:** Support the confirmed Stage 2 repeat-customer points/rewards capability.
- **Dependencies:** Units 2, 6, and 10; approved customer identity/verification and earning, redemption, timing, and expiry rules.
- **Skills / owner:** Backend, database, security, testing; backend/database subagents.
- **Acceptance:** Points are associated with the approved customer identity and calculated only from confirmed rules; repeated order events do not duplicate awards; no reward values or identity method are invented.

### Unit 14 — Deliver operational maintenance and SEO service

- **Objective:** Define and deliver the monthly app/website maintenance and SEO maintenance included in the subscription.
- **Dependencies:** Client confirmation of scope, schedule, reporting, and responsible party; website deployment for service execution.
- **Skills / owner:** Deployment, SEO, local SEO; operations/SEO roles.
- **Acceptance:** Service scope and responsible party are documented; tasks are operationally trackable; do not misrepresent this work as an automated software feature or promise unspecified outcomes.

### Unit 15 — Verify and deploy

- **Objective:** Verify critical end-to-end merchant/customer workflows and deploy to the confirmed environment.
- **Dependencies:** Relevant units complete; hosting, domain, release ownership, and backup/recovery requirements confirmed.
- **Skills / owner:** Testing, security, deployment, accessibility, SEO; QA and reviewer subagents.
- **Acceptance:** Automated tests cover stock/order calculation, unavailable-stock decline, entitlement gates, payment and integration failure paths where implemented, and duplicate/retry behavior; accessibility/mobile, build, SEO, configuration/secrets, migration, backup, health, and key production flows are verified.

## Dependency summary

```text
1 project structure
└─ 2 merchant access/shell
   ├─ 3 manual inventory
   │  ├─ 4 camera scan (product lookup waits on data source)
   │  └─ 5 customer catalog
   │     └─ 6 stock + order calculation
   │        ├─ 7 payment + receipt
   │        ├─ 8 WhatsApp catalog/messages (provider decision)
   │        ├─ 9 NPL ordering (NPL definition/interface)
   │        ├─ 11 dashboard (also Unit 10 entitlement)
   │        ├─ 12 billing integration (API availability)
   │        └─ 13 rewards (identity/rules)
   └─ 10 subscription/add-on entitlements and operational-service boundary
14 maintenance/SEO service (operational; deployment and service scope)
15 verification/deployment (hosting decision)
```

## Work that can start without external provider decisions

- Unit 1 project structure and local scaffold.
- Merchant shell/navigation design, subject to the account-boundary decision before secure account implementation.
- Manual inventory/SKU workflow and customer catalog against merchant-entered data, once SKU fields/catalog details are supplied.
- Camera barcode capture without automatic product lookup.
- Provider-neutral order model, stock-validation approach, calculation interfaces, and merchant settings UI; live order calculation requires confirmed stock/GST/delivery policies.
- Provider-neutral entitlement representation and service/feature distinction; automated subscription collection remains blocked.
- WhatsApp settings UI and documented workflow boundary; actual connection/catalog/message delivery remains blocked.
- Test plans and accessibility design for confirmed flows.

## Future / conditional scope

- Barcode product autofill is conditional on a confirmed compatible data source.
- WhatsApp automation, billing-system integration, and NPL ordering require confirmed technical interfaces/providers.
- Sales dashboard is conditional on add-on entitlement.
- Keep each add-on unavailable until enabled; do not create unrelated platform capabilities.
- Hosting-specific topology/configuration waits for deployment constraints.

## Open decisions and blockers

See the `blockers` sections in [`requirements.yaml`](requirements.yaml). The most consequential sequencing blockers are merchant account cardinality/access model; inventory/stock concurrency policy; GST and delivery calculation rules; payment provider/lifecycle; WhatsApp API capabilities; NPL meaning/interface; subscription/add-on billing behavior; and hosting for deployment.
