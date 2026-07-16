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
