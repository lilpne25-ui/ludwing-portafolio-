import type { CSSProperties } from "react";
import { brandIcons } from "@/lib/brand-icons";

/** Outline glyphs for tools without a usable brand mark. 24x24, stroked. */
const glyphs: Record<string, { d: string; hex: string }> = {
  api: { hex: "#5b6b82", d: "M8 4C6 4 5 5 5 7v2c0 1-1 2-2 3 1 1 2 2 2 3v2c0 2 1 3 3 3M16 4c2 0 3 1 3 3v2c0 1 1 2 2 3-1 1-2 2-2 3v2c0 2-1 3-3 3" },
  webhook: { hex: "#c2410c", d: "M13 2 4 14h7l-1 8 9-12h-7z" },
  shield: { hex: "#0f766e", d: "M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6zM9 12l2 2 4-4" },
  sqlserver: { hex: "#b91c1c", d: "M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" },
  pervasive: { hex: "#6d28d9", d: "M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M14 15h6M17 12v6" },
  check: { hex: "#15803d", d: "M4 12.5l5 5L20 6.5" },
  window: { hex: "#1d4ed8", d: "M3 5h18v14H3zM3 9h18M6 7h.01M8.5 7h.01" },
  network: { hex: "#0369a1", d: "M10 3h4v4h-4zM3 17h4v4H3zM10 17h4v4h-4zM17 17h4v4h-4zM12 7v5M5 17v-3h14v3M12 12v5" },
  backup: { hex: "#a16207", d: "M3 12a9 9 0 1 0 2.6-6.4L3 8M3 3v5h5M12 7v5l3 2" },
  server: { hex: "#334155", d: "M4 4h16v6H4zM4 14h16v6H4zM8 7h.01M8 17h.01" },
  hexagon: { hex: "#7c3aed", d: "M12 2.5l8.2 4.75v9.5L12 21.5l-8.2-4.75v-9.5zM12 8l3.5 2v4L12 16l-3.5-2v-4z" },
  flask: { hex: "#be185d", d: "M9 3h6M10 3v6L4.2 18.6A1.6 1.6 0 0 0 5.6 21h12.8a1.6 1.6 0 0 0 1.4-2.4L14 9V3M7 15h10" },
};

const DARK = "#2a2f37";

/** Picks a readable glyph colour for a tile background. */
function ink(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 165 ? "#0b1220" : "#ffffff";
}

/** A tool shown as a small extruded tile with its mark. */
export function ToolIcon({ icon }: { icon: string }) {
  const brand = brandIcons[icon];
  const glyph = glyphs[icon];
  let hex = brand?.hex ?? glyph?.hex ?? DARK;
  if (hex === "#000000" || hex === "#181717" || hex === "#2D3748") hex = DARK;
  const fg = ink(hex);
  return (
    <span className="tool-tile" style={{ "--c": hex, "--ink": fg } as CSSProperties} aria-hidden="true">
      <svg viewBox="0 0 24 24">
        {brand ? (
          <path d={brand.path} fill={fg} />
        ) : glyph ? (
          <path d={glyph.d} fill="none" stroke={fg} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <text x="12" y="16.5" textAnchor="middle" fontSize="12" fontWeight="700" fill={fg} fontFamily="ui-sans-serif, system-ui">
            C#
          </text>
        )}
      </svg>
    </span>
  );
}
