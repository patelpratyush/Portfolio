export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 sm:flex-row sm:justify-between">
        <span className="font-mono-label text-xs text-[var(--muted-foreground)]">
          © {new Date().getFullYear()} Pratyush Patel
        </span>
        <a
          href="https://github.com/patelpratyush"
          className="font-mono-label text-xs text-[var(--muted-foreground)] hover:text-[var(--primary)]"
        >
          github.com/patelpratyush
        </a>
      </div>
    </footer>
  );
}
