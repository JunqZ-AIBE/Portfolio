"use client";

import { useState } from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";

type FormStatus = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus("loading");

    try {
      const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL;

      if (webhookUrl) {
        const res = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error("Webhook error");
      }

      // Fallback: se não tem webhook, só simula sucesso
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full bg-[var(--surface)] border border-[var(--border)] rounded-lg px-4 py-3 font-body text-[14px] text-primary placeholder:text-muted outline-none focus:border-accent transition-colors";

  return (
    <SectionWrapper id="contato" className="py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

        {/* Left — copy */}
        <div>
          <p className="font-mono text-[11px] text-accent tracking-[0.14em] uppercase mb-3">
            Vamos conversar
          </p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-primary mb-6 leading-tight">
            Tem um problema para resolver?
          </h2>
          <p className="font-body text-[14px] text-secondary leading-relaxed mb-8">
            Me conta o contexto. Respondo em até 24h.
            <br />
            Sem compromisso, sem papo de vendedor.
          </p>

          <div className="flex flex-col gap-3">
            <a
              href="https://github.com/JunqZ-AIBE"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[12px] text-muted hover:text-accent transition-colors"
            >
              github.com/JunqZ-AIBE ↗
            </a>
            <span className="font-mono text-[12px] text-muted">
              Resposta em até 24h
            </span>
          </div>
        </div>

        {/* Right — form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Seu nome"
            value={form.name}
            onChange={handleChange}
            required
            className={inputClass}
          />
          <input
            type="email"
            name="email"
            placeholder="Seu email"
            value={form.email}
            onChange={handleChange}
            required
            className={inputClass}
          />
          <textarea
            name="message"
            placeholder="O que você precisa construir?"
            value={form.message}
            onChange={handleChange}
            required
            rows={5}
            className={`${inputClass} resize-none`}
          />

          {status === "success" ? (
            <div className="border border-[var(--accent-border)] bg-accent-bg rounded-lg px-4 py-3 font-mono text-[13px] text-accent">
              ✓ Mensagem enviada! Respondo em breve.
            </div>
          ) : (
            <Button
              type="submit"
              variant="primary"
              disabled={status === "loading"}
              className="w-full py-3 text-[14px]"
            >
              {status === "loading" ? "Enviando..." : "Enviar mensagem →"}
            </Button>
          )}

          {status === "error" && (
            <p className="font-mono text-[11px] text-red-400">
              Erro ao enviar. Tente novamente ou me contate diretamente.
            </p>
          )}
        </form>

      </div>
    </SectionWrapper>
  );
}
