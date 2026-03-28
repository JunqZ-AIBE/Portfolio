import { SectionWrapper } from "@/components/ui/SectionWrapper";
import radarData from "@/data/radar.json";

export function AIRadar() {
  return (
    <SectionWrapper id="radar" className="py-24">
      {/* Header */}
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="font-mono text-[11px] text-accent tracking-[0.14em] uppercase mb-3">
            Contexto de mercado
          </p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-primary">
            Radar de IA
          </h2>
        </div>
        <div className="hidden md:flex items-center gap-2 font-mono text-[11px] text-muted border border-[var(--border)] px-3 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          atualizado via automação
        </div>
      </div>

      {/* Feed */}
      <div className="flex flex-col divide-y divide-[var(--border)]">
        {radarData.map((item) => (
          <div
            key={item.id}
            className="flex items-start justify-between gap-6 py-5 group"
          >
            <div className="flex-1">
              <p className="font-body text-[14px] text-secondary group-hover:text-primary transition-colors leading-relaxed">
                {item.title}
              </p>
            </div>
            <div className="flex-shrink-0 text-right">
              <p className="font-mono text-[11px] text-accent">{item.source}</p>
              <p className="font-mono text-[10px] text-muted mt-0.5">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
