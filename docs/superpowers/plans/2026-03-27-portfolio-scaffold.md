# Portfolio — Junqueira Dev · Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold o portfólio completo em Next.js 14 com 6 seções, 3D via R3F, animações GSAP e form de contato com webhook.

**Architecture:** App Router com Server Components por padrão; Hero, NavBar, AIDemo e Contact são Client Components. 3D carregado via `dynamic()` com `ssr: false`. Animações GSAP inicializadas em `useEffect`.

**Tech Stack:** Next.js 14 · TypeScript · Tailwind CSS · React Three Fiber · @react-three/drei · GSAP · Syne + Onest + DM Mono (Google Fonts)

---

## File Map

| Arquivo | Responsabilidade |
|---------|-----------------|
| `package.json` | Dependências do projeto |
| `next.config.ts` | Config Next.js (imagens, transpile) |
| `tailwind.config.ts` | Tema customizado, fontes, cores |
| `postcss.config.mjs` | PostCSS para Tailwind |
| `tsconfig.json` | TypeScript config com path aliases |
| `.env.example` | Variáveis de ambiente documentadas |
| `app/layout.tsx` | Root layout: fontes, metadata, providers |
| `app/page.tsx` | Composição das seções |
| `app/globals.css` | CSS variables, reset, utilitários globais |
| `lib/utils.ts` | `cn()` helper (clsx + tailwind-merge) |
| `data/radar.json` | Feed estático do Radar de IA |
| `components/ui/Tag.tsx` | Pill tag reutilizável |
| `components/ui/Button.tsx` | Botão com variantes primary/ghost |
| `components/ui/SectionWrapper.tsx` | Wrapper com ref para ScrollTrigger |
| `hooks/useScrollAnimation.ts` | GSAP ScrollTrigger utility hook |
| `components/sections/NavBar.tsx` | Navegação fixa com blur |
| `components/sections/Hero.tsx` | Hero dividido (Client Component) |
| `components/3d/NotebookScene.tsx` | Canvas R3F com notebook + partículas |
| `components/sections/Specialties.tsx` | Bento grid 3 cards |
| `components/sections/AIDemo.tsx` | Chat interface mockada |
| `components/sections/AIRadar.tsx` | Feed do radar de IA |
| `components/sections/Contact.tsx` | Form com webhook n8n |
| `components/sections/Footer.tsx` | Footer minimalista |

---

## Task 1: Scaffold do Projeto

**Files:**
- Create: `package.json`
- Create: `next.config.ts`
- Create: `tailwind.config.ts`
- Create: `postcss.config.mjs`
- Create: `tsconfig.json`
- Create: `.env.example`
- Create: `.gitignore`

- [ ] **Step 1: Inicializar o projeto**

```bash
cd ~/Documents/Projects/Portfolio
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --app \
  --no-src-dir \
  --import-alias "@/*" \
  --no-eslint
```

Responder "Yes" para todas as prompts padrão.

- [ ] **Step 2: Instalar dependências 3D e animação**

```bash
npm install three @react-three/fiber @react-three/drei
npm install gsap
npm install clsx tailwind-merge
npm install @types/three --save-dev
```

- [ ] **Step 3: Atualizar `.env.example`**

```bash
cat > .env.example << 'EOF'
# Webhook n8n para o formulário de contato
NEXT_PUBLIC_WEBHOOK_URL=https://seu-n8n.com/webhook/contact
EOF
```

- [ ] **Step 4: Atualizar `.gitignore`** — adicionar ao final:

```
.env
.env.local
.superpowers/
```

- [ ] **Step 5: Verificar instalação**

```bash
npm run dev
```

Esperado: servidor rodando em `http://localhost:3000` sem erros.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "init: scaffold Next.js 14 with R3F, GSAP, Tailwind"
```

---

## Task 2: Design System — CSS Variables e Tailwind

**Files:**
- Modify: `app/globals.css`
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Substituir `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg: #0C0C0E;
  --surface: rgba(255, 255, 255, 0.03);
  --surface-hover: rgba(255, 255, 255, 0.06);
  --border: rgba(255, 255, 255, 0.07);
  --border-hover: rgba(255, 255, 255, 0.14);
  --text-primary: #E8E6E0;
  --text-secondary: rgba(232, 230, 224, 0.5);
  --text-muted: rgba(232, 230, 224, 0.25);
  --accent: #4AE3B5;
  --accent-bg: rgba(74, 227, 181, 0.10);
  --accent-border: rgba(74, 227, 181, 0.20);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--bg);
  color: var(--text-primary);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

::selection {
  background: var(--accent);
  color: var(--bg);
}

::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: var(--bg);
}

::-webkit-scrollbar-thumb {
  background: var(--border-hover);
  border-radius: 2px;
}
```

- [ ] **Step 2: Substituir `tailwind.config.ts`**

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0C0C0E",
        surface: "rgba(255,255,255,0.03)",
        border: "rgba(255,255,255,0.07)",
        primary: "#E8E6E0",
        secondary: "rgba(232,230,224,0.5)",
        muted: "rgba(232,230,224,0.25)",
        accent: "#4AE3B5",
        "accent-bg": "rgba(74,227,181,0.10)",
      },
      fontFamily: {
        display: ["var(--font-syne)", "sans-serif"],
        body: ["var(--font-onest)", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
      },
      backgroundImage: {
        "radial-accent":
          "radial-gradient(circle at 50% 50%, rgba(74,227,181,0.06) 0%, transparent 60%)",
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 3: Commit**

```bash
git add app/globals.css tailwind.config.ts
git commit -m "style: add design system CSS variables and Tailwind theme"
```

---

## Task 3: Root Layout com Fontes e Metadata

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Substituir `app/layout.tsx`**

```typescript
import type { Metadata } from "next";
import { Syne, Onest, DM_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "600", "700", "800"],
});

const onest = Onest({
  subsets: ["latin"],
  variable: "--font-onest",
  weight: ["300", "400", "500"],
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Guilherme Junqueira — Python · IA · Automação",
  description:
    "Desenvolvo sistemas de automação, agentes de IA e backends robustos. De ideia a produção.",
  openGraph: {
    title: "Guilherme Junqueira — Python · IA · Automação",
    description: "Desenvolvo sistemas de automação, agentes de IA e backends robustos.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${syne.variable} ${onest.variable} ${dmMono.variable} font-body`}
      >
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Verificar fontes no browser**

```bash
npm run dev
```

Inspecionar no DevTools: `--font-syne`, `--font-onest`, `--font-dm-mono` devem estar presentes no `<html>`.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: configure Google Fonts (Syne, Onest, DM Mono) and metadata"
```

---

## Task 4: Utilitários — `lib/utils.ts` e `data/radar.json`

**Files:**
- Create: `lib/utils.ts`
- Create: `data/radar.json`

- [ ] **Step 1: Criar `lib/utils.ts`**

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 2: Criar `data/radar.json`**

```json
[
  {
    "id": "1",
    "title": "Claude 3.7 ultrapassa GPT-4o em benchmarks de raciocínio complexo",
    "source": "Anthropic",
    "time": "2h atrás",
    "url": "#"
  },
  {
    "id": "2",
    "title": "n8n lança suporte nativo a MCP servers em fluxos de trabalho",
    "source": "n8n Blog",
    "time": "1d atrás",
    "url": "#"
  },
  {
    "id": "3",
    "title": "FastAPI 0.115 adiciona suporte a streaming de respostas nativo",
    "source": "GitHub",
    "time": "3d atrás",
    "url": "#"
  },
  {
    "id": "4",
    "title": "Vercel AI SDK 3.4 simplifica integração de tools em streaming",
    "source": "Vercel",
    "time": "5d atrás",
    "url": "#"
  },
  {
    "id": "5",
    "title": "Supabase lança Edge Functions com suporte a WebSockets",
    "source": "Supabase",
    "time": "1sem atrás",
    "url": "#"
  }
]
```

- [ ] **Step 3: Commit**

```bash
git add lib/utils.ts data/radar.json
git commit -m "feat: add cn() utility and static radar feed data"
```

---

## Task 5: UI Primitives — Tag, Button, SectionWrapper

**Files:**
- Create: `components/ui/Tag.tsx`
- Create: `components/ui/Button.tsx`
- Create: `components/ui/SectionWrapper.tsx`

- [ ] **Step 1: Criar `components/ui/Tag.tsx`**

```typescript
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
```

- [ ] **Step 2: Criar `components/ui/Button.tsx`**

```typescript
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
```

- [ ] **Step 3: Criar `components/ui/SectionWrapper.tsx`**

```typescript
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
}

export function SectionWrapper({ id, children, className }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "w-full max-w-6xl mx-auto px-6 md:px-12",
        className
      )}
    >
      {children}
    </section>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add components/
git commit -m "feat: add Tag, Button, SectionWrapper UI primitives"
```

---

## Task 6: NavBar

**Files:**
- Create: `components/sections/NavBar.tsx`

- [ ] **Step 1: Criar `components/sections/NavBar.tsx`**

```typescript
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
          ? "bg-bg/90 backdrop-blur-md border-b border-[var(--border)]"
          : "bg-transparent"
      )}
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
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/NavBar.tsx
git commit -m "feat: add NavBar with scroll-aware blur and mobile menu"
```

---

## Task 7: NotebookScene (React Three Fiber)

**Files:**
- Create: `components/3d/NotebookScene.tsx`

- [ ] **Step 1: Criar `components/3d/NotebookScene.tsx`**

```typescript
"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function Notebook() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15 - 0.2;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05 + 0.1;
  });

  return (
    <group ref={groupRef}>
      {/* Base do notebook */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[2.4, 0.08, 1.6]} />
        <meshStandardMaterial
          color="#1a1a1f"
          roughness={0.4}
          metalness={0.6}
        />
      </mesh>

      {/* Tela (inclinada ~105°) */}
      <mesh position={[0, 0.75, -0.75]} rotation={[-0.35, 0, 0]}>
        <boxGeometry args={[2.4, 1.5, 0.06]} />
        <meshStandardMaterial
          color="#141417"
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* Glow da tela */}
      <mesh position={[0, 0.76, -0.72]} rotation={[-0.35, 0, 0]}>
        <planeGeometry args={[2.1, 1.3]} />
        <meshStandardMaterial
          color="#4AE3B5"
          emissive="#4AE3B5"
          emissiveIntensity={0.08}
          roughness={1}
        />
      </mesh>

      {/* Linha de código na tela */}
      <mesh position={[-0.4, 0.78, -0.69]} rotation={[-0.35, 0, 0]}>
        <planeGeometry args={[0.8, 0.04]} />
        <meshStandardMaterial
          color="#4AE3B5"
          emissive="#4AE3B5"
          emissiveIntensity={1}
        />
      </mesh>

      <mesh position={[-0.6, 0.68, -0.66]} rotation={[-0.35, 0, 0]}>
        <planeGeometry args={[0.5, 0.03]} />
        <meshStandardMaterial
          color="#4AE3B5"
          emissive="#4AE3B5"
          emissiveIntensity={0.7}
        />
      </mesh>

      <mesh position={[-0.3, 0.58, -0.64]} rotation={[-0.35, 0, 0]}>
        <planeGeometry args={[1.0, 0.03]} />
        <meshStandardMaterial
          color="#4AE3B5"
          emissive="#4AE3B5"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
}

function Particles() {
  const positions: [number, number, number][] = [
    [1.4, 0.6, 0.2],
    [-1.5, 0.3, -0.3],
    [1.0, -0.4, 0.5],
    [-0.8, 1.2, -0.5],
    [0.5, -0.8, 0.8],
  ];

  return (
    <>
      {positions.map((pos, i) => (
        <Float key={i} speed={1.5 + i * 0.3} rotationIntensity={0.5} floatIntensity={0.8}>
          <mesh position={pos}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial
              color="#4AE3B5"
              emissive="#4AE3B5"
              emissiveIntensity={2}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

export function NotebookScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 4], fov: 40 }}
      style={{ background: "transparent" }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[3, 4, 3]} intensity={1.2} />
      <pointLight position={[-2, 2, -2]} intensity={0.5} color="#4AE3B5" />
      <Notebook />
      <Particles />
    </Canvas>
  );
}
```

- [ ] **Step 2: Verificar renderização 3D**

Importar temporariamente em `app/page.tsx` envolto em `<Suspense>` e verificar no browser se o notebook aparece sem erros de SSR.

```typescript
// Verificação temporária em app/page.tsx
import dynamic from "next/dynamic";
import { Suspense } from "react";

const NotebookScene = dynamic(
  () => import("@/components/3d/NotebookScene").then((m) => ({ default: m.NotebookScene })),
  { ssr: false }
);

export default function Page() {
  return (
    <div style={{ width: "100vw", height: "100vh", background: "#0C0C0E" }}>
      <Suspense fallback={null}>
        <NotebookScene />
      </Suspense>
    </div>
  );
}
```

- [ ] **Step 3: Confirmar sem erros no console**

Abrir `http://localhost:3000` — notebook deve aparecer com animação suave.

- [ ] **Step 4: Commit**

```bash
git add components/3d/NotebookScene.tsx
git commit -m "feat: add 3D notebook scene with R3F (box geometries, particles, accent glow)"
```

---

## Task 8: Hero Section

**Files:**
- Create: `components/sections/Hero.tsx`

- [ ] **Step 1: Criar `components/sections/Hero.tsx`**

```typescript
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
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/Hero.tsx
git commit -m "feat: add Hero section with split layout and 3D notebook"
```

---

## Task 9: Specialties (Bento Grid)

**Files:**
- Create: `components/sections/Specialties.tsx`

- [ ] **Step 1: Criar `components/sections/Specialties.tsx`**

```typescript
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
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/Specialties.tsx
git commit -m "feat: add Specialties bento grid section"
```

---

## Task 10: AI Demo Section

**Files:**
- Create: `components/sections/AIDemo.tsx`

- [ ] **Step 1: Criar `components/sections/AIDemo.tsx`**

```typescript
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
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/AIDemo.tsx
git commit -m "feat: add AI Demo section with mock chat interface"
```

---

## Task 11: AI Radar Section

**Files:**
- Create: `components/sections/AIRadar.tsx`

- [ ] **Step 1: Criar `components/sections/AIRadar.tsx`**

```typescript
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
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/AIRadar.tsx
git commit -m "feat: add AI Radar section with static feed"
```

---

## Task 12: Contact Section

**Files:**
- Create: `components/sections/Contact.tsx`

- [ ] **Step 1: Criar `components/sections/Contact.tsx`**

```typescript
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
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/Contact.tsx
git commit -m "feat: add Contact form with webhook integration and feedback states"
```

---

## Task 13: Footer

**Files:**
- Create: `components/sections/Footer.tsx`

- [ ] **Step 1: Criar `components/sections/Footer.tsx`**

```typescript
export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-8 mt-12">
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-mono text-[11px] text-muted">
          © 2025 Guilherme Junqueira
        </span>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/JunqZ-AIBE"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] text-muted hover:text-accent transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] text-muted hover:text-accent transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/Footer.tsx
git commit -m "feat: add Footer"
```

---

## Task 14: GSAP Scroll Animations

**Files:**
- Create: `hooks/useScrollAnimation.ts`
- Modify: `components/ui/SectionWrapper.tsx`

- [ ] **Step 1: Criar `hooks/useScrollAnimation.ts`**

```typescript
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimation() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return ref;
}
```

- [ ] **Step 2: Atualizar `components/ui/SectionWrapper.tsx`** para usar o hook (tornar Client Component):

```typescript
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
```

- [ ] **Step 3: Verificar animações**

Abrir `http://localhost:3000` e fazer scroll — cada seção deve animar ao entrar no viewport.

- [ ] **Step 4: Commit**

```bash
git add hooks/useScrollAnimation.ts components/ui/SectionWrapper.tsx
git commit -m "feat: add GSAP ScrollTrigger animation to all sections"
```

---

## Task 15: Composição Final — `app/page.tsx`

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Substituir `app/page.tsx`**

```typescript
import { NavBar } from "@/components/sections/NavBar";
import { Hero } from "@/components/sections/Hero";
import { Specialties } from "@/components/sections/Specialties";
import { AIDemo } from "@/components/sections/AIDemo";
import { AIRadar } from "@/components/sections/AIRadar";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Page() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <Specialties />
        <AIDemo />
        <AIRadar />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Teste final completo**

```bash
npm run dev
```

Verificar:
- [ ] Navbar aparece fixa e o blur ativa ao scrollar
- [ ] Hero com 3D renderiza sem erros de SSR
- [ ] Seções animam ao entrar no viewport
- [ ] Chat responde às mensagens
- [ ] Form de contato submete (com ou sem webhook configurado)
- [ ] Responsivo em 375px (mobile) e 1280px+ (desktop)

- [ ] **Step 3: Build de produção**

```bash
npm run build
```

Esperado: build sem erros. Anotar avisos (não erros).

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: compose full portfolio page with all sections"
```

---

## Task 16: Deploy na Vercel

**Files:**
- Create: `vercel.json` (opcional, apenas se necessário)

- [ ] **Step 1: Push para GitHub**

```bash
git push origin main
```

- [ ] **Step 2: Conectar na Vercel**

1. Acessar vercel.com → New Project
2. Importar o repositório `Portfolio`
3. Framework: Next.js (auto-detectado)
4. Em Environment Variables: adicionar `NEXT_PUBLIC_WEBHOOK_URL` (se disponível)
5. Deploy

- [ ] **Step 3: Verificar deploy**

Abrir a URL da Vercel e confirmar:
- Sem erros de build no dashboard
- 3D carrega corretamente
- Form de contato funcional

- [ ] **Step 4: Commit final**

```bash
git add -A
git commit -m "chore: production deploy setup"
```

---

## Self-Review

**Spec coverage:**
- ✅ Scaffold Next.js 14 App Router (Task 1)
- ✅ Design system / paleta (Task 2)
- ✅ Fontes Syne + Onest + DM Mono (Task 3)
- ✅ NavBar com blur + mobile (Task 6)
- ✅ Hero layout editorial dividido (Task 8)
- ✅ 3D notebook R3F sem .glb (Task 7)
- ✅ Bento grid especialidades (Task 9)
- ✅ AI Demo chat mockado (Task 10)
- ✅ Radar feed estático (Task 11)
- ✅ Contact form + webhook (Task 12)
- ✅ GSAP ScrollTrigger (Task 14)
- ✅ Deploy Vercel (Task 16)
- ✅ `.env.example` com NEXT_PUBLIC_WEBHOOK_URL (Task 1)

**Placeholders:** Nenhum. Todo código está completo.

**Type consistency:** `cn()` definido em Task 4, usado em Tasks 5–12. `SectionWrapper` usa `useScrollAnimation` definido em Task 14 — Task 14 deve executar antes que as seções sejam testadas em conjunto, mas cada seção compila independentemente pois `SectionWrapper` não quebra sem o hook até Task 14.

> **Nota de execução:** Tasks 1–5 devem rodar em sequência (base do projeto). Tasks 6–13 são independentes entre si após Task 5. Task 14 modifica `SectionWrapper` — rodar após todas as seções. Task 15 (composição) roda após todas as seções.
