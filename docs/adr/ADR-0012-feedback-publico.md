# ADR-0012 — Feedback acessível a qualquer visitante (sem GitHub)

- **Status:** ACCEPTED
- **Data:** 2026-05-09
- **Decisor(es):** Dono do produto (aprovado em 2026-05-09 — opção A: Web3Forms)
- **Relacionado:** ADR-0006 (mantido — define o conceito do botão de feedback). Esta proposta SÓ refina o canal de envio.
- **RFs/RNFs relacionados:** RNF-0001 (a11y), RNF-0005 (privacidade)

## Contexto

ADR-0006 definiu o componente de feedback "Esta info está correta?" com canal primário via Cloudflare Worker e **fallback no-deploy abrindo issue do GitHub pré-preenchido**. Hoje o site roda no fallback (Worker não foi deployado).

Problema identificado pelo dono do produto: **o fallback exige conta GitHub no momento do submit**, o que exclui a maioria dos visitantes — "tia da escola" não tem (e não vai criar) conta GitHub. O site deve atender qualquer pessoa.

## Decisão (proposta)

**Trocar o canal padrão para um serviço de form-as-service que aceite envio anônimo, mantendo o Worker como opção avançada.**

Recomendação principal: **Web3Forms** — free, ilimitado, sem cadastro pro visitante, configuração via uma única chave de acesso.

### Como funciona Web3Forms

1. Você cria conta grátis em web3forms ponto com (sem cartão) e gera uma access key.
2. A chave fica como GitHub Secret (`FEEDBACK_W3F_KEY`), exposta ao build via env `PUBLIC_FEEDBACK_W3F_KEY`.
3. O componente Feedback envia POST direto para `api ponto web3forms ponto com slash submit` com os campos do form + a chave.
4. Web3Forms recebe, valida (anti-spam interno + nosso honeypot), e envia por email para o endereço cadastrado na sua conta.
5. Visitante vê "Obrigado!" inline. Sem aba nova, sem login.

Visitante não precisa de conta nenhuma. Você (dono) recebe um email por feedback.

## Alternativas consideradas

### Alternativa A — Web3Forms (recomendada)
- **Prós:** Free ilimitado. Setup em 3 minutos. Sem signup pro visitante. Anti-spam embutido. Email pronto.
- **Contras:** Feedbacks chegam por email — não viram registro estruturado direto. Pode-se redirecionar pro Slack/Notion/etc via integração da Web3Forms.
- **Privacidade:** dados passam pelos servidores da Web3Forms; eles seguem práticas comuns mas adicionam um terceiro.

### Alternativa B — Tally Forms
- **Prós:** UI bonita no dashboard, integra com Notion/Sheets/Slack. Free generoso.
- **Contras:** Setup ~5 min (criar projeto, criar form, copiar embed). O componente de Feedback teria que virar embed Tally (perde nosso DS) OU usar Tally só como endpoint (igual Web3Forms).

### Alternativa C — Cloudflare Worker (existente)
- **Prós:** Controle total, dados ficam no GitHub Issues do projeto (rastreável, triagem aberta).
- **Contras:** Setup ~10 min (conta Cloudflare + wrangler CLI + token GitHub). Mais complexo.
- **Quando faz sentido:** quando o volume crescer e você quiser triagem pública.

### Alternativa D — Manter o atual (no-deploy GitHub Issue)
- **Prós:** Zero setup.
- **Contras:** Exclui qualquer visitante sem conta GitHub. Identificado como bug pelo dono.
- **Por que não:** quebra o objetivo de servir qualquer pessoa.

### Alternativa E — `mailto:` puro
- **Prós:** Zero infraestrutura.
- **Contras:** Abre cliente de email do dispositivo. UX ruim em mobile. Muitos não têm cliente de email configurado.
- **Por que não:** atrito alto demais.

## Consequências

### Positivas (se A escolhida)
- Site atende qualquer visitante.
- Setup curto.
- Mantém componente de Feedback com nosso DS intacto (apenas troca o action/endpoint).

### Custos aceitos
- Mais um terceiro (Web3Forms) na superfície de privacidade — incluir aviso curto na hint do form sobre o destino do dado.
- Feedback chega por email; se quiser arquivo público, precisa migrar pra C depois.

## Plano de implementação (após ACCEPTED)

- Você cria conta em web3forms ponto com, copia a access key.
- Adiciona como GitHub Secret `FEEDBACK_W3F_KEY` em Settings → Secrets → Actions.
- Eu atualizo `.github/workflows/deploy.yml` para expor `PUBLIC_FEEDBACK_W3F_KEY: ${{ secrets.FEEDBACK_W3F_KEY }}` no passo Build.
- Eu atualizo `Feedback.astro` para detectar a chave e usar Web3Forms como canal padrão (modo "github" vira fallback final se chave não existir).
- Atualizo o aviso do form sobre destino dos dados.

## Como reverter

Trocar a env por outra (CF Worker via `PUBLIC_FEEDBACK_ENDPOINT`) ou remover a env (volta ao GitHub Issue redirect). Componente é único arquivo.

## Referências

- Web3Forms — https colon slash slash web3forms ponto com
- Tally — https colon slash slash tally ponto so
- ADR-0006 — feedback original
