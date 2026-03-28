import { cn } from "@/lib/utils";

interface TagProps {
  children: React.ReactNode;
  className?: string;
}

export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-block font-mono text-[10px] tracking-[0.12em] uppercase",
        "px-2 py-[3px] rounded-[3px]",
        "text-accent bg-accent-bg border border-[var(--accent-border)]",
        className
      )}
    >
      {children}
    </span>
  );
}
