import Link from "next/link";
import Screensaver from "@/components/fancy/screensaver";

export default function NotFound() {
  return (
    <div className="grid-bg min-h-[calc(100vh-48px)] flex flex-col items-start justify-between p-6 lg:p-12 border-b-2 border-foreground">
      <span className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground">
        Error / 404
      </span>

      {/* Bouncing 404 */}
      <div className="w-full h-48 relative border-2 border-foreground my-12">
        <Screensaver speed={2.5}>
          <span className="font-mono font-black text-6xl text-accent select-none">404</span>
        </Screensaver>
      </div>

      <div className="flex flex-col gap-6">
        <h1 className="font-bold uppercase tracking-tighter leading-none"
          style={{ fontSize: "clamp(48px, 8vw, 100px)" }}>
          Not<br />Found
        </h1>
        <p className="font-mono text-sm text-muted-foreground max-w-xs">
          This page doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="font-mono text-sm font-bold uppercase tracking-widest border-2 border-foreground px-6 py-3 w-fit hover:bg-foreground hover:text-background transition-colors"
        >
          ← Go Home
        </Link>
      </div>
    </div>
  );
}


