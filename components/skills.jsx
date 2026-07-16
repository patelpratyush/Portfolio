"use client";

import Marquee from "react-fast-marquee";
import { skills } from "@/data/skills";
import { GridField } from "./grid-field";

const allSkills = skills.flatMap((group) =>
  group.items.map((item) => ({ item, category: group.category }))
);

export function Skills() {
  return (
    <section className="relative overflow-hidden px-6 py-20">
      <GridField />
      <div className="relative mx-auto max-w-3xl">
        <span className="font-mono-label text-xs text-[var(--accent)]">Skills</span>
      </div>
      <div className="relative mt-8">
        <Marquee gradient={false} speed={40} pauseOnHover direction="left">
          {allSkills.map(({ item, category }) => (
            <div
              key={item}
              className="mx-3 flex min-w-[140px] flex-col items-start gap-1 rounded border border-[var(--line)] px-5 py-4 transition-colors hover:border-[var(--accent)]"
            >
              <span className="font-mono-label text-[10px] text-[var(--ink-dim)]">
                {category}
              </span>
              <span className="text-sm text-[var(--ink)]">{item}</span>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
