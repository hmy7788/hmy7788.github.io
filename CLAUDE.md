# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

[Astro](https://astro.build) 기반 개인 포트폴리오 사이트다. GitHub Pages(`hmy7788.github.io`, 유저 페이지이므로 base path는 `/`)에 배포되며, 이력·경력·프로젝트를 소개하는 단일 페이지(single-page) 구조다. 원래는 Jekyll+Chirpy 테마로 운영되던 정처기 학습 블로그였으나 포트폴리오로 전환되었고, 기존 블로그 글은 `docs/`에 비공개 백업만 되어 있다(Astro 빌드 대상이 아님).

## 자주 쓰는 명령어

```bash
# 최초 1회: 의존성 설치
npm install

# 로컬 개발 서버 (기본 http://localhost:4321, 파일 저장 시 자동 반영)
npm run dev

# 프로덕션 빌드 → dist/
npm run build

# 빌드 결과물 로컬 미리보기
npm run preview
```

이 저장소에는 별도의 테스트 스위트가 없다. 변경 후 확인은 `npm run dev`로 렌더링을 직접 보거나 `npm run build`가 에러 없이 끝나는지로 한다.

CI(`.github/workflows/pages-deploy.yml`)는 `main`/`master`에 push되면 `withastro/action@v3`로 빌드하고 `actions/deploy-pages@v4`로 GitHub Pages에 배포한다.

## 코드 구조

- `src/pages/index.astro` — 페이지 전체를 구성하는 단일 진입점. `Layout` + 섹션 컴포넌트(`Hero`, `About`, `Resume`, `Projects`, `Footer`)를 순서대로 배치한다.
- `src/layouts/Layout.astro` — 공통 HTML shell, SEO 메타 태그, 상단 네비게이션, 전역 스타일 import.
- `src/components/` — 섹션별 프레젠테이션 컴포넌트. `Projects.astro`가 `src/data/projects.ts`를 순회하며 `ProjectCard.astro`를 렌더링하는 구조라, 프로젝트 카드의 레이아웃을 바꾸려면 `ProjectCard.astro` 하나만 고치면 된다.
- `src/data/profile.ts` — 이름/연락처/학력/자격증/수상/어학/About Me 텍스트. 이력 정보를 갱신할 때는 이 파일만 수정하면 된다.
- `src/data/projects.ts` — 프로젝트 목록(제목/기간/스택/요약/하이라이트/GitHub 링크/이미지). 새 프로젝트를 추가할 때는 이 배열에 객체를 추가하면 `Projects` 섹션에 자동으로 카드가 늘어난다.
- `src/styles/global.css` — 전역 스타일. CSS 변수로 라이트/다크(`prefers-color-scheme`) 팔레트를 나눠 관리한다.
- `public/images/` — 프로필 사진, 프로젝트 스크린샷 등 정적 이미지. `src/data/*.ts`에서는 `/images/...` 절대 경로로 참조한다.
- `public/.nojekyll` — GitHub Pages가 Astro의 `_astro/` 출력 폴더를 Jekyll 처리로 건드리지 않도록 하는 안전장치.
- `docs/` — 예전 Jekyll 블로그 글·이미지 백업. Astro는 `src/`와 `public/`만 빌드 대상으로 삼으므로 별도 exclude 설정 없이도 자동으로 배포에서 제외된다.

## 콘텐츠 수정 시 참고

- 프로필/이력 텍스트 수정 → `src/data/profile.ts`
- 프로젝트 추가/수정 → `src/data/projects.ts` (이미지 파일은 먼저 `public/images/`에 추가)
- 사이트 메타 정보(제목/설명/OG 이미지) → `src/pages/index.astro`의 `<Layout title=... description=...>` props와 `astro.config.mjs`의 `site` 값
