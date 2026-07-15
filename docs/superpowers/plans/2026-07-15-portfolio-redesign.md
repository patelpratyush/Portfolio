# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild patelpratyush.github.io from scratch as a Next.js 14 App Router site with a particle-canvas hero, grid-field/mono motif elsewhere, hybrid (curated + GitHub API) projects section, local-MDX blog, and Formspree contact form.

**Architecture:** Next.js 14 App Router, JavaScript (no TS), Tailwind CSS + shadcn/ui, framer-motion + vanilla-tilt for motion, MDX content read via `fs`/`gray-matter` at build time, GitHub REST API fetched server-side with daily revalidation, deployed to Vercel.

**Tech Stack:** next@14, react@18, tailwindcss@3, shadcn/ui (button, card, carousel, input, textarea, form), framer-motion, vanilla-tilt, gray-matter, next-mdx-remote, lucide-react.

## Global Constraints

- No TypeScript — JavaScript (`.js`/`.jsx`) throughout, per spec.
- Single accent color `#e8a03c` (amber). No second accent hue anywhere.
- Ground color `#08090c`. Grid-field motif: 48px grid, `rgba(255,255,255,0.035)` lines, radial mask.
- Hero uses particle-canvas motif (amber-tinted); all other sections use grid-field + mono-label motif.
- Fonts: serif display face for hero headline only, mono face for labels/kickers/data/buttons, system sans for body copy.
- All decorative canvas/motion layers must respect `prefers-reduced-motion: reduce` and degrade to static content if JS fails.
- No automated test suite — verification is manual dev-server checks (desktop + mobile viewport + reduced-motion toggle) per spec.
- Deploy target: Vercel (not GitHub Pages).

---

## File Structure

```
package.json
next.config.js
tailwind.config.js
jsconfig.json                    # @/ path alias
app/
  layout.js                      # root layout, fonts, Nav+Footer wrapper
  page.js                        # composes all homepage sections
  globals.css                    # Tailwind directives + CSS custom properties (tokens)
  pensieve/
    page.js                      # blog index
    [slug]/page.js                # single post
    tags/[tag]/page.js            # tag listing
components/
  nav.jsx
  footer.jsx
  ui/                             # shadcn-generated primitives (button, card, carousel, input, textarea, form)
  hero/
    hero.jsx
    particle-canvas.jsx
  grid-field.jsx                  # shared decorative bg used by non-hero sections
  about.jsx
  experience.jsx
  skills.jsx
  projects/
    featured-projects.jsx
    more-projects.jsx
  blog-preview.jsx                # homepage teaser list, links to /pensieve
  contact.jsx
lib/
  content.js                      # fs + gray-matter readers for jobs/posts
  github.js                       # GitHub API fetch + shape helper
data/
  projects.js                     # curated featured projects array
  skills.js                       # skills array
content/
  jobs/
    headstarter.md
    stevens-research.md
  posts/
    <ported from old content/posts/*>
public/
  fonts/                          # self-hosted serif + mono woff2 (or use next/font/google)
```

---

## Task 1: Scaffold Next.js project + Tailwind + base tokens

**Files:**
- Create: `package.json`, `next.config.js`, `tailwind.config.js`, `postcss.config.js`, `jsconfig.json`, `.gitignore` (site-specific additions), `app/layout.js`, `app/page.js`, `app/globals.css`

**Interfaces:**
- Produces: CSS custom properties on `:root` consumed by every later component — `--bg: #08090c`, `--accent: #e8a03c`, `--ink: #eef1f5`, `--ink-dim: #8b93a3`, `--line: rgba(255,255,255,0.08)`, `--font-serif` (CSS var from `next/font`), `--font-mono` (CSS var from `next/font`), `--font-sans` (CSS var from `next/font`).
- Produces: `app/page.js` renders `<main>Portfolio</main>` placeholder — later tasks replace this with real sections.

- [ ] **Step 1: Init Next.js app**

```bash
cd /Users/pratyush/patelpratyush.github.io
npx create-next-app@14 . --js --tailwind --eslint --app --no-src-dir --import-alias "@/*" --use-npm
```

When prompted about the directory not being empty, confirm to proceed (only `docs/` and dotfiles exist).

- [ ] **Step 2: Set base design tokens in `app/globals.css`**

Replace the generated Tailwind boilerplate body with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg: #08090c;
  --bg-raised: #0c0e12;
  --line: rgba(255, 255, 255, 0.08);
  --ink: #eef1f5;
  --ink-dim: #8b93a3;
  --accent: #e8a03c;
  --accent-ink: #1a1204;
}

body {
  background: var(--bg);
  color: var(--ink);
  font-family: var(--font-sans);
}

.font-serif-display {
  font-family: var(--font-serif);
}

.font-mono-label {
  font-family: var(--font-mono);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
```

- [ ] **Step 3: Wire fonts in `app/layout.js`**

```javascript
import { Instrument_Serif, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic", "normal"],
  variable: "--font-serif",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Pratyush Patel",
  description: "Software engineer — backend systems and applied ML.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${serif.variable} ${mono.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 4: Placeholder homepage**

```javascript
// app/page.js
export default function Home() {
  return <main className="min-h-screen">Portfolio</main>;
}
```

- [ ] **Step 5: Verify dev server renders**

Run: `npm run dev`
Open `http://localhost:3000` — expect a near-black page with the text "Portfolio". Stop the server (Ctrl+C) once confirmed.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Scaffold Next.js 14 app with Tailwind and base design tokens"
```

---

## Task 2: shadcn/ui setup + Nav/Footer

**Files:**
- Create: `components.json` (via shadcn CLI), `components/ui/button.jsx`, `components/ui/card.jsx` (via shadcn CLI)
- Create: `components/nav.jsx`, `components/footer.jsx`
- Modify: `app/layout.js` (wrap children with Nav/Footer)

**Interfaces:**
- Consumes: `--accent`, `--line`, `.font-mono-label` from Task 1.
- Produces: `Nav` and `Footer` components with no props, imported directly in `app/layout.js`.

- [ ] **Step 1: Init shadcn/ui**

```bash
npx shadcn@latest init -d
npx shadcn@latest add button card
```

- [ ] **Step 2: Write `components/nav.jsx`**

```javascript
import Link from "next/link";

const links = [
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "/pensieve", label: "Writing" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--bg)]/90 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-mono-label text-sm text-[var(--ink)]">
          Pratyush Patel
        </Link>
        <ul className="flex gap-6">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-mono-label text-xs text-[var(--ink-dim)] transition-colors hover:text-[var(--accent)]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
```

- [ ] **Step 3: Write `components/footer.jsx`**

```javascript
export function Footer() {
  return (
    <footer className="border-t border-[var(--line)] px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 sm:flex-row sm:justify-between">
        <span className="font-mono-label text-xs text-[var(--ink-dim)]">
          © {new Date().getFullYear()} Pratyush Patel
        </span>
        <a
          href="https://github.com/patelpratyush"
          className="font-mono-label text-xs text-[var(--ink-dim)] hover:text-[var(--accent)]"
        >
          github.com/patelpratyush
        </a>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Wrap layout with Nav/Footer**

```javascript
// app/layout.js — replace the <body> line
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
```

```javascript
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
```

- [ ] **Step 5: Verify**

Run: `npm run dev`
Open `http://localhost:3000` — expect sticky mono-label nav at top, footer at bottom, both amber on hover/links.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Add shadcn/ui setup and Nav/Footer components"
```

---

## Task 3: Hero with particle canvas

**Files:**
- Create: `components/hero/particle-canvas.jsx`, `components/hero/hero.jsx`
- Modify: `app/page.js` (render `<Hero />` first)

**Interfaces:**
- Produces: `Hero` component, no props, default export not used — named export `Hero`, imported as `import { Hero } from "@/components/hero/hero"`.
- Produces: `ParticleCanvas` component, no props, renders a `<canvas>` filling its parent; internal-only, not imported elsewhere.

- [ ] **Step 1: Write `components/hero/particle-canvas.jsx`**

```javascript
"use client";

import { useEffect, useRef } from "react";

export function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function resize() {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
    }
    resize();
    window.addEventListener("resize", resize);

    const N = 70;
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }));

    let raf;
    function frame() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      }
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.hypot(dx, dy);
          if (d < 140 * devicePixelRatio) {
            ctx.strokeStyle = `rgba(232, 160, 60, ${0.18 * (1 - d / (140 * devicePixelRatio))})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
        ctx.fillStyle = "rgba(232, 160, 60, 0.7)";
        ctx.beginPath();
        ctx.arc(pts[i].x, pts[i].y, 1.6 * devicePixelRatio, 0, 7);
        ctx.fill();
      }
      if (!reduceMotion) raf = requestAnimationFrame(frame);
    }
    frame();

    return () => {
      window.removeEventListener("resize", resize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-90" />;
}
```

- [ ] **Step 2: Write `components/hero/hero.jsx`**

```javascript
import { ParticleCanvas } from "./particle-canvas";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--bg)] px-6 py-24 sm:py-32">
      <ParticleCanvas />
      <div className="relative mx-auto max-w-3xl">
        <span className="font-mono-label text-xs text-[var(--accent)]">
          Software Engineer
        </span>
        <h1 className="font-serif-display mt-4 text-5xl italic leading-[1.08] text-[var(--ink)] text-balance sm:text-6xl">
          I turn ambiguous problems into working software.
        </h1>
        <p className="mt-5 max-w-[44ch] text-[15px] leading-relaxed text-[var(--ink-dim)]">
          Full-stack engineer focused on ML-backed products — from research
          prototypes at Headstarter to production APIs and infrastructure
          verification systems.
        </p>
        <div className="mt-8 flex items-center gap-5">
          <a
            href="#projects"
            className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--accent-ink)]"
          >
            See projects
          </a>
          <a
            href="#contact"
            className="border-b border-[var(--ink-dim)] pb-0.5 text-sm text-[var(--ink)]"
          >
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Render in `app/page.js`**

```javascript
import { Hero } from "@/components/hero/hero";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
    </main>
  );
}
```

- [ ] **Step 4: Verify**

Run: `npm run dev`
Open `http://localhost:3000` — expect amber particle field animating behind the italic headline. In Chrome DevTools, enable "Emulate CSS media feature prefers-reduced-motion: reduce" and confirm the canvas stops animating (particles freeze, no console errors).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Add Hero section with particle-canvas motif"
```

---

## Task 4: Grid-field motif + About section

**Files:**
- Create: `components/grid-field.jsx`, `components/about.jsx`
- Modify: `app/page.js` (render `<About />` after `<Hero />`)

**Interfaces:**
- Produces: `GridField` component, no props, absolutely-positioned `<div>` meant to be a sibling inside a `position: relative` parent. Named export, imported by every non-hero section task from here on (`import { GridField } from "@/components/grid-field"`).
- Produces: `About` component, no props, named export.

- [ ] **Step 1: Write `components/grid-field.jsx`**

```javascript
export function GridField() {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        maskImage:
          "radial-gradient(ellipse 70% 60% at 30% 40%, black, transparent)",
        WebkitMaskImage:
          "radial-gradient(ellipse 70% 60% at 30% 40%, black, transparent)",
      }}
    />
  );
}
```

- [ ] **Step 2: Write `components/about.jsx`**

```javascript
import { GridField } from "./grid-field";

const stats = [
  { label: "Years of experience", value: "3+" },
  { label: "Production ML systems shipped", value: "6" },
  { label: "AWS roles verified", value: "300+" },
];

export function About() {
  return (
    <section className="relative overflow-hidden px-6 py-20">
      <GridField />
      <div className="relative mx-auto max-w-3xl">
        <span className="font-mono-label text-xs text-[var(--accent)]">About</span>
        <p className="mt-4 max-w-[62ch] text-[15px] leading-relaxed text-[var(--ink-dim)]">
          I'm a software engineer working across backend systems, applied ML,
          and cloud infrastructure. Most recently I built AI SaaS backends at
          Headstarter and a verification framework for AWS IAM policies at
          Stevens Institute of Technology.
        </p>
        <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-[var(--line)] pt-6">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="font-mono-label text-[11px] text-[var(--ink-dim)]">
                {stat.label}
              </dt>
              <dd className="font-mono-label mt-1 text-2xl tabular-nums text-[var(--ink)]">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Render in `app/page.js`**

```javascript
import { About } from "@/components/about";
```

```javascript
      <Hero />
      <About />
```

- [ ] **Step 4: Verify**

Run: `npm run dev` — confirm faint grid background behind About text, stat row aligned with tabular numerals.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Add GridField motif and About section"
```

---

## Task 5: Content lib + Experience section

**Files:**
- Create: `lib/content.js`
- Create: `content/jobs/headstarter.md`, `content/jobs/stevens-research.md`
- Create: `components/experience.jsx`
- Modify: `app/page.js` (render `<Experience />` with `id="experience"`)

**Interfaces:**
- Produces: `getJobs()` from `lib/content.js` — async function, returns `Array<{ slug, title, company, location, range, url, highlights: string[] }>`, sorted by frontmatter `date` descending. Consumed by `components/experience.jsx` and by no other task.

- [ ] **Step 1: Write job content files**

```markdown
<!-- content/jobs/headstarter.md -->
---
date: "2024-07-01"
title: "Software Engineer Fellow"
company: "Headstarter AI"
location: "Remote"
range: "Jul 2024 – Sep 2024"
url: "https://headstarter.co/"
---

- Dockerized CI/CD pipelines with GitHub Actions and deployed scalable backend systems to AWS/GCP for 3 AI SaaS apps
- Integrated Stripe billing, JWT-based auth, and production-grade APIs using FastAPI, Express.js
- Developed NLP-driven professor review search tool, analyzing 100K+ records with 30% improved query precision
```

```markdown
<!-- content/jobs/stevens-research.md -->
---
date: "2024-10-01"
title: "Undergraduate/Graduate Research Assistant"
company: "Stevens Institute of Technology"
location: "Hoboken, NJ"
range: "Oct 2024 – Present"
url: "https://www.stevens.edu/"
---

- Built verification framework for 300+ AWS IAM roles, KMS policies, and VPC security groups using Python, Terraform, AWS SDKs, reducing misconfigurations by 40%
- Automated policy checks for cloud access control, improving detection accuracy to 83.8% and reducing audit time by 70%
- Contributed to secure infrastructure verification system; co-authored paper accepted to NLBSE'25 on IAM synthesis via LLMs
```

- [ ] **Step 2: Write `lib/content.js`**

```javascript
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const JOBS_DIR = path.join(process.cwd(), "content/jobs");

export async function getJobs() {
  const files = fs.readdirSync(JOBS_DIR).filter((f) => f.endsWith(".md"));
  const jobs = files.map((file) => {
    const raw = fs.readFileSync(path.join(JOBS_DIR, file), "utf8");
    const { data, content } = matter(raw);
    const highlights = content
      .split("\n")
      .filter((line) => line.trim().startsWith("- "))
      .map((line) => line.trim().slice(2));
    return {
      slug: file.replace(/\.md$/, ""),
      title: data.title,
      company: data.company,
      location: data.location,
      range: data.range,
      url: data.url,
      date: data.date,
      highlights,
    };
  });
  return jobs.sort((a, b) => new Date(b.date) - new Date(a.date));
}
```

- [ ] **Step 3: Install gray-matter**

```bash
npm install gray-matter
```

- [ ] **Step 4: Write `components/experience.jsx`**

```javascript
import { getJobs } from "@/lib/content";
import { GridField } from "./grid-field";

export async function Experience() {
  const jobs = await getJobs();
  return (
    <section id="experience" className="relative overflow-hidden px-6 py-20">
      <GridField />
      <div className="relative mx-auto max-w-3xl">
        <span className="font-mono-label text-xs text-[var(--accent)]">
          Experience
        </span>
        <ul className="mt-8 flex flex-col gap-10">
          {jobs.map((job) => (
            <li key={job.slug} className="border-l border-[var(--line)] pl-6">
              <div className="flex flex-wrap items-baseline gap-x-3">
                <h3 className="text-base font-semibold text-[var(--ink)]">
                  {job.title} · {job.company}
                </h3>
                <span className="font-mono-label text-[11px] text-[var(--ink-dim)]">
                  {job.range}
                </span>
              </div>
              <ul className="mt-3 flex flex-col gap-1.5">
                {job.highlights.map((line) => (
                  <li key={line} className="text-sm leading-relaxed text-[var(--ink-dim)]">
                    {line}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Render in `app/page.js`**

```javascript
import { Experience } from "@/components/experience";
```

```javascript
      <About />
      <Experience />
```

- [ ] **Step 6: Verify**

Run: `npm run dev` — confirm two jobs render, newest (Stevens) first, bullet highlights visible.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "Add content lib and Experience section with job data"
```

---

## Task 6: Skills section

**Files:**
- Create: `data/skills.js`, `components/skills.jsx`
- Modify: `app/page.js` (render `<Skills />`)

**Interfaces:**
- Produces: `skills` array exported from `data/skills.js` — `Array<{ category: string, items: string[] }>`.

- [ ] **Step 1: Write `data/skills.js`**

```javascript
export const skills = [
  {
    category: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "SQL"],
  },
  {
    category: "Backend",
    items: ["FastAPI", "Express.js", "Node.js", "Flask"],
  },
  {
    category: "ML / Data",
    items: ["XGBoost", "PyTorch", "TensorFlow", "Scikit-learn"],
  },
  {
    category: "Infra / Cloud",
    items: ["AWS", "Docker", "Terraform", "GCP"],
  },
];
```

- [ ] **Step 2: Write `components/skills.jsx`**

```javascript
import { skills } from "@/data/skills";
import { GridField } from "./grid-field";

export function Skills() {
  return (
    <section className="relative overflow-hidden px-6 py-20">
      <GridField />
      <div className="relative mx-auto max-w-3xl">
        <span className="font-mono-label text-xs text-[var(--accent)]">Skills</span>
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {skills.map((group) => (
            <div key={group.category}>
              <h3 className="font-mono-label text-[11px] text-[var(--ink-dim)]">
                {group.category}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded border border-[var(--line)] px-3 py-1 text-xs text-[var(--ink)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Render in `app/page.js`**

```javascript
import { Skills } from "@/components/skills";
```

```javascript
      <Experience />
      <Skills />
```

- [ ] **Step 4: Verify**

Run: `npm run dev` — confirm 4 skill category groups render as pill lists.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Add Skills section"
```

---

## Task 7: Featured projects (curated static data)

**Files:**
- Create: `data/projects.js`, `components/projects/featured-projects.jsx`
- Modify: `app/page.js` (render `<FeaturedProjects />` inside a wrapper with `id="projects"`)

**Interfaces:**
- Produces: `featuredProjects` array from `data/projects.js` — `Array<{ slug, title, description, tech: string[], href }>`.
- Produces: `FeaturedProjects` component, no props, named export.

- [ ] **Step 1: Write `data/projects.js`**

```javascript
export const featuredProjects = [
  {
    slug: "f1-insight-hub",
    title: "F1 Insight Hub",
    description:
      "Real-time F1 analytics dashboard ingesting 50+ live feeds, sub-200ms latency, 99.9% uptime. ML ensembles (XGBoost, Random Forest, Neural Nets) with 0.359 MAE across 718 races. Live weather integration, Monte Carlo strategy simulation, interactive track maps.",
    tech: ["React", "TypeScript", "Python", "FastAPI", "XGBoost", "FastF1"],
    href: "https://github.com/patelpratyush/F1-Insight-Hub",
  },
  {
    slug: "ai-portfolio-optimizer",
    title: "AI-Powered Portfolio Optimizer",
    description:
      "Investment platform processing 10M+ stock datapoints daily, forecasting asset returns with 78% accuracy. 12+ predictive models (XGBoost, LSTM, Prophet) across 25+ technical indicators, <100ms latency, scaled to 1K+ concurrent users.",
    tech: ["React", "TypeScript", "Python", "Flask", "LSTM", "Prophet"],
    href: "https://github.com/patelpratyush/AI-Powered-Portfolio-Optimizer",
  },
  {
    slug: "resumesharp",
    title: "ResumeSharp",
    description:
      "AI-powered resume optimization SaaS generating ATS-friendly rewrites in real time. Stripe subscriptions with Supabase auth and RBAC. PDF/DOCX export with live previews, intelligent job-description matching.",
    tech: ["Next.js", "TypeScript", "FastAPI", "Supabase", "Stripe", "OpenAI"],
    href: "https://github.com/patelpratyush/ResumeSharp",
  },
  {
    slug: "professai",
    title: "ProfessAI",
    description:
      "RAG-based assistant providing personalized professor recommendations, increasing user retention by 30%. Real-time chat interface backed by Google Generative AI and Pinecone vector search, cutting retrieval time by 50%.",
    tech: ["Next.js", "Gemini", "Pinecone", "React"],
    href: "https://github.com/patelpratyush/Rate-My-Prof/",
  },
  {
    slug: "flashgenie",
    title: "FlashGenie",
    description:
      "AI-powered flashcard app onboarding 100+ users, $1K revenue via Stripe. Clerk auth, Firebase backend, social-driven growth strategy raising engagement 50%.",
    tech: ["Next.js", "Clerk", "Stripe", "OpenAI", "Firebase"],
    href: "https://github.com/patelpratyush/AI-Flashcards",
  },
  {
    slug: "financeer",
    title: "Financeer",
    description:
      "Full-stack financial analysis dashboard with dynamic visualizations. React/TypeScript frontend, Express.js + MongoDB backend.",
    tech: ["React", "TypeScript", "Redux Toolkit", "Express.js", "MongoDB"],
    href: "https://github.com/patelpratyush/Financeer/tree/main",
  },
];
```

- [ ] **Step 2: Write `components/projects/featured-projects.jsx`**

```javascript
import { featuredProjects } from "@/data/projects";

export function FeaturedProjects() {
  return (
    <div>
      <span className="font-mono-label text-xs text-[var(--accent)]">
        Featured projects
      </span>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {featuredProjects.map((project) => (
          <a
            key={project.slug}
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="group rounded border border-[var(--line)] p-5 transition-colors hover:border-[var(--accent)]"
          >
            <h3 className="text-base font-semibold text-[var(--ink)] group-hover:text-[var(--accent)]">
              {project.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--ink-dim)]">
              {project.description}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <li
                  key={t}
                  className="font-mono-label text-[10px] text-[var(--ink-dim)]"
                >
                  {t}
                </li>
              ))}
            </ul>
          </a>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Render in `app/page.js`** — wrap in a `section` with grid-field and `id="projects"`

```javascript
import { FeaturedProjects } from "@/components/projects/featured-projects";
import { GridField } from "@/components/grid-field";
```

```javascript
      <Skills />
      <section id="projects" className="relative overflow-hidden px-6 py-20">
        <GridField />
        <div className="relative mx-auto max-w-3xl">
          <FeaturedProjects />
        </div>
      </section>
```

- [ ] **Step 4: Verify**

Run: `npm run dev` — confirm 6 featured project cards render in a 2-col grid, hover border turns amber.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Add curated Featured Projects section"
```

---

## Task 8: More projects (GitHub API, server-fetched)

**Files:**
- Create: `lib/github.js`, `components/projects/more-projects.jsx`
- Modify: `app/page.js` (render `<MoreProjects />` below `<FeaturedProjects />`, inside the same `#projects` section)

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces: `getTopRepos(username, limit)` from `lib/github.js` — async function, returns `Array<{ name, description, stars, url, language }> | null` (`null` on fetch failure, never throws).
- Produces: `MoreProjects` component, no props, named export; renders nothing (`null`) if `getTopRepos` returns `null`.

- [ ] **Step 1: Write `lib/github.js`**

```javascript
const EXCLUDED_SLUGS = new Set(
  ["f1-insight-hub", "ai-portfolio-optimizer", "resumesharp", "professai", "flashgenie", "financeer"]
);

export async function getTopRepos(username, limit = 6) {
  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return null;
    const repos = await res.json();
    return repos
      .filter((r) => !r.fork && !r.private)
      .filter((r) => !EXCLUDED_SLUGS.has(r.name.toLowerCase()))
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, limit)
      .map((r) => ({
        name: r.name,
        description: r.description,
        stars: r.stargazers_count,
        url: r.html_url,
        language: r.language,
      }));
  } catch {
    return null;
  }
}
```

- [ ] **Step 2: Write `components/projects/more-projects.jsx`**

```javascript
import { getTopRepos } from "@/lib/github";

export async function MoreProjects() {
  const repos = await getTopRepos("patelpratyush");
  if (!repos || repos.length === 0) return null;

  return (
    <div className="mt-16">
      <span className="font-mono-label text-xs text-[var(--ink-dim)]">
        More on GitHub
      </span>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {repos.map((repo) => (
          <a
            key={repo.name}
            href={repo.url}
            target="_blank"
            rel="noreferrer"
            className="rounded border border-[var(--line)] p-4 text-sm hover:border-[var(--accent)]"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-[var(--ink)]">{repo.name}</span>
              <span className="font-mono-label text-[10px] tabular-nums text-[var(--ink-dim)]">
                ★ {repo.stars}
              </span>
            </div>
            {repo.description && (
              <p className="mt-2 text-xs leading-relaxed text-[var(--ink-dim)]">
                {repo.description}
              </p>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Render in `app/page.js`**

```javascript
import { MoreProjects } from "@/components/projects/more-projects";
```

```javascript
          <FeaturedProjects />
          <MoreProjects />
```

- [ ] **Step 4: Verify success path**

Run: `npm run dev` — confirm a "More on GitHub" grid renders below Featured, star counts visible.

- [ ] **Step 5: Verify failure path**

Temporarily change the fetch URL in `lib/github.js` to an invalid host (e.g. `https://api.github.invalid/...`), reload the page, confirm the "More on GitHub" block disappears with no thrown error and Featured Projects still renders. Revert the URL change.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Add GitHub-fetched More Projects grid with graceful fallback"
```

---

## Task 9: Blog content lib + pensieve routes

**Files:**
- Create: `lib/posts.js`
- Create: `content/posts/` (port existing post slugs as placeholders — see step 1)
- Create: `app/pensieve/page.js`, `app/pensieve/[slug]/page.js`, `app/pensieve/tags/[tag]/page.js`
- Create: `components/blog-preview.jsx`
- Modify: `app/page.js` (render `<BlogPreview />` before Contact)

**Interfaces:**
- Produces: `getAllPosts()` — async, returns `Array<{ slug, title, date, tags: string[], excerpt }>` sorted by date descending.
- Produces: `getPostBySlug(slug)` — async, returns `{ slug, title, date, tags, contentHtml } | null`.
- Produces: `getPostsByTag(tag)` — async, returns same shape as `getAllPosts()` filtered.

- [ ] **Step 1: Install MDX deps and create one real post**

```bash
npm install next-mdx-remote
mkdir -p content/posts
```

```markdown
<!-- content/posts/dark-mode-toggle.md -->
---
title: "Building a Dark Mode Toggle"
date: "2024-11-02"
tags: ["css", "react"]
---

Notes on implementing a persistent dark mode toggle with `prefers-color-scheme` and `localStorage`, avoiding the flash-of-wrong-theme problem on first paint.
```

(Additional posts can be ported from the old repo's `content/posts/` history the same way — this task only needs one real post to prove the pipeline end-to-end.)

- [ ] **Step 2: Write `lib/posts.js`**

```javascript
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

function readAll() {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
      const { data, content } = matter(raw);
      return {
        slug: file.replace(/\.md$/, ""),
        title: data.title,
        date: data.date,
        tags: data.tags || [],
        content,
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function getAllPosts() {
  return readAll().map(({ content, ...meta }) => ({
    ...meta,
    excerpt: content.trim().slice(0, 160),
  }));
}

export async function getPostBySlug(slug) {
  const post = readAll().find((p) => p.slug === slug);
  if (!post) return null;
  return { ...post, contentHtml: post.content };
}

export async function getPostsByTag(tag) {
  const all = await getAllPosts();
  return all.filter((p) => p.tags.includes(tag));
}
```

- [ ] **Step 3: Write `app/pensieve/page.js`**

```javascript
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { GridField } from "@/components/grid-field";

export default async function PensievePage() {
  const posts = await getAllPosts();
  return (
    <main className="relative overflow-hidden px-6 py-20">
      <GridField />
      <div className="relative mx-auto max-w-3xl">
        <span className="font-mono-label text-xs text-[var(--accent)]">Pensieve</span>
        <ul className="mt-8 flex flex-col gap-6">
          {posts.map((post) => (
            <li key={post.slug} className="border-b border-[var(--line)] pb-6">
              <Link href={`/pensieve/${post.slug}`} className="text-base font-semibold text-[var(--ink)] hover:text-[var(--accent)]">
                {post.title}
              </Link>
              <p className="mt-2 text-sm text-[var(--ink-dim)]">{post.excerpt}…</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
```

- [ ] **Step 4: Write `app/pensieve/[slug]/page.js`**

```javascript
import { getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";

export default async function PostPage({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();
  return (
    <main className="mx-auto max-w-2xl px-6 py-20">
      <h1 className="font-serif-display text-4xl text-[var(--ink)]">{post.title}</h1>
      <p className="font-mono-label mt-2 text-xs text-[var(--ink-dim)]">{post.date}</p>
      <article className="prose prose-invert mt-8 max-w-none whitespace-pre-wrap text-[var(--ink-dim)]">
        {post.contentHtml}
      </article>
    </main>
  );
}
```

- [ ] **Step 5: Write `app/pensieve/tags/[tag]/page.js`**

```javascript
import Link from "next/link";
import { getPostsByTag } from "@/lib/posts";

export default async function TagPage({ params }) {
  const posts = await getPostsByTag(params.tag);
  return (
    <main className="mx-auto max-w-2xl px-6 py-20">
      <h1 className="font-mono-label text-sm text-[var(--accent)]">#{params.tag}</h1>
      <ul className="mt-6 flex flex-col gap-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/pensieve/${post.slug}`} className="text-[var(--ink)] hover:text-[var(--accent)]">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
```

- [ ] **Step 6: Write `components/blog-preview.jsx`**

```javascript
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { GridField } from "./grid-field";

export async function BlogPreview() {
  const posts = (await getAllPosts()).slice(0, 3);
  if (posts.length === 0) return null;
  return (
    <section className="relative overflow-hidden px-6 py-20">
      <GridField />
      <div className="relative mx-auto max-w-3xl">
        <div className="flex items-baseline justify-between">
          <span className="font-mono-label text-xs text-[var(--accent)]">Writing</span>
          <Link href="/pensieve" className="font-mono-label text-[11px] text-[var(--ink-dim)] hover:text-[var(--accent)]">
            View all →
          </Link>
        </div>
        <ul className="mt-6 flex flex-col gap-4">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/pensieve/${post.slug}`} className="text-sm text-[var(--ink)] hover:text-[var(--accent)]">
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
```

- [ ] **Step 7: Render `BlogPreview` in `app/page.js`**

```javascript
import { BlogPreview } from "@/components/blog-preview";
```

```javascript
      </section>
      <BlogPreview />
```

- [ ] **Step 8: Verify**

Run: `npm run dev`
- Visit `/pensieve` — confirm "Building a Dark Mode Toggle" listed.
- Click into `/pensieve/dark-mode-toggle` — confirm full post renders.
- Visit `/pensieve/tags/css` — confirm the post listed.
- Visit `/` — confirm the Writing preview section shows the post.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "Add MDX blog content lib, pensieve routes, and homepage preview"
```

---

## Task 10: Contact section (Formspree)

**Files:**
- Create: `components/contact.jsx`
- Modify: `app/page.js` (render `<Contact />` last, before Footer, `id="contact"`)

**Interfaces:**
- Produces: `Contact` component, no props, named export. Client component (`"use client"`) since it manages form submit state.

- [ ] **Step 1: Write `components/contact.jsx`**

```javascript
"use client";

import { useState } from "react";
import { GridField } from "./grid-field";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/REPLACE_WITH_FORM_ID";

export function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden px-6 py-20">
      <GridField />
      <div className="relative mx-auto max-w-2xl">
        <span className="font-mono-label text-xs text-[var(--accent)]">Contact</span>
        <h2 className="font-serif-display mt-4 text-3xl text-[var(--ink)]">
          Get in touch.
        </h2>
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <input
            name="name"
            required
            placeholder="Name"
            className="rounded border border-[var(--line)] bg-transparent px-4 py-3 text-sm text-[var(--ink)] outline-none focus:border-[var(--accent)]"
          />
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            className="rounded border border-[var(--line)] bg-transparent px-4 py-3 text-sm text-[var(--ink)] outline-none focus:border-[var(--accent)]"
          />
          <textarea
            name="message"
            required
            rows={5}
            placeholder="Message"
            className="rounded border border-[var(--line)] bg-transparent px-4 py-3 text-sm text-[var(--ink)] outline-none focus:border-[var(--accent)]"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="self-start rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--accent-ink)] disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Send message"}
          </button>
          {status === "success" && (
            <p className="text-sm text-[var(--accent)]">Message sent — I'll reply soon.</p>
          )}
          {status === "error" && (
            <p className="text-sm text-red-400">
              Something went wrong. Try again, or email me directly.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Render in `app/page.js`**

```javascript
import { Contact } from "@/components/contact";
```

```javascript
      <BlogPreview />
      <Contact />
```

- [ ] **Step 3: Verify UI (Formspree endpoint not yet live)**

Run: `npm run dev` — confirm form renders, required-field validation blocks empty submit, button shows "Sending…" state briefly then "error" (expected — endpoint is still a placeholder). Note for the user: replace `FORMSPREE_ENDPOINT` in `components/contact.jsx` with a real Formspree form ID before going live.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "Add Contact section with Formspree submission"
```

---

## Task 11: Vercel deploy config + final pass

**Files:**
- Create: `vercel.json` (only if non-default settings needed — otherwise skip and rely on zero-config detection)
- Modify: `README.md` (deploy instructions)
- Modify: `.gitignore` (confirm `.next/`, `node_modules/` present — `create-next-app` adds these already, this step just verifies)

**Interfaces:** none — final integration/verification task, no new consumable interfaces.

- [ ] **Step 1: Verify `.gitignore` covers Next.js build output**

Run: `cat .gitignore`
Expected: contains `.next/`, `node_modules/`, `.env*.local` (added automatically by `create-next-app`). If any are missing, add them.

- [ ] **Step 2: Production build check**

Run: `npm run build`
Expected: build completes with no errors, prints a route summary including `/`, `/pensieve`, `/pensieve/[slug]`, `/pensieve/tags/[tag]`.

- [ ] **Step 3: Write deploy notes in `README.md`**

```markdown
# patelpratyush.github.io

Personal portfolio — Next.js 14 App Router, Tailwind CSS, shadcn/ui.

## Development

npm install
npm run dev

## Deploy

Deployed via Vercel (connect this repo in the Vercel dashboard — zero-config
Next.js detection). Before going live, replace the placeholder Formspree
endpoint in `components/contact.jsx` with a real form ID from
https://formspree.io.
```

- [ ] **Step 4: Full manual walkthrough**

Run: `npm run dev`
- Desktop viewport: scroll through Hero → About → Experience → Skills → Projects → Writing → Contact → Footer, confirm no layout breaks, amber is the only accent color visible anywhere.
- Resize to a mobile width (375px) — confirm Nav, stat grid, project grid, and skills pills reflow without horizontal scroll.
- Toggle `prefers-reduced-motion: reduce` in DevTools — confirm the Hero particle canvas stops animating and no other section relies on motion for legibility.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Add deploy notes and verify production build"
```

---

## Self-Review Notes

- **Spec coverage:** Hero (Task 3), grid-field motif + About (Task 4), Experience (Task 5), Skills (Task 6), curated + GitHub-fetched Projects (Tasks 7–8), MDX blog + pensieve routes (Task 9), Contact/Formspree (Task 10), Vercel deploy (Task 11), Nav/Footer (Task 2), base tokens/fonts (Task 1) — all spec sections covered.
- **Error handling:** GitHub fetch failure path explicitly verified in Task 8 Step 5; Formspree failure path handled in Task 10's `status === "error"` branch; malformed content frontmatter is a build-time failure by design (no task needed — this is `fs`/`gray-matter` throwing naturally, matching the spec).
- **Type/interface consistency:** `getJobs()`, `getTopRepos()`, `getAllPosts()`/`getPostBySlug()`/`getPostsByTag()` signatures are each defined once and consumed only by the component in the same or immediately following task — no naming drift across tasks.
