"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Especialidades", href: "#especialidades" },
  { label: "AI Demo", href: "#ai-demo" },
  { label: "Radar", href: "#radar" },
  { label: "Contato", href: "#contato" },
];

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "backdrop-blur-md border-b border-[var(--border)]"
          : "bg-transparent"
      )}
      style={scrolled ? { backgroundColor: "rgba(12, 12, 14, 0.90)" } : undefined}
    >
      <nav className="max-w-6xl mx-auto px-6 md:px-12 h-14 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="font-display font-bold text-[15px] text-primary tracking-tight hover:text-accent transition-colors"
        >
          Junqueira.dev
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-body text-[13px] text-secondary hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contato"
          className="hidden md:inline-flex items-center gap-1 bg-accent text-bg font-display font-bold text-[12px] px-3 py-[6px] rounded-full hover:brightness-110 transition-all"
        >
          Falar agora →
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-secondary hover:text-primary transition-colors"
          aria-label="Menu"
        >
          <span className="block w-5 h-[1.5px] bg-current mb-1" />
          <span className="block w-5 h-[1.5px] bg-current mb-1" />
          <span className="block w-5 h-[1.5px] bg-current" />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-bg/95 backdrop-blur-md border-t border-[var(--border)] px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-body text-[14px] text-secondary hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contato"
            onClick={() => setMenuOpen(false)}
            className="inline-flex items-center gap-1 bg-accent text-bg font-display font-bold text-[12px] px-3 py-[6px] rounded-full w-fit"
          >
            Falar agora →
          </a>
        </div>
      )}
    </header>
  );
}
