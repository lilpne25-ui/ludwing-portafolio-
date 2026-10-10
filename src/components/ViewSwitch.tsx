"use client";

import { useState, type ReactNode } from "react";
import type { Dictionary } from "@/lib/i18n";

type View = "business" | "tech";
type Labels = Dictionary["work"]["labels"];

/** Lets the reader switch every case between a plain-language and a technical reading. */
export function ViewSwitch({ L, children }: { L: Labels; children: ReactNode }) {
  const [view, setView] = useState<View>("business");

  const choose = (v: View) => setView(v);

  return (
    <>
      <div className="view-switch" role="group" aria-label={L.view}>
        <span className="view-label">{L.view}</span>
        <div className="view-pill" data-view={view}>
          <button type="button" aria-pressed={view === "business"} onClick={() => choose("business")}>
            {L.viewBusiness}
          </button>
          <button type="button" aria-pressed={view === "tech"} onClick={() => choose("tech")}>
            {L.viewTech}
          </button>
        </div>
      </div>
      <div className="cases" data-view={view}>
        {children}
      </div>
    </>
  );
}
