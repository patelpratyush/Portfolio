"use client";

import Marquee from "react-fast-marquee";
import { skills } from "@/data/skills";
import { Reveal } from "./reveal";

const allSkills = skills.flatMap((group) =>
  group.items.map((item) => ({ item, category: group.category }))
);

export function Skills() {
  return (
    <section className="relative overflow-hidden border-y border-[var(--border)] py-20">
      <Reveal className="mx-auto max-w-6xl px-6">
        <span className="font-mono-label text-xs text-[var(--primary)]">Skills</span>
        <h2 className="font-serif-display mt-3 text-3xl italic text-[var(--foreground)] text-balance sm:text-4xl">
          What I reach for.
        </h2>
      </Reveal>
      <div className="mt-10">
        <Marquee gradient={false} speed={40} pauseOnHover direction="left">
          {allSkills.map(({ item, category }) => (
            <div
              key={item}
              className="mx-3 flex min-w-[140px] flex-col items-start gap-1 rounded border border-[var(--border)] px-5 py-4 transition-colors hover:border-[var(--primary)]"
            >
              <span className="font-mono-label text-[10px] text-[var(--muted-foreground)]">
                {category}
              </span>
              <span className="text-sm text-[var(--foreground)]">{item}</span>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
