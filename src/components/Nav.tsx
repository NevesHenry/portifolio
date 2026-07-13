"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "~" },
  { href: "/about", label: "~/about" },
  { href: "/experience", label: "~/experience" },
  { href: "/projects", label: "~/projects" },
  { href: "/contact", label: "~/contact" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/90 backdrop-blur">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-3xl flex-col px-6 py-1 sm:flex-row sm:items-center sm:justify-between sm:py-2"
      >
        <Link
          href="/"
          className="inline-block w-fit py-2 font-mono text-sm text-ink transition-colors hover:text-accent"
        >
          henrique<span className="text-accent">.dev</span>
        </Link>
        <ul className="flex flex-wrap items-center gap-x-5">
          {links.map((link) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`inline-block py-2 font-mono text-sm transition-colors ${
                    isActive
                      ? "text-accent"
                      : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
