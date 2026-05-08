# Admin — Integração CMS Futura

Esta pasta está reservada para o **painel administrativo** e integração com CMS.

## Planejado: Decap CMS (antigo Netlify CMS)

O Decap CMS é uma solução open-source que adiciona um painel admin ao site estático,
sem necessidade de servidor ou banco de dados. Funciona diretamente com o repositório GitHub.

### Como funcionará

```
Editor abre /admin → faz login com GitHub → edita produtos → commit automático no repositório → Vercel faz deploy
```

### Arquivos que serão criados aqui

```
/admin
  index.html        ← Painel admin (Decap CMS)
  config.yml        ← Configuração das coleções (produtos, projetos, settings)
```

### Configuração planejada (config.yml)

```yaml
backend:
  name: github
  repo: Vuasheiro/metalurgicaandre
  branch: main

media_folder: assets/images/products
public_folder: assets/images/products

collections:
  - name: products
    label: Produtos
    folder: data
    fields:
      - { label: Nome, name: nome, widget: string }
      - { label: Categoria, name: categoria, widget: select, options: [portas, janelas, esquadrias] }
      - { label: Código, name: codigo, widget: string }
      - { label: Descrição, name: descricao, widget: text }
      - { label: Imagem principal, name: imagem, widget: image }
```

### Estrutura de imagens preparada

```
assets/
  images/
    logo/        ← logo.png
    products/    ← imagens reais dos produtos (a adicionar)
    projects/    ← fotos de obras realizadas (a adicionar)
    ui/          ← ícones e elementos visuais (a adicionar)
```

### Próximos passos

1. Cadastrar fotos reais dos produtos do André
2. Instalar e configurar o Decap CMS nesta pasta
3. Conectar ao repositório GitHub
4. Testar fluxo: editar produto → commit → deploy Vercel

---

*Criado em 2025 — ANDRÉ SERRALHEIRO Showroom*
