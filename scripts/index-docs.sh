#!/usr/bin/env bash
# scripts/index-docs.sh
#
# Indexador leve da base documental do projeto.
# Lê docs/ e produz um sumário canônico de RFs, RNFs e ADRs com status e título.
#
# Uso:
#   bash scripts/index-docs.sh           # imprime no terminal
#   bash scripts/index-docs.sh --json    # saída em JSON (consumível por skill/IA)
#   bash scripts/index-docs.sh --check   # falha se houver inconsistência (numeração, status inválido)

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

MODE="${1:-text}"

VALID_STATUSES_ADR=("PROPOSED" "ACCEPTED" "DEPRECATED" "SUPERSEDED" "REJECTED")

extract_title() {
  local f="$1"
  head -n1 "$f" | sed -E 's/^# //'
}

extract_status() {
  local f="$1"
  grep -m1 -E '^- \*\*Status:\*\*' "$f" 2>/dev/null | sed -E 's/^- \*\*Status:\*\* //' | awk '{print $1}'
}

list_files() {
  local dir="$1" pattern="$2"
  find "$dir" -maxdepth 1 -name "$pattern" 2>/dev/null | sort
}

print_text() {
  printf "# Índice de documentação — %s\n\n" "$(date +%Y-%m-%d)"

  printf "## Requisitos Funcionais (RF)\n"
  for f in $(list_files docs/requisitos/funcionais 'RF-*.md'); do
    printf -- "- %s — %s\n" "$(basename "$f")" "$(extract_title "$f")"
  done
  printf "\n## Requisitos Não Funcionais (RNF)\n"
  for f in $(list_files docs/requisitos/nao-funcionais 'RNF-*.md'); do
    printf -- "- %s — %s\n" "$(basename "$f")" "$(extract_title "$f")"
  done

  printf "\n## Architecture Decision Records (ADR)\n"
  for f in $(list_files docs/adr 'ADR-*.md'); do
    printf -- "- [%s] %s — %s\n" "$(extract_status "$f")" "$(basename "$f")" "$(extract_title "$f")"
  done

  printf "\n## Pesquisa\n"
  for f in $(list_files docs/pesquisa '*.md'); do
    [[ "$(basename "$f")" == "README.md" ]] && continue
    printf -- "- %s — %s\n" "$(basename "$f")" "$(extract_title "$f")"
  done
}

print_json() {
  printf '{\n'
  printf '  "generated_at": "%s",\n' "$(date -u +%Y-%m-%dT%H:%M:%SZ)"

  printf '  "rfs": [\n'
  local first=1
  for f in $(list_files docs/requisitos/funcionais 'RF-*.md'); do
    [[ $first -eq 1 ]] || printf ',\n'
    first=0
    printf '    {"id":"%s","title":%s,"path":"%s"}' \
      "$(basename "$f" .md)" \
      "$(printf '%s' "$(extract_title "$f")" | python3 -c 'import json,sys;print(json.dumps(sys.stdin.read()))')" \
      "$f"
  done
  printf '\n  ],\n'

  printf '  "rnfs": [\n'
  first=1
  for f in $(list_files docs/requisitos/nao-funcionais 'RNF-*.md'); do
    [[ $first -eq 1 ]] || printf ',\n'
    first=0
    printf '    {"id":"%s","title":%s,"path":"%s"}' \
      "$(basename "$f" .md)" \
      "$(printf '%s' "$(extract_title "$f")" | python3 -c 'import json,sys;print(json.dumps(sys.stdin.read()))')" \
      "$f"
  done
  printf '\n  ],\n'

  printf '  "adrs": [\n'
  first=1
  for f in $(list_files docs/adr 'ADR-*.md'); do
    [[ $first -eq 1 ]] || printf ',\n'
    first=0
    printf '    {"id":"%s","status":"%s","title":%s,"path":"%s"}' \
      "$(basename "$f" .md)" \
      "$(extract_status "$f")" \
      "$(printf '%s' "$(extract_title "$f")" | python3 -c 'import json,sys;print(json.dumps(sys.stdin.read()))')" \
      "$f"
  done
  printf '\n  ]\n'
  printf '}\n'
}

check_invariants() {
  local errors=0

  # 1. Numeração sequencial e sem buracos por tipo
  for prefix in RF RNF ADR; do
    case "$prefix" in
      RF)  dir=docs/requisitos/funcionais ;;
      RNF) dir=docs/requisitos/nao-funcionais ;;
      ADR) dir=docs/adr ;;
    esac
    if [[ ! -d "$dir" ]]; then continue; fi
    nums=$(find "$dir" -maxdepth 1 -name "${prefix}-*.md" 2>/dev/null | sed -E "s|.*/${prefix}-([0-9]+).*|\1|" | sort -n | uniq)
    [[ -z "$nums" ]] && continue
    last=0
    for n in $nums; do
      n_int=$((10#$n))
      if (( n_int != last + 1 )); then
        printf 'WARN: %s numeração não sequencial: pulou de %04d para %s\n' "$prefix" "$last" "$n" >&2
        errors=$((errors+1))
      fi
      last=$n_int
    done
  done

  # 2. Status válido em ADRs
  for f in $(list_files docs/adr 'ADR-*.md'); do
    status=$(extract_status "$f")
    if [[ -z "$status" ]]; then
      printf 'ERROR: %s sem status\n' "$f" >&2
      errors=$((errors+1))
      continue
    fi
    found=0
    for s in "${VALID_STATUSES_ADR[@]}"; do
      [[ "$s" == "$status" ]] && found=1 && break
    done
    if (( found == 0 )); then
      printf 'ERROR: %s status inválido "%s"\n' "$f" "$status" >&2
      errors=$((errors+1))
    fi
  done

  if (( errors > 0 )); then
    printf '\n%d issue(s) encontradas.\n' "$errors" >&2
    return 1
  fi
  printf 'OK — sem inconsistências.\n'
}

case "$MODE" in
  --json)  print_json ;;
  --check) check_invariants ;;
  *)       print_text ;;
esac
