"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { DATA } from "@/data/resume";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-foreground/8 bg-background/85 backdrop-blur-sm">
      <div className="flex items-center justify-between h-12 px-6 lg:px-16">
        <Link
          href="/"
          className="font-mono text-xs font-bold tracking-widest uppercase text-foreground/80 hover:text-accent transition-colors duration-200"
        >
          MS
        </Link>

        <nav className="flex items-center gap-0">
          {[
            { href: "/", label: "Home" },
            { href: "/blog", label: "Blog" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground px-4 h-12 flex items-center border-l border-foreground/10 hover:bg-foreground/5 transition-all duration-200"
            >
              {item.label}
            </Link>
          ))}
          {Object.values(DATA.contact.social)
            .filter((s) => s.navbar)
            .map((social) => {
              const Icon = social.icon;
              return (
                <Link
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground px-3 sm:px-4 h-12 flex items-center border-l border-foreground/10 hover:bg-foreground/5 transition-all duration-200"
                >
                  <Icon className="size-3.5 sm:hidden" />
                  <span className="hidden sm:inline">{social.name}</span>
                </Link>
              );
            })}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-muted-foreground hover:text-foreground px-4 h-12 flex items-center border-l border-foreground/10 hover:bg-foreground/5 transition-all duration-200 cursor-pointer"
            aria-label="Toggle theme"
          >
            {mounted ? (
              theme === "dark" ? (
                <SunIcon className="size-3.5" />
              ) : (
                <MoonIcon className="size-3.5" />
              )
            ) : (
              <span className="size-3.5 inline-block" />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
