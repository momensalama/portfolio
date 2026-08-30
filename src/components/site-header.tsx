"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DATA } from "@/data/resume";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Writing" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between gap-6 py-7">
      <Link
        href="/"
        className="text-sm font-medium tracking-tight transition-colors hover:text-muted-foreground"
      >
        {DATA.name}
      </Link>

      <nav aria-label="Main" className="flex items-center gap-5 text-sm">
        {links.map((link) => {
          const active =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "transition-colors hover:text-foreground",
                active ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          );
        })}
        <ThemeToggle />
      </nav>
    </header>
  );
}
