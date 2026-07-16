import Link from "next/link";
import { getPostsByTag } from "@/lib/posts";

export default async function TagPage({ params }) {
  const posts = await getPostsByTag(params.tag);
  return (
    <main className="mx-auto max-w-2xl px-6 py-20">
      <h1 className="font-mono-label text-sm text-[var(--accent)]">#{params.tag}</h1>
      <ul className="mt-6 flex flex-col gap-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/pensieve/${post.slug}`} className="text-[var(--ink)] hover:text-[var(--accent)]">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
