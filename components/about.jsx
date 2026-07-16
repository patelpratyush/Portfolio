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
          I&apos;m a software engineer working across backend systems, applied ML,
          and cloud infrastructure. Currently building PHI validation and data
          pipeline tooling at Asembia, after building an AWS IAM verification
          framework at Stevens and shipping AI SaaS backends at Headstarter.
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
