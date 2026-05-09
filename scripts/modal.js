// ============================================================
// modal.js — Modal de produto e lightbox de projetos
// ============================================================

import { categoryLabels } from "./filters.js";

// ── WhatsApp ─────────────────────────────────────────────────

export function buildWhatsAppMessage(state, settings) {
  const { activeProduct: p, selectedMeasure, selectedOpening, selectedFinish, observation } = state;
  if (!p) return "Olá André!";

  const category = categoryLabels.get(p.categoria) ?? p.categoria;
  
  // Substitui placeholders no template do settings.json
  let message = settings.MESSAGE_TEMPLATE || "Olá! Gostaria de um orçamento para {name}";
  
  message = message
    .replace(/{name}/g, p.nome)
    .replace(/{code}/g, p.codigo)
    .replace(/{category}/g, category)
    .replace(/{measure}/g, selectedMeasure || "Não informada")
    .replace(/{opening}/g, selectedOpening || "Não informada")
    .replace(/{finish}/g, selectedFinish || "Não informado")
    .replace(/{observation}/g, observation || "Nenhuma");

  return message;
}

export function updateWhatsAppLink(dom, state, settings) {
  const message = buildWhatsAppMessage(state, settings);
  const phone = settings.WHATSAPP_NUMBER || "5521968587713";
  dom.modalWhatsapp.href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  dom.modalMessagePreview.textContent = message;
}

// ── Opções do modal ──────────────────────────────────────────

export function renderOptionGroup(container, values, selectedValue, onSelect, dom, state, settings) {
  container.innerHTML = (values || [])
    .map(
      (value) => `
        <button class="${value === selectedValue ? "selected" : ""}"
          type="button" data-value="${value}">${value}</button>
      `
    )
    .join("");

  container.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      onSelect(btn.dataset.value);
      container.querySelectorAll("button").forEach((b) =>
        b.classList.toggle("selected", b.dataset.value === btn.dataset.value)
      );
      updateWhatsAppLink(dom, state, settings);
    });
  });
}

// ── Modal de produto ─────────────────────────────────────────

export function openModal(productId, products, dom, state, settings) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  state.activeProduct   = product;
  state.selectedImage   = product.imagens[0];
  state.selectedMeasure = product.medidas ? product.medidas[0] : "";
  state.selectedOpening = product.abertura ? product.abertura[0] : "";
  state.selectedFinish  = product.acabamento ? product.acabamento[0] : "";
  state.observation     = "";

  dom.modalImage.src            = state.selectedImage;
  dom.modalImage.alt            = product.nome;
  dom.modalCategory.textContent = categoryLabels.get(product.categoria) || product.categoria;
  dom.modalCode.textContent     = `Código: ${product.codigo}`;
  dom.modalName.textContent     = product.nome;
  dom.modalDescription.textContent = product.descricao;
  dom.modalType.textContent     = product.tipo;
  dom.modalValue.textContent    = product.valor;
  dom.modalObservation.value    = "";

  // Thumbnails
  dom.modalThumbs.innerHTML = product.imagens
    .map(
      (img, i) => `
        <button class="${i === 0 ? "active" : ""}" type="button"
          data-image="${img}" aria-label="Imagem ${i + 1} de ${product.nome}">
          <img src="${img}" alt="" loading="lazy" decoding="async" />
        </button>
      `
    )
    .join("");

  dom.modalThumbs.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.selectedImage   = btn.dataset.image;
      dom.modalImage.src    = state.selectedImage;
      dom.modalThumbs.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  renderOptionGroup(dom.modalMeasures, product.medidas, state.selectedMeasure,
    (v) => { state.selectedMeasure = v; }, dom, state, settings);
  renderOptionGroup(dom.modalOpenings, product.abertura, state.selectedOpening,
    (v) => { state.selectedOpening = v; }, dom, state, settings);
  renderOptionGroup(dom.modalFinishes, product.acabamento, state.selectedFinish,
    (v) => { state.selectedFinish = v; }, dom, state, settings);

  updateWhatsAppLink(dom, state, settings);
  dom.modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

export function closeModal(dom) {
  dom.modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

// ── Lightbox de projetos ─────────────────────────────────────

export function openProjectLightbox(projectId, projects, dom) {
  const project = projects.find((p) => p.id === projectId);
  if (!project) return;

  dom.lightboxImage.src         = project.imagem;
  dom.lightboxImage.alt         = project.titulo;
  dom.lightboxTitle.textContent = project.titulo;
  dom.projectLightbox.setAttribute("aria-hidden", "false");
}

export function closeProjectLightbox(dom) {
  dom.projectLightbox?.setAttribute("aria-hidden", "true");
}
