# ANDRÉ SERRALHEIRO

Catálogo premium estático, preparado para evoluir para painel administrativo, backend ou banco de dados.

## Arquitetura

- `index.html`: casca única da aplicação, SEO, header, seções e modal reutilizável.
- `data/catalog.js`: fonte única dos produtos, categorias e número do WhatsApp.
- `scripts/app.js`: renderização dos cards, filtros, busca, modal e mensagens automáticas.
- `styles/main.css`: interface responsiva, skeleton loading, modal, microinterações e layout.
- `assets/`: imagens fixas do projeto, como `logo.png`.
- `components/`: pasta reservada para componentes futuros.

## Produto

Cada item do catálogo possui `id`, `nome`, `categoria`, `codigo`, `tipo`, `descricao`, `imagens`, `medidas`,
`acabamento`, `abertura` e `valor`.

Para cadastrar novos modelos, adicione objetos no array `products` em `data/catalog.js`. Não crie páginas HTML
novas para cada produto.

## WhatsApp

Número configurado: `https://wa.me/5521968587713`.

O modal monta mensagens automáticas com modelo, código, categoria, medida, abertura e acabamento escolhidos.

## Abrir localmente

Com o XAMPP/Apache ligado, acesse:

```text
http://localhost/metalurgica/
```
