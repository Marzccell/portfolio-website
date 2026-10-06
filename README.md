# Marcell Matthew Loemanto — Portfolio

An English portfolio for an Informatics student at Petra Christian University, designed for internship and organizational opportunities. The site uses navy, ivory, and red, with an animated orbit, scroll-led storytelling, and a three-project showcase.

## Run locally

```sh
npm ci
npm run dev
```

Open the Local URL printed by Next.js, normally http://127.0.0.1:3000.

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

The main local workflow uses Next.js. The retained Sites integration is available separately through `npm run dev:sites` and `npm run build:sites`; it has not been deployed as part of this redesign.

## Edit content

- `src/data/portfolio-content.ts`: identity, project descriptions, public links, tools, and experience.
- `src/components/story/PortfolioStory.tsx`: page composition and project interface previews.
- `src/components/story/useStoryDirector.ts`: GSAP timelines and Lenis desktop scrolling.
- `src/app/globals.css`: visual design, local fonts, and responsive layouts.
- `src/app/layout.tsx`: title, description, favicon, and social sharing metadata.

Projects: Study Flow, The Last Archive, and Marflix. Marflix links to its repository until a live demo is available. Study Flow's interface preview uses illustrative data; The Last Archive and Marflix use artwork from their actual projects.

Mobile and short desktop viewports show all projects in natural page flow, with scroll reveals. The system reduced-motion preference and the footer's Pause motion control disable directed animation and leave every project accessible. No forced loader, scroll lock, or login is needed to browse this portfolio.

Only professional information is used in the page. Birth date, home address, and other personal details from the source CV are excluded. The prior React/Vite files remain in the repository as inactive legacy code; `src/app/page.tsx` is the active entry point.

## Add a project

1. Add a project entry to `selectedProjects` in `src/data/portfolio-content.ts` with its description, tools, repository URL, and optional live demo URL.
2. Put any new artwork in `public/projects/`. The current project previews are customized in `src/components/story/PortfolioStory.tsx`; update that component when adding a new preview.
3. Preview with `npm run dev`, then run `npm run lint`, `npm run typecheck`, and `npm run build` before publishing changes.

## Save updates to GitHub

From this project folder, review and publish each update:

```sh
git status
git diff
git add .
git commit -m "Add a new project to my portfolio"
git push
```

Use a commit message that describes your actual change. Dependencies, build output, local environment files, and generated site packages are ignored by Git. Keep credentials out of source files.

GitHub stores the source code and its history. Hosting the website requires a separate deployment, such as connecting this repository to Vercel. A connected hosting service can deploy future pushes automatically.
