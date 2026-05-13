// admin/admin.js
// Lógica de UI: DOM Tagging + Dashboard mínimo + Preview

// ══════════════════════════════════════════════════════════
// INJEÇÃO TARDIA DO CSS
// admin.js roda DEPOIS de decap-cms.js (ver index.html).
// Appending <link> ao final do <head> garante que nosso CSS
// vem DEPOIS dos <style> do Emotion do Decap — ganhamos o cascade.
// ══════════════════════════════════════════════════════════
(function injectAdminCSS() {
  const existing = document.querySelector('link[href*="admin.css"]');
  if (existing) existing.remove(); // remove o link estático do head
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/admin/admin.css';
  document.head.appendChild(link); // vai para o FINAL do head
})();

document.addEventListener('DOMContentLoaded', () => {
  // ──────────────────────────────────────────────
  // 1. DASHBOARD MÍNIMO
  // ──────────────────────────────────────────────
  const renderDashboard = () => {
    if (document.getElementById('custom-minimal-dashboard')) return;

    const dashboard = document.createElement('div');
    dashboard.id = 'custom-minimal-dashboard';
    dashboard.innerHTML = `
      <div class="dashboard-header">
        <h1>André Serralheiro</h1>
        <p>Painel de gerenciamento de conteúdo</p>
      </div>
      <div class="dashboard-actions">
        <a href="#/collections/products" class="dash-btn">Catálogo</a>
        <a href="#/collections/projects" class="dash-btn">Projetos</a>
        <a href="#/collections/settings" class="dash-btn">Configurações</a>
        <a href="#/collections/products/new" class="dash-btn accent">+ Novo Produto</a>
      </div>
    `;

    const inject = () => {
      const main =
        document.querySelector('[class*="AppMainContainer"]') ||
        document.querySelector('main');

      if (main) {
        if (!document.getElementById('custom-minimal-dashboard')) {
          main.insertBefore(dashboard, main.firstChild);
        }
      } else {
        setTimeout(inject, 120);
      }
    };

    inject();
  };

  const removeDashboard = () => {
    const el = document.getElementById('custom-minimal-dashboard');
    if (el) el.remove();
  };

  const checkRoute = () => {
    const hash = window.location.hash;
    if (hash === '' || hash === '#' || hash === '#/') {
      setTimeout(renderDashboard, 200);
    } else {
      removeDashboard();
    }
  };

  window.addEventListener('hashchange', checkRoute);

  // ──────────────────────────────────────────────
  // 2. DOM TAGGING — Adiciona classes semânticas + esconde sidebar no mobile
  // ──────────────────────────────────────────────
  let initialized = false;
  const isMobile = () => window.innerWidth <= 768;

  const tagElements = () => {
    const root = document.querySelector('#nc-root');
    if (!root) return;

    // Sidebar — tenta aside, depois qualquer elemento nav/div com Nav no class
    const sidebar =
      document.querySelector('aside') ||
      document.querySelector('[class*="Nav__Nav"]') ||
      document.querySelector('nav');
    if (sidebar && !sidebar.classList.contains('ma-sidebar')) {
      sidebar.classList.add('ma-sidebar');
    }
    // Fallback JS: esconde sidebar no mobile diretamente
    if (sidebar && isMobile()) {
      sidebar.style.setProperty('display', 'none', 'important');
      sidebar.style.setProperty('width', '0', 'important');
      sidebar.style.setProperty('overflow', 'hidden', 'important');
    } else if (sidebar && !isMobile()) {
      sidebar.style.removeProperty('display');
      sidebar.style.removeProperty('width');
      sidebar.style.removeProperty('overflow');
    }

    // Header / Topbar
    const header = document.querySelector('header');
    if (header && !header.classList.contains('ma-topbar')) {
      header.classList.add('ma-topbar');
    }

    // Área de conteúdo principal
    const appMain = document.querySelector('[class*="AppMainContainer"]');
    if (appMain && !appMain.classList.contains('ma-app-main')) {
      appMain.classList.add('ma-app-main');
    }

    // Painel de preview — esconde no mobile
    const previewPane = document.querySelector('[class*="PreviewPane"]') ||
                        document.querySelector('[class*="EditorPreview"]');
    if (previewPane && isMobile()) {
      previewPane.style.setProperty('display', 'none', 'important');
    } else if (previewPane && !isMobile()) {
      previewPane.style.removeProperty('display');
    }

    // Container do painel de controle (formulário do editor)
    const controlPane = document.querySelector('[class*="ControlPaneContainer"]');
    if (controlPane && !controlPane.classList.contains('ma-form-area')) {
      controlPane.classList.add('ma-form-area');
    }

    // Barra de controle do editor (Salvar, Publicar)
    const toolbar = document.querySelector('[class*="EditorControlBar"]');
    if (toolbar && !toolbar.classList.contains('ma-editor-toolbar')) {
      toolbar.classList.add('ma-editor-toolbar');
    }

    // Inicializar verificação de rota uma única vez
    if (!initialized && appMain) {
      checkRoute();
      initialized = true;
    }
  };

  // Re-aplicar tagging quando janela for redimensionada
  window.addEventListener('resize', () => tagElements(), { passive: true });

  const observer = new MutationObserver(tagElements);
  observer.observe(document.body, { childList: true, subtree: true });

  // ──────────────────────────────────────────────
  // 3. PREVIEW DO PRODUTO
  //    Card fiel ao site real — compacto e elegante
  // ──────────────────────────────────────────────
  if (window.CMS) {
    const ProductPreview = ({ entry, getAsset }) => {
      const data = entry.get('data').toJS();

      const nome      = data.nome      || 'Nome do Produto';
      const categoria = data.categoria || 'Categoria';
      const codigo    = data.codigo    || '';
      const valor     = data.valor     || 'A combinar';
      const imgRaw    = data.imagens && data.imagens[0] && data.imagens[0].img;
      const imagem    = imgRaw ? getAsset(imgRaw) : null;

      return h('div', { className: 'preview-wrapper' },
        h('div', { className: 'real-card' },

          // Imagem
          h('div', { className: 'real-card-img' },
            imagem
              ? h('img', { src: imagem.toString(), alt: nome })
              : h('div', { className: 'img-placeholder' }, 'Sem imagem')
          ),

          // Corpo
          h('div', { className: 'real-card-body' },
            h('span', { className: 'real-category' }, categoria),
            h('h3', { className: 'real-title' }, nome),
            codigo && h('span', { className: 'real-code' }, `CÓD: ${codigo}`),
            h('div', { className: 'real-divider' }),
            h('div', { className: 'real-footer' },
              h('span', { className: 'real-price' }, valor),
              h('button', { className: 'real-btn' }, 'Solicitar Orçamento')
            )
          )
        )
      );
    };

    CMS.registerPreviewTemplate('products', ProductPreview);
    CMS.registerPreviewStyle('/admin/preview.css');
  }
});
