# Referências — GOV.UK Design System

> **Fonte oficial:** https://design-system.service.gov.uk/
> **Coleta:** 2026-05-09
>
> ⚠️ A documentação oficial do GOV.UK pede **não copiar valores hex literalmente** e sim usar suas funções Sass para manter coerência. Tomamos os valores como **ponto de partida inspiracional**, não cópia. ADR-0004 define os tokens **próprios** do projeto Comida di Buteco.

---

## Princípios que adotamos

1. **Conteúdo primeiro.** A interface serve o conteúdo, não o contrário.
2. **Acessibilidade não é feature.** É a base. WCAG 2.2 AA mínimo.
3. **Componentes pequenos, padrões reutilizáveis.** Combine, não invente.
4. **Linguagem clara.** Vocabulário direto, voz ativa, pt-BR sem jargão.
5. **Performance como ética.** Quem está em 4G de bairro tem o mesmo direito.
6. **Foco visível e inequívoco.** Inspiração direta do `#ffdd00` do GOV.UK.

## Paleta — referência GOV.UK

| Função | Hex | Uso |
|--------|-----|-----|
| Texto primário | `#0b0c0c` | Texto principal |
| Texto secundário | `#484949` | Texto auxiliar |
| Link | `#1a65a6` | Hyperlinks |
| Link hover | `#0f385c` | Hover de link |
| Link visitado | `#54319f` | Link visitado |
| Borda | `#cecece` | Bordas padrão |
| Borda de input | `#0b0c0c` | Inputs |
| Foco (background) | `#ffdd00` | Anel/realce de foco |
| Foco (texto) | `#0b0c0c` | Texto sobre foco |
| Erro | `#ca3535` | Mensagens de erro |
| Sucesso | `#0f7a52` | Mensagens de sucesso |
| Marca/Brand | `#1d70b8` | Cor primária GOV.UK |
| Superfície (bg) | `#f4f8fb` | Cartões/áreas |
| Body bg | `#ffffff` | Fundo do body |

→ ADR-0004 vai propor a **adaptação** para o Comida di Buteco, mantendo intenção (alto contraste, foco vibrante, semântica clara) com identidade brasileira/gastronômica.

## Espaçamento — escala responsiva

Escala de 0 a 9, troca-de-marcha em ≥ 640px:

| Unidade | Mobile (<640px) | Desktop (≥640px) |
|--------:|----------------:|-----------------:|
| 0 | 0 | 0 |
| 1 | 5px | 5px |
| 2 | 10px | 10px |
| 3 | 15px | 15px |
| 4 | 15px | 20px |
| 5 | 15px | 25px |
| 6 | 20px | 30px |
| 7 | 25px | 40px |
| 8 | 30px | 50px |
| 9 | 40px | 60px |

→ Adotaremos **a mesma escala**, com renomes para tokens em inglês (`space-0` a `space-9`). Ver ADR-0004.

## Tipografia — referência

GOV.UK usa fonte **Transport** historicamente, hoje migrou para **GDS Transport**. É proprietária. Para nosso projeto, escolheremos uma fonte **livre, otimizada para web**, com geometria semelhante (humanista, alta legibilidade).

Candidatas (a propor em ADR-0004):
- **Inter** — neutra, vasta família de pesos, ótima em corpo pequeno.
- **IBM Plex Sans** — humanista, com personalidade.
- **Source Sans 3** — neutra, gratuita, conhecida.

## Componentes que vamos espelhar

- **Phase banner** — bandeira "alpha/beta" no topo, útil para comunicar fases do concurso.
- **Skip link** — "pular para o conteúdo".
- **Button** — primário, secundário, "warning" (vermelho), invertido.
- **Inset text** — texto em destaque sem virar alerta.
- **Notification banner** — info, success, warning, error.
- **Details / summary** — divulgação progressiva (estilo `<details>` nativo).
- **Pagination** — anterior/próximo + numérica.
- **Breadcrumbs** — navegação hierárquica.
- **Tag** — para premiação, categoria, status.

## Sistema de grid

GOV.UK usa grid de 12 colunas no desktop e fluido no mobile. Adotaremos abordagem semelhante; detalhes em ADR específico de grid (Fase 2).

## Princípios de redação (UX writing)

GOV.UK é referência mundial em **escrita simples**. Vamos seguir:
- Frases curtas (≤ 20 palavras quando possível).
- Voz ativa.
- Sem jargão.
- Verbos antes de substantivos: "votar", não "registro de votação".
