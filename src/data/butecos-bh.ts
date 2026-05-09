/**
 * Mock de butecos de Belo Horizonte para o protótipo.
 * Nomes reais coletados do site atual em 2026-05-09 (curl + grep).
 * Pratos e descrições são FICCIONAIS, apenas para preencher o protótipo —
 * substitua por dados reais via integração com a fonte oficial em fase futura.
 */

export interface Buteco {
  slug: string;
  nome: string;
  prato: string;
  pratoDescricao?: string;
  bairro: string;
  cidade: string;
  cidadeSlug: string;
  foto: string;
  fotoAlt: string;
  premios?: string[];
  premiadoEmEdicao?: boolean;
  novato?: boolean;
  /** Coordenadas aproximadas (placeholder até geocoding em build via crawl). */
  coords?: { lat: number; lng: number };
}

const placeholder = (seed: string, w = 800, h = 500) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const butecosBH: Buteco[] = [
  {
    slug: "alexandres-bar",
    nome: "Alexandre's Bar",
    prato: "Costelinha do Alexandre",
    pratoDescricao: "Costelinha suína cozida lentamente em molho de goiabada com pimenta-biquinho e farofa de couve.",
    bairro: "Santa Tereza",
    cidade: "Belo Horizonte",
    cidadeSlug: "belo-horizonte",
    foto: placeholder("alexandres"),
    fotoAlt: "Costelinha glaceada acompanhada de farofa servida em panela de barro",
    premios: ["Top 10 BH 2024"],
    premiadoEmEdicao: true,
    coords: { lat: -19.9191, lng: -43.9234 },
  },
  {
    slug: "andrades-beer",
    nome: "Andrade's Beer",
    prato: "Bolinho de Feijoada",
    pratoDescricao: "Crocante por fora, recheio cremoso de feijoada com torresmo e couve crispy.",
    bairro: "Buritis",
    cidade: "Belo Horizonte",
    cidadeSlug: "belo-horizonte",
    foto: placeholder("andrades"),
    fotoAlt: "Bolinhos crocantes em prato com gomos de limão",
    coords: { lat: -19.9702, lng: -44.0043 },
  },
  {
    slug: "armazem-santa-amelia",
    nome: "Armazém Santa Amélia",
    prato: "Lombo Caipira",
    pratoDescricao: "Lombo suíno marinado em cachaça artesanal, servido com mandioca rústica e geleia de pimenta.",
    bairro: "Santa Amélia",
    cidade: "Belo Horizonte",
    cidadeSlug: "belo-horizonte",
    foto: placeholder("santaamelia"),
    fotoAlt: "Fatias de lombo dourado dispostas sobre mandioca dourada",
    premios: ["Eleito pelos jurados 2023"],
    coords: { lat: -19.8866, lng: -43.9719 },
  },
  {
    slug: "avalanche-bar-e-restaurante",
    nome: "Avalanche Bar e Restaurante",
    prato: "Tutu da Vovó",
    pratoDescricao: "Tutu de feijão tradicional mineiro com bisteca, ovo e couve.",
    bairro: "Pampulha",
    cidade: "Belo Horizonte",
    cidadeSlug: "belo-horizonte",
    foto: placeholder("avalanche"),
    fotoAlt: "Travessa com tutu de feijão, bisteca e couve refogada",
    coords: { lat: -19.8567, lng: -43.9727 },
  },
  {
    slug: "azougue-fogo-e-bar",
    nome: "Azougue Fogo e Bar",
    prato: "Picadinho na Brasa",
    pratoDescricao: "Picadinho de filé mignon assado em fogo a lenha com banana da terra caramelizada.",
    bairro: "Lourdes",
    cidade: "Belo Horizonte",
    cidadeSlug: "belo-horizonte",
    foto: placeholder("azougue"),
    fotoAlt: "Picadinho fumegante com fatias de banana caramelizada",
    novato: true,
    coords: { lat: -19.9359, lng: -43.9439 },
  },
  {
    slug: "baiuca",
    nome: "Baiúca",
    prato: "Frango Caipira da Baiúca",
    pratoDescricao: "Frango caipira em molho de açafrão da terra, servido com angu cremoso.",
    bairro: "Floresta",
    cidade: "Belo Horizonte",
    cidadeSlug: "belo-horizonte",
    foto: placeholder("baiuca"),
    fotoAlt: "Pedaços de frango caipira sobre angu amarelo",
    coords: { lat: -19.9062, lng: -43.9268 },
  },
  {
    slug: "bar-bambu",
    nome: "Bar Bambú",
    prato: "Linguiça com Mandioca",
    pratoDescricao: "Linguiça artesanal defumada, mandioca frita e molho campeiro.",
    bairro: "Savassi",
    cidade: "Belo Horizonte",
    cidadeSlug: "belo-horizonte",
    foto: placeholder("bambu"),
    fotoAlt: "Linguiça em rodelas com mandioca dourada e molho rústico",
    coords: { lat: -19.9415, lng: -43.9306 },
  },
  {
    slug: "bar-bendita-baderna",
    nome: "Bar Bendita Baderna",
    prato: "Pastel de Angu",
    pratoDescricao: "Pastel mineiro de massa de fubá recheado com carne, vinagrete e queijo curado.",
    bairro: "Centro",
    cidade: "Belo Horizonte",
    cidadeSlug: "belo-horizonte",
    foto: placeholder("baderna"),
    fotoAlt: "Pastéis de angu cortados ao meio mostrando recheio",
    novato: true,
    coords: { lat: -19.9194, lng: -43.9405 },
  },
  {
    slug: "bar-da-cintia",
    nome: "Bar da Cintia",
    prato: "Galinhada da Cintia",
    pratoDescricao: "Arroz amarelo com galinha caipira, açafrão e linguiça calabresa artesanal.",
    bairro: "Sagrada Família",
    cidade: "Belo Horizonte",
    cidadeSlug: "belo-horizonte",
    foto: placeholder("cintia"),
    fotoAlt: "Galinhada amarela em panela de ferro",
    premios: ["Vencedor Regional 2022"],
    premiadoEmEdicao: true,
    coords: { lat: -19.9083, lng: -43.9142 },
  },
  {
    slug: "bar-da-fia",
    nome: "Bar da Fia",
    prato: "Bambá de Couve",
    pratoDescricao: "Caldo cremoso de couve com fubá, costelinha e ovo pochê.",
    bairro: "Cidade Nova",
    cidade: "Belo Horizonte",
    cidadeSlug: "belo-horizonte",
    foto: placeholder("fia"),
    fotoAlt: "Tigela de bambá de couve com ovo pochê no centro",
    coords: { lat: -19.8949, lng: -43.9300 },
  },
  {
    slug: "bar-da-gisa",
    nome: "Bar da Gisa",
    prato: "Costela na Pressão",
    pratoDescricao: "Costela bovina cozida lentamente, mandioca cremosa e molho de pimenta-de-cheiro.",
    bairro: "Ouro Preto",
    cidade: "Belo Horizonte",
    cidadeSlug: "belo-horizonte",
    foto: placeholder("gisa"),
    fotoAlt: "Costela desfiando sobre purê de mandioca",
    coords: { lat: -19.8436, lng: -43.9952 },
  },
  {
    slug: "trindade-emporio",
    nome: "Trindade Empório",
    prato: "Joelho Suíno Mineiro",
    pratoDescricao: "Joelho suíno em molho de cerveja preta com tutu e couve.",
    bairro: "Funcionários",
    cidade: "Belo Horizonte",
    cidadeSlug: "belo-horizonte",
    foto: placeholder("trindade"),
    fotoAlt: "Joelho suíno glaceado com tutu de feijão",
    coords: { lat: -19.9294, lng: -43.9314 },
  },
];

export const cidades = [
  { slug: "belo-horizonte", nome: "Belo Horizonte", uf: "MG", populares: true, total: butecosBH.length },
  { slug: "rio-de-janeiro", nome: "Rio de Janeiro", uf: "RJ", populares: true, total: 0 },
  { slug: "sao-paulo", nome: "São Paulo", uf: "SP", populares: true, total: 0 },
  { slug: "salvador", nome: "Salvador", uf: "BA", populares: false, total: 0 },
  { slug: "curitiba", nome: "Curitiba", uf: "PR", populares: false, total: 0 },
  { slug: "porto-alegre", nome: "Porto Alegre", uf: "RS", populares: false, total: 0 },
  { slug: "brasilia", nome: "Brasília", uf: "DF", populares: false, total: 0 },
  { slug: "recife", nome: "Recife", uf: "PE", populares: false, total: 0 },
  { slug: "fortaleza", nome: "Fortaleza", uf: "CE", populares: false, total: 0 },
  { slug: "goiania", nome: "Goiânia", uf: "GO", populares: false, total: 0 },
];
