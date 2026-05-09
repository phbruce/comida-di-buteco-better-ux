# RNF-0002 — Performance (Core Web Vitals)

- **Status:** Em rascunho
- **Categoria:** Performance
- **Criado em:** 2026-05-09
- **RFs relacionados:** RF-0001, RF-0003

## Atributo de qualidade

O site carrega rápido em 4G de bairro brasileiro e mantém interações responsivas.

## Métricas (alvos no p75 de campo)

| Métrica  | Alvo "good"            | Alvo "needs improvement" (limite) |
|----------|------------------------|-----------------------------------|
| **LCP**  | ≤ 2.5 s                | ≤ 4.0 s                           |
| **INP**  | ≤ 200 ms               | ≤ 500 ms                          |
| **CLS**  | ≤ 0.1                  | ≤ 0.25                            |
| **TTFB** | ≤ 800 ms               | ≤ 1.8 s                           |
| **JS**   | ≤ 100 KB gzip (rota inicial) | ≤ 170 KB gzip                |

Lab (sintético): Lighthouse Performance ≥ 90 em mobile com **throttling 4G**.

## Cenários

### Cenário 1 — primeira visita 4G
- **Estímulo:** usuário em 4G médio (RTT ~150ms, throughput ~1.6Mbps) acessa a listagem.
- **Resposta:** LCP ≤ 2.5 s; conteúdo crítico (header + 1ª linha de cards) visível antes.

### Cenário 2 — interação com filtros
- **Estímulo:** usuário aplica filtro.
- **Resposta:** INP ≤ 200 ms; nenhuma "tela em branco" intermediária.

## Estratégias

- HTML/CSS-first; JavaScript só onde agrega valor real.
- Imagens responsivas (`srcset`, `sizes`), formatos modernos (AVIF/WebP), `loading="lazy"` exceto hero.
- Fontes auto-hospedadas, `font-display: swap`, subset apenas dos glifos usados.
- Cache HTTP agressivo em assets imutáveis com hash; `Cache-Control: public, max-age=31536000, immutable`.
- Crítico inline (above-the-fold), não-crítico diferido.
- Sem bibliotecas pesadas no caminho crítico.

## Trade-offs

- Menos animação e menos JS → menos "uau" visual. Aceitamos no mobile.
- Critério tem precedência sobre features novas: se quebra LCP, volta para a prancheta.

## Como validar

- Lab: Lighthouse CI em PR.
- Campo: integração com `web-vitals` enviando para endpoint próprio (decisão futura via ADR).
