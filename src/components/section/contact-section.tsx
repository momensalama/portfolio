"use client";

import Link from "next/link";
import { DATA } from "@/data/resume";
import Letter3DSwap from "@/components/fancy/letter-3d-swap";
import AnimatedGradientSVG from "@/components/fancy/animated-gradient-svg";
import UnderlineToBackground from "@/components/fancy/underline-to-background";

export default function ContactSection() {
  return (
    <div className="relative border rounded-2xl p-10 overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 -z-10 rounded-2xl overflow-hidden">
        <AnimatedGradientSVG
          colors={["#818cf8", "#a78bfa", "#34d399", "#f472b6"]}
          speed={0.3}
        />
      </div>

      {/* Label pill */}
      <div className="absolute -top-4 border bg-primary z-10 rounded-xl px-4 py-1 left-1/2 -translate-x-1/2">
        <span className="text-background text-sm font-medium">Contact</span>
      </div>

      <div className="relative flex flex-col items-center gap-5 text-center">
        {/* 3D letter flip heading */}
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          <Letter3DSwap label="Get in Touch" staggerDuration={0.045} staggerFrom="center" />
        </h2>

        <p className="mx-auto max-w-lg text-muted-foreground text-balance">
          Want to chat? Just shoot me a DM{" "}
          <UnderlineToBackground
            label="with a direct question on X"
            targetTextColor="#fff"
            href={DATA.contact.social.X.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground font-medium"
          />{" "}
          and I&apos;ll respond whenever I can.
        </p>

        {/* Social links */}
        <div className="flex items-center gap-4 mt-2">
          {Object.values(DATA.contact.social)
            .filter((s) => s.navbar)
            .map((social) => (
              <Link
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={social.name}
              >
                <social.icon className="size-5" />
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
