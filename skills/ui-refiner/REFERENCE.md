# UI Refiner Reference

This is the long-form catalog. Keep `SKILL.md` short and link here when pattern detail, replacement examples, or migration notes are needed.

## Contents

- AI-default pattern catalog
- Motion and background patterns
- Font recommendations
- Design system template
- Stack-specific implementation rules
- Stack migration notes
- Two-pass self-critique checklist

## AI-default Pattern Catalog

### High Severity

| Pattern | Detect | Why | Replace with | Verify |
|---|---|---|---|---|
| Inter-first identity | `Inter`, `font-inter`, `font-sans` as the primary brand voice | It is the most common AI/web default and rarely communicates product character | A display/body pair chosen from domain cues, with clear weight and scale contrast | Body and headings use declared tokens; no hidden Inter import remains |
| Purple/violet gradient hero | `from-purple`, `from-violet`, `#7C3AED`, `#8B5CF6`, `linear-gradient(...purple...)` | It is a common generated landing-page default | Project-specific color system, restrained accent, or image/pattern-led hero | Primary/action colors are not generic blue or purple unless justified by brand |
| Predictable 3-column feature grid | `grid-cols-3`, `repeat(3`, six icon cards | It flattens product meaning into template blocks | Content-led grouping, comparison, process, split narrative, or interactive demo | Section structure explains the product better than equal-width cards |
| Full-width gradient hero shell | `hero` plus `bg-gradient-to-r/from-*` or large decorative blobs | It makes unrelated products look interchangeable | One signature first-viewport element: product image, live demo, editorial type, or domain pattern | Hero cannot be reused unchanged for a different industry |
| Accessibility regression | Missing focus styles, contrast-risk text, motion without reduced-motion fallback | Visual upgrades must not reduce usability | Visible focus, contrast-safe tokens, `prefers-reduced-motion` guards | Keyboard path and reduced-motion behavior remain usable |

### Medium Severity

| Pattern | Detect | Why | Replace with | Verify |
|---|---|---|---|---|
| Blanket large radius | `rounded-xl`, `rounded-2xl`, `border-radius: 16px+` across cards/buttons/inputs | Generic softness erases hierarchy | Shape scale by role: compact controls, panels, media, pills | Radius values differ by component role and tokens |
| Blanket card shadows | `shadow-lg`, `shadow-xl` repeated on every card | Decorative depth without spatial logic | Border, subtle elevation, section background, or none | Elevation marks interaction or hierarchy only |
| Generic blue CTA | `bg-blue-500`, `bg-blue-600`, `#3B82F6` | SaaS default action color | Brand/intent-specific primary token | CTA color comes from design-system token |
| Scattered hover effects | Uniform `hover:scale-105`, `hover:shadow-lg` on many elements | Motion feels automated rather than designed | One or two purposeful hover states tied to affordance | Non-interactive cards do not animate like buttons |
| Flat section backgrounds | Repeated `bg-white`, `bg-gray-50`, `bg-gray-100` | No spatial rhythm or atmosphere | Layered background, contextual texture, or distinct section treatment | Each major section has a reason for its surface |
| shadcn raw palette drift | Raw Tailwind colors in shadcn-heavy projects | It bypasses theme tokens and makes theming brittle | Semantic tokens and component variants | `components.json` projects keep `background`, `foreground`, `primary`, `muted` semantics |

### Low Severity

| Pattern | Detect | Why | Replace with | Verify |
|---|---|---|---|---|
| Decorative 01/02/03 numbering | CSS counters or numbered cards without real sequence | Suggests process where none exists | Labels, groups, or proof points aligned to content | Numbers only appear for ordered flows |
| Icon grid filler | Repeated icon/title/description cards | Common generated feature filler | Product screenshots, proof, use cases, or decision aids | Each item answers a real user question |
| Space Grotesk second default | `Space Grotesk` as a generic "interesting" font | It has become a common Inter replacement | More domain-specific display face or mono/editorial pairing | Font choice is justified by audience and tone |
| Placeholder copy | `Lorem ipsum`, "Your tagline here", generic benefits | Visual polish cannot hide absent positioning | Specific claims, user language, product verbs | Hero and CTA name the actual product/action |

## Motion Patterns

### Missing Motion

| Signal | Replace with | Verify |
|---|---|---|
| No `animation`, `transition`, `@keyframes`, or motion library in an otherwise expressive landing page | One page-load reveal sequence for hero/nav/content | The sequence is brief, coherent, and not repeated everywhere |
| React app with many state changes but no transition language | Component-level state transitions or CSS transitions | Interactive states feel responsive without distraction |

### Excess Motion

| Signal | Replace with | Verify |
|---|---|---|
| Every card uses the same `hover:scale-105` | CTA hover plus one meaningful card affordance | Hover communicates clickability or state |
| Every section fades in with identical timing | One hero reveal plus optional section entrance | Motion hierarchy mirrors content hierarchy |

### CSS Pattern

```css
.hero-title { animation: reveal 0.6s ease both; }
.hero-sub { animation: reveal 0.6s 0.1s ease both; }
.hero-cta { animation: reveal 0.6s 0.2s ease both; }

@keyframes reveal {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
  }
}
```

## Background Patterns

| Default | Replace with | Verify |
|---|---|---|
| Entire page alternates `bg-white` and `bg-gray-50` | Section-specific surfaces, subtle texture, or content-led whitespace | Sections are visually distinct without becoming decorative cards |
| Generic purple/blue radial blobs | Domain-specific image, grid, diagram, material, or pattern | Background supports product meaning |
| Hero has no depth or anchor | Layered CSS background, product visual, or full-bleed media | First viewport has one memorable visual signature |

```css
.technical-hero {
  background-image: radial-gradient(circle, rgba(15, 23, 42, 0.12) 1px, transparent 1px);
  background-size: 24px 24px;
}

.editorial-section {
  background:
    linear-gradient(90deg, rgba(0, 0, 0, 0.04) 1px, transparent 1px),
    #f7f4ef;
  background-size: 48px 48px;
}
```

## Font Recommendations

Avoid as generic defaults: `Inter`, `Roboto`, `Open Sans`, `Lato`, `Nunito`, `Poppins`, and default `Space Grotesk`.

| Direction | Display | Body |
|---|---|---|
| Editorial / premium | Playfair Display | DM Sans |
| Technical / precise | IBM Plex Mono | IBM Plex Sans |
| Brutalist / distinctive | Fraunces | Source Sans 3 |
| Swiss / structured | Barlow Condensed | Barlow |
| Retro / literary | Newsreader | DM Serif Display |
| Sharp / energetic | Syne | Work Sans |
| Product / calm | Bricolage Grotesque | Source Sans 3 |

Rules:

- Use visible contrast: 400 body vs. 800/900 display where appropriate.
- Use real scale jumps: 13/16/20/32/48+ rather than tiny 1.2x differences.
- For CJK-heavy products, choose fonts with proper glyph coverage before visual novelty.

## Design System Template

```text
[PROJECT NAME] Design System

COLOR
  --bg:       #______  (background; justify if plain white)
  --surface:  #______  (cards/panels)
  --primary:  #______  (main action; no generic blue/purple unless brand-owned)
  --accent:   #______  (one emphasis color)
  --border:   #______  (dividers)
  --text:     #______  (body)
  --muted:    #______  (secondary text)

TYPE
  Display: [font name]
  Body:    [font name]
  Scale:   48px / 32px / 20px / 16px / 13px

SHAPE
  Button:  border-radius: [X]px
  Card:    border-radius: [X]px
  Input:   border-radius: [X]px
  Shadow:  [value or "none"]

MOTION
  Page load: [sequence], [duration], [delay interval]
  Hover:     [effect], [specific locations only]
  Reduced:   [fallback behavior]

BACKGROUND
  Hero:    [layered description or media]
  Section: [differentiation method]

ANTI-PATTERNS
  - [forbidden pattern]
  - [forbidden pattern]
  - [forbidden pattern]
```

## Stack-specific Implementation Rules

### HTML/CSS

- Replace font imports first, then root variables, then component selectors.
- Prefer CSS custom properties for colors, type, radius, and motion timing.
- Keep motion CSS small and guard it with `prefers-reduced-motion`.

### Tailwind

- Put brand decisions in `tailwind.config.*`, CSS `@theme`, or global CSS variables before replacing utility classes.
- Use `gap-*` for internal layout rhythm.
- Avoid raw `purple-*`, `violet-*`, `blue-500`, and `blue-600` as primary UI language unless brand-owned.
- Replace repeated `rounded-xl shadow-lg` with role-specific tokens.

### shadcn

- If `components.json` exists, treat shadcn conventions as a constraint.
- Prefer semantic tokens such as `background`, `foreground`, `primary`, `muted`, `border`, `ring`.
- Do not replace shadcn primitives with one-off markup unless the component cannot express the needed behavior.
- Keep accessibility behavior from Radix/shadcn components intact.

### React / Next.js

- Update `globals.css` or theme variables before component markup.
- In Next.js, prefer `next/font/google` for chosen fonts.
- Keep layout changes top-down: app shell, hero, major sections, repeated components.
- Preserve loading, error, empty, and responsive states.

## Stack Migration Notes

Do not migrate automatically. Recommend migration only when the current stack blocks the design goal.

### Vanilla HTML/CSS -> Next.js + Tailwind

- Use when the project needs routed product surfaces, optimized fonts/images, or component reuse.
- Preserve existing content structure before introducing new visual systems.

### React CRA/Vite -> Next.js

- Use when SSR, file routing, image/font optimization, or deployment expectations require it.
- Avoid migration for a single static landing page unless the user asks.

### Tailwind v3 -> v4

- Use when the project is already moving to CSS-first theme configuration.
- Do not mix v3 config assumptions and v4 `@theme` tokens without checking the installed version.

## Two-pass Self-critique Checklist

First pass:

- Could the design work unchanged for a completely different industry? If yes, redesign.
- Does the font pairing communicate the product's domain and audience? If no, choose again.
- Is the primary color generic blue/purple without brand reason? If yes, replace.
- Is the signature visual element memorable but still useful? If no, add one.

Second pass:

- Warm cream + serif + terracotta palette? Replace unless it is explicitly brand-owned.
- Near-black background + neon accent? Replace unless the product context demands it.
- Broadsheet 3-column layout? Replace with a structure that explains the product.

Final checks:

- No blanket `rounded-xl shadow-lg` card language.
- Fonts are actually imported or configured.
- Backgrounds create spatial rhythm without decorative clutter.
- Motion is purposeful and reduced-motion safe.
- Keyboard focus and state copy remain intact.
