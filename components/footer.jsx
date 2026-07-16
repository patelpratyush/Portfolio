export function Footer() {
  return (
    <footer className="border-t border-[var(--line)] px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 sm:flex-row sm:justify-between">
        <span className="font-mono-label text-xs text-[var(--ink-dim)]">
          © {new Date().getFullYear()} Pratyush Patel
        </span>
        <a
          href="https://github.com/patelpratyush"
          className="font-mono-label text-xs text-[var(--ink-dim)] hover:text-[var(--accent)]"
        >
          github.com/patelpratyush
        </a>
      </div>
    </footer>
  );
}
