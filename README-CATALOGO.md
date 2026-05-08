# Guia de Gerenciamento do Catálogo - ANDRÉ SERRALHEIRO

Este guia foi criado para que você possa administrar o catálogo de produtos, projetos e configurações do site de forma **simples e autônoma**, sem precisar programar.

A arquitetura do projeto foi separada em arquivos específicos (camada de dados) para que a manutenção seja rápida e segura.

---

## 1. Onde ficam os dados?

O site lê as informações automaticamente da pasta `/data`. Cada arquivo tem uma função única:

*   **`data/catalog.js`**: Controla todos os **produtos** (Portas, Janelas, Portões, etc). É aqui que você adiciona ou edita os itens do catálogo.
*   **`data/projects.js`**: Controla as fotos dos **projetos realizados** que aparecem na seção "Projetos em Destaque".
*   **`data/categories.js`**: Controla as **categorias** e as abas de filtro (Ex: "Todos", "Portas", "Janelas").
*   **`data/settings.js`**: Controla as configurações gerais da empresa (número do WhatsApp) e as **mensagens automáticas** que os clientes enviam.

---

## 2. Organização Profissional de Imagens

Para garantir que o site carregue rápido e as imagens fiquem organizadas, criei uma estrutura profissional dentro da pasta `/assets/images/`.

### Estrutura de Pastas:
```text
assets/
└── images/
    ├── hero/             # Imagem principal do topo do site
    ├── projects/         # Fotos reais de projetos prontos
    └── products/         # Imagens dos produtos (catálogo)
        ├── portas/
        ├── janelas/
        ├── portoes/
        └── esquadrias/
```

### Boas Práticas para Imagens:
*   **Nomeação**: Use nomes em letras minúsculas, sem espaços e sem acentos. Substitua espaços por hífen (`-`). Exemplo correto: `porta-lambril-branca.jpg`. Errado: `Porta Lambril Branca!.jpg`.
*   **Formato Ideal**: `JPG` ou `WEBP`. Evite `PNG` para fotos reais, pois são muito pesados.
*   **Proporção Ideal (Produtos)**: O site foi desenhado para imagens na proporção vertical **4:5** (ex: 800px de largura por 1000px de altura).
*   **Tamanho do Arquivo**: Tente manter as imagens abaixo de `300kb` para garantir carregamento ultra-rápido.

---

## 3. Como Trocar Fotos (Usando imagens locais)

No momento, o arquivo `catalog.js` está usando imagens externas de teste (ex: `https://images.pexels...`). Para usar as fotos reais do seu computador:

1.  Coloque a foto do produto na pasta correta. Exemplo: `assets/images/products/portas/porta-lambril-01.jpg`
2.  Abra o arquivo `data/catalog.js`.
3.  Encontre o produto que deseja alterar.
4.  No campo `imagens`, substitua o link (URL) pelo **caminho local** da sua imagem.

**Como era (URL de teste):**
```javascript
imagens: [
  "https://images.pexels.com/photos/8433195/pexels-photo-8433195.jpeg...",
  "assets/images/logo/logo.png"
],
```

**Como deve ficar (Sua foto local):**
```javascript
imagens: [
  "assets/images/products/portas/porta-lambril-01.jpg",
  "assets/images/products/portas/porta-lambril-02.jpg" // Você pode colocar mais de uma!
],
```
*O site vai atualizar automaticamente e mostrar a sua foto.*

---

## 4. Como Adicionar um Novo Produto

Para adicionar um novo produto (ex: uma porta nova), abra o arquivo `data/catalog.js` e adicione um novo bloco `{ ... }` na lista. 

**Copie e cole este exemplo REAL e altere as informações:**

```javascript
  {
    id: "porta-pivotante-madeirada",           // Identificador único (sempre minúsculo, sem espaços)
    nome: "Porta Pivotante em Alumínio Amadeirado", // Nome que aparece para o cliente
    categoria: "portas",                       // Deve existir no arquivo categories.js
    codigo: "AS-009",                          // Opcional, ajuda na identificação
    tipo: "Pivotante",                         // Ex: Pivotante, Correr, Social, etc.
    descricao: "Porta imponente que une a durabilidade do alumínio com a sofisticação da textura amadeirada. Ideal para fachadas.",
    imagens: [                                 // Caminho das fotos
      "assets/images/products/portas/pivotante-amadeirada-1.jpg",
      "assets/images/products/portas/pivotante-amadeirada-2.jpg"
    ],
    medidas: ["2,30 x 1,20", "2,50 x 1,50", "Sob medida"], // Opções que o cliente pode escolher no modal
    acabamento: ["Cerejeira", "Imbuia", "Preto fosco"],
    abertura: ["Direita", "Esquerda"],
    valor: "A combinar",                       // Pode colocar o preço ("R$ 3.500") ou "A combinar"
    destaque: true,                            // (Opcional) Se true, aparece primeiro na lista
  },
```

---

## 5. Como Funcionam as Categorias

As categorias controlam as "abas" de filtro que aparecem no site. Elas são definidas no arquivo `data/categories.js`.

Para adicionar uma categoria nova (ex: "Guarda-corpos"):
1. Abra `data/categories.js`.
2. Adicione a linha na lista:

```javascript
export const categories = [
  { id: "todos",      label: "Todos" },
  { id: "portas",     label: "Portas" },
  { id: "janelas",    label: "Janelas" },
  { id: "esquadrias", label: "Esquadrias" },
  { id: "portoes",    label: "Portões" },       // <-- Nova categoria
  { id: "guardacorpo",label: "Guarda-corpo" },  // <-- Nova categoria
];
```
3. Agora, quando você cadastrar um produto em `catalog.js`, basta colocar `categoria: "guardacorpo"`, e ele será filtrado automaticamente no site!

---

## 6. Personalizar Mensagens do WhatsApp

O site gera textos inteligentes automaticamente quando o cliente clica no botão do WhatsApp. Isso é configurado no arquivo `data/settings.js`.

### Alterando o Número de Telefone:
Apenas mude a linha `whatsapp: "5521968587713"`. Mantenha o formato numérico (Código do País + DDD + Número).

### Alterando os Textos Automáticos:
Encontre o bloco `messageTemplates`. Nele, você pode personalizar três tipos de mensagens:

1.  **Orçamento Geral** (Quando clica no botão principal da página):
    *   *Como está:* "Olá, André! Vim pelo showroom e gostaria de conversar sobre um projeto."
2.  **Produto Específico** (Quando ele clica dentro do Modal de um produto e escolhe medidas/cores):
    *   *O sistema já junta automaticamente o nome, código, medida e acabamento escolhido!* Se quiser mudar a saudação inicial, basta alterar o texto antes de `${product.nome}`.

---

## 7. Análise: Preparação para o Futuro (Decap CMS)

O projeto atual já foi arquitetado **estrategicamente** para suportar um CMS no futuro.

*   **A Arquitetura está pronta?** **SIM**. A decisão de separarmos tudo na pasta `/data` (e não misturar com o HTML) foi o passo mais importante.
*   **O que já está preparado?**
    *   Arquivos `catalog.js`, `projects.js` e `categories.js` atuam como "Tabelas de Banco de Dados". O CMS consegue ler e editar essas listas facilmente.
    *   A pasta `/assets` tem estrutura clara, o que facilita plugar um painel de upload de imagens.
*   **O que faltaria fazer para plugar o painel Admin?**
    1.  Transformar os arquivos `.js` da pasta `/data` em arquivos de dados brutos (`.json` ou `.yml`). *O CMS não lida bem com JavaScript diretamente, ele prefere JSON/YAML.*
    2.  Configurar o arquivo `admin/config.yml` do Decap CMS mapeando cada campo (Nome, Descrição, Foto) para a interface visual.
    3.  Ajustar o `app.js` para ler os dados do novo formato JSON.

### Resumo do Fluxo Atual (Sem CMS):
É super simples:
1. Jogue a foto na pasta `/assets/images/...`
2. Abra o arquivo `/data/catalog.js` no editor de texto.
3. Copie um bloco `{...}` de produto, mude os textos e o link da foto.
4. Salve. O site já atualizou e os filtros já se adaptaram!
