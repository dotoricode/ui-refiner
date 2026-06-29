# UI Refiner Output Templates

Use these templates so every run leaves clear, comparable artifacts.

## Audit Report

```markdown
## UI Refiner Audit

Target: [project/path]
Mode: [code-only | screenshot-assisted]
Stack: [HTML/CSS | React | Next.js | Tailwind | shadcn | other]

### Scorecard

| Category | Score | Notes |
|---|---:|---|
| Typography | 0-3 | ... |
| Color | 0-3 | ... |
| Layout | 0-3 | ... |
| Shape/Elevation | 0-3 | ... |
| Motion | 0-3 | ... |
| Background | 0-3 | ... |
| Accessibility | 0-3 | ... |
| Stack Fit | 0-3 | ... |

### Findings

#### High
- [Finding] Evidence: [file/screenshot]. Impact: [why it matters]. Direction: [replacement].

#### Medium
- [Finding] Evidence: [file/screenshot]. Impact: [why it matters]. Direction: [replacement].

#### Low
- [Finding] Evidence: [file/screenshot]. Impact: [why it matters]. Direction: [replacement].

### Constraints
- [Stack/design constraint]

### Recommended Next Move
- [Smallest useful next step]
```

## Visual Snapshot

```markdown
## Visual Snapshot

Source: [screenshot path or browser target]
Viewport: [desktop/mobile dimensions]

| Dimension | Observation | Risk |
|---|---|---|
| Typography | ... | ... |
| Color | ... | ... |
| Motion | ... | ... |
| Background | ... | ... |
| Accessibility | ... | ... |

Code cross-check:
- [Finding that matches screenshot]
```

## Design System Proposal

```markdown
## [PROJECT NAME] Design System

### Direction
1. Hero statement: ...
2. Typography as personality: ...
3. Structure encodes meaning: ...
4. Motion with purpose: ...
5. Complexity matches vision: ...

### Tokens

COLOR
  --bg:       #______
  --surface:  #______
  --primary:  #______
  --accent:   #______
  --border:   #______
  --text:     #______
  --muted:    #______

TYPE
  Display: [font]
  Body:    [font]
  Scale:   [scale]

SHAPE
  Button:  [radius]
  Card:    [radius]
  Input:   [radius]
  Shadow:  [value]

MOTION
  Page load: [sequence]
  Hover:     [limited affordance]
  Reduced:   [fallback]

BACKGROUND
  Hero:    [signature treatment]
  Section: [rhythm]

ANTI-PATTERNS
  - [forbidden]
  - [forbidden]
  - [forbidden]

### Self-critique
- Different-industry reuse test: [pass/fail + reason]
- Warm cream/serif/terracotta default: [clear/risk]
- Near-black/neon default: [clear/risk]
- Broadsheet 3-column default: [clear/risk]
```

## Change Plan

```markdown
## UI Refinement Change Plan

### Keep
- [Existing design asset or behavior worth preserving]

### Change
- [Area] Remove [AI-default pattern] and replace with [specific design move].
- [Area] Update [token/component/section] to support [goal].

### Do Not Change
- [Interaction, state, route, copy, or component contract to preserve]

### Verification
- [Code check]
- [Visual check]
- [Accessibility/responsive check]
```

## Visual Verification Report

```markdown
## Visual Verification

Before: [screenshot/path or unavailable]
After: [screenshot/path or unavailable]

| Dimension | Result | Evidence |
|---|---|---|
| Typography | Improved / Same / Regressed | ... |
| Color | Improved / Same / Regressed | ... |
| Motion | Improved / Same / Regressed | ... |
| Background | Improved / Same / Regressed | ... |
| Responsive | Improved / Same / Regressed | ... |
| Accessibility | Improved / Same / Regressed | ... |

Remaining risk:
- [Risk or "None found in available checks"]
```

