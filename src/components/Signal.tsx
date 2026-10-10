import type { Dictionary } from "@/lib/i18n";

type S = Dictionary["hero"]["signal"];

function Node({ x, y, w, title, sub, core }: { x: number; y: number; w: number; title: string; sub: string; core?: boolean }) {
  return (
    <g className={core ? "sig-node core" : "sig-node"}>
      <rect x={x} y={y} width={w} height={58} rx={10} />
      <text x={x + 14} y={y + 25}>{title}</text>
      <text className="sub" x={x + 14} y={y + 43}>{sub}</text>
    </g>
  );
}

/** Hero schematic: two sources feed an integration layer that writes to the database. Illustrative only. */
export function Signal({ s, caption }: { s: S; caption: string }) {
  const p1 = "M150 49 C 175 49, 170 151, 196 151";
  const p2 = "M150 271 C 175 271, 170 169, 196 169";
  const p3 = "M346 160 L 372 160";
  return (
    <figure className="signal" style={{ margin: 0 }}>
      <svg viewBox="0 0 520 330" role="img" aria-label={`${s.floor}, ${s.office} → ${s.core} → ${s.db}`}>
        {[p1, p2, p3].map((d) => (
          <path key={d} className="sig-line" d={d} />
        ))}
        {[p1, p2, p3].map((d) => (
          <path key={`f${d}`} className="sig-flow" d={d} />
        ))}
        {[p1, p2, p3].map((d, i) => (
          <circle key={`k${d}`} className="sig-packet" r={3.2}>
            <animateMotion dur={i === 2 ? "1.6s" : "2.6s"} begin={`${i * 0.7}s`} repeatCount="indefinite" path={d} />
          </circle>
        ))}
        <text className="sig-tag" x={2} y={104}>↓ {s.t1}</text>
        <text className="sig-tag" x={2} y={228}>↑ {s.t2}</text>
        <text className="sig-tag" x={372} y={214}>← {s.t3}</text>
        <Node x={0} y={20} w={150} title={s.floor} sub={s.floorSub} />
        <Node x={0} y={242} w={150} title={s.office} sub={s.officeSub} />
        <Node x={196} y={131} w={150} title={s.core} sub={s.coreSub} core />
        <Node x={372} y={131} w={146} title={s.db} sub={s.dbSub} />
        <line className="sig-line" x1={0} y1={326} x2={518} y2={326} strokeDasharray="1 5" />
      </svg>
      <figcaption className="caption">{caption}</figcaption>
    </figure>
  );
}
