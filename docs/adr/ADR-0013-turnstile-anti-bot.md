# ADR-0013 — Cloudflare Turnstile como anti-bot do feedback

- **Status:** ACCEPTED
- **Data:** 2026-05-09
- **Decisor(es):** Dono do produto (delegado em 2026-05-09 — "Usa p cloudflare turnestile")
- **Relacionado:** ADR-0006 (componente de feedback), ADR-0012 (canal Web3Forms)
- **RFs/RNFs relacionados:** RNF-0005 (segurança), RNF-0001 (a11y)

## Contexto

ADR-0012 trouxe o feedback acessível (Web3Forms, sem login). Após implementar, ficou claro que defesas client-side (honeypot, time-check, rate limit em localStorage) param **abuso casual** mas não **ataque coordenado**: incognito, limpar storage, ou bot que aguarda 2s e usa proxies derruba tudo isso. Sem proteção server-side, um atacante pode estourar o free tier do Web3Forms (1.000 envios/mês) ou inundar o email do mantenedor.

## Decisão

Adotar **Cloudflare Turnstile** — captcha invisível, gratuito, privacy-friendly, suportado nativamente pelo Web3Forms.

Modo: **Managed** (Cloudflare decide quando mostrar challenge baseado em sinais; geralmente invisível pra humanos legítimos). O widget injeta um campo `cf-turnstile-response` no form; Web3Forms valida o token server-side e rejeita o envio se inválido.

Acessibilidade: Turnstile é projetado para ser acessível, com fallback para usuários sem JS / com leitores de tela. Não usa puzzles visuais como reCAPTCHA. Conformidade WCAG mantida.

Privacidade: Cloudflare declara que Turnstile não usa cookies de tracking nem fingerprint persistente, ao contrário de reCAPTCHA. Privacy policy: https colon slash slash www ponto cloudflare ponto com slash privacypolicy.

## Alternativas consideradas

### A — Cloudflare Turnstile (escolhida)
- **Prós:** invisível, free, OSS-friendly, sem cookie de tracking, integração nativa com Web3Forms, a11y razoável.
- **Contras:** depende do servidor da Cloudflare (terceiro carrega JS); exige conta Cloudflare (mas free, sem cartão).

### B — hCaptcha
- **Prós:** alternativa popular, free.
- **Contras:** UX mais intrusiva (puzzles visuais), preocupações com ad-tech.

### C — reCAPTCHA v3 (Google)
- **Contras:** privacy-hostile, cookies de tracking, requer conta Google extra.

### D — Não usar nada (continuar só com defesas client-side)
- **Contras:** atacante motivado quebra; risco de estourar free tier ou flood de email.

## Plano de implementação

- Você cria conta em Cloudflare (free, sem cartão).
- Vai em **Turnstile** no menu lateral, **Add site**.
  - Domain: `phbruce.github.io`
  - Widget Mode: **Managed** (recomendado).
  - Pré-clearance: **No** (não necessário pra esse uso).
- Cloudflare devolve **Site Key** (público) e **Secret Key** (server-side; usado pelo Web3Forms — não precisamos manipular, só o Site Key vai pro front).
- Adiciona Site Key como GitHub Secret `TURNSTILE_SITE_KEY` em Settings → Secrets → Actions.
- O workflow já expõe como `PUBLIC_TURNSTILE_SITE_KEY` no build.
- O componente Feedback detecta a key e injeta o widget Turnstile na seção `detail` (logo acima do botão Enviar). Web3Forms reconhece automaticamente o campo `cf-turnstile-response`.

## Como reverter

Remover o secret. Componente cai pra modo sem captcha (rate limit + honeypot + time check seguem ativos).

## Referências

- Turnstile docs — https colon slash slash developers ponto cloudflare ponto com slash turnstile
- Web3Forms + Turnstile — https colon slash slash docs ponto web3forms ponto com slash how-to-guides slash spam-protection slash cloudflare-turnstile
