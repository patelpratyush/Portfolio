# Portfolio Redesign — Design Spec

Date: 2026-07-15

## Context

The existing Gatsby v3 site (navy/green theme) and all its source (`src/`, `content/`, `gatsby-*.js`, `package.json`) were deleted from this repo in commit `3820443` as an intentional clean slate for a full redesign. This spec defines the replacement: a from-scratch site combining the strongest patterns from two reference portfolios ([wendoj/developer-portfolio](https://github.com/wendoj/developer-portfolio) and [said7388/developer-portfolio](https://github.com/said7388/developer-portfolio)).

## Visual direction

- Ground: near-black `#08090c`, single accent color amber `#e8a03c`. No second accent hue.
- **Hero** uses a particle-canvas motif (canvas2d, lines connecting nearby points, amber-tinted, `prefers-reduced-motion`-aware) with an italic serif display headline and mono kicker/CTA labels.
- **Every other section** (About, Experience, Skills, Projects, Blog, Contact) uses a grid-field background motif (faint 48px grid, radial mask) with mono/terminal-style labels, kickers, and buttons — sharp corners, not rounded.
- Typography: a serif display face used only for the hero headline; a mono face for labels/kickers/data/buttons; a system sans for body copy. `text-wrap: balance` on headings, tabular-nums on any aligned digits (stats, dates).
- Motion: restrained framer-motion entrance (fade + 8px rise), no bounce/spring theatrics. `vanilla-tilt` on project cards only.
- Both the particle canvas and grid-field motif are decorative background layers — content must remain legible and unaffected if JS/canvas fails to load.

## Architecture

- **Next.js 14, App Router, JavaScript** (not TypeScript — matches the old codebase's style and keeps content-file conventions similar to before).
- **Tailwind CSS** + **shadcn/ui** primitives (button, card, carousel, form controls).
- **framer-motion** for scroll/entrance animation, **vanilla-tilt** for project card tilt.
- Deploy target: **Vercel** (change from the old GitHub Pages setup — required for the GitHub API build-time fetch and the contact form's server interaction to work smoothly).
- Routes: `/` (single-page sections), `/pensieve` (blog index), `/pensieve/[slug]` (post), `/pensieve/tags/[tag]` — mirrors the old site's blog structure.

## Page sections / components

1. **Hero** — particle canvas background, italic serif headline, mono kicker (`Software Engineer`), mono CTA buttons ("View work", "Resume").
2. **About** — short bio, stat row (years experience, technologies, etc. — mono numerals, tabular-nums), grid-field background.
3. **Experience** — timeline list sourced from `content/jobs/*.md`. Restore from the deleted commit as starting content:
   - Headstarter AI — Software Engineer Fellow, Jul–Sep 2024
   - Stevens Institute of Technology — Undergraduate/Graduate Research Assistant, Oct 2024–Present
4. **Skills** — icon grid, data-driven from `data/skills.js`.
5. **Projects** — two-tier:
   - **Featured** (curated, static `data/projects.js`): ported from the old `content/featured/*` entries — F1 Insight Hub, AI-Powered Portfolio Optimizer, Financeer, FlashGenie, ProfessAI, ResumeSharp (titles, descriptions, tech lists, links preserved as before).
   - **More projects** (GitHub API grid): fetched server-side at build time from the GitHub REST API (user repos, star-sorted), Next `fetch` cache with daily revalidation.
6. **Blog (`/pensieve`)** — local MDX posts in `content/posts/`, read via `fs` + `gray-matter` (no GraphQL layer). Same routes/tags structure as the old site.
7. **Contact** — form via **Formspree**, shadcn form controls, inline success/error state (no page reload), plus social links.
8. **Nav / Footer** — persistent, mono-labeled links, grid-field hairline border.

## Data & content flow

- Markdown/MDX content (`content/jobs/`, `content/posts/`) read at build time with `fs` + `gray-matter`; no Gatsby GraphQL layer.
- `data/projects.js` and `data/skills.js` are hand-maintained static arrays.
- GitHub repos for the "More projects" grid are fetched in a Server Component at build/request time via Next's `fetch` with daily revalidation (ISR-style).
- Contact form posts client-side directly to the Formspree endpoint.

## Error handling

- GitHub API fetch failure (rate limit, network) → the "More projects" grid is simply omitted; the curated Featured tier still renders. No broken loading state or thrown error.
- Missing/malformed frontmatter in a content file → build fails loudly, same as the old Gatsby setup. This is a content-authoring mistake, not a runtime concern.
- Formspree submission failure → inline error message in the form, user can retry without losing entered field values.

## Testing

- No automated test suite (matches the old repo, which had none — portfolio site, not worth the overhead).
- Manual verification per section in-browser: desktop + mobile viewport, and with `prefers-reduced-motion: reduce` toggled on to confirm the canvas/motion layers degrade to static content.

## Out of scope

- No CMS/admin UI — content stays file-based (MDX/data files) as before.
- No dev.to blog integration — blog stays local-MDX only.
- No auth, no database.
