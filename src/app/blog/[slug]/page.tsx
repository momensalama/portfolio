import { allPosts } from "content-collections";
import { formatDate } from "@/lib/utils";
import { DATA } from "@/data/resume";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXContent } from "@content-collections/mdx/react";
import { mdxComponents } from "@/mdx-components";
import Link from "next/link";

function getSortedPosts() {
  return [...allPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

const getSlug = (post: { _meta: { path: string } }) =>
  post._meta.path.replace(/\.mdx$/, "");

export async function generateStaticParams() {
  return allPosts.map((post) => ({ slug: getSlug(post) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> {
  const { slug } = await params;
  const post = allPosts.find((p) => getSlug(p) === slug);

  if (!post) return undefined;

  const { title, publishedAt: publishedTime, summary: description, image } = post;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${DATA.url}/blog/${slug}`,
      ...(image && { images: [{ url: `${DATA.url}${image}` }] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image && { images: [`${DATA.url}${image}`] }),
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sortedPosts = getSortedPosts();
  const currentIndex = sortedPosts.findIndex((p) => getSlug(p) === slug);
  const post = sortedPosts[currentIndex];

  if (!post) {
    notFound();
  }

  const newerPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;
  const olderPost =
    currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null;

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    description: post.summary,
    image: post.image
      ? `${DATA.url}${post.image}`
      : `${DATA.url}/blog/${slug}/opengraph-image`,
    url: `${DATA.url}/blog/${slug}`,
    author: { "@type": "Person", name: DATA.name },
  }).replace(/</g, "\\u003c");

  return (
    <article className="pt-4">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <header className="flex flex-col gap-3 pb-10">
        <Link
          href="/blog"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Writing
        </Link>
        <h1 className="font-serif text-3xl leading-tight tracking-tight">
          {post.title}
        </h1>
        <time
          dateTime={post.publishedAt}
          className="text-sm text-muted-foreground"
        >
          {formatDate(post.publishedAt)}
        </time>
      </header>

      <div className="prose max-w-none border-t pt-10">
        <MDXContent code={post.mdx} components={mdxComponents} />
      </div>

      {(newerPost || olderPost) && (
        <nav
          aria-label="More posts"
          className="mt-14 flex flex-col gap-6 border-t pt-8 text-sm sm:flex-row sm:justify-between"
        >
          {newerPost && (
            <Link href={`/blog/${getSlug(newerPost)}`} className="group max-w-[20rem]">
              <span className="block text-muted-foreground">← Newer</span>
              <span className="transition-colors group-hover:text-accent">
                {newerPost.title}
              </span>
            </Link>
          )}
          {olderPost && (
            <Link
              href={`/blog/${getSlug(olderPost)}`}
              className="group max-w-[20rem] sm:ml-auto sm:text-right"
            >
              <span className="block text-muted-foreground">Older →</span>
              <span className="transition-colors group-hover:text-accent">
                {olderPost.title}
              </span>
            </Link>
          )}
        </nav>
      )}
    </article>
  );
}
