# 변경 이력

이 프로젝트의 모든 주요 변경 사항을 기록합니다.
형식은 [Keep a Changelog](https://keepachangelog.com/ko/1.1.0/)를 따르며,
버전은 [유의적 버전](https://semver.org/lang/ko/)을 준수합니다.

## [0.0.3] - 2026-06-29

### 추가
- `AUDIT.md` 점수표와 심각도 기준 추가
  - AI 기본값 패턴, 스택 제약, 접근성/반응형/모션 검수 항목 포함
- `OUTPUTS.md` 출력 템플릿 추가
  - 감사 리포트, 시각 스냅샷, 디자인 시스템 제안, 변경 계획, 시각 검증 리포트
- 무의존 Node 스캐너 `scripts/audit-ui-patterns.mjs` 추가
  - Markdown 기본 출력, `--json` 구조화 출력 지원
  - `node_modules`, `.git`, 빌드 산출물, lockfile 제외

### 변경
- `SKILL.md`를 progressive disclosure 구조로 재정리
  - repo scan → optional screenshot → audit → output report → design system → approved apply → visual verify 흐름 고정
- `REFERENCE.md`에 목차를 추가하고 패턴 카탈로그를 `Detect / Why / Replace with / Verify` 형식으로 표준화
- README를 v0.0.3 워크플로우와 스캐너 사용법 기준으로 갱신
- Claude Code 플러그인 버전을 `0.0.3`으로 갱신

## [0.0.2] - 2026-06-26

### 추가
- Claude Code 플러그인 설치 지원 (`.claude-plugin/plugin.json`, `marketplace.json`)
  - `/plugin marketplace add dotoricode/ui-refiner`로 설치 가능
- `CHANGELOG.md` 변경 이력 문서

### 변경
- 프로젝트 구조를 `skills/ui-refiner/` 하위로 재편 (mattpocock/skills 구조 참고)
  - `SKILL.md`, `REFERENCE.md`를 `skills/ui-refiner/`로 이동 (git 이력 보존)
- `README.md`를 빠른 시작 → 문제/해결 서사 → 레포 구조 형식으로 개선

## [0.0.1] - 2026-06-26

### 추가
- 시각적 검수 워크플로우 (Phase 0 스냅샷, Phase 4 시각적 검증)
- 모션·배경 차원 패턴 카탈로그
- 스택 마이그레이션 가이드 (Vanilla → Next.js 등)
- 5가지 디자인 원칙 + 2-pass 자기 비판 게이트

### 변경
- 3단계(Scan/Design/Apply) → 5단계 워크플로우로 확장
- `SKILL.md`를 영어로 작성 (한국어 트리거 키워드 유지)

[0.0.3]: https://github.com/dotoricode/ui-refiner/compare/v0.0.2...v0.0.3
[0.0.2]: https://github.com/dotoricode/ui-refiner/compare/v0.0.1...v0.0.2
[0.0.1]: https://github.com/dotoricode/ui-refiner/releases/tag/v0.0.1
