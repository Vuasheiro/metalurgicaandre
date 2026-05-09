// ============================================================
// filters.js — Filtros, busca e renderização do catálogo
// ============================================================

export let categoryLabels = new Map();

// Normalização para busca sem acento
export const normalize = (value) =>
  String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export const getUniqueTypes = (products) => [
  "todos",
  ...new Set(products.map((p) => p.tipo)),
];

// ── Inicialização ───────────────────────────────────────────
export function initFilters(categories) {
  categoryLabels = new Map(categories.map((c) => [c.id, c.label]));
}

// ── Renderização ────────────────────────────────────────────

export function renderSkeleton(gridEl) {
  gridEl.classList.add("is-loading");
  gridEl.innerHTML = Array.from(
    { length: 6 },
    () => `
      <article class="skeleton-card">
        <span></span><div></div><strong></strong><p></p>
      </article>
    `
  ).join("");
}

export function renderCategoryNav(navEl, categories, activeCategory) {
  navEl.innerHTML = categories
    .map(
      (c) => `
        <button class="${activeCategory === c.id ? "active" : ""}"
          type="button" data-category="${c.id}">${c.label}</button>
      `
    )
    .join("");
}

export function renderFilterButtons(categoriesEl, typesEl, categories, products, activeCategory, activeType) {
  categoriesEl.innerHTML = categories
    .map(
      (c) => `
        <button class="${activeCategory === c.id ? "selected" : ""}"
          type="button" data-category="${c.id}">${c.label}</button>
      `
    )
    .join("");

  const types = getUniqueTypes(products);
  typesEl.innerHTML = types
    .map(
      (type) => `
        <button class="${activeType === type ? "selected" : ""}"
          type="button" data-type="${type}">
          ${type === "todos" ? "Todos os tipos" : type}
        </button>
      `
    )
    .join("");
}

export function renderActiveFilters(containerEl, state) {
  const tags = [];
  if (state.category !== "todos") tags.push(categoryLabels.get(state.category));
  if (state.type !== "todos") tags.push(state.type);
  if (state.query) tags.push(`Busca: ${state.query}`);
  containerEl.innerHTML = tags.map((tag) => `<span>${tag}</span>`).join("");
}

export function getFilteredProducts(products, state) {
  const query = normalize(state.query);
  return products.filter((p) => {
    const byCategory = state.category === "todos" || p.categoria === state.category;
    const byType = state.type === "todos" || p.tipo === state.type;
    const searchable = normalize(
      [p.id, p.nome, p.categoria, p.codigo, p.tipo, p.descricao, p.valor,
        ...p.medidas, ...p.acabamento].join(" ")
    );
    return byCategory && byType && (!query || searchable.includes(query));
  });
}

export function createProductCard(product, index) {
  return `
    <article class="product-card reveal" style="--delay: ${index * 55}ms">
      <button type="button" class="favorite-button" aria-label="Salvar modelo ${product.nome}">♡</button>
      <button type="button" class="product-open" data-product-id="${product.id}"
        aria-label="Abrir detalhes de ${product.nome}">
        <img src="${product.imagens[0]}" alt="${product.nome}" loading="lazy" decoding="async" />
      </button>
      <div class="product-info">
        <span class="tag">${product.tipo}</span>
        <h3>${product.nome}</h3>
        <p>${product.descricao}</p>
        <div class="product-meta">
          <span>${product.codigo}</span>
          <strong>${product.valor}</strong>
        </div>
        <button type="button" data-product-id="${product.id}" class="quote-button">Fazer orçamento</button>
      </div>
    </article>
  `;
}

export function renderProducts(dom, products, state, observeReveals) {
  const filtered = getFilteredProducts(products, state);
  const categoryName =
    state.category === "todos" ? "Modelos em destaque" : categoryLabels.get(state.category);

  dom.catalogTitle.textContent = categoryName;
  dom.resultCount.textContent = `${filtered.length} modelo${filtered.length === 1 ? "" : "s"}`;
  dom.emptyState.hidden = filtered.length > 0;
  dom.grid.classList.remove("is-loading");
  dom.grid.innerHTML = filtered.map(createProductCard).join("");

  renderActiveFilters(dom.activeFilters, state);
  observeReveals();
}

export function renderProjects(projectGridEl, projects) {
  if (!projectGridEl) return;
  projectGridEl.innerHTML = projects
    .map(
      (project, index) => `
        <button class="project-card reveal ${index === 0 || index === 2 ? "is-tall" : ""}"
          type="button" data-project-id="${project.id}" style="--delay: ${index * 70}ms">
          <img src="${project.imagem}" alt="${project.titulo}" loading="lazy" decoding="async" />
          <span>${project.categoria}</span>
          <strong>${project.titulo}</strong>
        </button>
      `
    )
    .join("");
}
