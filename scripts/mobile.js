// ============================================================
// mobile.js — Interações mobile
// ============================================================
// Responsabilidades:
//   - Menu hamburguer
//   - Filter drawer (abrir / fechar / backdrop)
//   - Sync de busca mobile com estado global
// ============================================================

/**
 * Inicializa o menu hamburguer mobile.
 */
export function initMobileMenu(headerEl, menuButtonEl) {
  menuButtonEl?.addEventListener("click", () => {
    const isOpen = headerEl.classList.toggle("menu-open");
    menuButtonEl.setAttribute("aria-expanded", String(isOpen));
  });
}

/**
 * Fecha o menu mobile programaticamente.
 */
export function closeMobileMenu(headerEl, menuButtonEl) {
  headerEl.classList.remove("menu-open");
  menuButtonEl?.setAttribute("aria-expanded", "false");
}

/**
 * Inicializa o filter drawer mobile.
 * @param {object} els - { filterToggle, filterDrawer, filterBackdrop, filterClose }
 */
export function initFilterDrawer({ filterToggle, filterDrawer, filterBackdrop, filterClose }) {
  const open = () => {
    filterDrawer?.setAttribute("aria-hidden", "false");
    filterToggle?.setAttribute("aria-expanded", "true");
    document.body.classList.add("drawer-open");
  };

  const close = () => {
    filterDrawer?.setAttribute("aria-hidden", "true");
    filterToggle?.setAttribute("aria-expanded", "false");
    document.body.classList.remove("drawer-open");
  };

  filterToggle?.addEventListener("click", open);
  filterClose?.addEventListener("click", close);
  filterBackdrop?.addEventListener("click", close);

  // Fechar ao selecionar filtro
  filterDrawer?.addEventListener("click", (e) => {
    if (e.target.closest("[data-category]") || e.target.closest("[data-type]")) {
      setTimeout(close, 180);
    }
  });

  // Fechar com Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}
