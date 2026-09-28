# Frontend Skill

## Stack

- React
- TypeScript
- Vite

## Reuse

- Check the root `components/` library before creating a new reusable UI component.
- Reuse an existing component when its behavior matches the requirement.
- Extend an existing component only when the extension remains genuinely reusable.
- Client-specific UI belongs inside the client project.
- Do not duplicate an existing WebsiteOS component unnecessarily.

Reusable UI primitives provide presentation or interaction behavior without a
client's business policy. Client navigation, entitlement visibility, merchant
workflows, copy, data shapes, and domain states remain in the client project.
Do not extract a screen or feature merely because it is visually reusable.

## Rules

- Build reusable components.
- Keep business logic outside presentational components.
- Prefer composition over deeply configurable components.
- Use typed props.
- Keep responsive behavior intentional.
- Handle loading, empty and error states.
- Do not invent content or business functionality.
- Follow the project's existing design system.

## Frontend Code Placement

Before creating a component inside a client project:

1. Check `/components` for an existing reusable component.
2. Determine whether the component contains client-specific behavior.
3. Reuse/adapt an existing WebsiteOS component when appropriate.
4. Put stable reusable UI capabilities in `/components`.
5. Keep client-specific UI inside the client project.

Treat an existing component as reusable only when its props and behavior can
be documented without Local Store or another client's domain assumptions.

Examples:

Generic Button
→ `/components`

Generic Modal
→ `/components`

Local Store InventoryTable
→ `projects/local-store/client/src/`

Local Store OrderSummary
→ `projects/local-store/client/src/`

Dental Clinic AppointmentForm
→ client-specific unless a genuinely reusable appointment component exists.