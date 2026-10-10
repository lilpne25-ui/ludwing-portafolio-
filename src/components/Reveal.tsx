"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type Props = { as?: ElementType; className?: string; children: ReactNode; id?: string };

/**
 * Fades content in as it scrolls into view. Content renders visible on the server and
 * is only hidden when it starts below the fold, so no-JS and reduced-motion users see everything.
 */
export function Reveal({ as: Tag = "div", className = "", children, id }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    el.dataset.shown = "false";
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.dataset.shown = "true";
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} id={id} className={`reveal ${className}`.trim()}>
      {children}
    </Tag>
  );
}
