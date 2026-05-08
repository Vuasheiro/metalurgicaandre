import { WHATSAPP_NUMBER, categories, products, projects } from "../data/catalog.js";

const state = {
  category: "todos",
  type: "todos",
  query: "",
  activeProduct: null,
  selectedImage: "",
  selectedMeasure: "",
  selectedOpening: "",
  selectedFinish: "",
  observation: "",
};

const dom = {
  loader: document.querySelector("[data-loader]"),
  header: document.querySelector(".site-header"),
  menuButton: document.querySelector(".menu-button"),
  categoryNav: document.querySelector("[data-category-nav]"),
  search: document.querySelector("[data-search]"),
  filterCategories: document.querySelector("[data-filter-categories]"),
  filterTypes: document.querySelector("[data-filter-types]"),
  activeFilters: document.querySelector("[data-active-filters]"),
  grid: document.querySelector("[data-product-grid]"),
  resultCount: document.querySelector("[data-result-count]"),
  catalogTitle: document.querySelector("[data-catalog-title]"),
  emptyState: document.querySelector("[data-empty-state]"),
  modal: document.querySelector("[data-product-modal]"),
  modalImage: document.querySelector("[data-modal-image]"),
  modalThumbs: document.querySelector("[data-modal-thumbs]"),
  modalCategory: document.querySelector("[data-modal-category]"),
  modalCode: document.querySelector("[data-modal-code]"),
  modalName: document.querySelector("[data-modal-name]"),
  modalDescription: document.querySelector("[data-modal-description]"),
  modalType: document.querySelector("[data-modal-type]"),
  modalValue: document.querySelector("[data-modal-value]"),
  modalMeasures: document.querySelector("[data-modal-measures]"),
  modalOpenings: document.querySelector("[data-modal-openings]"),
  modalFinishes: document.querySelector("[data-modal-finishes]"),
  modalObservation: document.querySelector("[data-modal-observation]"),
  modalWhatsapp: document.querySelector("[data-modal-whatsapp]"),
  modalMessagePreview: document.querySelector("[data-modal-message-preview]"),
  projectGrid: document.querySelector("[data-project-grid]"),
  projectLightbox: document.querySelector("[data-project-lightbox]"),
  lightboxImage: document.querySelector("[data-lightbox-image]"),
  lightboxTitle: document.querySelector("[data-lightbox-title]"),
};

const categoryLabels = new Map(categories.map((category) => [category.id, category.label]));

const normalize = (value) =>
  String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const uniqueTypes = () => ["todos", ...new Set(products.map((product) => product.tipo))];

const buildWhatsAppMessage = () => {
  const product = state.activeProduct;
  if (!product) return "";

  const baseMessage = `Olá, André! Vi no showroom o modelo ${product.nome} (${product.codigo}), categoria ${categoryLabels.get(
    product.categoria,
  )}, medida ${state.selectedMeasure}, abertura ${state.selectedOpening} e acabamento ${
    state.selectedFinish
  }. Gostaria de solicitar um orçamento personalizado.`;

  return state.observation ? `${baseMessage} Observação: ${state.observation}` : baseMessage;
};

const updateWhatsAppLink = () => {
  const message = buildWhatsAppMessage();
  dom.modalWhatsapp.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  dom.modalMessagePreview.textContent = message;
};

const getFilteredProducts = () => {
  const query = normalize(state.query);

  return products.filter((product) => {
    const byCategory = state.category === "todos" || product.categoria === state.category;
    const byType = state.type === "todos" || product.tipo === state.type;
    const searchable = normalize(
      [
        product.id,
        product.nome,
        product.categoria,
        product.codigo,
        product.tipo,
        product.descricao,
        product.valor,
        ...product.medidas,
        ...product.acabamento,
      ].join(" "),
    );

    return byCategory && byType && (!query || searchable.includes(query));
  });
};

const renderSkeleton = () => {
  dom.grid.classList.add("is-loading");
  dom.grid.innerHTML = Array.from(
    { length: 6 },
    () => `
      <article class="skeleton-card">
        <span></span>
        <div></div>
        <strong></strong>
        <p></p>
      </article>
    `,
  ).join("");
};

const renderCategoryNav = () => {
  dom.categoryNav.innerHTML = categories
    .map(
      (category) => `
        <button class="${state.category === category.id ? "active" : ""}" type="button" data-category="${
          category.id
        }">${category.label}</button>
      `,
    )
    .join("");
};

const renderFilterButtons = () => {
  dom.filterCategories.innerHTML = categories
    .map(
      (category) => `
        <button class="${state.category === category.id ? "selected" : ""}" type="button" data-category="${
          category.id
        }">${category.label}</button>
      `,
    )
    .join("");

  dom.filterTypes.innerHTML = uniqueTypes()
    .map(
      (type) => `
        <button class="${state.type === type ? "selected" : ""}" type="button" data-type="${type}">
          ${type === "todos" ? "Todos os tipos" : type}
        </button>
      `,
    )
    .join("");
};

const renderActiveFilters = () => {
  const tags = [];

  if (state.category !== "todos") tags.push(categoryLabels.get(state.category));
  if (state.type !== "todos") tags.push(state.type);
  if (state.query) tags.push(`Busca: ${state.query}`);

  dom.activeFilters.innerHTML = tags.map((tag) => `<span>${tag}</span>`).join("");
};

const createProductCard = (product, index) => `
  <article class="product-card reveal" style="--delay: ${index * 55}ms">
    <button type="button" class="favorite-button" aria-label="Salvar modelo ${product.nome}">♡</button>
    <button type="button" class="product-open" data-product-id="${product.id}" aria-label="Abrir detalhes de ${
      product.nome
    }">
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

const renderProjects = () => {
  if (!dom.projectGrid) return;

  dom.projectGrid.innerHTML = projects
    .map(
      (project, index) => `
        <button class="project-card reveal ${index === 0 || index === 2 ? "is-tall" : ""}" type="button"
          data-project-id="${project.id}" style="--delay: ${index * 70}ms">
          <img src="${project.imagem}" alt="${project.titulo}" loading="lazy" decoding="async" />
          <span>${project.categoria}</span>
          <strong>${project.titulo}</strong>
        </button>
      `,
    )
    .join("");
};

const renderProducts = () => {
  const filteredProducts = getFilteredProducts();
  const categoryName = state.category === "todos" ? "Modelos em destaque" : categoryLabels.get(state.category);

  dom.catalogTitle.textContent = categoryName;
  dom.resultCount.textContent = `${filteredProducts.length} modelo${filteredProducts.length === 1 ? "" : "s"}`;
  dom.emptyState.hidden = filteredProducts.length > 0;
  dom.grid.classList.remove("is-loading");
  dom.grid.innerHTML = filteredProducts.map(createProductCard).join("");

  renderActiveFilters();
  observeReveals();
};

const renderAll = () => {
  renderCategoryNav();
  renderFilterButtons();
  renderSkeleton();
  window.setTimeout(renderProducts, 280);
};

const setCategory = (category) => {
  state.category = category;
  renderAll();
};

const setType = (type) => {
  state.type = type;
  renderAll();
};

const selectOption = (container, value) => {
  [...container.querySelectorAll("button")].forEach((button) => {
    button.classList.toggle("selected", button.dataset.value === value);
  });
};

const renderOptionGroup = (container, values, selectedValue, onSelect) => {
  container.innerHTML = values
    .map(
      (value) => `
        <button class="${value === selectedValue ? "selected" : ""}" type="button" data-value="${value}">
          ${value}
        </button>
      `,
    )
    .join("");

  container.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      onSelect(button.dataset.value);
      selectOption(container, button.dataset.value);
      updateWhatsAppLink();
    });
  });
};

const openModal = (productId) => {
  const product = products.find((item) => item.id === productId);
  if (!product) return;

  state.activeProduct = product;
  state.selectedImage = product.imagens[0];
  state.selectedMeasure = product.medidas[0];
  state.selectedOpening = product.abertura[0];
  state.selectedFinish = product.acabamento[0];
  state.observation = "";

  dom.modalImage.src = state.selectedImage;
  dom.modalImage.alt = product.nome;
  dom.modalCategory.textContent = categoryLabels.get(product.categoria);
  dom.modalCode.textContent = `Código: ${product.codigo}`;
  dom.modalName.textContent = product.nome;
  dom.modalDescription.textContent = product.descricao;
  dom.modalType.textContent = product.tipo;
  dom.modalValue.textContent = product.valor;
  dom.modalObservation.value = "";

  dom.modalThumbs.innerHTML = product.imagens
    .map(
      (image, index) => `
        <button class="${index === 0 ? "active" : ""}" type="button" data-image="${image}" aria-label="Imagem ${
        index + 1
      } de ${product.nome}">
          <img src="${image}" alt="" loading="lazy" decoding="async" />
        </button>
      `,
    )
    .join("");

  dom.modalThumbs.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedImage = button.dataset.image;
      dom.modalImage.src = state.selectedImage;
      dom.modalThumbs.querySelectorAll("button").forEach((thumb) => thumb.classList.remove("active"));
      button.classList.add("active");
    });
  });

  renderOptionGroup(dom.modalMeasures, product.medidas, state.selectedMeasure, (value) => {
    state.selectedMeasure = value;
  });
  renderOptionGroup(dom.modalOpenings, product.abertura, state.selectedOpening, (value) => {
    state.selectedOpening = value;
  });
  renderOptionGroup(dom.modalFinishes, product.acabamento, state.selectedFinish, (value) => {
    state.selectedFinish = value;
  });

  updateWhatsAppLink();
  dom.modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
};

const closeModal = () => {
  dom.modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
};

const openProjectLightbox = (projectId) => {
  const project = projects.find((item) => item.id === projectId);
  if (!project) return;

  dom.lightboxImage.src = project.imagem;
  dom.lightboxImage.alt = project.titulo;
  dom.lightboxTitle.textContent = project.titulo;
  dom.projectLightbox.setAttribute("aria-hidden", "false");
};

const closeProjectLightbox = () => {
  dom.projectLightbox?.setAttribute("aria-hidden", "true");
};

let revealObserver;

function observeReveals() {
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
    return;
  }

  revealObserver?.disconnect();
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
}

const bindEvents = () => {
  window.addEventListener("scroll", () => {
    dom.header.classList.toggle("is-scrolled", window.scrollY > 24);
  });

  dom.menuButton?.addEventListener("click", () => {
    const isOpen = dom.header.classList.toggle("menu-open");
    dom.menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  dom.categoryNav.addEventListener("click", (event) => {
    const button = event.target.closest("[data-category]");
    if (!button) return;
    setCategory(button.dataset.category);
    document.querySelector("#catalogo")?.scrollIntoView({ behavior: "smooth" });
    dom.header.classList.remove("menu-open");
    dom.menuButton?.setAttribute("aria-expanded", "false");
  });

  dom.filterCategories.addEventListener("click", (event) => {
    const button = event.target.closest("[data-category]");
    if (button) setCategory(button.dataset.category);
  });

  dom.filterTypes.addEventListener("click", (event) => {
    const button = event.target.closest("[data-type]");
    if (button) setType(button.dataset.type);
  });

  dom.search.addEventListener("input", (event) => {
    state.query = event.target.value.trim();
    renderAll();
  });

  dom.modalObservation?.addEventListener("input", (event) => {
    state.observation = event.target.value.trim();
    updateWhatsAppLink();
  });

  dom.grid.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-product-id]");
    if (trigger) openModal(trigger.dataset.productId);
  });

  document.querySelectorAll("[data-close-modal]").forEach((button) => {
    button.addEventListener("click", closeModal);
  });

  dom.projectGrid?.addEventListener("click", (event) => {
    const projectButton = event.target.closest("[data-project-id]");
    if (projectButton) openProjectLightbox(projectButton.dataset.projectId);
  });

  document.querySelector("[data-close-project]")?.addEventListener("click", closeProjectLightbox);
  dom.projectLightbox?.addEventListener("click", (event) => {
    if (event.target === dom.projectLightbox) closeProjectLightbox();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
    if (event.key === "Escape") closeProjectLightbox();
  });
};

const init = () => {
  bindEvents();
  renderProjects();
  renderAll();
  observeReveals();

  window.setTimeout(() => {
    dom.loader?.classList.add("is-hidden");
  }, 420);
};

init();
