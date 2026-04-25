import { allPosts } from "content-collections";
import Link from "next/link";
import type { Metadata } from "next";
import { paginate, normalizePage } from "@/lib/pagination";
import { ArrowRight } from "lucide-react";
import BlogPostTitle from "@/components/blog-post-title";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on software development, life, and more.",
};

const PAGE_SIZE = 5;

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
  const currentPage = normalizePage(pageParam, totalPages);
  const { items: paginatedPosts, pagination } = paginate(sortedPosts, {
    page: currentPage,
    pageSize: PAGE_SIZE,
  });

  return (
    <main className="min-h-[calc(100vh-48px)]">
      {/* Header */}
      <div className="border-b-2 border-foreground px-6 lg:px-12 py-10 grid-bg">
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-4">
          Writing
        </span>
        <h1 className="font-bold uppercase tracking-tighter leading-none"
          style={{ fontSize: "clamp(48px, 8vw, 96px)" }}>
          Blog
        </h1>
        <p className="font-mono text-sm text-muted-foreground mt-4">
          {sortedPosts.length} post{sortedPosts.length !== 1 ? "s" : ""} — thoughts on software &amp; more
        </p>
      </div>

      {/* Posts */}
      {paginatedPosts.length > 0 ? (
        <div>
          {paginatedPosts.map((post, id) => {
            const slug = post._meta.path.replace(/\.mdx$/, "");
            const num = (pagination.page - 1) * PAGE_SIZE + id + 1;
            return (
              <Link
                key={slug}
                href={`/blog/${slug}`}
                className="flex items-start gap-6 px-6 lg:px-12 py-8 border-b-2 border-foreground group hover:bg-foreground hover:text-background transition-colors"
              >
                <span className="font-mono text-xs font-bold text-muted-foreground group-hover:text-background/60 mt-1.5 flex-shrink-0">
                  {String(num).padStart(2, "0")}
                </span>
                <div className="flex-1 flex flex-col gap-2">
                  <div className="font-bold text-xl uppercase tracking-tight leading-tight">
                    <BlogPostTitle title={post.title} />
                  </div>
                  <span className="font-mono text-xs text-muted-foreground group-hover:text-background/60">
                    {post.publishedAt}
                  </span>
                </div>
                <ArrowRight className="size-5 mt-1 flex-shrink-0 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
              </Link>
            );
          })}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between px-6 lg:px-12 py-6 border-b-2 border-foreground">
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                Page {pagination.page} / {pagination.totalPages}
              </span>
              <div className="flex gap-0">
                {pagination.hasPreviousPage ? (
                  <Link
                    href={`/blog?page=${pagination.page - 1}`}
                    className="font-mono text-xs font-bold uppercase tracking-widest border-2 border-foreground px-4 py-2 hover:bg-foreground hover:text-background transition-colors"
                  >
                    ← Prev
                  </Link>
                ) : null}
                {pagination.hasNextPage ? (
                  <Link
                    href={`/blog?page=${pagination.page + 1}`}
                    className="font-mono text-xs font-bold uppercase tracking-widest border-2 border-foreground px-4 py-2 -ml-[2px] hover:bg-foreground hover:text-background transition-colors"
                  >
                    Next →
                  </Link>
                ) : null}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="px-6 lg:px-12 py-24 border-b-2 border-foreground">
          <p className="font-mono text-sm text-muted-foreground uppercase tracking-widest">
            No posts yet — check back soon.
          </p>
        </div>
      )}
    </main>
  );
}
