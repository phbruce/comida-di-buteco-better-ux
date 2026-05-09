# Contexto do Produto

> Briefing do projeto. Atualize quando a estratégia mudar.

## Natureza do projeto — IMPORTANTE

Este é um **redesign exploratório, NÃO oficial**, sem vínculo com a organização do concurso Comida di Buteco. Implicações:

- Não falamos em nome da marca.
- Não coletamos votos reais — qualquer ação de votação **deve** redirecionar ao site oficial (`https://comidadibuteco.com.br/`).
- Conteúdo (butecos, pratos, fotos) usado em protótipos é **mock** ou citação — substituir por dados reais só com autorização da organização ou via fontes públicas claramente atribuídas.
- O domínio do redesign é `phbruce.github.io/comida-di-buteco-better-ux/` — diferente do oficial.
- Banner de fase, footer e meta-tags devem deixar a natureza não oficial visível para qualquer visitante.

Esse é o **tom de toda a comunicação do site**: explorar UX/UI sem se passar pelo produto oficial.

## O que é o Comida di Buteco

Concurso gastronômico tradicional brasileiro em que butecos (bares de bairro) competem com um **prato autoral**, geralmente regional. O concurso acontece anualmente em diversas cidades do Brasil. Durante o período do concurso, o público:

1. Visita os butecos participantes.
2. Avalia o prato e a experiência.
3. **Vota** numa cédula/sistema online.

O site oficial é o ponto central de descoberta: lista butecos por cidade, mostra o prato, fotos, endereço e habilita a votação.

Site atual de referência: https://comidadibuteco.com.br/butecos/belo-horizonte/

## Por que redesenhar

(Hipóteses iniciais — serão validadas no diagnóstico da Fase 1.)

- **Densidade visual alta**: muitos butecos por página dificultam comparação e escolha.
- **Mobile sub-ótimo**: a maior parte do uso real ocorre na rua, no celular, decidindo onde ir comer.
- **Hierarquia visual fraca**: difícil distinguir prato, endereço, voto, prêmios.
- **Acessibilidade**: sem evidências de conformidade WCAG.
- **Performance**: imagens pesadas e carregamento lento em 4G.

## Quem usa

### Persona primária — "O explorador de fim de semana"
- 25-50 anos, mora na cidade-sede do concurso.
- Decide com 1-2 amigos onde almoçar/jantar nas próximas 2 horas.
- Está em movimento, no celular, possivelmente em conexão fraca.
- Quer: **ver butecos próximos**, **comparar pratos**, **chegar lá**.

### Persona secundária — "O votante engajado"
- Já visitou ≥ 3 butecos no concurso.
- Quer registrar voto e acompanhar resultado.
- Volta ao site múltiplas vezes durante o período.

### Persona terciária — "O dono do buteco"
- Quer que seu buteco seja encontrável e bem apresentado.
- Não é alvo direto deste redesign, mas se beneficia.

## Métricas de sucesso (norte)

- **Lighthouse a11y ≥ 95** em todas as telas-chave.
- **LCP < 2,5 s** em 4G simulado.
- **CLS < 0,1**.
- **Taxa de conclusão de voto** (do clique em "votar" até confirmação) ≥ 90% (instrumentar).
- **Tempo até primeira ação útil** (cidade selecionada → buteco aberto) reduzido em 50% vs. site atual.

## Restrições conhecidas

- Conteúdo estruturado já existente — formato de retorno do back-end será descoberto na Fase 1.
- Calendário do concurso é externo; o site precisa lidar com estados "antes", "durante" e "após".
- Marca "Comida di Buteco" tem identidade visual existente (logo, nome) — **respeitada**, mas o redesign não está limitado a ela.

## Não-objetivos (escopo fechado para a v1)

- Login social.
- Aplicativo nativo.
- Sistema de favoritos sincronizado entre dispositivos.
- Internacionalização.

Esses itens vão para o backlog (`ROADMAP.md`).
