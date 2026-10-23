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

/**
 * Printable one-page resume, laid out for applicant tracking systems: one column, standard section
 * headings, plain-text contact details and labels, no tables or side-by-side columns. The portfolio
 * carries the full breakdown. The PDFs in /public/resume are generated from this page (npm run resume:pdf).
 */
export default async function ResumePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang as Locale);
  const cv = t.resume.cv;
  const contact = [site.email, site.phone?.display, t.hero.facts[2]?.value].filter(Boolean).join(" | ");

  return (
    <main className="cv">
      <header className="cv-head">
        <h1>{site.name}</h1>
        <p className="cv-role">{t.hero.eyebrow}</p>
        <p className="cv-contact">{contact}</p>
        <p className="cv-contact">
          {cv.portfolioTitle}: <a href={cv.portfolioUrl}>{cv.portfolioUrl}</a> | GitHub:{" "}
          <a href={site.github}>{site.github}</a>
        </p>
        <p className="cv-screen-only">
          <a href={t.resume.file} download>
            PDF
          </a>{" "}
          · <Link href={`/${lang}`}>{lang === "en" ? "Site" : "Sitio"}</Link>
        </p>
      </header>

      <section>
        <h2>{cv.profileTitle}</h2>
        <p>{cv.profile}</p>
      </section>

      <section>
        <h2>{cv.experienceTitle}</h2>
        {cv.experience.map((r) => (
          <div className="cv-item" key={r.org}>
            <h3>{r.role}</h3>
            <p className="cv-meta">
              {r.org} | {r.period}
            </p>
            <ul>
              {r.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section>
        <h2>{cv.skillsTitle}</h2>
        <ul className="cv-plain">
          {cv.skills.map((g) => (
            <li key={g.label}>
              <strong>{g.label}:</strong> {g.items}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>{cv.projectsTitle}</h2>
        {cv.projects.map((c) => (
          <div className="cv-item" key={c.id}>
            <h3>{c.title}</h3>
            <p className="cv-meta">
              {c.status} | {cv.stackLabel}: {c.stack.replaceAll(" · ", ", ")}
            </p>
            <ul>
              <li>
                <strong>{cv.goalLabel}:</strong> {c.goal}
              </li>
              <li>
                <strong>{cv.didLabel}:</strong> {c.did}
              </li>
              <li>
                <strong>{cv.resultLabel}:</strong> {c.result}
              </li>
            </ul>
          </div>
        ))}
        <p>{cv.more}</p>
      </section>

      <section>
        <h2>{cv.portfolioTitle}</h2>
        <p>
          {cv.portfolioText} <a href={cv.portfolioUrl}>{cv.portfolioUrl}</a>
        </p>
      </section>

      {cv.education.length > 0 ? (
        <section>
          <h2>{cv.educationTitle}</h2>
          <ul>
            {cv.education.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  );
}
