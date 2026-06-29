---
name: ui-refiner
description: Audits web codebases for AI-default UI patterns, optionally verifies rendered screens with screenshots, produces a scored design audit, creates a project-specific design system, and applies scoped refinements. Use when user mentions "AI 티", "디자인 개선", "디자인 점검", "AI처럼 보여", "UI 검수", "generic design", or asks to improve existing website aesthetics.
---

# UI Refiner

Act as a design lead turning an AI-default web UI into a project-specific interface. The workflow is fixed:

1. repo scan
2. optional screenshot
3. audit with `AUDIT.md`
4. output reports with `OUTPUTS.md`
5. propose design principles and tokens
6. apply only after the user has approved high-impact changes
7. optional visual verification

Use progressive disclosure: read this file first, then open only the reference files needed for the current phase.

## Phase 0 - Repo Scan

Always begin by understanding the target project before giving design advice.

1. Identify stack and UI surface:
   - `package.json`, framework configs, `components.json`, Tailwind config, route/app directories.
   - Main UI files and global CSS.
   - Existing brand/product names, copy tone, and visual assets.
2. If Node is available, run the local scanner from this skill directory:

```bash
node skills/ui-refiner/scripts/audit-ui-patterns.mjs <target-project>
```

Use `--json` when another tool or report needs structured output.

3. If the scanner cannot run, do a manual scan with the same pattern categories from `AUDIT.md`.

## Phase 1 - Optional Visual Snapshot

Run this phase only when a browser/screenshot tool is available or the user supplied screenshots.

Assess the rendered UI across:

- Typography: personality, hierarchy, weight contrast, scale jumps.
- Color: palette distinctiveness, gradient/default hue overuse.
- Motion: missing, scattered, or intentionally orchestrated.
- Background: flat sections, layered depth, spatial rhythm.
- Accessibility: focus visibility, contrast risk, reduced-motion handling.

Record findings in the visual snapshot section from `OUTPUTS.md`. If no screenshot path exists, state that the audit is code-only and continue.

## Phase 2 - Audit

Open `AUDIT.md` and use its scorecard. Group findings by severity:

- High: major AI-default patterns or accessibility regressions.
- Medium: repeated generic styling that weakens product identity.
- Low: optional polish opportunities.

Also identify stack constraints:

- Vanilla HTML/CSS: limited font optimization and motion primitives.
- React/Vite/CRA: good component control, no `next/font`.
- Next.js: preferred for font optimization and routed product surfaces.
- Tailwind/shadcn: require token discipline and semantic component variants.

Produce the audit report using the template in `OUTPUTS.md`.

## Phase 3 - Ground + Design System

Complete this phase before editing code.

Read enough project context to determine:

- Brand/product name.
- Audience and intent.
- Copy tone.
- Existing color, image, icon, or domain cues.
- Current interaction density and content hierarchy.

Then declare exactly five design principles:

1. Hero statement: the first viewport must expose the product's most specific value or interaction.
2. Typography as personality: choose display/body type with visible contrast; avoid Inter/Roboto/Open Sans defaults.
3. Structure encodes meaning: grids, dividers, labels, and numbers must match the content model.
4. Motion with purpose: prefer one orchestrated reveal or state transition over repeated hover tricks.
5. Complexity matches vision: add one signature visual risk, then keep supporting UI restrained.

Generate a compact token system with the `Design System Proposal` template from `OUTPUTS.md`. Run the two-pass critique gate from `REFERENCE.md` before applying changes.

## Phase 4 - Apply

Apply only scoped, explainable changes. For each touched area, state the AI-default pattern being removed and the replacement.

Implementation rules:

- HTML/CSS: update font imports, root variables, section backgrounds, and selectors before component details.
- Tailwind: define/adjust tokens first, then replace utilities. Prefer semantic colors over raw palette classes.
- shadcn: if `components.json` exists, preserve shadcn structure, component variants, and semantic tokens.
- React/Next.js: update global styles/font setup first, then page sections top-down.
- Layout: prefer meaningful asymmetry, content-led grouping, and stable responsive constraints over generic 3-column feature grids.
- Spacing: prefer `gap-*` for internal layout rhythm; avoid margin chains that create brittle spacing.
- Motion: add a single purposeful sequence and respect `prefers-reduced-motion`.
- Accessibility: keep visible focus states, check contrast risk, and preserve empty/loading/error states.

Do not perform stack migrations without explicit user consent.

## Phase 5 - Visual Verify

Run this phase when a screenshot/browser tool is available after changes.

Use the `Visual Verification Report` template from `OUTPUTS.md` and compare before/after across:

- Typography personality and scale.
- Color distinctiveness and token consistency.
- Motion intent, restraint, and reduced-motion behavior.
- Background depth and section differentiation.
- Responsive layout at desktop and mobile widths.
- Keyboard focus, contrast risk, and state copy.

If visual verification is unavailable, report the exact non-visual checks that were run and the remaining risk.

## Reference Files

- `AUDIT.md`: scorecard, severity rules, stack-specific audit commands, accessibility checks.
- `OUTPUTS.md`: required report templates.
- `REFERENCE.md`: pattern catalog, token examples, migration notes, self-critique checklist.
