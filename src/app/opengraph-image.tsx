import { DATA } from "@/data/resume";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const runtime = "edge";

export const alt = `${DATA.name} — ${DATA.role}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgImage({
    title: DATA.name,
    description: DATA.description,
  });
}
