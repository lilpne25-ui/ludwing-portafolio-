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

/** Printable one-page resume: hierarchy over detail; the portfolio carries the full breakdown. The PDFs in /public/resume are generated from this page (npm run resume:pdf). */
export default async function ResumePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang as Locale);
  const cv = t.resume.cv;

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
          {site.email ? (
            <li>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
          ) : null}
          {site.phone ? (
            <li>
              <a href={`tel:${site.phone.tel}`}>{site.phone.display}</a>
            </li>
          ) : null}
          <li>{t.hero.facts[2]?.value}</li>
          <li className="cv-screen-only">
            <a href={t.resume.file} download>
              PDF
            </a>{" "}
            · <Link href={`/${lang}`}>{lang === "en" ? "Portfolio" : "Portafolio"}</Link>
          </li>
        </ul>
      </header>

      <section>
        <h2>{cv.profileTitle}</h2>
        <p className="cv-summary">{cv.profile}</p>
      </section>

      <section>
        <h2>{cv.experienceTitle}</h2>
        {cv.experience.map((r) => (
          <div className="cv-item" key={r.org}>
            <div className="cv-item-head">
              <h3>
                {r.org} <span>· {r.role}</span>
              </h3>
              <span className="cv-period">{r.period}</span>
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
        <h2>{cv.skillsTitle}</h2>
        <dl className="cv-skills">
          {cv.skills.map((g) => (
            <div key={g.label}>
              <dt>{g.label}</dt>
              <dd>{g.items}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section>
        <h2>{cv.projectsTitle}</h2>
        {cv.projects.map((c) => (
          <div className="cv-item" key={c.id}>
            <div className="cv-item-head">
              <h3>
                {c.title} <span>· {c.stack}</span>
              </h3>
              <span className="cv-period">{c.status}</span>
            </div>
            <dl className="cv-case">
              <div>
                <dt>{cv.goalLabel}</dt>
                <dd>{c.goal}</dd>
              </div>
              <div>
                <dt>{cv.didLabel}</dt>
                <dd>{c.did}</dd>
              </div>
              <div>
                <dt>{cv.resultLabel}</dt>
                <dd>{c.result}</dd>
              </div>
            </dl>
          </div>
        ))}
        <p className="cv-more">{cv.more}</p>
      </section>

      {cv.education.length > 0 ? (
        <section>
          <h2>{cv.educationTitle}</h2>
          <ul className="cv-other">
            {cv.education.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  );
}
