import { notFound } from "next/navigation";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { CountUp } from "@/components/CountUp";
import { ViewSwitch } from "@/components/ViewSwitch";
import { Header } from "@/components/Header";
import { ArrowIcon, DownloadIcon, GitHubIcon } from "@/components/icons";
import { Reveal } from "@/components/Reveal";
import { Signal } from "@/components/Signal";
import { ToolIcon } from "@/components/ToolIcon";
import { getDictionary, isLocale, otherLocale } from "@/lib/i18n";
import { site, siteUrl } from "@/lib/site";

/** Seconds as m:ss, or "N s" under a minute. */
function fmtTime(sec: number) {
  return sec < 60 ? `${sec} s` : `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`;
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  const resumeHref = t.resume.file;
  const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: lang === "en" ? "Software Engineer" : "Ingeniero de Software",
    url: new URL(`/${lang}`, siteUrl()).toString(),
    sameAs: [site.github],
    nationality: "Mexico",
    knowsAbout: t.stack.groups.flatMap((g) => g.items.map((i) => i.name)).slice(0, 12),
  };

  return (
    <>
      <a className="skip" href="#main">
        {t.nav.skip}
      </a>
      <Header t={t.nav} locale={lang} other={otherLocale(lang)} resumeHref={resumeHref} />
      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-name">
          <div className="wrap">
            <div className="hero-grid">
              <div className="hero-copy">
                <span className="eyebrow">{t.hero.eyebrow}</span>
                <h1 className="hero-name" id="hero-name">
                  <span>Ludwing</span>
                  <span className="last">Valdés Reyes</span>
                </h1>
                <p className="hero-headline">{t.hero.headline}</p>
                <p className="hero-summary">{t.hero.summary}</p>
                <div className="hero-actions">
                  <a className="btn btn-primary" href="#work">
                    {t.hero.ctaWork} <ArrowIcon />
                  </a>
                  <a className="btn" href={resumeHref} download>
                    {t.hero.ctaResume} <DownloadIcon />
                  </a>
                  <span className="hero-links">
                    <a className="text-link" href={site.github} {...ext}>
                      <GitHubIcon size={14} /> {t.hero.github}
                    </a>
                    <a className="text-link" href="#contact">
                      {t.hero.contact}
                    </a>
                  </span>
                </div>
              </div>
              <Signal s={t.hero.signal} caption={t.hero.diagramCaption} />
            </div>
            <dl className="facts">
              {t.hero.facts.map((f) => (
                <div className="fact" key={f.label}>
                  <dt className="eyebrow">{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="impact" aria-labelledby="impact-title">
          <div className="wrap">
            <Reveal className="impact-head">
              <span className="eyebrow">{t.impact.eyebrow}</span>
              <h2 id="impact-title">{t.impact.title}</h2>
            </Reveal>
            <Reveal as="ul" className="impact-grid">
              {t.impact.items.map((i) => (
                <li className="impact-item" key={i.label}>
                  <CountUp className="impact-value" value={i.value} />
                  <span className="impact-label">{i.label}</span>
                  <span className="impact-detail">{i.detail}</span>
                </li>
              ))}
            </Reveal>
            <Reveal className="compare">
              <h3>{t.impact.compare.title}</h3>
              <ul>
                {t.impact.compare.rows.map((r) => (
                  <li key={r.label}>
                    <span className="cmp-label">{r.label}</span>
                    <div className="cmp-bars">
                      <div className="cmp-row">
                        <span className="cmp-tag">{t.impact.compare.before}</span>
                        <span className="cmp-track">
                          <span className="cmp-fill before" style={{ width: "100%" }} />
                        </span>
                        <span className="cmp-val">{fmtTime(r.before)}</span>
                      </div>
                      <div className="cmp-row">
                        <span className="cmp-tag">{t.impact.compare.after}</span>
                        <span className="cmp-track">
                          <span className="cmp-fill after" style={{ width: `${Math.max(3, (r.after / r.before) * 100)}%` }} />
                        </span>
                        <span className="cmp-val">
                          {fmtTime(r.after)} <em>−{Math.round((1 - r.after / r.before) * 100)}%</em>
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
            <p className="impact-note">{t.impact.note}</p>
          </div>
        </section>

        <section className="section" id="work" aria-labelledby="work-title">
          <div className="wrap">
            <Reveal className="section-head">
              <span className="eyebrow">{t.work.eyebrow}</span>
              <div>
                <h2 id="work-title">{t.work.title}</h2>
                <p className="lede">{t.work.intro}</p>
              </div>
            </Reveal>
            <ViewSwitch L={t.work.labels}>
              {t.work.cases.map((c) => (
                <Reveal key={c.id}>
                  <CaseStudyCard c={c} L={t.work.labels} />
                </Reveal>
              ))}
            </ViewSwitch>
            <Reveal className="other">
              <div className="other-head">
                <h3>{t.work.other.title}</h3>
                <p>{t.work.other.intro}</p>
              </div>
              <ul className="other-list">
                {t.work.other.items.map((o) => (
                  <li className="other-item" key={o.title}>
                    <span className="tag">{o.status}</span>
                    <h4>{o.title}</h4>
                    <p>{o.text}</p>
                    <div className="chips">
                      {o.stack.map((s) => (
                        <span className="chip" key={s}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <section className="section" aria-labelledby="principles-title">
          <div className="wrap">
            <Reveal className="section-head">
              <span className="eyebrow">{t.principles.eyebrow}</span>
              <div>
                <h2 id="principles-title">{t.principles.title}</h2>
              </div>
            </Reveal>
            <Reveal as="ul" className="principles">
              {t.principles.items.map((p) => (
                <li className="principle" key={p.title}>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </li>
              ))}
            </Reveal>
          </div>
        </section>

        <section className="section" id="experience" aria-labelledby="experience-title">
          <div className="wrap">
            <Reveal className="section-head">
              <span className="eyebrow">{t.experience.eyebrow}</span>
              <div>
                <h2 id="experience-title">{t.experience.title}</h2>
              </div>
            </Reveal>
            <ol className="timeline">
              {t.experience.items.map((r) => (
                <Reveal as="li" className="role" key={r.org}>
                  <div className="role-head">
                    <h3>{r.org}</h3>
                    <span className="r">{r.role}</span>
                    {r.period ? <span className="period">{r.period}</span> : null}
                  </div>
                  <div className="role-body">
                    <p>{r.summary}</p>
                    <ul className="list">
                      {r.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        <section className="section" id="stack" aria-labelledby="stack-title">
          <div className="wrap">
            <Reveal className="section-head">
              <span className="eyebrow">{t.stack.eyebrow}</span>
              <div>
                <h2 id="stack-title">{t.stack.title}</h2>
              </div>
            </Reveal>
            <Reveal className="stack-grid">
              {t.stack.groups.map((g) => (
                <div className="stack-group" key={g.title}>
                  <h3>{g.title}</h3>
                  <ul>
                    {g.items.map((i) => (
                      <li key={i.name}>
                        <ToolIcon icon={i.icon} />
                        <span>{i.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </Reveal>
            <p className="stack-note">{t.stack.note}</p>
          </div>
        </section>

        <section className="contact" id="contact" aria-labelledby="contact-title">
          <Reveal className="wrap">
            <span className="eyebrow">{t.contact.eyebrow}</span>
            <h2 id="contact-title">{t.contact.title}</h2>
            <p>{t.contact.text}</p>
            <div className="contact-actions">
              <a className="btn btn-primary" href={site.github} {...ext}>
                <GitHubIcon /> {t.contact.github}
              </a>
              {site.email ? (
                <a className="btn" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              ) : null}
              <a className="btn" href={resumeHref} download>
                {t.contact.resume} <DownloadIcon />
              </a>
            </div>
          </Reveal>
        </section>
      </main>
      <footer className="footer">
        <div className="wrap footer-inner">
          <span>
            © {new Date().getFullYear()} {site.name}. {t.footer.note}
          </span>
          <a href="#top">{t.footer.top}</a>
        </div>
      </footer>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd).replace(/</g, "\\u003c") }} />
    </>
  );
}
