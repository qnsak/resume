# Repository Guidelines

## Project Structure & Module Organization

This repository is a Vite + React resume site. Main source files live in `src/`:

- `src/App.tsx` renders the page layout, navigation, language switcher, and sections.
- `src/data/resume.ts` contains all resume content and i18n data for English and Chinese.
- `src/styles.css` defines Tailwind layers and custom component classes.
- `src/main.tsx` mounts the React app.

Static assets are stored in `public/`; generated production output goes to `dist/` and should be treated as build output.

## Build, Test, and Development Commands

Use npm scripts directly or the matching Makefile targets:

- `npm install` or `make install`: install dependencies.
- `npm run dev` or `make dev`: start the local Vite development server.
- `npm run build` or `make build`: run TypeScript build checks and create the production bundle.
- `npm run preview` or `make preview`: preview the production build locally.
- `make clean`: remove `dist/`.

There is currently no dedicated test script; use `npm run build` as the primary verification step before sharing changes.

## Coding Style & Naming Conventions

Use TypeScript and React functional components. Keep content data in `src/data/resume.ts` instead of hardcoding copy in components. Use `camelCase` for variables and object fields, `PascalCase` for React components and exported types, and descriptive CSS class names for component-level styles.

Indent with two spaces, follow the existing single-quote style, and keep JSX readable with small helper functions when needed. Prefer Tailwind utilities through `@apply` in `src/styles.css` for repeated visual patterns.

## Testing Guidelines

No automated test framework is configured yet. For UI changes, manually check both routes:

- `http://localhost:5173/#/zh`
- `http://localhost:5173/#/en`

Verify responsive behavior for desktop and mobile widths, especially the fixed toolbar, navigation menu, section scrolling, and language switching. Always run `npm run build` after code or content changes.

## Commit & Pull Request Guidelines

Use the Angular commit message convention:

```text
<type>(<scope>): <subject>
```

Use common types such as `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `build`, and `ci`. Keep the subject imperative, present tense, lowercase, and without a trailing period. Examples: `docs(agents): add contributor guide`, `feat(resume): add header tags`, `fix(nav): offset top anchor`.

Pull requests should include a concise summary, screenshots for visual changes, notes on affected languages, and the result of `npm run build`. Link related issues with footer text such as `Closes #123` when available.

## Agent-Specific Instructions

Do not edit generated files in `dist/` unless explicitly requested. Keep resume copy centralized in `src/data/resume.ts`, and avoid reintroducing removed sections unless the UI and navigation are updated together.
