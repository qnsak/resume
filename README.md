# Resume Site

Bilingual (中文 / English) personal resume site for Sak Qi Nian / Thomas Sak, built with Vite + React + Tailwind CSS and deployed to GitHub Pages.

**Live site:** https://qnsak.github.io/resume/

## Features

- Bilingual content (`#/zh`, `#/en`) with a hash-based router and language switcher
- Single source of truth for all resume copy in `src/data/resume.ts`
- Interactive "Overbooking Prevention Dashboard" (`#/{locale}/articles/oversell-ticketing`) — a React Flow swimlane diagram simulating Redis-based concurrency control (no lock / SETNX+TTL / Lua atomic lock) for a ticketing seat-reservation scenario
- Responsive layout with a fixed toolbar, section navigation, and highlight-on-scroll behavior

## Tech Stack

- [Vite](https://vitejs.dev/) + [React 19](https://react.dev/) + TypeScript
- [Tailwind CSS 4](https://tailwindcss.com/) (via `@tailwindcss/vite`)
- [@xyflow/react](https://reactflow.dev/) for the interactive architecture diagram
- [lucide-react](https://lucide.dev/) for icons

## Project Structure

```
src/
  App.tsx                        Page layout, routing, navigation, language switcher
  data/resume.ts                 All resume content and i18n data (EN/ZH)
  styles.css                     Tailwind layers and custom component classes
  components/
    oversell-dashboard/          Interactive Redis concurrency simulation dashboard
public/                          Static assets
dist/                            Build output (generated, not committed)
```

See [AGENTS.md](./AGENTS.md) for detailed contributor guidelines (coding style, commit conventions, testing checklist).

## Development

```bash
npm install     # install dependencies
npm run dev     # start local dev server
npm run build   # type-check and build for production
npm run preview # preview the production build locally
```

Equivalent `make` targets are available: `make install`, `make dev`, `make build`, `make preview`, `make clean`.

When testing UI changes, check both locales:

- http://localhost:5173/#/zh
- http://localhost:5173/#/en

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages via GitHub Actions. `vite.config.ts` automatically sets the correct base path (`/resume/`) when built inside the `resume` repository.
