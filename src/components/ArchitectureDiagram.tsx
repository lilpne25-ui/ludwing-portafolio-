"use client";

import { useState } from "react";
import type { CaseStudy } from "@/lib/i18n";

const W = 680;
const H = 300;
const NW = 140;
const NH = 56;

type Diagram = CaseStudy["diagram"];
type DNode = Diagram["nodes"][number];

const pos = (n: DNode) => ({ x: 6 + n.col * ((W - 12 - NW) / 3), y: 14 + n.row * ((H - 28 - NH) / 2) });

function edgePath(a: DNode, b: DNode) {
  const A = pos(a);
  const B = pos(b);
  if (a.col === b.col) {
    const x = A.x + NW / 2;
    const down = B.y > A.y;
    return `M${x} ${down ? A.y + NH : A.y} L${x} ${down ? B.y : B.y + NH}`;
  }
  const x1 = A.x + NW;
  const y1 = A.y + NH / 2;
  const x2 = B.x;
  const y2 = B.y + NH / 2;
  const mx = (x1 + x2) / 2;
  return `M${x1} ${y1} L${mx} ${y1} L${mx} ${y2} L${x2} ${y2}`;
}

/** Schematic architecture diagram. Nodes are keyboard-focusable buttons; the note below explains the selection. */
export function ArchitectureDiagram({ diagram, title, hint }: { diagram: Diagram; title: string; hint: string }) {
  const first = diagram.nodes[0];
  const [active, setActive] = useState<string | undefined>(first?.id);
  const byId = new Map(diagram.nodes.map((n) => [n.id, n]));
  const selected = active ? byId.get(active) : undefined;

  return (
    <>
      <div className="diagram-scroll">
        <svg className="diagram" viewBox={`0 0 ${W} ${H}`} role="group" aria-label={title}>
          {diagram.edges.map(([a, b]) => {
            const na = a ? byId.get(a) : undefined;
            const nb = b ? byId.get(b) : undefined;
            if (!na || !nb) return null;
            const d = edgePath(na, nb);
            const on = active === a || active === b;
            return (
              <g key={`${a}-${b}`}>
                <path className="d-edge" d={d} />
                <path className={on ? "d-edge flow on" : "d-edge flow"} d={d} />
              </g>
            );
          })}
          {diagram.nodes.map((n) => {
            const p = pos(n);
            const select = () => setActive(n.id);
            return (
              <g
                key={n.id}
                className="d-node"
                tabIndex={0}
                role="button"
                aria-pressed={active === n.id}
                aria-label={`${n.label}: ${n.note}`}
                onClick={select}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    select();
                  }
                }}
              >
                <rect x={p.x} y={p.y} width={NW} height={NH} rx={10} />
                <text x={p.x + 14} y={p.y + 24}>{n.label}</text>
                <text className="sub" x={p.x + 14} y={p.y + 41}>{n.sub}</text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="d-note" aria-live="polite">
        {selected && (
          <>
            <strong>{selected.label}</strong>
            <span>{selected.note}</span>
          </>
        )}
      </div>
      <span className="d-hint">{hint}</span>
    </>
  );
}
