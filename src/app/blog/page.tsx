import { allPosts } from "content-collections";
import Link from "next/link";
import type { Metadata } from "next";
import { paginate, normalizePage } from "@/lib/pagination";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes on frontend engineering, the web platform, and the things I build.",
};

const PAGE_SIZE = 10;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const sortedPosts = [...allPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const totalPages = Math.ceil(sortedPosts.length / PAGE_SIZE);
  const { items: posts, pagination } = paginate(sortedPosts, {
    page: normalizePage(pageParam, totalPages),
    pageSize: PAGE_SIZE,
  });

  return (
    <>
      <header className="enter flex flex-col gap-2 pb-12 pt-4">
        <h1 className="font-serif text-3xl leading-tight tracking-tight">
          Writing
        </h1>
        <p className="max-w-prose text-muted-foreground">
          Notes on frontend engineering, the web platform, and the things I
          build.
        </p>
      </header>

      {posts.length > 0 ? (
        <ol className="flex flex-col border-t">
          {posts.map((post) => {
            const slug = post._meta.path.replace(/\.mdx$/, "");
            return (
              <li key={slug} className="border-b">
                <Link href={`/blog/${slug}`} className="group block py-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <h2 className="font-medium transition-colors group-hover:text-accent">
                      {post.title}
                    </h2>
                    <time
                      dateTime={post.publishedAt}
                      className="text-sm tabular-nums text-muted-foreground"
                    >
                      {formatDate(post.publishedAt)}
                    </time>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {post.summary}
                  </p>
                </Link>
              </li>
            );
          })}
        </ol>
      ) : (
        <p className="border-t py-8 text-muted-foreground">
          Nothing published yet — the first post is on its way.
        </p>
      )}

      {pagination.totalPages > 1 && (
        <nav
          aria-label="Pagination"
          className="flex items-center justify-between gap-4 py-6 text-sm"
        >
          {pagination.hasPreviousPage ? (
            <Link href={`/blog?page=${pagination.page - 1}`} className="link">
              ← Newer
            </Link>
          ) : (
            <span />
          )}
          <span className="tabular-nums text-muted-foreground">
            {pagination.page} / {pagination.totalPages}
          </span>
          {pagination.hasNextPage ? (
            <Link href={`/blog?page=${pagination.page + 1}`} className="link">
              Older →
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}
    </>
  );
}
