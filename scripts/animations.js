// ============================================================
// animations.js — Animações e efeitos de scroll
// ============================================================
// Responsabilidades:
//   - Reveal animation via IntersectionObserver (.reveal)
//   - Loader hide
//   - Parallax leve no hero
// ============================================================

let revealObserver;

/**
 * Observa todos os elementos .reveal e adiciona .is-visible
 * quando entram na viewport. Reconecta ao renderizar novos cards.
 */
export function observeReveals() {
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
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

  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));
}

/**
 * Esconde o loader de página após o carregamento inicial.
 */
export function hideLoader(loaderEl, delay = 420) {
  window.setTimeout(() => {
    loaderEl?.classList.add("is-hidden");
  }, delay);
}

/**
 * Efeito parallax suave no hero depth element.
 */
export function initParallax() {
  const depth = document.querySelector(".hero-depth");
  if (!depth) return;

  window.addEventListener("scroll", () => {
    const offset = window.scrollY * 0.22;
    depth.style.setProperty("--parallax", `${offset}px`);
  }, { passive: true });
}
