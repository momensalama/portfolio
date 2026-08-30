"use client";

import { useState, useRef, useEffect, type ComponentProps } from "react";
import { Copy, Check } from "lucide-react";
import { codeToHtml, type BundledLanguage } from "shiki/bundle/web";
import { cn } from "@/lib/utils";

function extractLanguage(className?: string): string {
  const match = className?.match(/language-([a-z0-9-]+)/i);
  return match ? match[1] : "plaintext";
}

export function CodeBlock({ children, ...props }: ComponentProps<"pre">) {
  const [copied, setCopied] = useState(false);
  const [{ html, className, title }, setRenderState] = useState<{
    html: string;
    className: string;
    title: string | null;
  }>({ html: "", className: "", title: null });
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const codeEl = preRef.current?.querySelector("code");
    if (!codeEl) return;

    const lang = extractLanguage(codeEl.className);
    const nextTitle = codeEl.getAttribute("data-title");
    const nextClassName = codeEl.className || "";

    void codeToHtml(codeEl.textContent || "", {
      lang: lang as BundledLanguage,
      themes: { light: "github-light", dark: "github-dark" },
      defaultColor: false,
    })
      .then((highlighted) => {
        const doc = new DOMParser().parseFromString(highlighted, "text/html");
        setRenderState({
          html: doc.querySelector("code")?.innerHTML ?? "",
          className: nextClassName,
          title: nextTitle,
        });
      })
      .catch((error) => {
        console.error("Failed to highlight code:", error);
        setRenderState({ html: "", className: nextClassName, title: nextTitle });
      });
  }, [children]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(preRef.current?.textContent || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  };

  return (
    <div className="group relative my-6 overflow-hidden rounded-lg border bg-muted">
      {title && (
        <div className="border-b px-4 py-2 font-mono text-xs text-muted-foreground">
          {title}
        </div>
      )}

      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Code copied" : "Copy code"}
        className={cn(
          "absolute right-3 cursor-pointer rounded-md border bg-background p-1.5 text-muted-foreground opacity-0 transition-opacity hover:text-foreground focus-visible:opacity-100 group-hover:opacity-100",
          title ? "top-12" : "top-3"
        )}
      >
        {copied ? (
          <Check className="size-3.5" aria-hidden />
        ) : (
          <Copy className="size-3.5" aria-hidden />
        )}
      </button>

      <pre
        ref={preRef}
        {...props}
        className={cn("overflow-x-auto text-[13px] leading-relaxed", props.className)}
      >
        {html ? (
          <code
            className={cn("shiki block whitespace-pre", className)}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : (
          children
        )}
      </pre>
    </div>
  );
}
