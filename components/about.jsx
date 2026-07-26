import { GridField } from "./grid-field";
import { Reveal } from "./reveal";

const stats = [
  { label: "Years of experience", value: "2+" },
  { label: "AWS misconfigs reduced", value: "40%" },
  { label: "IAM roles verified", value: "300+" },
];

export function About() {
  return (
    <section className="relative overflow-hidden px-6 py-20">
      <GridField anchor="20% 30%" />
      <Reveal className="relative mx-auto max-w-3xl">
        <span className="font-mono-label text-xs text-[var(--primary)]">About</span>
        <h2 className="font-serif-display mt-3 text-3xl italic text-[var(--foreground)] text-balance sm:text-4xl">
          What I actually do.
        </h2>
        <p className="mt-4 max-w-[62ch] text-[15px] leading-relaxed text-[var(--muted-foreground)]">
          I&apos;m a software engineer working across backend systems, applied ML,
          and cloud infrastructure. Currently building PHI validation and data
          pipeline tooling at Asembia, after building an AWS IAM verification
          framework at Stevens and shipping AI SaaS backends at Headstarter.
        </p>
        <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-[var(--border)] pt-6">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="font-mono-label text-[11px] text-[var(--muted-foreground)]">
                {stat.label}
              </dt>
              <dd className="font-mono-label mt-1 text-2xl tabular-nums text-[var(--foreground)]">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
