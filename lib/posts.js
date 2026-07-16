import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

function readAll() {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
      const { data, content } = matter(raw);
      return {
        slug: file.replace(/\.md$/, ""),
        title: data.title,
        date: data.date,
        tags: data.tags || [],
        content,
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function getAllPosts() {
  return readAll().map(({ content, ...meta }) => ({
    ...meta,
    excerpt: content.trim().slice(0, 160),
  }));
}

export async function getPostBySlug(slug) {
  const post = readAll().find((p) => p.slug === slug);
  if (!post) return null;
  return { ...post, contentHtml: post.content };
}

export async function getPostsByTag(tag) {
  const all = await getAllPosts();
  return all.filter((p) => p.tags.includes(tag));
}
