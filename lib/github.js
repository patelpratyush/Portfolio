import { featuredProjects } from "@/data/projects";

function repoNameFromHref(href) {
  const match = href.match(/github\.com\/[^/]+\/([^/]+)/);
  return match ? match[1].toLowerCase() : null;
}

const EXCLUDED_NAMES = new Set(
  featuredProjects.map((p) => repoNameFromHref(p.href)).filter(Boolean)
);

export async function getTopRepos(username, limit = 6) {
  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return null;
    const repos = await res.json();
    return repos
      .filter((r) => !r.fork && !r.private && !r.archived)
      .filter((r) => r.name.toLowerCase() !== username.toLowerCase())
      .filter((r) => r.name.toLowerCase() !== `${username.toLowerCase()}.github.io`)
      .filter((r) => !EXCLUDED_NAMES.has(r.name.toLowerCase()))
      .filter((r) => Boolean(r.description))
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, limit)
      .map((r) => ({
        name: r.name,
        description: r.description,
        stars: r.stargazers_count,
        url: r.html_url,
        language: r.language,
      }));
  } catch {
    return null;
  }
}
