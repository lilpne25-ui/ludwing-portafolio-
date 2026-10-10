import type { Metadata } from "next";
import "./globals.css";
import { geist, geistMono } from "@/lib/fonts";
import { themeScript } from "@/lib/theme-script";
import { NotFoundView } from "@/components/NotFoundView";

export const metadata: Metadata = {
  title: "404 · Ludwing Valdés Reyes",
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <NotFoundView locale="en" />
      </body>
    </html>
  );
}
