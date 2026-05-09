# RF-0003 — Exibir detalhe de um buteco

- **Status:** Em rascunho
- **Prioridade:** Alta
- **Criado em:** 2026-05-09
- **RNFs relacionados:** RNF-0001, RNF-0002, RNF-0003
- **ADRs relacionados:** ADR-0002

## Descrição

A página de detalhe de um buteco deve apresentar todas as informações necessárias para que um visitante decida visitá-lo.

## Atores

- Visitante.

## Conteúdo obrigatório (vista pública)

1. Nome do buteco
2. Foto e nome do prato participante
3. Descrição do prato (ingredientes, inspiração)
4. Endereço completo + link "como chegar"
5. Telefone / WhatsApp (se houver), com `tel:` e `https://wa.me/` quando aplicável
6. Horário de funcionamento
7. Bairro / região
8. Histórico de prêmios (se houver)
9. CTA principal: "votar neste buteco" (se votação aberta) ou "ver detalhes da votação"
10. Compartilhamento (link copiável, WhatsApp, etc.)

## Cenários

### Cenário 1 — página acessada via listagem
- **Dado** que o visitante clicou num card,
- **Quando** a página carrega,
- **Então** todo conteúdo obrigatório é exibido em ordem de prioridade mobile-first.

### Cenário 2 — buteco não encontrado
- **Quando** o slug não existe,
- **Então** retornar 404 com link de volta à listagem da cidade.

### Cenário 3 — período de votação fechado
- **Quando** o concurso ainda não começou ou já encerrou,
- **Então** o CTA de voto é substituído por mensagem informativa do estado atual.

## Critérios de aceitação

- [ ] Heading hierárquico correto (`<h1>` único).
- [ ] Imagens responsivas com `srcset` e `loading="lazy"` exceto a hero.
- [ ] CLS < 0,1.
- [ ] Endereço com `<address>` semântico.
- [ ] Telefones e link de mapa funcionam em iOS e Android.
- [ ] Compartilhamento usa Web Share API quando disponível, fallback para copiar link.

## Fora de escopo

- Avaliações e comentários do público (backlog).
- Galeria com lightbox (será avaliado em ADR de componente).
