"use client";

import { useEffect, useRef } from "react";
import { featuredProjects } from "@/data/projects";

export function FeaturedProjects() {
  const cardRefs = useRef([]);

  useEffect(() => {
    let cancelled = false;
    import("vanilla-tilt").then(({ default: VanillaTilt }) => {
      if (cancelled) return;
      const nodes = cardRefs.current.filter(Boolean);
      VanillaTilt.init(nodes, {
        speed: 300,
        glare: true,
        "max-glare": 0.08,
        max: 6,
        perspective: 900,
        scale: 1.01,
      });
      return () => nodes.forEach((n) => n.vanillaTilt?.destroy());
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <span className="font-mono-label text-xs text-[var(--accent)]">Projects</span>
      <h2 className="font-serif-display mt-3 text-3xl italic text-[var(--ink)] text-balance sm:text-4xl">
        Systems built to ship.
      </h2>
      <p className="mt-2 max-w-[50ch] text-sm text-[var(--ink-dim)]">
        A few of the products I&apos;ve built end to end — from ML pipelines to
        production APIs.
      </p>
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {featuredProjects.map((project, i) => (
          <a
            key={project.slug}
            ref={(el) => (cardRefs.current[i] = el)}
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="group rounded border border-[var(--line)] bg-[var(--bg-raised)] p-5 transition-colors hover:border-[var(--accent)]"
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
