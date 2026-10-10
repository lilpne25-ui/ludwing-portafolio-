import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#0a0b0d" }}>
        <svg width="180" height="180" viewBox="0 0 32 32">
          <path d="M9 8.5v15h6.2" fill="none" stroke="#eceae4" strokeWidth="2" strokeLinecap="square" />
          <path d="M15.2 8.5 19.6 23.5 24 8.5" fill="none" stroke="#a8d1ec" strokeWidth="2" strokeLinecap="square" />
        </svg>
      </div>
    ),
    size,
  );
}
