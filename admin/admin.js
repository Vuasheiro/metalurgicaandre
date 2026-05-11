// admin/admin.js

document.addEventListener('DOMContentLoaded', () => {
  console.log("💎 Premium Admin Scripts Loaded - ANDRÉ SERRALHEIRO");

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

    // Achar o container principal do Decap CMS para injetar o dashboard
    const findMainAndInject = () => {
      const mainContainer = document.querySelector('main') || 
                            document.querySelector('[class*="AppMainContainer"]') || 
                            document.querySelector('#nc-root > div > div:nth-child(2)');
      
      if (mainContainer) {
        // Evita duplicatas se já injetado em outra renderização React
        if (!document.getElementById('custom-premium-dashboard')) {
          mainContainer.insertBefore(dashboard, mainContainer.firstChild);
          document.body.classList.add('dashboard-active');
        }
      } else {
        // Tenta novamente em 100ms se o React ainda estiver desenhando a tela
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
    // Decap CMS usa #/ para o dashboard inicial
    if (hash === '' || hash === '#' || hash === '#/') {
      setTimeout(renderDashboard, 150);
    } else {
      removeDashboard();
    }
  };

  // Monitora mudanças de rota do React Router interno do Decap
  window.addEventListener('hashchange', checkRoute);

  // MutationObserver para garantir que estilizaremos os elementos assim que o React criá-los
  const observer = new MutationObserver((mutations) => {
    const root = document.querySelector('#nc-root');
    if (!root) return;

    // Se o login screen sumir e o painel renderizar, verificamos a rota
    if (root.innerHTML.includes('AppMainContainer') || document.querySelector('main')) {
      if (!window._dashboardInitialized) {
        checkRoute();
        window._dashboardInitialized = true;
      }
    } else {
      window._dashboardInitialized = false;
    }

    // Injeção de classes auxiliares
    const sidebar = document.querySelector('aside') || (root.children[0] && root.children[0].children[0]);
    if (sidebar && sidebar.tagName !== 'SECTION' && !sidebar.classList.contains('premium-sidebar')) {
      sidebar.classList.add('premium-sidebar');
    }

    const header = document.querySelector('header');
    if (header && !header.classList.contains('premium-header')) {
      header.classList.add('premium-header');
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
});
