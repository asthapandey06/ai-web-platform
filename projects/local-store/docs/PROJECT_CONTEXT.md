# Local Store Project Context

## Objective

Build the Local Store business system and customer experience described in [`requirements.yaml`](requirements.yaml). The confirmed flows include merchant registration/login, merchant inventory management, customer catalog browsing and ordering, stock validation, merchant-configured GST and delivery calculation, payment, downloadable receipt, WhatsApp communication, repeat-customer rewards, and explicitly priced subscription/add-ons.

## Source of truth

- [`requirements.yaml`](requirements.yaml) contains confirmed requirements, merchant settings, unresolved decisions, and blockers.
- [`PLAN.md`](PLAN.md) is the executable implementation sequence and lists dependencies and acceptance criteria.
- [`ARCHITECTURE.md`](ARCHITECTURE.md) records technical boundaries.
- Client-provided values/policies override assumptions. Unknowns remain `NEEDS_CONFIRMATION`; do not ship invented defaults.

## Confirmed technical baseline

- Independent project; no WebsiteOS runtime dependency.
- Single modular application, not microservices.
- React + TypeScript + Vite frontend.
- Node.js + TypeScript + Express backend.
- PostgreSQL.
- Root WebsiteOS dependency management; no project-local `node_modules` or lockfile unless deployment isolation is demonstrated to be necessary.
- No speculative extraction into `/core` or other WebsiteOS shared code.

## Confirmed commercial and workflow facts

- Subscription: ₹1,000/month, including monthly app/website maintenance and SEO maintenance.
- Add-ons: ₹500 per feature. Dashboard shows weekly/monthly/yearly sales graphs; existing billing-system integration is conditional on API availability; NPL ordering is enabled only when that add-on is enabled.
- Add-on billing cadence is not specified.
- Operational maintenance/SEO work is a service, not software functionality.
- Merchant can enable/disable automated WhatsApp messages, connect a WhatsApp Business account, set free-delivery minimum order value, configure fixed delivery prices by distance, and control unavailable-stock auto-decline/alerts.
- Customer flow validates stock, presents an order summary, applies configured GST when applicable and configured delivery charges, confirms the order, takes payment, and provides a downloadable receipt.

## Do not assume

Do not invent GST/tax treatment, price/product data, delivery bands/fees, providers, hosting, barcode data sources, payment methods, WhatsApp integration capabilities, NPL expansion/meaning, or merchant account cardinality. Treat these as blockers/configuration only as documented in the requirements and plan.

## Scope boundaries

No generic ecommerce platform, multi-tenancy, generic CRM, microservices, speculative WebsiteOS shared capabilities, or project-local dependency install/lockfile without a demonstrated need. Keep all client business rules inside this project.
