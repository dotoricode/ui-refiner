# design-deai

A Claude Code skill that detects and automatically fixes AI-looking web design patterns.

Scans your codebase for generic AI defaults (Inter font, purple gradients, 3-column card grids, excessive border-radius), generates a project-specific design system, and applies the fixes across HTML/CSS, Tailwind, and React/Next.js files.

## What it fixes

- Generic fonts (Inter, Roboto, Open Sans) → distinctive alternatives
- Purple/violet gradient patterns → project-appropriate colors
- Blanket `rounded-xl` + `shadow-lg` on every card
- Predictable 3-column feature grids
- Full-width hero gradient overlays

## Installation

```bash
cd ~/.claude/skills   # or D:\.claude\skills on Windows
git clone https://github.com/dotoricode/design-deai
```

Then add to your `.claude/settings.json`:

```json
{
  "skills": ["design-deai"]
}
```

## Usage

In any project, trigger the skill by saying:

- `/design-deai`
- "디자인 점검해줘"
- "AI 티 나는 부분 고쳐줘"
- "웹사이트 디자인 개선해줘"

The skill runs in three phases:

1. **Scan** — finds AI-default patterns, grouped by severity (High / Medium / Low)
2. **Design System** — generates a project-specific token system (colors, fonts, spacing) and self-critiques before writing code
3. **Apply** — patches files stack by stack (HTML/CSS → Tailwind config → React globals)

## Stack support

- HTML + CSS (vanilla)
- Tailwind CSS
- React / Next.js

## Based on

- [Frontend Design skill](https://github.com/anthropics/skills/tree/main/skills/frontend-design) by Anthropic
- [UI UX Pro Max skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) by nextlevelbuilder
- [Prompting for frontend aesthetics](https://platform.claude.com/cookbook/coding-prompting-for-frontend-aesthetics) — Claude Cookbook

## License

MIT
