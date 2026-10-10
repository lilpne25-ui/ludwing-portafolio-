"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Dictionary, Locale } from "@/lib/i18n";
import { MenuIcon, Monogram, ThemeIcon } from "./icons";

type Props = { t: Dictionary["nav"]; locale: Locale; other: Locale; resumeHref: string };

export function Header({ t, locale, other, resumeHref }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const toggleTheme = () => {
    const root = document.documentElement;
    const current = root.dataset.theme ?? (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    const next = current === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("lv-theme", next);
    } catch {
      /* storage unavailable: the choice lasts for this page view */
    }
  };

  const links = [
    { href: "#work", label: t.work },
    { href: "#experience", label: t.experience },
    { href: "#stack", label: t.stack },
    { href: "#contact", label: t.contact },
  ];

  return (
    <header className="header" data-scrolled={scrolled}>
      <div className="wrap header-inner">
        <Link className="brand" href={`/${locale}`} aria-label="Ludwing Valdés Reyes, home">
          <Monogram className="brand-mark" />
          <span className="brand-name">Ludwing Valdés</span>
        </Link>
        <nav className="nav" aria-label="Primary">
          {links.map((l) => (
            <a key={l.href} className="hide-sm" href={l.href}>
              {l.label}
            </a>
          ))}
          <span className="sep hide-sm" aria-hidden="true" />
          <Link className="lang" href={`/${other}`} hrefLang={other} lang={other} aria-label={t.switchAria}>
            {other.toUpperCase()}
          </Link>
          <button type="button" className="icon-btn" onClick={toggleTheme} aria-label="Toggle color theme">
            <ThemeIcon />
          </button>
          <a className="resume-link hide-sm" href={resumeHref} download>
            {t.resume}
          </a>
          <button
            type="button"
            className="icon-btn menu-btn"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.close : t.menu}
            onClick={() => setOpen((v) => !v)}
          >
            <MenuIcon />
          </button>
        </nav>
      </div>
      <div className="mobile-nav" id="mobile-nav" data-open={open}>
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
        <a href={resumeHref} download onClick={() => setOpen(false)}>
          {t.resume}
        </a>
      </div>
    </header>
  );
}
