# Portfolio — Junqueira Dev · Design Spec

**Data:** 2026-03-27
**Projeto:** `~/Documents/Projects/Portfolio`
**Objetivo:** Landing page de alto impacto que converte visitantes em leads ou oportunidades de emprego, demonstrando capacidade técnica real em IA + automação + frontend avançado.

---

## 1. Stack

| Camada | Tecnologia |
|--------|-----------|
| Framework | Next.js 14 (App Router) |
| Linguagem | TypeScript |
| Estilo | Tailwind CSS |
| 3D | React Three Fiber + @react-three/drei |
| Animações | GSAP (ScrollTrigger) |
| Fontes | Syne (display) + DM Mono (code/detail) + Onest (body) |
| Deploy | Vercel |
| Formulário | Webhook n8n (POST) |

---

## 2. Direção Visual

**Estética:** Noir Precision — dark refinado, não poluído
**Paleta:**
- Background: `#0C0C0E`
- Texto primário: `#E8E6E0` (warm white)
- Accent: `#4AE3B5` (electric mint)
- Superfície sutil: `rgba(255,255,255,0.03–0.06)`
- Borda sutil: `rgba(255,255,255,0.06–0.08)`

**Tipografia:**
- Display/Headline: **Syne** — bold, weight 700–800
- Body: **Onest** — weight 400, legível
- Mono/Detail: **DM Mono** — tags, labels, código

**Motion:**
- Page load: staggered reveal das seções (GSAP, `opacity 0→1`, `y 20→0`)
- ScrollTrigger: cada seção anima ao entrar no viewport
- 3D: rotação contínua sutil (notebook) + partículas flutuantes no hero
- Hover states: microinterações em cards e CTAs
- Sem animações desnecessárias — cada movimento tem propósito

---

## 3. Estrutura de Seções

### 3.1 Navegação
- Fixed, blur backdrop (`backdrop-blur`)
- Logo: "Junqueira.dev" em Syne
- Links: Especialidades · AI Demo · Radar · Contato
- CTA destaque: "Falar agora →" (pill com accent color)
- Mobile: menu hamburger

### 3.2 Hero (Layout Editorial Dividido)
- Grid 50/50 — esquerda texto, direita 3D
- **Esquerda:**
  - Tag pill: "Python · IA · Automação" (accent color)
  - Headline: *"Eu construo sistemas que funcionam enquanto você dorme."* (Syne, ~48px)
  - Subtítulo: descrição em 2 linhas, peso leve
  - CTAs: `[Ver projetos]` (primary) + `[Falar comigo]` (ghost)
- **Direita:**
  - Canvas R3F com notebook 3D simplificado (box geometries, sem .glb)
  - Rotação orbital lenta
  - Partículas flutuantes ao redor (3–5 pontos)
  - Radial glow com accent color no background do canvas
- Mobile: stack vertical, 3D fica menor e acima do texto

### 3.3 Especialidades (Bento Grid)
- 3 cards: **AI Agents** · **Automações** · **Backend Python**
- Cada card: ícone + título + descrição + tech tags
- Hover: borda com accent, leve elevação
- Card "AI Agents" pode ser maior (destaque)

### 3.4 AI Agent Demo
- Layout 2 colunas: descrição à esquerda + chat à direita
- Chat interface mockada inicialmente (pode ser integrada depois com RAG real)
- Input field funcional com submit
- Mensagens simuladas ou integração real via API route do Next.js → Python backend
- Placeholder claro: "Pergunte sobre meus projetos"

### 3.5 Radar de IA
- Feed de itens dinâmicos
- Dados: mock JSON estático inicialmente, depois integra com automação Python
- Cada item: título · fonte · tempo relativo
- Badge "● atualizado automaticamente" (mesmo se for estático na v1)
- Scroll horizontal em mobile

### 3.6 Contato / Conversão
- Grid 2 colunas: copy à esquerda + form à direita
- Headline: *"Tem um problema para resolver?"*
- Form: Nome · Email · Mensagem
- Submit: POST para webhook n8n (URL via env var `NEXT_PUBLIC_WEBHOOK_URL`)
- Feedback visual: estado de loading + sucesso/erro
- Fallback: link direto para email/LinkedIn se webhook falhar

### 3.7 Footer
- Minimalista: nome + ano + links GitHub/LinkedIn

---

## 4. Arquitetura de Código

```
app/
├── layout.tsx          # Fontes, metadata, providers
├── page.tsx            # Composição das seções
└── globals.css         # CSS variables, reset, utilities

components/
├── sections/
│   ├── NavBar.tsx
│   ├── Hero.tsx
│   ├── Specialties.tsx
│   ├── AIDemo.tsx
│   ├── AIRadar.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
├── 3d/
│   ├── NotebookScene.tsx   # Canvas R3F + notebook
│   └── FloatingParticles.tsx
└── ui/
    ├── Tag.tsx
    ├── Button.tsx
    └── SectionWrapper.tsx  # Wrapper com ScrollTrigger

hooks/
└── useScrollAnimation.ts   # GSAP ScrollTrigger utility

lib/
└── utils.ts                # cn(), etc.
```

---

## 5. Regras de Implementação

- Server Components por padrão — NavBar, Footer, Specialties, AIRadar
- Client Components obrigatórios: Hero (3D), AIDemo (state do chat), Contact (form state), NavBar (scroll state)
- Canvas R3F sempre dentro de `<Suspense>` com fallback
- `dynamic()` com `ssr: false` para componentes R3F
- GSAP: inicializar apenas no `useEffect`, limpar no cleanup
- Env vars: `NEXT_PUBLIC_WEBHOOK_URL` para o form de contato
- Sem dependências desnecessárias — preferir CSS puro para animações simples

---

## 6. Critérios de Aceite (v1)

- [ ] Todas as 6 seções renderizam corretamente
- [ ] 3D carrega sem quebrar SSR
- [ ] Animações de entrada funcionam no scroll
- [ ] Form de contato envia para webhook e dá feedback visual
- [ ] Responsivo em mobile (375px+) e desktop (1280px+)
- [ ] Lighthouse Performance ≥ 80 em desktop
- [ ] Deploy funcional na Vercel

---

## 7. Fora de Escopo (v1)

- Integração real do AI Agent com RAG (mock na v1)
- Feed do Radar de IA com dados reais (JSON estático na v1)
- Animações 3D complexas com modelo .glb
- Dark/light mode toggle
- Internacionalização
