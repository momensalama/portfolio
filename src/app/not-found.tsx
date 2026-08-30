import Link from "next/link";

export default function NotFound() {
  return (
    <section className="enter flex flex-col gap-4 py-24">
      <p className="text-sm text-muted-foreground">404</p>
      <h1 className="font-serif text-3xl leading-tight tracking-tight">
        This page doesn&apos;t exist
      </h1>
      <p className="max-w-prose text-muted-foreground">
        The link may be broken, or the page may have moved.
      </p>
      <Link href="/" className="link w-fit">
        Back home
      </Link>
    </section>
  );
}
