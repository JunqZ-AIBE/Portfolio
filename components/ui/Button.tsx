"use client";

import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "font-display text-[13px] font-semibold px-4 py-2 rounded-[5px] transition-all duration-200 cursor-pointer",
        variant === "primary" && [
          "bg-accent text-bg",
          "hover:brightness-110 hover:scale-[1.02]",
          "active:scale-[0.98]",
        ],
        variant === "ghost" && [
          "border border-[var(--border)] text-secondary",
          "hover:border-[var(--border-hover)] hover:text-primary",
          "active:scale-[0.98]",
        ],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
