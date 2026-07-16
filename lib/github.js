const EXCLUDED_SLUGS = new Set(
  ["f1-insight-hub", "ai-portfolio-optimizer", "resumesharp", "professai", "flashgenie", "financeer"]
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
      .filter((r) => !r.fork && !r.private)
      .filter((r) => !EXCLUDED_SLUGS.has(r.name.toLowerCase()))
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
