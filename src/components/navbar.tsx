"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { DATA } from "@/data/resume";

export default function Navbar() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b-2 border-foreground bg-background">
      <div className="flex items-center justify-between h-12 px-6 lg:px-12">
        {/* Logo / name */}
        <Link
          href="/"
          className="font-mono text-sm font-bold tracking-widest uppercase hover:text-accent transition-colors"
        >
          MS
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-0">
          <Link
            href="/"
            className="font-mono text-xs font-bold uppercase tracking-widest px-4 h-12 flex items-center border-l-2 border-foreground hover:bg-foreground hover:text-background transition-colors"
          >
            Home
          </Link>
          <Link
            href="/blog"
            className="font-mono text-xs font-bold uppercase tracking-widest px-4 h-12 flex items-center border-l-2 border-foreground hover:bg-foreground hover:text-background transition-colors"
          >
            Blog
          </Link>
          {Object.values(DATA.contact.social)
            .filter((s) => s.navbar)
            .map((social) => (
              <Link
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs font-bold uppercase tracking-widest px-4 h-12 flex items-center border-l-2 border-foreground hover:bg-foreground hover:text-background transition-colors"
              >
                {social.name}
              </Link>
            ))}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="font-mono text-xs font-bold uppercase tracking-widest px-4 h-12 flex items-center border-l-2 border-foreground hover:bg-foreground hover:text-background transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <SunIcon className="size-4" />
            ) : (
              <MoonIcon className="size-4" />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
