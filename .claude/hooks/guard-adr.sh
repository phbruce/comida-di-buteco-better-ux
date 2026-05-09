#!/usr/bin/env bash
# .claude/hooks/guard-adr.sh
#
# UserPromptSubmit hook — adiciona contexto leve sobre ADRs em PROPOSED para
# lembrar a IA de não implementar código a partir deles sem aprovação.
#
# Sai 0 sempre; nunca bloqueia. A intenção é informar, não impedir.

set -u
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT" || exit 0

if [[ ! -d docs/adr ]]; then
  exit 0
fi

proposed=()
while IFS= read -r f; do
  if grep -qE '^- \*\*Status:\*\* PROPOSED' "$f"; then
    proposed+=("$(basename "$f")")
  fi
done < <(find docs/adr -maxdepth 1 -name 'ADR-*.md' 2>/dev/null)

if (( ${#proposed[@]} > 0 )); then
  printf '\n[guard-adr] ADRs em PROPOSED (não implementar até aprovação):\n'
  for a in "${proposed[@]}"; do
    printf -- '  - %s\n' "$a"
  done
fi

exit 0
