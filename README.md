# hmy7788.github.io

[Astro](https://astro.build)로 만든 개인 포트폴리오. GitHub Pages(`https://hmy7788.github.io`)에 배포된다.

## 개발

```bash
npm install       # 의존성 설치 (최초 1회)
npm run dev       # 로컬 개발 서버 (기본 http://localhost:4321)
npm run build     # 프로덕션 빌드 → dist/
npm run preview   # 빌드 결과물 로컬 미리보기
```

## 구조

- `src/pages/index.astro` — 단일 페이지 포트폴리오 (Hero/About/Resume/Projects/Contact)
- `src/components/` — 섹션별 컴포넌트
- `src/data/profile.ts`, `src/data/projects.ts` — 프로필/프로젝트 콘텐츠. 내용 수정은 여기서
- `public/images/` — 정적 이미지
- `docs/` — 예전 정처기 블로그 글 백업 (빌드에 포함되지 않음, 비공개)

## 배포

`main`에 push되면 `.github/workflows/pages-deploy.yml`이 Astro로 빌드하고 GitHub Pages에 자동 배포한다.
