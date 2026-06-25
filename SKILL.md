---
name: design-deai
description: Scans a web codebase for AI-default design patterns (Inter font, purple gradients, 3-column card grids, excessive border-radius) and automatically fixes them. Generates a project-specific design system, then applies changes across HTML/CSS, Tailwind, and React/Next.js files. Use when user mentions "AI 티", "디자인 개선", "디자인 점검", "AI처럼 보여", "generic design", or asks to improve existing website aesthetics.
---

# Design De-AI

Treat yourself as a design lead auditing a site that looks "AI-generated." Work in three phases: scan, design, fix.

## Phase 1 — Scan

Search the codebase for AI-default patterns. Check:

- Fonts: `Inter`, `Roboto`, `Open Sans`, `Lato` in CSS/HTML/config
- Colors: purple/violet hex ranges `#7C3AED`–`#8B5CF6`, generic blue `#3B82F6` as primary
- Layout: 3-column grid cards, full-width hero with gradient overlay
- CSS: blanket `border-radius` > 8px on everything, `box-shadow` on every card
- Tailwind: `rounded-xl`, `shadow-lg`, `purple-`, `violet-`, `from-purple` classes
- Copy: numbered decorators (01/02/03) with no real sequence meaning

Report findings as a prioritized list grouped by **severity** (High / Medium / Low).
See [REFERENCE.md](REFERENCE.md) for the full pattern catalog.

## Phase 2 — Design System

After scanning, generate a project-specific design system **before writing any code**.

1. Read existing content/brand cues from the codebase (product name, copy tone, imagery)
2. Pick a design direction that fits the subject — not the AI default
3. Output a compact token system:
   - **Color**: 4–6 named hex values (primary, bg, surface, border, text, accent)
   - **Type**: 2 Google Fonts (display + body) — never Inter/Roboto/Open Sans
   - **Shape**: explicit border-radius values per component type (button / card / input)
   - **Shadow**: one value or none
   - **Anti-patterns**: 3+ things explicitly forbidden for this project

Critique the system: *"Would this design work for a completely different project?"* — if yes, revise.

See [REFERENCE.md](REFERENCE.md) for font recommendations and stack-specific patterns.

## Phase 3 — Apply

Apply fixes file by file. For each file:

1. State what AI patterns are being removed and what replaces them
2. Apply the change
3. Verify the design system token is used (not a new ad-hoc value)

**Stack-specific approach:**
- **HTML/CSS**: Replace font imports, update CSS custom properties, fix selectors
- **Tailwind**: Update `tailwind.config` theme, replace utility classes in components
- **React/Next.js**: Update global CSS / `globals.css`, then components top-down

Work section by section — hero → nav → features → footer. Do not rewrite everything at once.

## Trigger examples

- "이 사이트 AI 티 나는 것 좀 없애줘"
- "디자인 점검해줘"
- "AI처럼 보이는 부분 고쳐줘"
- "웹사이트 디자인 개선해줘"
- "/design-deai"
