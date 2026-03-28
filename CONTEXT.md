# CONTEXT.md

## Project Name

Junqueira Dev Portfolio

---

## Objective

Criar um site de portfólio que funcione como:

1. Vitrine de serviços (Front-end, IA, automações)
2. Demonstração técnica (3D + animações + integrações)
3. Ferramenta de conversão (geração de leads)

---

## Target Audience

* Empresas (B2B)
* Startups
* Clientes interessados em automação e IA
* Recrutadores tech

---

## Core Stack

Frontend:

* Next.js 14+ (App Router)
* TypeScript
* Tailwind CSS
* GSAP (ScrollTrigger)
* React Three Fiber + Drei

Backend:

* Next.js API Routes
* Python (scrapers e geração de conteúdo)
* n8n (automação e webhooks)

---

## Main Sections

### 1. Hero Section

* Notebook 3D (.glb)
* Animação com scroll
* Movimento suave e elegante
* Espaço para headline e CTA

---

### 2. Specialties (Bento Grid)

* Cards com:

  * Front-end
  * AI Agents
  * Automations
* Hover com efeito de luz (spotlight)

---

### 3. AI Agent Demo

* Interface de chat minimalista
* Simulação ou integração com RAG
* Fluxo de atendimento (ex: lead qualification)

---

### 4. AI Radar (News Feed)

* Lista vertical de conteúdos
* Dados vindos de API Python
* Conteúdo resumido automaticamente

---

### 5. Footer / Contact

* Formulário de contato
* Integração com webhook (n8n)
* CTA claro

---

## Visual Direction

* Estilo Apple / Tesla
* Dark mode predominante
* Uso de:

  * Glassmorphism
  * Gradientes sutis
  * Tipografia limpa

---

## Performance Goals

* Lighthouse 90+
* Carregamento rápido
* Assets otimizados
* 3D leve

---

## Differentiators

* 3D interativo real (não fake)
* Integração com IA funcional
* Conteúdo dinâmico (não estático)
* Microinterações refinadas

---

## Data Flow

1. Python scraper coleta dados
2. Processa com IA (resumo)
3. API expõe JSON
4. Front consome e renderiza

---

## Lead Flow

1. Usuário preenche formulário
2. Next.js API route recebe
3. Envia para webhook n8n
4. n8n processa e salva

---

## Constraints

* Não sacrificar performance por estética
* Evitar excesso de animações
* Mobile deve funcionar bem

---

## First Tasks

1. Setup projeto Next.js
2. Criar layout base
3. Integrar Tailwind
4. Criar estrutura de pastas
5. Implementar Hero simples (sem 3D ainda)
6. Depois evoluir para 3D + GSAP

---

## Future Expansions

* Blog técnico (SEO)
* Dashboard de projetos
* Integração com GitHub API
* Versão multilíngue

---

## Final Vision

Um site que faz o visitante pensar:
"Esse cara resolve problema de verdade."

Não só bonito. Vendável.
