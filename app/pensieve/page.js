import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { GridField } from "@/components/grid-field";

export default async function PensievePage() {
  const posts = await getAllPosts();
  return (
    <main className="relative overflow-hidden px-6 py-20">
      <GridField />
      <div className="relative mx-auto max-w-3xl">
        <span className="font-mono-label text-xs text-[var(--accent)]">Pensieve</span>
        <ul className="mt-8 flex flex-col gap-6">
          {posts.map((post) => (
            <li key={post.slug} className="border-b border-[var(--line)] pb-6">
              <Link href={`/pensieve/${post.slug}`} className="text-base font-semibold text-[var(--ink)] hover:text-[var(--accent)]">
                {post.title}
              </Link>
              <p className="mt-2 text-sm text-[var(--ink-dim)]">{post.excerpt}…</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
