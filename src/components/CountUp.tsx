"use client";

import { useEffect, useRef } from "react";

const NUM = /^([^\d]*)(\d[\d,]*)(.*)$/;

/**
 * Counts a figure up from zero the first time it scrolls into view. The server renders the
 * final value, so no-JS and reduced-motion visitors always see the real number.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const m = NUM.exec(value);
    if (!el || !m || /[:→]/.test(value)) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const [, pre = "", digits = "0", post = ""] = m;
    const target = Number(digits.replace(/,/g, ""));
    const fmt = (n: number) => pre + (digits.includes(",") ? n.toLocaleString("en-US") : String(n)) + post;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / 1400);
          el.textContent = fmt(Math.round(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        el.textContent = fmt(0);
        raf = requestAnimationFrame(tick);
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      el.textContent = value;
    };
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
