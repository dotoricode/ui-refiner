# ui-refiner

Claude Code 스킬 — AI 기본값 웹 UI를 개성 있는 디자인으로 정제합니다.

코드베이스에서 AI 기본 패턴(Inter 폰트, 보라 그래디언트, 3열 카드 그리드, 과도한 border-radius)을 감지하고, 브라우저 스크린샷으로 실제 렌더링을 시각적으로 검수한 뒤, 프로젝트 전용 디자인 시스템을 생성하여 적용합니다. 필요하면 스택 마이그레이션까지 수행합니다.

## 정제 대상

- 일반 폰트 (Inter, Roboto, Open Sans) → 개성 있는 대체 폰트
- 보라/바이올렛 그래디언트 패턴 → 프로젝트 고유 색상
- 전체에 걸친 `rounded-xl` + `shadow-lg` 남발
- 예측 가능한 3열 features 그리드
- 전체 너비 hero 그래디언트 오버레이
- 🆕 모션 없음 또는 분산된 hover 효과 → 의도적 시퀀스
- 🆕 단색 배경만 → 레이어드 배경으로 대기감 추가

## 설치

```bash
cd ~/.claude/skills   # Windows: D:\.claude\skills
git clone https://github.com/dotoricode/ui-refiner
```

`.claude/settings.json`에 추가:

```json
{
  "skills": ["ui-refiner"]
}
```

## 사용법

다음과 같이 트리거합니다:

- `/ui-refiner`
- "디자인 점검해줘"
- "AI 티 나는 부분 고쳐줘"
- "웹사이트 디자인 개선해줘"
- "UI 검수해줘"

## 실행 단계

1. **Phase 0: 시각적 스냅샷** *(선택)* — MCP 스크린샷 도구로 현재 UI를 4개 차원(타이포·색상·모션·배경)에서 시각적으로 분석
2. **Phase 1: 감사** — AI 기본 패턴 코드 스캔 + 스택 제약 평가 (심각도별 보고)
3. **Phase 2: 기반 + 디자인 시스템** — 콘텐츠·청중 확립 후 5가지 디자인 원칙 적용, 프로젝트 전용 토큰 시스템 생성, 2-pass 자기 비판
4. **Phase 3: 스택 마이그레이션 + 적용** — 필요 시 스택 전환 후 섹션별 패턴 교체 (모션·배경 포함)
5. **Phase 4: 시각적 검증** *(선택)* — 수정 후 재스크린샷으로 4개 차원 개선 확인

## 지원 스택

- HTML + CSS (Vanilla)
- Tailwind CSS
- React / Next.js
- 스택 마이그레이션: Vanilla → Next.js + Tailwind, CRA/Vite → Next.js

## 기반

- [Frontend Design 스킬](https://github.com/anthropics/skills/tree/main/skills/frontend-design) — Anthropic
- [UI UX Pro Max 스킬](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) — nextlevelbuilder
- [프론트엔드 미학 프롬프팅](https://platform.claude.com/cookbook/coding-prompting-for-frontend-aesthetics) — Claude Cookbook

## 라이선스

MIT
