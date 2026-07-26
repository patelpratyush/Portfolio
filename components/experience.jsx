import { getJobs } from "@/lib/content";
import { GridField } from "./grid-field";
import { Reveal } from "./reveal";

export async function Experience() {
  const jobs = await getJobs();
  return (
    <section id="experience" className="relative overflow-hidden px-6 py-20">
      <GridField anchor="80% 20%" />
      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <span className="font-mono-label text-xs text-[var(--primary)]">
            Experience
          </span>
          <h2 className="font-serif-display mt-3 text-3xl italic text-[var(--foreground)] text-balance sm:text-4xl">
            Where I&apos;ve worked.
          </h2>
        </Reveal>
        <ul className="mt-10 flex flex-col gap-10">
          {jobs.map((job, i) => (
            <Reveal key={job.slug} delay={i * 0.08}>
              <li className="border-l border-[var(--border)] pl-6">
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <h3 className="text-base font-semibold text-[var(--foreground)]">
                    {job.title} · {job.company}
                  </h3>
                  <span className="font-mono-label text-[11px] text-[var(--muted-foreground)]">
                    {job.range}
                  </span>
                </div>
                <ul className="mt-3 flex flex-col gap-1.5">
                  {job.highlights.map((line) => (
                    <li key={line} className="text-sm leading-relaxed text-[var(--muted-foreground)]">
                      {line}
                    </li>
                  ))}
                </ul>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
