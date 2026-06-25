# 디자인 탈AI — 레퍼런스

## AI 패턴 카탈로그

### 높음 (즉시 교체)

| 패턴 | 감지 방법 | 이유 |
|------|-----------|------|
| Inter 폰트 | `font-family: 'Inter'`, `@import 'Inter'`, `font-inter` | 전체 웹의 기본값 |
| 보라 그래디언트 | `from-purple`, `from-violet`, `#7C3AED`, `#8B5CF6`, `linear-gradient.*purple` | AI 생성 사이트 95% 공통 |
| 3열 카드 그리드 | `grid-cols-3`, `repeat(3`, `.features .grid` | 예측 가능한 레이아웃 |
| 전체 hero 그래디언트 | `bg-gradient-to-r from-` + hero/hero-section | AI 기본 히어로 패턴 |

### 보통 (맥락 확인 후 교체)

| 패턴 | 감지 방법 | 이유 |
|------|-----------|------|
| 과도한 border-radius | `rounded-xl`, `rounded-2xl`, `border-radius: 16px+` on non-pill elements | 맥락 없는 부드러움 |
| shadow 남발 | `shadow-lg`, `shadow-xl` on every card | 깊이감 없는 장식 |
| Roboto/Open Sans | `font-family: 'Roboto'`, `'Open Sans'` | 무개성 |
| 파란 CTA | `bg-blue-500`, `bg-blue-600`, `#3B82F6` as primary action | 전형적 SaaS 기본값 |
| 분산된 hover 효과 | 모든 카드에 동일한 `hover:scale-105`, `hover:shadow-lg` | 조율 없는 모션 |
| 단색 섹션 배경 | `bg-white`, `bg-gray-50`, `bg-gray-100` 전체 페이지 동일 | 깊이감·대기감 없음 |

### 낮음 (선택적 개선)

| 패턴 | 감지 방법 | 이유 |
|------|-----------|------|
| 01/02/03 번호 | CSS counter, `.step::before { content: "0" counter(...) }` | 순서 없는 내용에 사용 시 |
| 아이콘 그리드 섹션 | icon + title + description × 6 패턴 | 너무 흔한 features 섹션 |
| Space Grotesk | `font-family: 'Space Grotesk'` | Inter의 2차 수렴 대안 — 역시 과용됨 |
| 기본 placeholder 텍스트 | "Lorem ipsum", "Your tagline here" | 브랜드 없음 |

---

## 🆕 모션 차원 패턴

### 없음 (추가 필요)

| 상황 | 신호 | 처방 |
|------|------|------|
| 애니메이션 전무 | `animation`, `transition`, `@keyframes` 없음 | 페이지 로드 스태거드 리빌 1세트 추가 |
| React인데 라이브러리 없음 | framer-motion/motion 없음 | Motion 라이브러리 설치 고려 |

### 과잉 (정리 필요)

| 패턴 | 감지 방법 | 처방 |
|------|-----------|------|
| 전체 hover 동일 | 모든 `.card`, `.feature`에 `hover:scale-105` | 주요 CTA와 카드 1종에만 한정 |
| 페이지 요소 전체 fade-in | 모든 섹션에 `animate-fade-in` | hero 진입부 1개 시퀀스로 통합 |

### 권장 모션 패턴

```css
/* 페이지 로드 스태거드 리빌 */
.hero-title   { animation: reveal 0.6s ease both; }
.hero-sub     { animation: reveal 0.6s 0.1s ease both; }
.hero-cta     { animation: reveal 0.6s 0.2s ease both; }

@keyframes reveal {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

---

## 🆕 배경 차원 패턴

### 단색 기본값 (교체 필요)

| 패턴 | 신호 | 처방 |
|------|------|------|
| 흰 배경만 | `bg-white` 또는 `background: #fff` 전체 | CSS 레이어드 그래디언트 추가 |
| 회색 구분 | `bg-gray-50`, `bg-gray-100`만으로 섹션 구분 | 색조 배경 또는 패턴 적용 |
| 배경 없는 hero | hero에 그래디언트/이미지 없이 단색만 | 맥락에 맞는 효과 추가 |

### 권장 배경 패턴

```css
/* 미묘한 dot grid — 기술 사이트 */
.hero {
  background-image: radial-gradient(circle, #e2e8f0 1px, transparent 1px);
  background-size: 24px 24px;
}

/* 레이어드 그래디언트 */
.hero {
  background:
    radial-gradient(ellipse 80% 60% at 50% -10%, rgba(120,40,200,0.08), transparent),
    #0f0f0f;
}

/* 대각선 스트라이프 — 개성 있는 accent 섹션 */
.cta-section {
  background: repeating-linear-gradient(
    -45deg, transparent, transparent 10px,
    rgba(0,0,0,0.03) 10px, rgba(0,0,0,0.03) 20px
  );
}
```

---

## 폰트 추천

### 피해야 할 폰트
`Inter`, `Roboto`, `Open Sans`, `Lato`, `Nunito`, `Poppins`, **`Space Grotesk`** (2차 수렴)

### 대체 폰트 (Google Fonts)

| 느낌 | Display | Body |
|------|---------|------|
| 에디토리얼/고급 | Playfair Display | DM Sans |
| 스타트업/현대 | Clash Display | Satoshi |
| 기술/코드 감성 | Space Grotesk→ **IBM Plex Mono** | IBM Plex Sans |
| 개성/브루탈 | Fraunces | Cabinet Grotesk |
| 미니멀/스위스 | Bricolage Grotesque | Source Sans 3 |
| 레트로/개성 | Newsreader | DM Serif Display |
| 따뜻한/유기적 | Crimson Pro | Nunito Sans |
| 과감/엣지 | Obviously | Syne |

**굵기 원칙:** 400(본문) ↔ 800/900(강조). 400 vs 600은 AI처럼 보임.
**크기 원칙:** 3배 이상 점프 (14px → 48px). 1.5배 점프는 밋밋함.

### 🆕 문화적 미학 참조

AI 기본값을 피하는 또 다른 방법: 특정 문화·분야의 감성을 영감으로 삼는다.

| 참조 | 특징 | 폰트 힌트 |
|------|------|-----------|
| IDE 테마 (VS Code Catppuccin) | 보랏빛 계열 이지만 체계적, 코드 감성 | Fira Code + IBM Plex Sans |
| 일본 잡지 편집 | 압도적 타이포, 여백 극단 | Shippori Mincho + Noto Sans |
| 90년대 레이브 포스터 | 네온, 비트맵, 혼돈의 에너지 | VT323 + Space Mono |
| 스위스 그래픽 디자인 | 그리드, 레드+블랙, 중립 서체 | Neue Haas Grotesk → Barlow |
| 럭셔리 브랜드 | 많은 여백, 얇은 세리프, 금 accent | Cormorant + Raleway |

---

## 디자인 시스템 템플릿

```
[프로젝트명] 디자인 시스템

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

MOTION
  Page load: staggered reveal — [대상 요소], [X]ms 간격
  Hover:     [효과] — [적용 위치]
  금지:      ___________

BACKGROUND
  Hero:    [설명]
  Section: [구분 방식]

ANTI-PATTERNS (이 프로젝트에서 절대 금지)
  - ___________
  - ___________
  - ___________
```

---

## 스택별 수정 패턴

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
    },
    animation: {
      'reveal': 'reveal 0.6s ease both',
    },
    keyframes: {
      reveal: {
        from: { opacity: '0', transform: 'translateY(16px)' },
        to: { opacity: '1', transform: 'translateY(0)' },
      }
    }
  }
}
```

컴포넌트에서 교체:
- `font-inter` → `font-body`
- `rounded-xl` → `rounded` (or 명시적 값)
- `from-purple-500` → 프로젝트 컬러
- `shadow-lg` on every card → `shadow-sm` or 제거

### React/Next.js

1. `app/globals.css` 또는 `styles/globals.css`에서 CSS 변수 교체
2. `next/font/google` 사용 시 `Inter` → 선택 폰트로 교체:
```ts
// app/layout.tsx
import { Playfair_Display, DM_Sans } from 'next/font/google'
const display = Playfair_Display({ subsets: ['latin'], variable: '--font-display' })
const body = DM_Sans({ subsets: ['latin'], variable: '--font-body' })
```
3. 컴포넌트는 `globals.css` 변수를 통해 자동 반영
4. Motion 라이브러리 설치: `npm install motion`

---

## 🆕 스택 마이그레이션 가이드

### Vanilla HTML/CSS → Next.js + Tailwind

제약 조건: `next/font` 불가, Motion 라이브러리 불가, 파일 구조 분산됨

마이그레이션 체크리스트:
- [ ] `npx create-next-app@latest --tailwind` 프로젝트 생성
- [ ] 기존 HTML 구조 → `app/page.tsx` 컴포넌트화
- [ ] CSS → `tailwind.config.js` + `globals.css` 커스텀 속성
- [ ] `<link>` 폰트 → `next/font/google` 교체
- [ ] 이미지 `<img>` → `next/image` (`Image` 컴포넌트)
- [ ] 모션 적용: `motion` 패키지 설치 후 `<motion.div>`

### React (CRA/Vite) → Next.js

제약 조건: SSR 없음, `next/font` 불가, 라우팅 다름

마이그레이션 체크리스트:
- [ ] `pages/` 또는 `app/` 디렉토리 구조로 재편
- [ ] `react-router-dom` → Next.js `Link` 컴포넌트
- [ ] `public/` 정적 파일 그대로 이전
- [ ] `next/font/google` 폰트 적용
- [ ] `next.config.js` 설정

### Tailwind v3 → Tailwind v4

변경 사항: CSS-first 설정, `@import "tailwindcss"`, JIT 기본값

마이그레이션 체크리스트:
- [ ] `tailwind.config.js` → CSS `@theme` 변수로 이전
- [ ] 사라진 유틸리티 클래스 확인 (`bg-opacity-*` → `bg-black/50`)
- [ ] `@apply` 사용 최소화 (v4 권장하지 않음)

---

## 자기 비판 체크리스트 (Phase 2 완료 후)

**1차 비판**
- [ ] 이 디자인이 전혀 다른 업종 사이트에도 그대로 쓰일 수 있는가? → 그렇다면 재검토
- [ ] 폰트 조합이 Inter/Roboto/Space Grotesk 계열인가? → 교체
- [ ] 주색이 파랑 또는 보라 계열인가? → 교체 (맥락 없을 때)

**2차 비판 — AI 기본값 3가지 대비**
- [ ] warm cream + 세리프 + 테라코타 배색에 해당하는가? → 교체
- [ ] near-black 배경 + 형광 포인트 조합인가? → 교체
- [ ] broadsheet 3단 컬럼 레이아웃인가? → 교체

**마무리 체크**
- [ ] 카드마다 `shadow-lg` + `rounded-xl`인가? → 최소화
- [ ] Google Fonts `<link>` 태그 또는 `next/font` 설정이 실제로 존재하는가? → 없으면 추가
- [ ] 모든 섹션 배경이 동일한 단색인가? → 레이어드 배경 추가
- [ ] 모션이 없거나 전부 동일한 hover인가? → 로드 시퀀스 1개 추가
- [ ] "진짜 심미적 위험" 요소가 있는가? → 없으면 하나 추가
