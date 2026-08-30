import { ImageResponse } from "next/og";
import { DATA } from "@/data/resume";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

async function loadFonts() {
  try {
    const [body, display] = await Promise.all([
      fetch(
        new URL("../../public/fonts/CabinetGrotesk-Medium.ttf", import.meta.url)
      ).then((res) => res.arrayBuffer()),
      fetch(
        new URL("../../public/fonts/ClashDisplay-Semibold.ttf", import.meta.url)
      ).then((res) => res.arrayBuffer()),
    ]);
    return [
      { name: "Cabinet Grotesk", data: body, weight: 400 as const, style: "normal" as const },
      { name: "Clash Display", data: display, weight: 600 as const, style: "normal" as const },
    ];
  } catch (error) {
    console.error("OG font loading failed:", error);
    return undefined;
  }
}

export async function renderOgImage({
  title,
  description,
  meta,
}: {
  title: string;
  description?: string;
  meta?: string;
}) {
  const fonts = await loadFonts();

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          width: "100%",
          padding: "80px",
          backgroundColor: "#fdfcfa",
          color: "#1a1917",
          fontFamily: "Cabinet Grotesk",
        }}
      >
        <div style={{ display: "flex", fontSize: "26px", color: "#6b685f" }}>
          {DATA.name} — {DATA.role}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontFamily: "Clash Display",
              fontSize: title.length > 48 ? "64px" : "80px",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              maxWidth: "960px",
            }}
          >
            {title}
          </div>
          {description && (
            <div
              style={{
                display: "flex",
                marginTop: "28px",
                fontSize: "28px",
                lineHeight: 1.45,
                color: "#6b685f",
                maxWidth: "860px",
              }}
            >
              {description}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #e5e1d8",
            paddingTop: "28px",
            fontSize: "24px",
            color: "#6b685f",
          }}
        >
          <span>{meta ?? DATA.location}</span>
          <span style={{ color: "#a8492a" }}>
            {DATA.url.replace(/^https?:\/\//, "")}
          </span>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts }
  );
}
