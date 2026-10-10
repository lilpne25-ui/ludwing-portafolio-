import en from "@/content/en.json";
import es from "@/content/es.json";

export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export type Dictionary = typeof en;
export type CaseStudy = Dictionary["work"]["cases"][number];

// es.json must keep the same shape as en.json; this assignment fails the type check if it drifts.
const dictionaries: Record<Locale, Dictionary> = { en, es: es satisfies Dictionary };

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "es" : "en";
}
