import { getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";

export default async function PostPage({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();
  return (
    <main className="mx-auto max-w-2xl px-6 py-20">
      <h1 className="font-serif-display text-4xl text-[var(--ink)]">{post.title}</h1>
      <p className="font-mono-label mt-2 text-xs text-[var(--ink-dim)]">{post.date}</p>
      <article className="prose prose-invert mt-8 max-w-none whitespace-pre-wrap text-[var(--ink-dim)]">
        {post.contentHtml}
      </article>
    </main>
  );
}
