"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "~/home" },
  { href: "/about", label: "~/about" },
  { href: "/experience", label: "~/experience" },
  { href: "/projects", label: "~/projects" },
  { href: "/contact", label: "~/contact" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-base/90 backdrop-blur">
      <nav className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-mono text-sm text-ink hover:text-accent transition-colors"
        >
          henrique<span className="text-accent">.dev</span>
        </Link>
        <ul className="flex flex-wrap items-center gap-5">
          {links.map((link) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`font-mono text-sm transition-colors ${
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
