"use client";

import { useId, useState } from "react";
import type { CaseStudy, Dictionary } from "@/lib/i18n";
import { ArchitectureDiagram } from "./ArchitectureDiagram";

type Labels = Dictionary["work"]["labels"];

function List({ items }: { items: string[] }) {
  return (
    <ul className="list">
      {items.map((x) => (
        <li key={x}>{x}</li>
      ))}
    </ul>
  );
}

/** One engineering case: summary and diagram up front, the full write-up behind a disclosure. */
export function CaseStudyCard({ c, L }: { c: CaseStudy; L: Labels }) {
  const [open, setOpen] = useState(false);
  const detailId = useId();
  const titleId = `case-title-${c.id}`;

  return (
    <article className="case" id={`case-${c.id}`} aria-labelledby={titleId}>
      <div className="case-top">
        <div className="case-intro">
          <span className="eyebrow">{c.kicker}</span>
          <h3 id={titleId}>{c.title}</h3>
          <div className="case-meta">
            <span className="status" data-tone={c.status.tone}>
              <span className="sr-only">{L.status}: </span>
              {c.status.label}
            </span>
          </div>
          <p className="summary">{c.summary}</p>
          <div className="case-block">
            <span className="eyebrow">{L.problem}</span>
            <p>{c.problem}</p>
          </div>
          <ul className="chips" aria-label={L.stack} style={{ listStyle: "none" }}>
            {c.stack.map((s) => (
              <li key={s} className="chip">
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="case-diagram">
          <span className="eyebrow">{L.diagram}</span>
          <ArchitectureDiagram diagram={c.diagram} title={`${L.diagram}: ${c.title}`} hint={L.diagramHint} />
        </div>
      </div>

      <button type="button" className="case-toggle" aria-expanded={open} aria-controls={detailId} onClick={() => setOpen((v) => !v)}>
        <span>{open ? L.collapse : L.open}</span>
        <span className="plus" aria-hidden="true" />
      </button>

      <div className="case-detail" id={detailId} data-open={open} inert={!open}>
        <div className="inner">
          <div className="grid">
            <section>
              <h4>{L.context}</h4>
              <List items={c.context} />
            </section>
            <section>
              <h4>{L.approach}</h4>
              <p>{c.approach}</p>
            </section>
            <section className="full">
              <h4>{L.decisions}</h4>
              <div className="decisions">
                {c.decisions.map((d) => (
                  <div className="decision" key={d.choice}>
                    <div className="choice">{d.choice}</div>
                    <div className="why">{d.why}</div>
                    <div className="alt">
                      <span>{L.alternative}</span>
                      {d.alternative}
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h4>{L.implemented}</h4>
              <List items={c.implemented} />
            </section>
            <section>
              <h4>{L.evidence}</h4>
              <List items={c.evidence} />
            </section>
            <section>
              <h4>{L.next}</h4>
              <List items={c.next} />
            </section>
            <section>
              <h4>{L.learned}</h4>
              <p className="learned">{c.learned}</p>
            </section>
          </div>
        </div>
      </div>
    </article>
  );
}
