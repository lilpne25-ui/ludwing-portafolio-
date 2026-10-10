import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const languages = Object.fromEntries(locales.map((l) => [l, new URL(`/${l}`, base).toString()]));
  return locales.flatMap((l) => [
    { url: new URL(`/${l}`, base).toString(), changeFrequency: "monthly" as const, priority: 1, alternates: { languages } },
    { url: new URL(`/${l}/resume`, base).toString(), changeFrequency: "monthly" as const, priority: 0.6 },
  ]);
}
