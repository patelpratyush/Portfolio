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
