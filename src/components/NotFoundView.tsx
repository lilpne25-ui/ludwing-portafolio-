import Link from "next/link";
import { getDictionary, type Locale } from "@/lib/i18n";
import { Monogram } from "./icons";

export function NotFoundView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).notFound;
  const es = getDictionary("es").notFound;
  return (
    <main className="wrap nf">
      <Link href="/en" className="brand" aria-label="Ludwing Valdés Reyes, home">
        <Monogram className="brand-mark" />
        <span className="brand-name">Ludwing Valdés</span>
      </Link>
      <span className="code">{t.code}</span>
      <h1>{t.title}</h1>
      <p>
        {t.text} <span lang="es">{es.text}</span>
      </p>
      <div className="hero-actions">
        <Link className="btn btn-primary" href="/en">
          {t.home}
        </Link>
        <Link className="btn" href="/es" lang="es">
          {es.home}
        </Link>
      </div>
    </main>
  );
}
