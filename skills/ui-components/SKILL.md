# WebsiteOS UI Components Skill

## Purpose

Define the rules for reusable WebsiteOS UI components.

Components must be:
- reusable
- composable
- responsive
- accessible
- data-driven
- independent from business-specific content

## Rules

1. Components must not contain business-specific hardcoded content.
2. Components receive content through props.
3. Components must not call APIs.
4. Components must not contain database logic.
5. Components must not contain WebsiteSpec parsing logic.
6. Components must not directly depend on the AI layer.
7. Components must not own application routing.
8. Components should remain presentational unless interaction is essential.
9. Prefer native React and CSS over additional UI libraries.
10. Do not add dependencies without a concrete requirement.
11. Components must work on mobile and desktop.
12. Interactive elements must be keyboard accessible.
13. Buttons and links must use semantic HTML.
14. Avoid deeply nested component hierarchies.
15. Keep component APIs small and explicit.

## Component Categories

### Layout

Reusable structural components.

- Container
- Header
- Footer

### Sections

Reusable website content sections.

- Hero
- Services
- Trust
- CTA

### Forms

Reusable interactive forms.

- AppointmentForm

## Data Flow

WebsiteSpec
    ↓
Generator
    ↓
generated data
    ↓
React components
    ↓
rendered website

Components consume prepared data.

Components do not interpret raw WebsiteSpec.

## Ownership

WebsiteOS owns the component definitions.

Generated projects receive their own copy of the components.

After generation, customer projects must be able to modify their components independently.

## Component Contract

Each component must define:

- Props interface
- Required props
- Optional props
- Semantic HTML structure
- Responsive behavior
- Accessibility requirements

## Quality Gate

Before accepting a component:

- TypeScript builds successfully.
- No unnecessary dependencies were introduced.
- No business-specific data is hardcoded.
- No API/database logic exists inside the component.
- Component works with empty/minimal valid data.
- Component is usable on mobile.
- Interactive elements are keyboard accessible.