// admin/admin.js

document.addEventListener('DOMContentLoaded', () => {
  console.log("Admin Scripts Loaded - Minimal Mode");

  // --- MINIMAL DASHBOARD ---
  const renderDashboard = () => {
    if (document.getElementById('custom-minimal-dashboard')) return;

    const dashboard = document.createElement('div');
    dashboard.id = 'custom-minimal-dashboard';
    dashboard.innerHTML = `
      <div class="dashboard-header">
        <h1 style="font-size: 20px; font-weight: 600; margin: 0 0 8px 0; color: var(--text-main);">Visão Geral</h1>
        <p style="margin: 0; color: var(--text-secondary); font-size: 14px;">Gerencie seus produtos, projetos e configurações.</p>
      </div>
      <div class="dashboard-actions">
        <a href="#/collections/products/new" class="dash-btn">
          <span>+ Novo Produto</span>
        </a>
        <a href="#/collections/projects/new" class="dash-btn">
          <span>+ Novo Projeto</span>
        </a>
        <a href="#/collections/settings" class="dash-btn">
          <span>Configurações</span>
        </a>
      </div>
    `;

    const findMainAndInject = () => {
      const mainContainer = document.querySelector('main') || 
                            document.querySelector('.ma-app-main') || 
                            document.querySelector('[class*="AppMainContainer"]');
      
      if (mainContainer) {
        if (!document.getElementById('custom-minimal-dashboard')) {
          mainContainer.insertBefore(dashboard, mainContainer.firstChild);
          document.body.classList.add('dashboard-active');
        }
      } else {
        setTimeout(findMainAndInject, 100);
      }
    };

    findMainAndInject();
  };

  const removeDashboard = () => {
    const dashboard = document.getElementById('custom-minimal-dashboard');
    if (dashboard) {
      dashboard.remove();
      document.body.classList.remove('dashboard-active');
    }
  };

  const checkRoute = () => {
    const hash = window.location.hash;
    if (hash === '' || hash === '#' || hash === '#/') {
      setTimeout(renderDashboard, 150);
    } else {
      removeDashboard();
    }
  };

  window.addEventListener('hashchange', checkRoute);

  // --- SEMANTIC DOM TAGGING (Minimal overrides) ---
  const observer = new MutationObserver((mutations) => {
    const root = document.querySelector('#nc-root');
    if (!root) return;

    if (root.innerHTML.includes('AppMainContainer') || document.querySelector('main')) {
      if (!window._dashboardInitialized) {
        checkRoute();
        window._dashboardInitialized = true;
      }
    } else {
      window._dashboardInitialized = false;
    }

    const sidebar = document.querySelector('aside') || (root.children[0] && root.children[0].children[0]);
    if (sidebar && sidebar.tagName !== 'SECTION' && !sidebar.classList.contains('ma-sidebar')) {
      sidebar.classList.add('ma-sidebar');
    }

    const header = document.querySelector('header');
    if (header && !header.classList.contains('ma-topbar')) {
      header.classList.add('ma-topbar');
    }

    const appMain = document.querySelector('[class*="AppMainContainer"]');
    if (appMain && !appMain.classList.contains('ma-app-main')) {
      appMain.classList.add('ma-app-main');
    }

    // Gentle tagging for Editor
    const editorContainer = document.querySelector('[class*="EditorContainer"]');
    if (editorContainer && !editorContainer.classList.contains('ma-editor-split')) {
      editorContainer.classList.add('ma-editor-split');
    }

    const controlPane = document.querySelector('[class*="ControlPaneContainer"]');
    if (controlPane && !controlPane.classList.contains('ma-form-area')) {
      controlPane.classList.add('ma-form-area');
    }

    const editorToolbar = document.querySelector('[class*="EditorControlBar"]');
    if (editorToolbar && !editorToolbar.classList.contains('ma-editor-toolbar')) {
      editorToolbar.classList.add('ma-editor-toolbar');
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // --- REALISTIC MINIMAL PREVIEW ---
  if (window.CMS) {
    const ProductPreview = ({ entry, getAsset }) => {
      const data = entry.get('data').toJS();
      
      const nome = data.nome || 'Nome do Produto';
      const categoria = data.categoria || 'Categoria';
      const codigo = data.codigo || 'CÓD-000';
      const valor = data.valor || 'A combinar';
      const imagemRaw = data.imagens && data.imagens[0] && data.imagens[0].img;
      const imagem = getAsset(imagemRaw) || '';

      return h('div', { className: 'preview-wrapper' },
        h('div', { className: 'real-card' },
          h('div', { className: 'real-card-img' },
            imagem ? h('img', { src: imagem.toString() }) : h('div', { className: 'img-placeholder' }, 'Sem Imagem')
          ),
          h('div', { className: 'real-card-body' },
            h('span', { className: 'real-category' }, categoria),
            h('h3', { className: 'real-title' }, nome),
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
