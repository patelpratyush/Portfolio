import { featuredProjects } from "@/data/projects";

export function FeaturedProjects() {
  return (
    <div>
      <span className="font-mono-label text-xs text-[var(--accent)]">
        Featured projects
      </span>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {featuredProjects.map((project) => (
          <a
            key={project.slug}
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="group rounded border border-[var(--line)] p-5 transition-colors hover:border-[var(--accent)]"
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
