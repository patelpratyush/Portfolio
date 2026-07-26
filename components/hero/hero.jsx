import { ParticleCanvas } from "./particle-canvas";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--background)] px-6 py-24 sm:py-32">
      <ParticleCanvas />
      <div className="relative mx-auto max-w-3xl">
        <span className="font-mono-label text-xs text-[var(--primary)]">
          Software Engineer
        </span>
        <h1 className="font-serif-display mt-4 text-5xl italic leading-[1.08] text-[var(--foreground)] text-balance sm:text-6xl">
          I turn ambiguous problems into working software.
        </h1>
        <p className="mt-5 max-w-[44ch] text-[15px] leading-relaxed text-[var(--muted-foreground)]">
          Full-stack engineer working across data pipelines, cloud
          infrastructure, and AI SaaS products — currently at Asembia,
          previously Stevens and Headstarter.
        </p>
        <div className="mt-8 flex items-center gap-5">
          <a
            href="#projects"
            className="rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-[var(--primary-foreground)]"
          >
            See projects
          </a>
          <a
            href="#contact"
            className="border-b border-[var(--muted-foreground)] pb-0.5 text-sm text-[var(--foreground)]"
          >
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}
