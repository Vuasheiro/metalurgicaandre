// ============================================================
// settings.js — Configurações globais da ANDRÉ SERRALHEIRO
// ============================================================
// Centralize aqui: WhatsApp, nome, contatos e templates de mensagem.
// Futura integração CMS: este arquivo será gerado pelo painel admin.
// ============================================================

export const settings = {
  whatsapp: "5521968587713",
  companyName: "ANDRÉ SERRALHEIRO",
  tagline: "Showroom premium de esquadrias sob medida",
  instagram: null, // ex: "andreserralheiro.rj"
  email: null,

  // Mensagem padrão (fallback)
  defaultMessage: "Olá, André! Gostaria de solicitar um orçamento.",

  // Templates prontos por contexto
  messageTemplates: {
    // Usado no modal de produto (gerado dinamicamente em modal.js)
    product: (product, category, measure, opening, finish, observation) => {
      const base =
        `Olá, André! Vi no showroom o modelo *${product.nome}* (${product.codigo}), ` +
        `categoria ${category}, medida ${measure}, abertura ${opening} e acabamento ${finish}. ` +
        `Gostaria de solicitar um orçamento personalizado.`;
      return observation ? `${base} Observação: ${observation}` : base;
    },

    // Contato geral (botão hero/header)
    general: () =>
      "Olá, André! Vim pelo showroom e gostaria de conversar sobre um projeto.",

    // Orçamento sem produto selecionado
    budget: () =>
      "Olá, André! Gostaria de solicitar um orçamento para esquadrias sob medida.",
  },
};
