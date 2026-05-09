#!/usr/bin/env bash
# .claude/hooks/session-context.sh
#
# SessionStart hook — carrega o contexto do projeto Comida di Buteco em toda
# nova sessão (startup, resume, clear, compact). A saída em stdout entra no
# contexto da IA automaticamente.
#
# Mantenha CURTO e DENSO — esse texto é gasto em tokens em todas as sessões.

set -u

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT" || exit 0

emit_section() {
  local title="$1"
  printf "\n## %s\n" "$title"
}

printf "# Contexto Comida di Buteco — carregado por hook (%s)\n" "$(date +%Y-%m-%d)"

emit_section "O projeto"
cat <<'EOF'
Redesign de UI/UX de https://comidadibuteco.com.br/ — concurso gastronômico
brasileiro de butecos. Diretrizes não-negociáveis:
- Mobile first (320px primeiro)
- WCAG 2.2 AA mínimo
- Inspirado em GOV.UK Design System (princípios + arquitetura, identidade BR)
- Toda decisão arquitetural exige ADR ACCEPTED antes de implementar
- ADR PROPOSED não vai para código sem aprovação humana explícita
EOF

emit_section "Roadmap (status)"
if [[ -f ROADMAP.md ]]; then
  awk '/^## Fase/{count++} count<=3' ROADMAP.md | sed -n '1,80p'
fi

emit_section "ADRs ativos"
if [[ -d docs/adr ]]; then
  for f in docs/adr/ADR-*.md; do
    [[ -f "$f" ]] || continue
    title=$(grep -m1 -E '^# ADR-' "$f" | sed -E 's/^# //')
    status=$(grep -m1 -E '^- \*\*Status:\*\*' "$f" | sed -E 's/^- \*\*Status:\*\* //')
    printf -- "- [%s] %s — %s\n" "${status:-?}" "$title" "$f"
  done
fi

emit_section "Requisitos cadastrados"
if [[ -d docs/requisitos ]]; then
  rf_count=$(find docs/requisitos/funcionais -maxdepth 1 -name 'RF-*.md' 2>/dev/null | wc -l | tr -d ' ')
  rnf_count=$(find docs/requisitos/nao-funcionais -maxdepth 1 -name 'RNF-*.md' 2>/dev/null | wc -l | tr -d ' ')
  printf "RFs: %s | RNFs: %s\n" "$rf_count" "$rnf_count"
  printf "Listagem rápida:\n"
  for f in docs/requisitos/funcionais/RF-*.md docs/requisitos/nao-funcionais/RNF-*.md; do
    [[ -f "$f" ]] || continue
    title=$(head -n1 "$f" | sed -E 's/^# //')
    printf -- "- %s (%s)\n" "$title" "$f"
  done
fi

emit_section "Skills disponíveis"
cat <<'EOF'
- /cdb-onboarding — tour completo do projeto (use no início de uma sessão nova)
- /cdb-indexer — reindexa e responde "onde está X?"
- /cdb-design-system — consulta rápida a tokens e componentes
- /cdb-decision-log — guia de criação de novos ADRs
EOF

emit_section "Lembretes operacionais"
cat <<'EOF'
1. Antes de implementar QUALQUER mudança que toque o produto: confirme se há
   ADR ACCEPTED. Se não houver, pare e proponha o ADR primeiro.
2. Documentação em pt-BR; tokens e código em inglês.
3. Numeração: RF-XXXX, RNF-XXXX, ADR-XXXX (4 dígitos, sequencial, não reaproveite).
4. Branch designado: claude/design-system-setup-6xB7T
EOF
