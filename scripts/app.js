// ============================================================
// app.js — Orquestrador principal (v1.1.0)
// ============================================================
// Importa os módulos e inicializa a aplicação.
// Mantém o estado global e as referências do DOM.
// ============================================================

import { products } from "../data/catalog.js";
import { projects } from "../data/projects.js";
import { observeReveals, hideLoader, initParallax } from "./animations.js";
import {
  renderCategoryNav,
  renderFilterButtons,
  renderProducts,
  renderProjects,
  renderSkeleton,
} from "./filters.js";
import {
  openModal,
  closeModal,
  openProjectLightbox,
  closeProjectLightbox,
  updateWhatsAppLink,
} from "./modal.js";
import { initMobileMenu, closeMobileMenu, initFilterDrawer } from "./mobile.js";

// ── Estado global ────────────────────────────────────────────
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

// ── Referências do DOM ───────────────────────────────────────
const dom = {
  loader:               document.querySelector("[data-loader]"),
  header:               document.querySelector(".site-header"),
  menuButton:           document.querySelector(".menu-button"),
  categoryNav:          document.querySelector("[data-category-nav]"),
  search:               document.querySelector("[data-search]"),
  filterCategories:     document.querySelector("[data-filter-categories]"),
  filterTypes:          document.querySelector("[data-filter-types]"),
  activeFilters:        document.querySelector("[data-active-filters]"),
  grid:                 document.querySelector("[data-product-grid]"),
  resultCount:          document.querySelector("[data-result-count]"),
  catalogTitle:         document.querySelector("[data-catalog-title]"),
  emptyState:           document.querySelector("[data-empty-state]"),
  modal:                document.querySelector("[data-product-modal]"),
  modalImage:           document.querySelector("[data-modal-image]"),
  modalThumbs:          document.querySelector("[data-modal-thumbs]"),
  modalCategory:        document.querySelector("[data-modal-category]"),
  modalCode:            document.querySelector("[data-modal-code]"),
  modalName:            document.querySelector("[data-modal-name]"),
  modalDescription:     document.querySelector("[data-modal-description]"),
  modalType:            document.querySelector("[data-modal-type]"),
  modalValue:           document.querySelector("[data-modal-value]"),
  modalMeasures:        document.querySelector("[data-modal-measures]"),
  modalOpenings:        document.querySelector("[data-modal-openings]"),
  modalFinishes:        document.querySelector("[data-modal-finishes]"),
  modalObservation:     document.querySelector("[data-modal-observation]"),
  modalWhatsapp:        document.querySelector("[data-modal-whatsapp]"),
  modalMessagePreview:  document.querySelector("[data-modal-message-preview]"),
  projectGrid:          document.querySelector("[data-project-grid]"),
  projectLightbox:      document.querySelector("[data-project-lightbox]"),
  lightboxImage:        document.querySelector("[data-lightbox-image]"),
  lightboxTitle:        document.querySelector("[data-lightbox-title]"),
  searchMobile:         document.querySelector("[data-search-mobile]"),
  filterToggle:         document.querySelector("#filter-toggle"),
  filterDrawer:         document.querySelector("#filter-drawer"),
  filterBackdrop:       document.querySelector("#filter-backdrop"),
  filterClose:          document.querySelector("#filter-close"),
};

// ── Render helper ────────────────────────────────────────────
const renderAll = () => {
  renderCategoryNav(dom.categoryNav, state.category);
  renderFilterButtons(dom.filterCategories, dom.filterTypes, state.category, state.type);
  renderSkeleton(dom.grid);
  window.setTimeout(() => renderProducts(dom, state, observeReveals), 280);
};

// ── Eventos ──────────────────────────────────────────────────
const bindEvents = () => {
  // Header scroll
  window.addEventListener("scroll", () => {
    dom.header.classList.toggle("is-scrolled", window.scrollY > 24);
  }, { passive: true });

  // Menu mobile
  initMobileMenu(dom.header, dom.menuButton);

  // Nav de categorias (header)
  dom.categoryNav.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-category]");
    if (!btn) return;
    state.category = btn.dataset.category;
    renderAll();
    document.querySelector("#catalogo")?.scrollIntoView({ behavior: "smooth" });
    closeMobileMenu(dom.header, dom.menuButton);
  });

  // Filtros laterais
  dom.filterCategories.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-category]");
    if (btn) { state.category = btn.dataset.category; renderAll(); }
  });

  dom.filterTypes.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-type]");
    if (btn) { state.type = btn.dataset.type; renderAll(); }
  });

  // Busca desktop
  dom.search.addEventListener("input", (e) => {
    state.query = e.target.value.trim();
    renderAll();
  });

  // Busca mobile
  dom.searchMobile?.addEventListener("input", (e) => {
    state.query = e.target.value.trim();
    renderAll();
  });

  // Grid de produtos → abre modal
  dom.grid.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-product-id]");
    if (trigger) openModal(trigger.dataset.productId, products, dom, state);
  });

  // Fechar modal
  document.querySelectorAll("[data-close-modal]").forEach((btn) =>
    btn.addEventListener("click", () => closeModal(dom))
  );
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { closeModal(dom); closeProjectLightbox(dom); }
  });

  // Observação no modal → atualiza WhatsApp
  dom.modalObservation?.addEventListener("input", (e) => {
    state.observation = e.target.value.trim();
    updateWhatsAppLink(dom, state);
  });

  // Projetos → lightbox
  dom.projectGrid?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-project-id]");
    if (btn) openProjectLightbox(btn.dataset.projectId, projects, dom);
  });

  document.querySelector("[data-close-project]")?.addEventListener("click", () =>
    closeProjectLightbox(dom)
  );
  dom.projectLightbox?.addEventListener("click", (e) => {
    if (e.target === dom.projectLightbox) closeProjectLightbox(dom);
  });

  // Filter drawer mobile
  initFilterDrawer({
    filterToggle:   dom.filterToggle,
    filterDrawer:   dom.filterDrawer,
    filterBackdrop: dom.filterBackdrop,
    filterClose:    dom.filterClose,
  });
};

// ── Inicialização ────────────────────────────────────────────
const init = () => {
  bindEvents();
  renderProjects(dom.projectGrid, projects);
  renderAll();
  observeReveals();
  initParallax();
  hideLoader(dom.loader);
};

init();
