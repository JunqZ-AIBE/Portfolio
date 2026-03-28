import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Tag } from "@/components/ui/Tag";

const specialties = [
  {
    icon: "⚡",
    title: "AI Agents",
    description:
      "Agentes com RAG, tools e memória persistente. Pipelines com Claude, GPT-4 e modelos open-source.",
    tags: ["LLMs", "Anthropic", "RAG", "Python"],
    highlight: true,
  },
  {
    icon: "🔁",
    title: "Automações",
    description:
      "n8n, Make e webhooks. Fluxos que eliminam trabalho repetitivo e conectam sistemas diferentes.",
    tags: ["n8n", "Make", "APIs", "Webhooks"],
    highlight: false,
  },
  {
    icon: "🛠",
    title: "Backend Python",
    description:
      "FastAPI, SQLModel e PostgreSQL. APIs async prontas para produção com deploy na Railway.",
    tags: ["FastAPI", "Supabase", "Railway", "Docker"],
    highlight: false,
  },
];

export function Specialties() {
  return (
    <SectionWrapper id="especialidades" className="py-24">
      {/* Section header */}
      <div className="mb-12">
        <p className="font-mono text-[11px] text-accent tracking-[0.14em] uppercase mb-3">
          O que faço
        </p>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-primary">
          Especialidades
        </h2>
      </div>

      {/* Bento grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {specialties.map((item) => (
          <div
            key={item.title}
            className={`
              relative p-6 rounded-xl border transition-all duration-300 group cursor-default
              ${item.highlight
                ? "border-[var(--accent-border)] bg-[rgba(74,227,181,0.04)]"
                : "border-[var(--border)] bg-[var(--surface)]"
              }
              hover:border-[var(--border-hover)] hover:bg-[var(--surface-hover)]
            `}
          >
            {item.highlight && (
              <div
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at top right, rgba(74,227,181,0.06) 0%, transparent 60%)",
                }}
              />
            )}

            <div className="text-2xl mb-4">{item.icon}</div>

            <h3 className="font-display font-bold text-[17px] text-primary mb-2">
              {item.title}
            </h3>

            <p className="font-body text-[13px] text-secondary leading-relaxed mb-4">
              {item.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <Tag key={tag} className="text-[9px]">
                  {tag}
                </Tag>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
