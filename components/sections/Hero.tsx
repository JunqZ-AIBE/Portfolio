"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";

const NotebookScene = dynamic(
  () => import("@/components/3d/NotebookScene").then((m) => ({ default: m.NotebookScene })),
  { ssr: false }
);

export function Hero() {
  return (
    <div className="relative min-h-screen flex items-center pt-14">
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 60% 40%, rgba(74,227,181,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Left — texto */}
          <div className="flex flex-col gap-6">
            <Tag>Python · IA · Automação</Tag>

            <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-[56px] leading-[1.1] text-primary">
              Eu construo sistemas que funcionam enquanto você dorme.
            </h1>

            <p className="font-body text-[15px] text-secondary leading-relaxed max-w-md">
              Automações, agentes de IA e backends robustos.
              <br />
              De ideia a produção — sem enrolação.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <Button
                variant="primary"
                onClick={() => document.getElementById("especialidades")?.scrollIntoView({ behavior: "smooth" })}
              >
                Ver projetos
              </Button>
              <Button
                variant="ghost"
                onClick={() => document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" })}
              >
                Falar comigo
              </Button>
            </div>

            {/* Social proof sutil */}
            <div className="flex items-center gap-6 pt-4 border-t border-[var(--border)]">
              <a
                href="https://github.com/JunqZ-AIBE"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] text-muted hover:text-accent transition-colors"
              >
                GitHub ↗
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] text-muted hover:text-accent transition-colors"
              >
                LinkedIn ↗
              </a>
              <span className="font-mono text-[11px] text-muted">FIAP · ADS</span>
            </div>
          </div>

          {/* Right — 3D */}
          <div className="relative h-[380px] md:h-[460px]">
            <Suspense fallback={<div className="w-full h-full" />}>
              <NotebookScene />
            </Suspense>
          </div>

        </div>
      </div>
    </div>
  );
}
