# Local Store Progress

## Current status

**Unit 2 — Merchant access and app shell: partial**

### Delivered

- Provider-neutral Express auth routes for login, session lookup, and logout.
- Server-side password verification and opaque, hashed session tokens in PostgreSQL.
- Reusable password and token cryptography moved to the root-managed `/core/auth` package; merchant policy and persistence remain local.
- Protected `/api/merchant` route; unauthenticated requests receive `401`.
- React sign-in screen and session-aware protected merchant shell.
- Inventory, Scanner, and Settings shell navigation.
- Dashboard remains hidden because its add-on entitlement is not enabled or confirmed.
- Responsive and keyboard-focus-visible shell states.

### Intentionally blocked

Merchant registration is not enabled. Registration access and verification rules,
merchant/account cardinality, roles, and recovery are `NEEDS_CONFIRMATION` in the
requirements. The API reports `REGISTRATION_POLICY_UNCONFIRMED` rather than
inventing an open-registration policy.

Inventory, barcode scanning, settings behavior, dashboard graphs, payments,
WhatsApp, rewards, billing, NPL, and delivery logic are outside this unit.

### Verification

- `npm run local-store:typecheck`
- `npm run local-store:build`
