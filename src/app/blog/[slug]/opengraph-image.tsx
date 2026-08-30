import { allPosts } from "content-collections";
import { formatDate } from "@/lib/utils";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const runtime = "edge";

export const alt = "Blog post";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = allPosts.find((p) => p._meta.path.replace(/\.mdx$/, "") === slug);

  return renderOgImage({
    title: post?.title ?? "Writing",
    description: post?.summary,
    meta: post ? formatDate(post.publishedAt) : undefined,
  });
}
