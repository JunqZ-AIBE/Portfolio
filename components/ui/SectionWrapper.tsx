"use client";

import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface SectionWrapperProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
}

export function SectionWrapper({ id, children, className }: SectionWrapperProps) {
  const ref = useScrollAnimation();

  return (
    <section
      id={id}
      ref={ref as React.RefObject<HTMLElement>}
      className={cn(
        "w-full max-w-6xl mx-auto px-6 md:px-12",
        className
      )}
    >
      {children}
    </section>
  );
}
