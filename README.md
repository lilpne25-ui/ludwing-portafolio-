# Ludwing Valdés Reyes · Portfolio

Personal portfolio of Ludwing Valdés Reyes, software engineer focused on backend, enterprise systems, databases and integrations.

- English (default): `/en`
- Español: `/es`
- Printable resume: `/en/resume`, `/es/resume` (PDFs in `public/resume/`)

## Stack

- Next.js 16 (App Router, static generation) with TypeScript in strict mode
- Tailwind CSS 4 for the token layer, hand-written CSS for components (`src/styles/site.css`)
- No animation library: scroll reveals use `IntersectionObserver` and CSS transitions, and everything respects `prefers-reduced-motion`
- Fonts self-hosted at build time through `next/font` (Geist, Geist Mono)

## Content

All copy lives in two JSON files, so experience and projects can be edited without touching components:

```
src/content/en.json   # English, source of truth for the shape
src/content/es.json   # Spanish, type-checked against en.json
```

Case studies use abstracted, fictional data. Do not add client names, real endpoints, internal diagrams or private code.

Contact settings (GitHub URL, optional public email) are in `src/lib/site.ts`. The email is `null` until a public address is confirmed.

## Develop

```bash
npm install
npm run dev          # http://localhost:3000 → redirects to /en
npm run check        # typecheck + lint + production build
```

## Regenerate the resume PDFs

The PDFs are rendered from the `/[lang]/resume` pages:

```bash
npm run build && npm run start          # terminal 1
CHROMIUM_PATH="/path/to/chrome" npm run resume:pdf   # terminal 2
```

## Deploy (Vercel)

1. Import the repository in Vercel (framework preset: Next.js, no build overrides needed).
2. Optional: set `NEXT_PUBLIC_SITE_URL` to the final domain. It is public and non-secret; without it the production Vercel URL is used for canonical links, sitemap and Open Graph.
3. No other environment variables are required. Never add secrets to this project.

Security headers (CSP, frame denial, referrer and permissions policy, HSTS) are set in `next.config.ts`.

## License

Code: MIT. Written content, resume and case studies: © Ludwing Valdés Reyes, all rights reserved.
