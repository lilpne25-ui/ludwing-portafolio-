import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import "@/styles/resume.css";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  return { title: t.resume.title, alternates: { canonical: `/${lang}/resume`, languages: { en: "/en/resume", es: "/es/resume" } } };
}

/** Printable one-page resume. The PDFs in /public/resume are generated from this page (npm run resume:pdf). */
export default async function ResumePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang as Locale);

  return (
    <main className="cv">
      <header className="cv-head">
        <div>
          <h1>{site.name}</h1>
          <p className="cv-role">{t.hero.eyebrow}</p>
        </div>
        <ul className="cv-links">
          <li>
            <a href={site.github}>github.com/lilpne25-ui</a>
          </li>
          {site.email ? <li>{site.email}</li> : null}
          <li>{t.hero.facts[2]?.value}</li>
          <li className="cv-screen-only">
            <a href={t.resume.file} download>
              PDF
            </a>{" "}
            · <Link href={`/${lang}`}>{lang === "en" ? "Portfolio" : "Portafolio"}</Link>
          </li>
        </ul>
      </header>

      <p className="cv-summary">{t.hero.summary}</p>

      <section>
        <h2>{t.experience.eyebrow}</h2>
        {t.experience.items.map((r) => (
          <div className="cv-item" key={r.org}>
            <div className="cv-item-head">
              <h3>
                {r.org} <span>· {r.role}</span>
              </h3>
              {r.period ? <span className="cv-period">{r.period}</span> : null}
            </div>
            <ul>
              {r.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section>
        <h2>{t.resume.selected}</h2>
        {t.work.cases.map((c) => (
          <div className="cv-item" key={c.id}>
            <div className="cv-item-head">
              <h3>{c.title}</h3>
              <span className="cv-period">{c.status.label}</span>
            </div>
            <p>{c.impact}</p>
            <p className="cv-stack">{c.stack.join(" · ")}</p>
          </div>
        ))}
        <ul className="cv-other">
          {t.work.other.items.map((o) => (
            <li key={o.title}>
              <strong>{o.title}</strong> ({o.status}). {o.stack.join(" · ")}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>{t.resume.skills}</h2>
        <dl className="cv-skills">
          {t.stack.groups.map((g) => (
            <div key={g.title}>
              <dt>{g.title}</dt>
              <dd>{g.items.map((i) => i.name).join(", ")}</dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}
