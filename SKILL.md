---
name: ui-refiner
description: Scans a web codebase for AI-default design patterns (Inter font, purple gradients, 3-column card grids, excessive border-radius), visually inspects the rendered UI via browser screenshot, generates a project-specific design system, and applies the changes. Performs stack migration when needed. Use when user mentions "AI 티", "디자인 개선", "디자인 점검", "AI처럼 보여", "UI 검수", "generic design", or asks to improve existing website aesthetics.
---

# UI Refiner

Act as a design lead auditing a site that looks "AI-generated." Work in five phases: visual snapshot → audit → ground + design system → stack migration + apply → visual verify.

---

## Phase 0 — Visual Snapshot (optional)

Run this phase only when an MCP screenshot tool is connected (Preview MCP, Claude in Chrome).

1. Take a screenshot of the running site
2. Analyze across **4 dimensions**:
   - **Typography**: font personality, weight contrast, scale jumps
   - **Color**: palette distinctiveness, gradient overuse
   - **Motion**: animation presence and coherence (scattered effects vs. orchestrated sequence)
   - **Background**: atmospheric depth, flat vs. layered
3. Cross-reference visual findings against Phase 1 code scan results

No screenshot tool → skip to Phase 1.

---

## Phase 1 — Audit

Scan the codebase for AI-default patterns. See [REFERENCE.md](REFERENCE.md) for the full pattern catalog.

### 1-1. Code Pattern Scan

**Typography**
- Fonts: `Inter`, `Roboto`, `Open Sans`, `Lato` in CSS/HTML/config
- `font-inter`, `font-roboto`, `font-sans` (system font defaults)

**Color**
- Purple/violet: `#7C3AED`–`#8B5CF6`, `purple-`, `violet-`, `from-purple`, `from-violet`
- Generic blue CTA: `bg-blue-500`, `bg-blue-600`, `#3B82F6`

**Layout**
- 3-column cards: `grid-cols-3`, `repeat(3`, `.features .grid`
- Full-width hero gradient: `bg-gradient-to-r from-` + hero/hero-section

**CSS/Tailwind**
- Blanket `rounded-xl`, `rounded-2xl`, `border-radius: 16px+` on everything
- `shadow-lg`, `shadow-xl` on every card
- Numbered decorators: CSS counter, `::before { content: "0" counter(...) }`

**🆕 Motion**
- Absent: no `animation`, `transition`, or `@keyframes` anywhere
- Scattered: identical `hover:scale-105` on every card (no orchestration)
- Overused: `motion.div` on unnecessary elements

**🆕 Background**
- Flat defaults: `background: #fff`, `bg-white`, `bg-gray-50` across all sections
- No depth: sections share the same background, no layering

### 1-2. Stack Constraint Assessment

Detect the current stack and evaluate design implementation limits:

| Stack | Font optimization | Motion library | Advanced backgrounds | Migration candidate |
|-------|-------------------|----------------|----------------------|---------------------|
| Vanilla HTML/CSS | Google Fonts `<link>` | CSS transitions only | CSS gradients | Limited |
| React (CRA/Vite) | Google Fonts `<link>` | Framer Motion available | CSS | Moderate |
| Next.js | `next/font/google` (optimal) | Motion library | CSS/Canvas | Optimal |
| Next.js + Tailwind | `next/font/google` | Motion | Tailwind + CSS | Optimal |

**When constraints are found**: propose migration before Phase 2. Explain why, get consent, then execute in Phase 3-0.

Report findings grouped by **severity**: **High / Medium / Low**

---

## Phase 2 — Ground + Design System

Complete this phase entirely before writing any code.

### 2-1. Establish Content Foundation

Read from the codebase:
- Brand name, service/product name
- Copy tone (technical / emotional / professional / playful)
- Target audience (developers / general consumers / enterprise)
- Existing visual assets (logo colors, image style, domain aesthetic)

### 2-2. Set Design Direction — 5 Principles

**Declare your choice for each principle explicitly:**

1. **Hero statement** — Open with the most characteristic element (headline / image / interactive demo / animation). Forbid generic "big number + small label + gradient" unless genuinely optimal.
2. **Typography as personality** — Pair display and body typefaces deliberately. Scale jumps of 3× or more, weight contrast 400 vs. 800/900.
3. **Structure encodes meaning** — Use numbering, dividers, and labels only when they serve content logic. Ask: "Does this choice actually make sense?"
4. **Motion with purpose** — One orchestrated page-load staggered reveal > several scattered micro-interactions. CSS `animation-delay` is often enough.
5. **Complexity matches vision** — Minimal work demands precision; maximalist work demands elaboration. Spend boldness in one signature element; keep surroundings quiet.

**Take one real aesthetic risk**: does the design include something surprising or unexpected? If not, add one.

### 2-3. Generate Design System Tokens

Output a compact token system:

```
[PROJECT NAME] Design System

COLOR
  --bg:       #______  (background — reconsider if plain white)
  --surface:  #______  (cards/panels)
  --primary:  #______  (main action — no blue or purple)
  --accent:   #______  (one emphasis color)
  --border:   #______  (dividers)
  --text:     #______  (body)
  --muted:    #______  (secondary text)

TYPE
  Display: [font name] — Google Fonts import required
  Body:    [font name]
  Scale:   48px / 32px / 20px / 16px / 13px

SHAPE
  Button:  border-radius: [X]px  (no gradient)
  Card:    border-radius: [X]px
  Input:   border-radius: [X]px
  Shadow:  [value or "none"]

MOTION
  Page load: staggered reveal — [target elements], [X]ms intervals
  Hover:     [effect] — [specific locations only]
  Forbidden: identical scale/shadow hover on every card

BACKGROUND
  Hero:    [layered description or pattern]
  Section: [differentiation method — color/pattern/space]

ANTI-PATTERNS (absolutely forbidden for this project)
  - ___________
  - ___________
  - ___________
```

### 2-4. Two-Pass Self-Critique Gate

**First pass**: "Could this design work unchanged for a completely different industry?" → If yes, redesign.

**Second pass** — Check against 3 AI defaults:
- Warm cream + serif + terracotta palette? → generic, replace
- Near-black background + neon accent? → common SaaS dark mode, replace
- Broadsheet 3-column layout? → AI default grid, replace

Only proceed when none of the three apply.

---

## Phase 3 — Stack Migration + Apply

### 3-0. Stack Migration (only if recommended in Phase 1)

Execute only when Phase 1 found a stack constraint and the user has consented.

**Migration scenarios** (see [REFERENCE.md](REFERENCE.md) for checklists):
- Vanilla HTML/CSS → Next.js + Tailwind
- React (CRA/Vite) → Next.js
- Tailwind v3 → Tailwind v4

### 3-1. Apply Fixes

For each file:
1. State what AI pattern is being removed and what replaces it
2. Apply the change
3. Verify the design system token is used (no ad-hoc values)

**Stack-specific approach:**
- **HTML/CSS**: replace font imports, update CSS custom properties, fix selectors
- **Tailwind**: update `tailwind.config` theme, replace utility classes in components
- **React/Next.js**: update `globals.css` variables first, then components top-down

Work section by section: **hero → nav → features → footer**. Do not rewrite everything at once.

**🆕 Motion additions**
- Page load: one staggered reveal sequence on hero/nav elements
- Scroll reveal: major section entrances (IntersectionObserver or CSS scroll-driven)
- Hover: selective — key interactive elements only, no uniform card hover

**🆕 Background additions**
- Replace flat backgrounds with layered CSS gradients or geometric patterns
- Differentiate sections with distinct backgrounds to create spatial rhythm
- Match the effect to context (tech site → subtle grid/dot; brand → organic curves)

---

## Phase 4 — Visual Verify (optional)

Run only when a screenshot tool is available.

1. Take a new screenshot after applying changes
2. Compare side-by-side with the Phase 0 screenshot
3. Confirm improvement across 4 dimensions:
   - **Typography**: personality increased, scale is noticeable
   - **Color**: moved away from AI defaults, palette is coherent
   - **Motion**: intentional animation added, not excessive
   - **Background**: depth added, sections are visually distinct
4. Check design system token consistency — no stray color or font values

---

## Trigger examples

- "이 사이트 AI 티 나는 것 좀 없애줘"
- "디자인 점검해줘"
- "AI처럼 보이는 부분 고쳐줘"
- "웹사이트 디자인 개선해줘"
- "UI 검수해줘"
- "/ui-refiner"
