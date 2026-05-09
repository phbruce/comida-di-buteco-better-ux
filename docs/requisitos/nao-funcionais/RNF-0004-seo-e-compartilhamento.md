# RNF-0004 — SEO e compartilhamento social

- **Status:** Em rascunho
- **Categoria:** Operacional / UX
- **Criado em:** 2026-05-09
- **RFs relacionados:** RF-0001, RF-0003, RF-0004

## Atributo de qualidade

O site é encontrável e bem apresentado em mecanismos de busca e quando compartilhado em redes sociais e mensageiros.

## Métricas

| Métrica                                          | Alvo |
|--------------------------------------------------|------|
| Lighthouse SEO                                   | ≥ 95 |
| Páginas com `<title>` único e descritivo         | 100% |
| Páginas com `meta description`                   | 100% |
| Open Graph (og:title, og:description, og:image)  | 100% nas páginas indexáveis |
| Schema.org `Restaurant` ou `LocalBusiness` em detalhe | 100% |
| Sitemap.xml                                      | Atualizado |
| robots.txt                                       | Configurado |
| URLs canônicas e estáveis                        | `/butecos/<cidade>/`, `/butecos/<cidade>/<slug-buteco>/` |

## Estratégias

- Renderização SSR/SSG para conteúdo público (decisão em ADR de stack).
- Sem redirecionamentos em cadeia.
- Heading `<h1>` por página (RF-0003).
- Imagens nomeadas semanticamente.

## Como validar

- Lighthouse SEO em CI.
- Validador do Schema.org.
- Teste manual de preview no WhatsApp / Instagram / Twitter / Facebook.
