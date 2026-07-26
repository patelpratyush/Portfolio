import { getTopRepos } from "@/lib/github";

export async function MoreProjects() {
  const repos = await getTopRepos("patelpratyush");
  if (!repos || repos.length === 0) return null;

  return (
    <div className="mt-16">
      <span className="font-mono-label text-xs text-[var(--muted-foreground)]">
        More on GitHub
      </span>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {repos.map((repo) => (
          <a
            key={repo.name}
            href={repo.url}
            target="_blank"
            rel="noreferrer"
            className="rounded border border-[var(--border)] p-4 text-sm hover:border-[var(--primary)]"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-[var(--foreground)]">{repo.name}</span>
              <span className="font-mono-label text-[10px] tabular-nums text-[var(--muted-foreground)]">
                ★ {repo.stars}
              </span>
            </div>
            {repo.description && (
              <p className="mt-2 text-xs leading-relaxed text-[var(--muted-foreground)]">
                {repo.description}
              </p>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}
