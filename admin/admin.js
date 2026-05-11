// admin/admin.js

document.addEventListener('DOMContentLoaded', () => {
  console.log("💎 Premium Admin Scripts Loaded - ANDRÉ SERRALHEIRO");

  // --- CUSTOM DASHBOARD ---
  const renderDashboard = () => {
    if (document.getElementById('custom-premium-dashboard')) return;

    const dashboard = document.createElement('div');
    dashboard.id = 'custom-premium-dashboard';
    dashboard.innerHTML = `
      <div class="dashboard-header">
        <h1>Bem-vindo, André ✨</h1>
        <p>Selecione uma ação rápida para começar</p>
      </div>
      <div class="dashboard-grid">
        <a href="#/collections/products/new" class="dashboard-card">
          <div class="card-icon">📸</div>
          <div class="card-content">
            <h3>Novo Produto</h3>
            <p>Adicione um novo item ao catálogo com fotos, medidas e valores.</p>
          </div>
        </a>
        <a href="#/collections/projects/new" class="dashboard-card">
          <div class="card-icon">🏗️</div>
          <div class="card-content">
            <h3>Novo Projeto</h3>
            <p>Publique uma foto de um serviço recém-finalizado.</p>
          </div>
        </a>
        <a href="#/collections/settings" class="dashboard-card">
          <div class="card-icon">⚙️</div>
          <div class="card-content">
            <h3>Configurações</h3>
            <p>Altere o número do WhatsApp, textos e links do site.</p>
          </div>
        </a>
      </div>
    `;

    const findMainAndInject = () => {
      const mainContainer = document.querySelector('main') || 
                            document.querySelector('.ma-app-main') || 
                            document.querySelector('[class*="AppMainContainer"]');
      
      if (mainContainer) {
        if (!document.getElementById('custom-premium-dashboard')) {
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
    const dashboard = document.getElementById('custom-premium-dashboard');
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

  // --- SEMANTIC DOM TAGGING ---
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

    // Sidebar
    const sidebar = document.querySelector('aside') || (root.children[0] && root.children[0].children[0]);
    if (sidebar && sidebar.tagName !== 'SECTION' && !sidebar.classList.contains('ma-sidebar')) {
      sidebar.classList.add('ma-sidebar');
    }

    // Topbar (Header)
    const header = document.querySelector('header');
    if (header && !header.classList.contains('ma-topbar')) {
      header.classList.add('ma-topbar');
    }

    // App Main (Collections list container)
    const appMain = document.querySelector('[class*="AppMainContainer"]');
    if (appMain && !appMain.classList.contains('ma-app-main')) {
      appMain.classList.add('ma-app-main');
    }

    // Editor Split Container
    const editorContainer = document.querySelector('[class*="EditorContainer"]');
    if (editorContainer && !editorContainer.classList.contains('ma-editor-split')) {
      editorContainer.classList.add('ma-editor-split');
    }

    // Editor Form Area
    const controlPane = document.querySelector('[class*="ControlPaneContainer"]');
    if (controlPane && !controlPane.classList.contains('ma-form-area')) {
      controlPane.classList.add('ma-form-area');
    }

    // Editor Preview Area
    const previewPane = document.querySelector('[class*="PreviewPaneContainer"]');
    if (previewPane && !previewPane.classList.contains('ma-preview-area')) {
      previewPane.classList.add('ma-preview-area');
    }
    
    // Top bar within Editor
    const editorToolbar = document.querySelector('[class*="EditorControlBar"]');
    if (editorToolbar && !editorToolbar.classList.contains('ma-editor-toolbar')) {
      editorToolbar.classList.add('ma-editor-toolbar');
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // --- CUSTOM PREVIEW TEMPLATE ---
  if (window.CMS) {
    const ProductPreview = ({ entry, getAsset }) => {
      const data = entry.get('data').toJS();
      
      const nome = data.nome || 'Nome do Produto';
      const categoria = data.categoria || 'Categoria';
      const codigo = data.codigo || 'CÓD-000';
      const valor = data.valor || 'A combinar';
      const imagemRaw = data.imagens && data.imagens[0] && data.imagens[0].img;
      const imagem = getAsset(imagemRaw) || '';

      // Usando 'h' para renderizar React element
      return h('div', { className: 'preview-container' },
        h('div', { className: 'product-card' },
          h('div', { className: 'card-image' },
            imagem ? h('img', { src: imagem.toString() }) : h('div', { className: 'image-placeholder' }, 'Sem Imagem')
          ),
          h('div', { className: 'card-content' },
            h('div', { className: 'card-badges' },
              h('span', { className: 'badge category-badge' }, categoria),
              data.destaque ? h('span', { className: 'badge highlight-badge' }, 'Destaque ✨') : null
            ),
            h('h2', { className: 'product-title' }, nome),
            h('p', { className: 'product-code' }, `Ref: ${codigo}`),
            h('div', { className: 'product-footer' },
              h('p', { className: 'product-price' }, valor),
              h('button', { className: 'fake-btn' }, 'Solicitar Orçamento')
            )
          )
        )
      );
    };

    CMS.registerPreviewTemplate('products', ProductPreview);
    CMS.registerPreviewStyle('/admin/preview.css');
  }
});
