# UI Refiner

> AI 티 나는 웹 UI를 개성 있는 디자인으로 정제하는 Claude Code 스킬

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
![Version](https://img.shields.io/badge/version-0.0.2-blue.svg)

코드베이스에서 AI 기본 패턴(Inter 폰트, 보라 그래디언트, 3열 카드 그리드, 과도한 border-radius)을 감지하고, **브라우저 스크린샷으로 실제 렌더링을 시각적으로 검수**한 뒤, 프로젝트 전용 디자인 시스템을 생성하여 적용합니다. 필요하면 스택 마이그레이션까지 수행합니다.

---

## 빠른 시작 (Claude Code 플러그인)

```
/plugin marketplace add dotoricode/ui-refiner
/plugin install ui-refiner
```

설치 후 아무 웹 프로젝트에서 트리거하세요:

```
/ui-refiner
디자인 점검해줘
AI 티 나는 부분 고쳐줘
```

### 수동 설치 (심볼릭 링크 없이)

```bash
cd ~/.claude/skills          # Windows: D:\.claude\skills
git clone https://github.com/dotoricode/ui-refiner
```

---

## 왜 이 스킬이 필요한가

### 문제: AI가 만든 웹은 다 똑같이 생겼다

Claude를 포함한 코딩 에이전트는 학습 데이터의 안전한 선택지로 **수렴**합니다. 그 결과가 소위 "AI slop" — Inter 폰트, 흰 배경 위 보라 그래디언트, 3열 카드, 모든 요소에 `rounded-xl` + `shadow-lg`. 기술적으로는 작동하지만 개성이 없습니다.

### 해결: 감지 → 시각 검수 → 디자인 원칙 → 적용

이 스킬은 단순히 패턴을 치환하는 게 아니라, **디자인 리드처럼 실제 화면을 보고 판단**합니다.

| 단계 | 하는 일 |
|------|---------|
| **Phase 0** · 시각적 스냅샷 | MCP 스크린샷으로 4개 차원(타이포·색상·모션·배경) 실제 렌더링 분석 *(선택)* |
| **Phase 1** · 감사 | AI 기본 패턴 코드 스캔 + 스택 제약 평가, 심각도별 보고 |
| **Phase 2** · 디자인 시스템 | 콘텐츠·청중 기반 확립 → 5가지 디자인 원칙 → 토큰 시스템 → 2-pass 자기 비판 |
| **Phase 3** · 적용 | 필요 시 스택 마이그레이션 후 섹션별 교체 (모션·배경 포함) |
| **Phase 4** · 시각적 검증 | 수정 후 재스크린샷으로 4개 차원 개선 확인 *(선택)* |

핵심은 **2-pass 자기 비판**입니다. 만든 디자인이 "다른 업종 사이트에도 그대로 쓰일 수 있는가?"를 먼저 묻고, 그다음 흔한 AI 기본값 3가지(크림+세리프+테라코타 / 검정+네온 / 3단 컬럼)와 대조해 걸러냅니다.

---

## 정제 대상

- 일반 폰트 (Inter, Roboto, Open Sans, **Space Grotesk** 2차 수렴) → 개성 있는 대체 폰트
- 보라/바이올렛 그래디언트 → 프로젝트 고유 색상
- 전체에 걸친 `rounded-xl` + `shadow-lg` 남발
- 예측 가능한 3열 features 그리드
- 모션 없음 또는 분산된 hover → 의도적 시퀀스
- 단색 배경만 → 레이어드 배경으로 대기감 추가

---

## 지원 스택

- HTML + CSS (Vanilla)
- Tailwind CSS
- React / Next.js
- 스택 마이그레이션: Vanilla → Next.js + Tailwind, CRA/Vite → Next.js, Tailwind v3 → v4

---

## 레포 구조

```
ui-refiner/
├── .claude-plugin/
│   ├── plugin.json          # 플러그인 정의
│   └── marketplace.json     # /plugin 설치용 마켓플레이스
├── skills/
│   └── ui-refiner/
│       ├── SKILL.md         # 스킬 본문 (5단계 워크플로우)
│       └── REFERENCE.md     # 패턴 카탈로그·폰트·마이그레이션 가이드
├── CHANGELOG.md
└── README.md
```

---

## 기반

- [Frontend Design 스킬](https://github.com/anthropics/skills/tree/main/skills/frontend-design) — Anthropic
- [UI UX Pro Max 스킬](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) — nextlevelbuilder
- [프론트엔드 미학 프롬프팅](https://platform.claude.com/cookbook/coding-prompting-for-frontend-aesthetics) — Claude Cookbook

---

## 라이선스

[MIT](LICENSE)
