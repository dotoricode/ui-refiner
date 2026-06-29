# UI Refiner Audit Guide

Use this guide to turn scan results and screenshots into a consistent UI audit.

## Scorecard

Score each category from 0 to 3.

| Score | Meaning |
|---|---|
| 0 | No meaningful issue found |
| 1 | Minor or isolated polish issue |
| 2 | Repeated pattern that weakens identity or usability |
| 3 | Dominant AI-default pattern, brand mismatch, or accessibility risk |

| Category | Signals | High Severity Trigger |
|---|---|---|
| Typography | Inter/Roboto/Open Sans, weak scale, no display/body distinction | Primary identity depends on default sans or unreadable hierarchy |
| Color | Purple/violet gradients, generic blue CTA, raw palette drift | Hero/action system uses generic purple/blue without brand reason |
| Layout | 3-column cards, icon grids, generic split hero | Main content is flattened into template sections |
| Shape/Elevation | Blanket `rounded-xl`, `rounded-2xl`, `shadow-lg`, `shadow-xl` | Most UI elements share the same soft card style |
| Motion | Missing motion, uniform hover scale, excessive fade-ins | Motion harms clarity or ignores reduced-motion needs |
| Background | Flat white/gray sections, decorative blobs, no section rhythm | First viewport has no distinct visual signature |
| Accessibility | Missing focus, contrast risk, state copy gaps, motion fallback gaps | Visual refinement would make keyboard, contrast, or motion behavior worse |
| Stack Fit | Missing tokens, shadcn raw colors, framework constraints | Requested visual goal requires a stack change |

Severity rule:

- High: any category scores 3, or two related categories score 2 and affect the same surface.
- Medium: repeated score-2 issues with clear design debt.
- Low: score-1 issues or optional polish.

## Audit Commands

Start with the skill scanner when possible:

```bash
node skills/ui-refiner/scripts/audit-ui-patterns.mjs <target-project>
node skills/ui-refiner/scripts/audit-ui-patterns.mjs <target-project> --json
```

Useful manual searches:

```bash
rg -n "Inter|Roboto|Open Sans|font-sans|font-inter" .
rg -n "purple|violet|from-purple|from-violet|#7C3AED|#8B5CF6|bg-blue-500|bg-blue-600" .
rg -n "grid-cols-3|repeat\\(3|rounded-xl|rounded-2xl|shadow-lg|shadow-xl|hover:scale-105" .
rg -n "prefers-reduced-motion|focus-visible|aria-|role=|loading|error|empty" .
```

Exclude generated output, dependencies, and lockfiles.

## Stack Checks

### HTML/CSS

- Check global CSS variables before component selectors.
- Confirm fonts are actually imported in HTML or CSS.
- Use CSS-only motion and `prefers-reduced-motion`.

### Tailwind

- Check Tailwind version and whether config is JS-based or CSS-first.
- Look for raw color utilities as primary UI language.
- Prefer `gap-*` for layout rhythm instead of margin chains.

### shadcn

- If `components.json` exists, inspect theme tokens and component variants.
- Keep semantic tokens: `background`, `foreground`, `primary`, `muted`, `border`, `ring`.
- Do not break Radix accessibility behavior while restyling.

### React / Next.js

- Check `app/`, `pages/`, `styles/`, `app/globals.css`, `next/font`, and layout files.
- Preserve loading, error, empty, and responsive states.
- Recommend migration only when stack constraints block the design goal.

## Accessibility and State Checks

Include these in every audit, even when the user only asks for visual polish:

- Keyboard focus: visible focus state for links, buttons, inputs, custom controls.
- Contrast risk: muted text and CTA text are likely readable on their surfaces.
- Reduced motion: animations and scroll behavior have a `prefers-reduced-motion` fallback.
- Responsive stability: hero, cards, nav, and controls do not overlap at mobile widths.
- State copy: loading, empty, and error states keep product voice and remain visible.
- Touch targets: primary mobile controls have enough size and spacing.

## Finding Format

Each finding should include:

- Severity: High, Medium, or Low.
- Evidence: file path, selector/class, screenshot observation, or scanner match.
- Impact: why this makes the UI feel generic, brittle, or less usable.
- Direction: what design move should replace it.
- Verification: how to confirm the fix.

