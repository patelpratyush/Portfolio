import Link from "next/link";

const links = [
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-mono-label text-sm text-[var(--foreground)]">
          Pratyush Patel
        </Link>
        <ul className="flex gap-6">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-mono-label text-xs text-[var(--muted-foreground)] transition-colors hover:text-[var(--primary)]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
