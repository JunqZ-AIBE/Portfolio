"use client";

import { useState, useRef, useEffect } from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";

interface Message {
  role: "user" | "agent";
  content: string;
}

const mockResponses: Record<string, string> = {
  default:
    "Trabalhei com automação de licitações usando FastAPI + OpenAI, um agente de refatoração de código com Claude, e integrei n8n com diversas APIs externas. Qual desses projetos te interessa mais?",
  projetos:
    "Tenho 3 projetos principais: AI-Scraper-Platform (scraping de licitações + IA), ai-refactor-tool (agente de refatoração de código), e LegalFlowAI (processamento jurídico com LLMs). Todos com FastAPI no backend.",
  stack:
    "Backend: Python + FastAPI + SQLModel. IA: Claude (Anthropic) e GPT-4. Automação: n8n. Deploy: Railway para backends, Vercel para frontend. Banco: Supabase ou PostgreSQL.",
  contato:
    "Pode entrar em contato pelo formulário no final da página ou direto pelo LinkedIn. Respondo em até 24h.",
};

function getMockResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("projeto") || lower.includes("fez")) return mockResponses.projetos;
  if (lower.includes("stack") || lower.includes("tecnologia") || lower.includes("usa"))
    return mockResponses.stack;
  if (lower.includes("contato") || lower.includes("falar") || lower.includes("contratar"))
    return mockResponses.contato;
  return mockResponses.default;
}

export function AIDemo() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "agent", content: "Olá! Sou um agente que conhece o trabalho do Guilherme. O que você quer saber?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend() {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);

    // Simulated delay
    await new Promise((r) => setTimeout(r, 800));

    setMessages((prev) => [
      ...prev,
      { role: "agent", content: getMockResponse(userMsg) },
    ]);
    setLoading(false);
  }

  return (
    <SectionWrapper id="ai-demo" className="py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* Left — descrição */}
        <div>
          <p className="font-mono text-[11px] text-accent tracking-[0.14em] uppercase mb-3">
            Demonstração
          </p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-primary mb-4">
            AI Agent ao vivo
          </h2>
          <p className="font-body text-[14px] text-secondary leading-relaxed">
            Converse com um agente que conhece meu trabalho. Pergunte sobre projetos,
            stack técnico ou como entrar em contato.
          </p>
          <p className="font-mono text-[11px] text-muted mt-4">
            v1 · respostas simuladas · integração RAG em breve
          </p>
        </div>

        {/* Right — chat */}
        <div className="border border-[var(--border)] rounded-xl overflow-hidden bg-[var(--surface)]">
          {/* Messages */}
          <div className="h-72 overflow-y-auto p-4 flex flex-col gap-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`
                    max-w-[80%] px-3 py-2 rounded-lg font-body text-[13px] leading-relaxed
                    ${msg.role === "user"
                      ? "bg-accent text-bg font-medium"
                      : "bg-[var(--surface-hover)] text-secondary border border-[var(--border)]"
                    }
                  `}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-[var(--surface-hover)] border border-[var(--border)] px-3 py-2 rounded-lg">
                  <span className="font-mono text-[11px] text-muted animate-pulse">
                    digitando...
                  </span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-[var(--border)] p-3 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Pergunte sobre meus projetos..."
              className="flex-1 bg-transparent font-body text-[13px] text-primary placeholder:text-muted outline-none"
            />
            <Button variant="primary" onClick={handleSend} disabled={!input.trim() || loading}>
              →
            </Button>
          </div>
        </div>

      </div>
    </SectionWrapper>
  );
}
