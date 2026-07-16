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
