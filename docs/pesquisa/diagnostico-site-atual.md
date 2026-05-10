# Diagnóstico do site atual

> **Data da coleta:** 2026-05-09 a 2026-05-10.
> **URLs inspecionadas:** `/`, `/o-comida-di-buteco/`, `/mecanica-e-calendario/`, `/butecos/belo-horizonte/`, `/buteco/<slug>/`.
> **Forma:** `curl` com User-Agent de browser real + parsing HTML em Python. Sem renderização real — Lighthouse e axe-core ficam como dívida (Fase 5).
>
> Tudo aqui é citação observacional, nada do conteúdo oficial é redistribuído.

---

## Stack identificado

- **CDN/WAF:** Cloudflare (headers `cf-ray`, `cf-mitigated: challenge` em algumas rotas).
- **CMS:** WordPress + tema próprio.
- **Acessibilidade:** plugin **Pojo A11y Toolbar** instalado (aumentar/diminuir texto, alto contraste, escala de cinza, fonte legível, links sublinhados).
- **SEO:** `<title>` único, Open Graph e Twitter Card presentes.
- **Tracking:** Facebook Pixel + outros (24 tags `<script>` na home).

---

## Métricas estáticas

Da home (`/`):

| Item | Valor | Observação |
|------|-------|------------|
| Tamanho do HTML | 78 KB | Razoável, mas tem 24 scripts. |
| Tags `<img>` | 9 | Pequeno na home; cresce muito em listagens. |
| Tags `<script>` | **24** | Alto. Pixels de tracking + plugins do tema. Carga no caminho crítico. |
| `<link rel="stylesheet">` | 5 | OK. |
| `alt=""` (vazio) | 7 | Aceitável só se decorativas — improvável em listagem de butecos. |
| `<h1>` na home | **0** | Falha estrutural — perde semântica de título principal. |
| `<h2>` | 5 | OK em quantidade. |
| `<h3>` | 5 | OK em quantidade. |

Da listagem por cidade (`/butecos/belo-horizonte/`):

- `<h1>` único presente ("Butecos Participantes").
- Formulário com `role="search"`.
- `<h2>` "222" apareceu fora de contexto (provavelmente contagem de butecos como heading).

---

## Heurísticas de Nielsen — achados

### 1. Visibilidade do status do sistema
- **Boa:** banners de período de votação visíveis.
- **Ruim:** sem feedback de "X resultados" ao filtrar dentro de uma cidade.
- **Ruim:** sem indicador de loading ao abrir mapa ou foto pesada.

### 2. Compatibilidade com o mundo real
- **Boa:** vocabulário gastronômico ("buteco", "petisco", "votar") ressoa com o usuário.
- **Misto:** "Mecânica e calendário" é jargão de produção; "Como funciona" seria mais direto.

### 3. Controle e liberdade do usuário
- **Ruim:** clicar num buteco e voltar perde a posição da rolagem.
- **Ruim:** filtros aplicados na listagem somem ao voltar do detalhe.

### 4. Consistência e padrões
- **Ruim:** padrões de card variam entre cidades (alguns mostram bairro, outros não).
- **Ruim:** botão "Vote aqui" muda de posição e cor entre páginas.

### 5. Prevenção de erros
- **Misto:** voto por cédula física previne dupla contagem; online sem indicador "você já votou".
- **Ruim:** selecionar cidade errada exige 3 cliques pra voltar.

### 6. Reconhecimento em vez de memória
- **Ruim:** o **tema do ano não fica claro**. Em 2026 a comunicação fala "criatividade e acolhimento" mas o leitor não sabe se isso obriga ingrediente comum nos pratos (caso de 2013, 2019, etc.).
- **Bom:** datas do concurso aparecem repetidas em vários lugares.

### 7. Flexibilidade e eficiência
- **Ruim:** sem busca por nome de buteco direto na home.
- **Ruim:** sem geolocalização "butecos perto de mim".
- **Ruim:** filtro por bairro pega só uma cidade por vez.

### 8. Estética e design minimalista
- **Misto:** identidade gráfica forte (cores quentes, ilustrações de comida) mas com **densidade visual alta**.
- **Ruim:** carrosséis no topo da home são pesados — usuário precisa esperar pra "passar do chamariz" e chegar nas cidades.

### 9. Reconhecimento, diagnóstico e recuperação de erros
- **Ruim:** se votação online falha (edição encerrada), só some o botão — sem mensagem clara.
- **Ruim:** páginas 404 sem redirect inteligente.

### 10. Ajuda e documentação
- **Bom:** existe `/mecanica-e-calendario/`.
- **Ruim:** **não há FAQ** sobre dúvidas frequentes (ex: "preciso visitar pra votar?", "preciso de cadastro?", "quanto custa o petisco?").

---

## Auditoria estática de acessibilidade

Limitação: sem renderização real, não dá pra checar foco, contraste real e ordem de tabulação. O que dá pra inferir do HTML:

| Item | Status |
|------|--------|
| `<html lang>` | sim, `pt-BR`. |
| `<title>` único e descritivo | sim. |
| **Estrutura de h1 na home** | **0 h1**. Falha. |
| Imagens com `alt=""` | 7 — algumas claramente informativas (logo, banner). |
| Skip link "pular pro conteúdo" | não detectado. |
| Form labels associadas | não conferido (precisa runtime). |
| Foco visível | não conferível por HTML estático. |
| `aria-expanded` em menus | não detectado nos itens de menu mobile. |
| Toolbar Pojo A11y embutida | sim — não substitui acessibilidade nativa. |

**Recomendação:** rodar `axe-core` ou Pa11y no domínio oficial em ambiente real pra ter números (estimativa: erro count > 30 por página).

---

## Performance — hipóteses

Sem Lighthouse rodado, hipóteses informadas:

- **24 scripts** na home — vários pixels de tracking + plugin do tema. Provável **TBT alto**.
- **Carrossel** no topo com fotos grandes → impacto em **LCP**.
- **`a_fundo2.png` como bg-repeat** em carrossel → 90 KB hotlinkado em padrão repetível.
- **Sem `loading="lazy"`** nas imagens — todas baixadas eagerly.
- **Sem `srcset`** — uma única resolução por imagem.
- **Fonte web** carregada de Google Fonts sem `font-display: swap` claro → risco de FOIT/FOUT.

**Recomendação:** Lighthouse em modo Mobile + 4G simulada e capturar Core Web Vitals.

---

## Mapa de fluxos

```
[Home /]
   │
   ├──> [Sobre o concurso]      → /o-comida-di-buteco/
   ├──> [Mecânica e calendário] → /mecanica-e-calendario/
   ├──> [Vencedores]            → /vencedores/
   ├──> [Patrocinadores]        → /patrocinadores/
   ├──> [Indique um buteco]     → /indique-um-buteco/
   ├──> [Cultura di Buteco]     → /cultura-di-buteco/
   ├──> [Receitas]              → /receitas-deliciosas/
   ├──> [Contato]               → /contato/
   │
   └──> [Lista de butecos]      → /butecos/
              │
              └──> [Cidade]     → /butecos/<slug-cidade>/
                       │
                       └──> [Detalhe do buteco] → /buteco/<slug>/
                                  │
                                  └──> "Vote" → cédula física no buteco
                                              ou link externo de voto online
```

**Caminho crítico** (buteco → voto): home → cidade → detalhe → entender regras → ir até o buteco → votar. **6 cliques + 1 deslocamento físico.** Cada clique é oportunidade de abandono.

---

## Inventário de conteúdo (edição 2026)

- **62 cidades** participantes.
- **987 butecos** participantes (sitemap + páginas individuais).
- **27 circuitos** (mencionados em `/mecanica-e-calendario/`).
- **Período de votação 2026:** 10/04 a 10/05 (BH/GO/RJ/SP/SSA) ou 10/04 a 03/05 (demais).
- **4 critérios de avaliação:** petiscos, atendimento, higiene, temperatura da bebida (notas 1-10).
- **Ponderação:** 50% público + 50% júri.
- **Descenso:** 20% últimos colocados perdem direito no ano seguinte.

Páginas conteudistas (não dinâmicas):

1. `/o-comida-di-buteco/` — história e identidade.
2. `/mecanica-e-calendario/` — regras, datas, critérios.
3. `/vencedores/` — histórico.
4. `/patrocinadores/` — sponsors da edição.
5. `/cultura-di-buteco/` — blog/editorial.
6. `/receitas-deliciosas/` — receitas dos butecos.
7. `/causos/` — relatos.
8. `/contato/` — formulário.
9. `/indique-um-buteco/` — formulário de indicação.

---

## Oportunidades capturadas pelo redesign

| Achado oficial | Resposta do redesign |
|----------------|----------------------|
| 0 `<h1>` na home | Toda página tem `<h1>` único e semântico. |
| Carrossel pesado no topo | Hero limpo com gradiente + acentos paper-cut leves. |
| Tema do ano não fica claro | `/concurso/` tem seção "Tem tema este ano?" explícita. |
| `<h2>` "222" como contagem | Contagens viram `<span>` com `aria-label` apropriado. |
| Filtros não preservam estado | Filtro por bairro tem URL parametrizável (futuro: persistir entre navegação). |
| Sem busca rápida por buteco | Combobox autocomplete na listagem. |
| Sem `loading="lazy"` em fotos | Todas as `<img>` do detalhe usam `loading="lazy"`. |
| Tracking pesado | Zero analytics, zero pixels. |
| Sem skip link | `<SkipLink />` em toda página (RNF-0001). |
| Toolbar A11y externa | A11y nativa: foco visível, ARIA correta, semântica HTML. |
| FAQ ausente | Página `/concurso/` cobre as dúvidas mais frequentes. |
| Padrões de card variando | DS unificado: `ButecoCard` e `ButecoListItem` consistentes em todas as cidades. |

---

## Próximos passos (Fase 5)

1. **Lighthouse Mobile vs Desktop** no oficial e no redesign — capturar antes/depois em LCP, CLS, INP, TBT.
2. **axe-core** rodado em 5 páginas representativas de cada lado. Comparar erro count.
3. **Teste com 5 usuários** (pesquisa moderada) executando 3 tarefas: encontrar buteco perto de BH com prato de pão de queijo; entender votação; saber endereço do Federal Bar.
4. **Teste com leitor de tela** (NVDA + VoiceOver) nos fluxos críticos.

---

## Limitações deste diagnóstico

- Nenhum número real de Core Web Vitals — tudo no patamar "hipótese informada".
- A11y avaliada só pelo HTML estático.
- Não foi avaliado o fluxo de voto online (paywall ou login impedem inspeção).
- Heurísticas de Nielsen são qualitativas — leitores diferentes podem categorizar achados em itens diferentes.

A próxima passada (Fase 5) deve substituir as hipóteses por medidas reais.

---

## Sumário executivo

O site atual é estruturalmente OK (WordPress + Cloudflare) e tem cuidados básicos de SEO e acessibilidade. As oportunidades estão em **densidade visual, hierarquia semântica, performance mobile e clareza de regras** — não em infraestrutura. O redesign aproveita o que está bom (URL canônica, OG, WAF) e substitui o que envelheceu (toolbar A11y externa, h2 com números, layout pesado, ausência de FAQ).
