# FitLog

FitLog is a focused workout library and daily training log. Browse strength exercises, inspect setup and coaching cues, build a five-lift plan, and keep a personal saved list.

## Technologies

- Next.js 15 App Router
- React 19
- CSS, with responsive layouts and reduced-motion support
- FitLog exercise API, with the documented alternative API as a fallback
- Browser localStorage for today's plan and saved workouts

## Features

- Responsive workout library with search and duration, calorie, or rating sorting
- Exercise detail pages with equipment, difficulty, training volume, and instructions
- Daily plan capped at five lifts, with live exercise, time, and calorie totals
- Saved workouts, completion status, removal actions, and toast feedback
- Persistent plan and saved lists across browser reloads
- Loading, empty, error, and invalid-route states

## Run locally

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app uses the FitLog API listed in the parent project README. No image-host configuration is required because workout photos are rendered as regular image elements.

## GitHub Pages deployment

```bash
npm ci
NEXT_PUBLIC_BASE_PATH=/fitlog-website npm run build
```

The repository includes a GitHub Actions workflow at `.github/workflows/deploy.yml`. Push to `main` (or run the workflow manually) to export the static site and deploy it to GitHub Pages. The workflow prefixes app routes and local assets for `https://ratul-dev-28.github.io/fitlog-website/`.

In the GitHub repository, set **Settings → Pages → Build and deployment → Source** to **GitHub Actions**. Workout details are exported as static routes for all 12 API entries; unknown routes use the generated 404 page.