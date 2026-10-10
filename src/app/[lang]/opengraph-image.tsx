import { ImageResponse } from "next/og";
import { getDictionary, isLocale, locales } from "@/lib/i18n";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Ludwing Valdés Reyes, Software Engineer";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function OgImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getDictionary(isLocale(lang) ? lang : "en");
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between",
          padding: "72px 80px", background: "#0a0b0d", color: "#eceae4", fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="56" height="56" viewBox="0 0 32 32">
            <rect x="1" y="1" width="30" height="30" rx="8" fill="none" stroke="#2a2f36" />
            <path d="M9 8.5v15h6.2" fill="none" stroke="#eceae4" strokeWidth="2" strokeLinecap="square" />
            <path d="M15.2 8.5 19.6 23.5 24 8.5" fill="none" stroke="#a8d1ec" strokeWidth="2" strokeLinecap="square" />
          </svg>
          <div style={{ fontSize: 24, color: "#8b9198", letterSpacing: 2, textTransform: "uppercase" }}>{t.hero.eyebrow}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ fontSize: 92, fontWeight: 600, letterSpacing: -4, lineHeight: 1 }}>Ludwing Valdés Reyes</div>
          <div style={{ fontSize: 36, color: "#b9bdc2", maxWidth: 940, lineHeight: 1.25 }}>{t.hero.headline}</div>
        </div>
        <div style={{ display: "flex", gap: 28, fontSize: 24, color: "#a8d1ec" }}>
          <span>TypeScript</span><span>C# / .NET</span><span>SQL Server</span><span>PostgreSQL</span><span>Electron</span>
        </div>
      </div>
    ),
    size,
  );
}
