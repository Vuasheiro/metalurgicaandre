// ============================================================
// catalog.js — Produtos do catálogo
// ============================================================
// Apenas produtos. Categorias → categories.js | Projetos → projects.js
// Configurações → settings.js
//
// Imagens futuras: assets/images/products/<id>.jpg
// Futura integração CMS: produtos cadastrados via painel admin.
// ============================================================

export const products = [


  {
    id: "porta-diagonal",
    nome: "Porta Diagonal",
    categoria: "portas",
    codigo: "AS-000",
    tipo: "Porta social",
    descricao:
      "Modelo de visual limpo, ideal para entrada social com pintura personalizada, puxador vertical e estrutura sob medida.",
    imagens: [
      "assets/images/products/porta-diagonal.png",
      "assets/images/logo/logo.png",
    ],
    medidas: ["2,10 x 0,80", "2,14 x 0,77"],
    acabamento: ["Branco acetinado", "Preto fosco", "Cinza alumínio", "Brilho"],
    abertura: ["Direita", "Esquerda"],
    valor: "A combinar",
    destaque: true,
  },
  {
    id: "porta-lambril-friso-horizontal",
    nome: "Porta Lambril com Friso Horizontal",
    categoria: "portas",
    codigo: "AS-001",
    tipo: "Porta social",
    descricao:
      "Modelo de visual limpo, ideal para entrada social com pintura personalizada, puxador vertical e estrutura sob medida.",
    imagens: [
      "https://images.pexels.com/photos/8433195/pexels-photo-8433195.jpeg?auto=compress&cs=tinysrgb&w=1100",
      "assets/images/logo/logo.png",
    ],
    medidas: ["2,14 x 0,67", "2,14 x 0,77"],
    acabamento: ["Branco acetinado", "Preto fosco", "Cinza alumínio"],
    abertura: ["Direita", "Esquerda"],
    valor: "A combinar",
    destaque: true,
  },
  {
    id: "porta-visor-lateral",
    nome: "Porta Metálica com Visor Lateral",
    categoria: "portas",
    codigo: "AS-002",
    tipo: "Com vidro",
    descricao:
      "Opção elegante para ambientes que precisam de entrada de luz natural sem perder segurança e acabamento.",
    imagens: [
      "https://images.pexels.com/photos/30834762/pexels-photo-30834762.jpeg?auto=compress&cs=tinysrgb&w=1100",
      "assets/images/logo/logo.png",
    ],
    medidas: ["2,10 x 0,80", "2,15 x 0,90"],
    acabamento: ["Preto fosco", "Branco acetinado"],
    abertura: ["Direita", "Esquerda"],
    valor: "A combinar",
  },
  {
    id: "porta-pivotante-preta",
    nome: "Porta Pivotante Preta Sob Medida",
    categoria: "portas",
    codigo: "AS-003",
    tipo: "Pivotante",
    descricao:
      "Acabamento imponente para fachadas modernas, com estrutura reforçada, linhas retas e presença arquitetônica.",
    imagens: [
      "https://images.pexels.com/photos/10727928/pexels-photo-10727928.jpeg?auto=compress&cs=tinysrgb&w=1100",
      "assets/images/logo/logo.png",
    ],
    medidas: ["2,20 x 0,90", "2,30 x 1,00"],
    acabamento: ["Preto fosco", "Grafite"],
    abertura: ["Direita", "Esquerda"],
    valor: "A combinar",
  },
  {
    id: "porta-correr-area-gourmet",
    nome: "Porta de Correr para Área Gourmet",
    categoria: "portas",
    codigo: "AS-004",
    tipo: "Correr",
    descricao:
      "Solução prática para integrar ambientes, com trilho firme, acabamento sob medida e abertura leve no uso diário.",
    imagens: [
      "https://images.pexels.com/photos/34658642/pexels-photo-34658642.jpeg?auto=compress&cs=tinysrgb&w=1100",
      "assets/images/logo/logo.png",
    ],
    medidas: ["2,10 x 1,20", "2,20 x 1,50"],
    acabamento: ["Branco acetinado", "Cinza alumínio"],
    abertura: ["Correr para direita", "Correr para esquerda"],
    valor: "A combinar",
  },
  {
    id: "porta-esquadria-fachada",
    nome: "Porta com Esquadria para Fachada",
    categoria: "esquadrias",
    codigo: "AS-005",
    tipo: "Fachada",
    descricao:
      "Conjunto pensado para combinar porta, janela e detalhes metálicos no mesmo padrão visual da fachada.",
    imagens: [
      "https://images.pexels.com/photos/14470556/pexels-photo-14470556.jpeg?auto=compress&cs=tinysrgb&w=1100",
      "assets/images/logo/logo.png",
    ],
    medidas: ["Sob medida", "Conforme vão"],
    acabamento: ["Preto fosco", "Grafite", "Branco acetinado"],
    abertura: ["A definir"],
    valor: "A combinar",
  },
  {
    id: "porta-externa-reforcada",
    nome: "Porta Externa Reforçada",
    categoria: "portas",
    codigo: "AS-006",
    tipo: "Externa",
    descricao:
      "Modelo indicado para áreas externas, com estrutura resistente, pintura durável e acabamento de fácil manutenção.",
    imagens: [
      "https://images.pexels.com/photos/17762963/pexels-photo-17762963.jpeg?auto=compress&cs=tinysrgb&w=1100",
      "assets/images/logo/logo.png",
    ],
    medidas: ["2,10 x 0,80", "2,14 x 0,90"],
    acabamento: ["Cinza alumínio", "Preto fosco"],
    abertura: ["Direita", "Esquerda"],
    valor: "A combinar",
  },
  {
    id: "janela-aluminio-veneziana",
    nome: "Janela de Alumínio Veneziana",
    categoria: "janelas",
    codigo: "AS-007",
    tipo: "Veneziana",
    descricao:
      "Janela com boa ventilação e privacidade, indicada para quartos, corredores e áreas de serviço.",
    imagens: [
      "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1100",
      "assets/images/logo/logo.png",
    ],
    medidas: ["1,00 x 1,20", "1,20 x 1,20"],
    acabamento: ["Branco acetinado", "Natural alumínio"],
    abertura: ["Correr"],
    valor: "A combinar",
  },
  {
    id: "esquadria-fixa-vidro",
    nome: "Esquadria Fixa com Vidro",
    categoria: "esquadrias",
    codigo: "AS-008",
    tipo: "Fixa",
    descricao:
      "Estrutura fixa para valorizar iluminação natural em fachadas, salas, escritórios e áreas comerciais.",
    imagens: [
      "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1100",
      "assets/images/logo/logo.png",
    ],
    medidas: ["Sob medida", "Conforme projeto"],
    acabamento: ["Preto fosco", "Grafite"],
    abertura: ["Fixa"],
    valor: "A combinar",
  },
];
