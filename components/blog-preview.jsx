import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { GridField } from "./grid-field";

export async function BlogPreview() {
  const posts = (await getAllPosts()).slice(0, 3);
  if (posts.length === 0) return null;
  return (
    <section className="relative overflow-hidden px-6 py-20">
      <GridField />
      <div className="relative mx-auto max-w-3xl">
        <div className="flex items-baseline justify-between">
          <span className="font-mono-label text-xs text-[var(--accent)]">Writing</span>
          <Link href="/pensieve" className="font-mono-label text-[11px] text-[var(--ink-dim)] hover:text-[var(--accent)]">
            View all →
          </Link>
        </div>
        <ul className="mt-6 flex flex-col gap-4">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/pensieve/${post.slug}`} className="text-sm text-[var(--ink)] hover:text-[var(--accent)]">
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
