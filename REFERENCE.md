# Design De-AI — Reference

## AI Pattern Catalog

### High Severity (즉시 교체)

| 패턴 | 감지 방법 | 이유 |
|------|-----------|------|
| Inter 폰트 | `font-family: 'Inter'`, `@import 'Inter'`, `font-inter` | 전체 웹의 기본값 |
| 보라 그래디언트 | `from-purple`, `from-violet`, `#7C3AED`, `#8B5CF6`, `linear-gradient.*purple` | AI 생성 사이트 95% 공통 |
| 3열 카드 그리드 | `grid-cols-3`, `repeat(3`, `.features .grid` | 예측 가능한 레이아웃 |
| 전체 hero 그래디언트 | `bg-gradient-to-r from-` + hero/hero-section | AI 기본 히어로 패턴 |

### Medium Severity (맥락 확인 후 교체)

| 패턴 | 감지 방법 | 이유 |
|------|-----------|------|
| 과도한 border-radius | `rounded-xl`, `rounded-2xl`, `border-radius: 16px+` on non-pill elements | 맥락 없는 부드러움 |
| shadow 남발 | `shadow-lg`, `shadow-xl` on every card | 깊이감 없는 장식 |
| Roboto/Open Sans | `font-family: 'Roboto'`, `'Open Sans'` | 무개성 |
| 파란 CTA | `bg-blue-500`, `bg-blue-600`, `#3B82F6` as primary action | 전형적 SaaS 기본값 |

### Low Severity (선택적 개선)

| 패턴 | 감지 방법 | 이유 |
|------|-----------|------|
| 01/02/03 번호 | CSS counter, `.step::before { content: "0" counter(...) }` | 순서 없는 내용에 사용 시 |
| 아이콘 그리드 섹션 | icon + title + description × 6 패턴 | 너무 흔한 features 섹션 |
| 기본 placeholder 텍스트 | "Lorem ipsum", "Your tagline here" | 브랜드 없음 |

---

## Font Recommendations

### 피해야 할 폰트
`Inter`, `Roboto`, `Open Sans`, `Lato`, `Nunito`, `Poppins`

### 대체 폰트 (Google Fonts)

| 느낌 | Display | Body |
|------|---------|------|
| 에디토리얼/고급 | Playfair Display | DM Sans |
| 스타트업/현대 | Clash Display | Satoshi |
| 기술/코드 감성 | Space Grotesk | IBM Plex Sans |
| 개성/브루탈 | Fraunces | Cabinet Grotesk |
| 미니멀/스위스 | Bricolage Grotesque | Source Sans 3 |
| 레트로/개성 | Newsreader | DM Serif Display |

**굵기 원칙:** 400(본문) ↔ 800/900(강조). 400 vs 600은 AI처럼 보임.
**크기 원칙:** 3배 이상 점프 (14px → 48px). 1.5배 점프는 밋밋함.

---

## Design System Template

```
[PROJECT NAME] Design System

COLOR
  --bg:       #______  (배경 — 흰색 그대로면 재고)
  --surface:  #______  (카드/패널)
  --primary:  #______  (주 액션 — 파랑/보라 금지)
  --accent:   #______  (강조 포인트 1개)
  --border:   #______  (구분선)
  --text:     #______  (본문)
  --muted:    #______  (보조 텍스트)

TYPE
  Display: [폰트명] — Google Fonts import 필수
  Body:    [폰트명]
  Scale:   48px / 32px / 20px / 16px / 13px

SHAPE
  Button:  border-radius: [X]px  (그래디언트 없음)
  Card:    border-radius: [X]px
  Input:   border-radius: [X]px
  Shadow:  [값 또는 "없음"]

ANTI-PATTERNS (이 프로젝트에서 절대 금지)
  - ___________
  - ___________
  - ___________
```

---

## Stack-Specific Fix Patterns

### HTML/CSS (Vanilla)

```css
/* 폰트 교체 — <head>에 Google Fonts link 추가 후 */
:root {
  --font-display: 'Playfair Display', serif;
  --font-body: 'DM Sans', sans-serif;
}

/* 기존 Inter import 제거 후 */
body { font-family: var(--font-body); }
h1, h2, h3 { font-family: var(--font-display); }
```

### Tailwind

`tailwind.config.js`에 theme extend 추가:
```js
theme: {
  extend: {
    fontFamily: {
      display: ['Playfair Display', 'serif'],
      body: ['DM Sans', 'sans-serif'],
    },
    colors: {
      primary: '#B84A2F',   // 보라 대신 프로젝트 색상
    },
    borderRadius: {
      DEFAULT: '4px',       // rounded-xl 남발 방지
    }
  }
}
```

컴포넌트에서 교체:
- `font-inter` → `font-body`
- `rounded-xl` → `rounded` (or 명시적 값)
- `from-purple-500` → 프로젝트 컬러
- `shadow-lg` → `shadow-sm` or 제거

### React/Next.js

1. `app/globals.css` 또는 `styles/globals.css` 에서 CSS 변수 교체
2. `next/font/google` 사용 시 `Inter` → 선택 폰트로 교체:
```ts
// app/layout.tsx
import { Playfair_Display, DM_Sans } from 'next/font/google'
const display = Playfair_Display({ subsets: ['latin'], variable: '--font-display' })
const body = DM_Sans({ subsets: ['latin'], variable: '--font-body' })
```
3. 컴포넌트는 `globals.css` 변수를 통해 자동 반영

---

## Self-Critique Checklist (Phase 2 완료 후)

- [ ] 이 디자인이 전혀 다른 업종 사이트에도 그대로 쓰일 수 있는가? → 그렇다면 재검토
- [ ] 폰트 조합이 Inter/Roboto 계열인가? → 교체
- [ ] 주색이 파랑 또는 보라 계열인가? → 교체 (맥락 없을 때)
- [ ] 카드마다 `shadow-lg` + `rounded-xl`인가? → 최소화
- [ ] Google Fonts `<link>` 태그가 실제로 존재하는가? → 없으면 추가
