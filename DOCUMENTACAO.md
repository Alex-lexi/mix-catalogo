**Mix Catálogo Digital** é uma aplicação web desenvolvida em **React + Vite** que oferece um catálogo digital interativo para lojas com grande variedade de produtos. O aplicativo permite navegação por categorias, busca de produtos, e salvamento de favoritos localmente (sem backend).

### Características Principais
- Tela inicial com apresentação e CTA
- Listagem de categorias em cards interativos
- Catálogo de produtos por categoria
- Busca por nome de produto em tempo real
- Sistema de favoritos persistido no `localStorage`
- Design limpo com paleta rosa/roxo
- Navegação por rotas (React Router)
- Dados mockados em JSON (sem dependência de API)

## Estrutura do Projeto

mix-catalogo/
│
├── backend/
│   ├── config/
│   │   └── ConexaoBD.js        # Configuração da conexão com o banco de dados
│   ├── node_modules/           # Dependências do backend
│   ├── src/
│   │   ├── controllers/        # Controladores da aplicação
│   │   ├── models/             # Modelos de dados
│   │   └── routes/             # Definição das rotas
|   |            
│   ├── .env                    # Variáveis de ambiente
│   ├── package-lock.json       # Arquivo de bloqueio de dependências
│   ├── package.json            # Arquivo de dependências do backend
│   └── server.js               # Arquivo de configuração do servidor
│
├── frontend/
│   ├── node_modules/           # Dependências do frontend
│   ├── public/
│   │   └── logo.png            # Logomarca da aplicação
│   ├── src/
│   │   ├── components/         # Componentes reutilizáveis
│   │   ├── data/               # Dados da aplicação
│   │   ├── hooks/              # Hooks personalizados
│   │   ├── pages/              # Páginas da aplicação
│   │   ├── styles/             # Arquivos de estilo
│   │   ├── App.jsx             # Componente App principal
│   │   └── main.jsx            # Ponto de entrada do frontend
│   │    
│   ├── index.html              # Arquivo HTML principal
|   ├── package-lock.json       # Arquivo de bloqueio de dependências do frontend
│   ├── package.json            # Arquivo de dependências do frontend
│   └── vite.config.js          # Configuração do Vite
│
├── .gitignore                  # Arquivo para ignorar arquivos no git
├── .eslintrc.json
└── DOCUMENTACAO.md             # Documentação do projeto


## Configuração Inicial

### Pré-requisitos
- Node.js 16+ instalado
- npm ou yarn

### Instalação

```bash
# Instalar dependências
npm install

# Rodar em modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview

O servidor rodará em `http://localhost:5173`

## 📁 Descrição dos Arquivos Principais

### **App.jsx** - Componente Principal
Gerencia as rotas da aplicação usando `react-router-dom`. Controla a navegação entre telas e passa dados (favoritos, categorias, produtos) para as páginas.

```jsx
Rotas disponíveis:
- "/" → HomePage (tela inicial)
- "/categorias" → CategoriesPage (listagem de categorias)
- "/categorias/:categoryId" → ProductsPage (produtos de uma categoria)
```

### **pages/HomePage.jsx** - Tela Inicial
Apresenta um hero section com:
- Título descritivo
- Botão "Explorar categorias"
- Card com espaço para a logomarca da loja

### **pages/CategoriesPage.jsx** - Listagem de Categorias
Exibe todas as categorias em um grid de cards. Cada card mostra:
- Nome da categoria
- Descrição
- Badge colorido (primeira letra)

### **pages/ProductsPage.jsx** - Catálogo de Produtos
Mostra produtos de uma categoria selecionada com:
- Barra de busca em tempo real
- Contador de resultados
- Grid de cards de produtos
- Botões de favoritar

### **components/Header.jsx**
Header reutilizável com:
- Botão "Voltar" (navegação entre telas)
- Título e subtítulo personalizáveis
- Logo no canto superior direito

### **components/ProductCard.jsx**
Card de produto com:
- Imagem do produto
- Nome e marca
- Preço
- Botão de favoritar (com star ★)

### **components/SearchBar.jsx**
Barra de busca simples com ícone 🔍 e input de texto

### **components/CategoryCard.jsx**
Card de categoria clicável com badge colorido da categoria

### **hooks/useFavorites.js**
Custom hook que gerencia favoritos:
- Armazena IDs de produtos favoritados no `localStorage`
- Função `toggleFavorite(productId)` para adicionar/remover
- Persiste automaticamente

```javascript
const { favorites, toggleFavorite } = useFavorites();
// favorites: array de IDs
// toggleFavorite: função para alternar favorito
```

### **data/categories.json**
Estrutura de categoria:
```json
{
  "id": "tecnologia",
  "name": "Tecnologia",
  "description": "Celulares, notebooks...",
  "accentColor": "#ff5db1"  // Cor rgba/hex usada no badge
}
```

### **data/products.json**
Estrutura de produto:
```json
{
  "id": "p-iphone",
  "categoryId": "tecnologia",  // Referencia a categoria
  "name": "iPhone 15",
  "brand": "Apple",
  "price": "R$ 6.999,00",
  "image": "https://..."  // URL da imagem
}
```

### **styles/global.css**
Define:
- Variáveis CSS (cores, raios, sombras)
- Layout base (grid, flexbox)
- Componentes reutilizáveis (.card, .button, etc)
- Paleta de cores: rosa (#ff5db1) e roxo (#b36bff)
- Media queries para responsividade

---

## 🎨 Sistema de Cores

| Elemento | Cor | Hex |
|----------|-----|-----|
| Rosa Principal | `--pink-500` | `#ff5db1` |
| Rosa Escura | `--pink-600` | `#ff3fa2` |
| Roxo Principal | `--purple-500` | `#b36bff` |
| Roxo Escuro | `--purple-600` | `#9c5cff` |
| Background | `--bg` | `#0f0a1f` |
| Card | `--card` | `#1f1739` |
| Texto | `--text` | `#f7f1ff` |
| Muted | `--muted` | `#cfc6dd` |

---

## 🔄 Fluxo de Navegação

```
HomePage (tela inicial)
    ↓ [Explorar categorias]
    ↓
CategoriesPage (listagem)
    ↓ [Seleciona categoria]
    ↓
ProductsPage (produtos)
    ├─ [Busca em tempo real]
    ├─ [Favorita produtos]
    └─ [Voltar para categorias]
```

---

## 💾 Armazenamento Local

### Favoritos (localStorage)
Chave: `mix-catalogo-favoritos`

Armazena um array de IDs de produtos favoritados:
```javascript
// localStorage.getItem('mix-catalogo-favoritos')
["p-iphone", "p-headset", "p-vestido"]
```

Persiste automaticamente ao adicionar/remover favoritos.

---

## 🚀 Como Usar

### Adicionar Nova Categoria

1. Abra `src/data/categories.json`
2. Adicione um novo objeto:
```json
{
  "id": "novo-id",
  "name": "Nome da Categoria",
  "description": "Descrição breve",
  "accentColor": "#cor-hex"
}
```

### Adicionar Novo Produto

1. Abra `src/data/products.json`
2. Adicione um novo objeto:
```json
{
  "id": "p-novo",
  "categoryId": "id-da-categoria",
  "name": "Nome do Produto",
  "brand": "Marca",
  "price": "R$ XXX,XX",
  "image": "https://url-da-imagem.jpg"
}
```

### Personalizar Logo

1. Coloque sua imagem em `public/logo.png`
2. A logo aparecerá automaticamente em:
   - Tela inicial (HomePage)
   - Header de todas as páginas
   - Favicon da aba

---

## 📦 Dependências

| Pacote | Versão | Uso |
|--------|--------|-----|
| `react` | 18.3.1 | Framework UI |
| `react-dom` | 18.3.1 | Renderização no DOM |
| `react-router-dom` | 6.26.2 | Roteamento entre páginas |
| `vite` | 5.4.10 | Build tool e dev server |
| `eslint` | 8.57.0 | Linting de código |
| `eslint-plugin-react` | 7.35.0 | Regras React para ESLint |

---

## 🎯 Funcionalidades em Detalhe

### Busca de Produtos
- Filtra por nome em tempo real
- Case-insensitive (maiúscula/minúscula não importa)
- Mostra contador de resultados encontrados
- Mensagem "Nenhum produto encontrado" se lista vazia

### Sistema de Favoritos
- Clique no botão ★/☆ para adicionar/remover
- Estado persistido no navegador (`localStorage`)
- Sincroniza entre abas (mesma sessão)
- Indicador visual (cor roxo quando favoritado)

### Responsividade
- Grid adaptável (mobile, tablet, desktop)
- Header ajusta layout em telas pequenas
- Imagens escalam proporcionalmente

---

## 🔍 Boas Práticas Implementadas

✅ **Componentes pequenos e reutilizáveis** - Cada componente tem uma responsabilidade clara

✅ **Custom hooks** - `useFavorites` encapsula lógica de favoritos

✅ **Dados separados** - JSON em pasta `data/` facilita manutenção

✅ **Rotas organizadas** - React Router para navegação limpa

✅ **CSS variável** - Tema centralizado em `:root`

✅ **Props bem nomeadas** - Interface clara entre componentes

✅ **Comentários úteis** - Indicam onde customizar (logo, dados)

✅ **Sem backend** - Funciona offline, ideal para prototipagem

---

## 📝 Scripts Disponíveis

```bash
npm run dev        # Inicia dev server em modo watch
npm run build      # Cria build otimizado em dist/
npm run preview    # Testa o build localmente
npm run lint       # Verifica erros com ESLint
```

---

## 🐛 Troubleshooting

### Logo não aparece
- Verifique se `public/logo.png` existe
- Recarregue a página (F5 ou Ctrl+Shift+R)
- Verifique o console para erros (F12)

### Favoritos não persistem
- Ative localStorage no navegador
- Verifique se está em modo privado (limita storage)

### Rota 404
- Certifique-se de usar as rotas corretas: `/`, `/categorias`, `/categorias/id`

---

## 📄 Próximas Melhorias (Roadmap)

- [ ] Integração com API backend
- [ ] Página de detalhes do produto (modal/página)
- [ ] Filtros por preço, marca
- [ ] Carrinho de compras
- [ ] Autenticação de usuário
- [ ] PWA (Progressive Web App)
- [ ] Temas personalizáveis
