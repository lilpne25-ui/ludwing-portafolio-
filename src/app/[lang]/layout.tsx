import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { geist, geistMono } from "@/lib/fonts";
import { getDictionary, isLocale, locales } from "@/lib/i18n";
import { site, siteUrl } from "@/lib/site";
import { themeScript } from "@/lib/theme-script";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    metadataBase: siteUrl(),
    title: { default: t.meta.title, template: `%s · ${site.name}` },
    description: t.meta.description,
    authors: [{ name: site.name, url: site.github }],
    creator: site.name,
    alternates: {
      canonical: `/${lang}`,
      languages: { en: "/en", es: "/es", "x-default": "/en" },
    },
    openGraph: {
      type: "profile",
      title: t.meta.title,
      description: t.meta.description,
      url: `/${lang}`,
      siteName: site.name,
      locale: lang === "en" ? "en_US" : "es_MX",
      alternateLocale: lang === "en" ? ["es_MX"] : ["en_US"],
      firstName: "Ludwing",
      lastName: "Valdés Reyes",
    },
    twitter: { card: "summary_large_image", title: t.meta.title, description: t.meta.description },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0b0d" },
    { media: "(prefers-color-scheme: light)", color: "#f5f5f2" },
  ],
  colorScheme: "dark light",
};

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <html lang={lang} className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
