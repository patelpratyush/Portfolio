import fs from "fs";
import path from "path";
import matter from "gray-matter";

const JOBS_DIR = path.join(process.cwd(), "content/jobs");

export async function getJobs() {
  const files = fs.readdirSync(JOBS_DIR).filter((f) => f.endsWith(".md"));
  const jobs = files.map((file) => {
    const raw = fs.readFileSync(path.join(JOBS_DIR, file), "utf8");
    const { data, content } = matter(raw);
    const highlights = content
      .split("\n")
      .filter((line) => line.trim().startsWith("- "))
      .map((line) => line.trim().slice(2));
    return {
      slug: file.replace(/\.md$/, ""),
      title: data.title,
      company: data.company,
      location: data.location,
      range: data.range,
      url: data.url,
      date: data.date,
      highlights,
    };
  });
  return jobs.sort((a, b) => new Date(b.date) - new Date(a.date));
}
