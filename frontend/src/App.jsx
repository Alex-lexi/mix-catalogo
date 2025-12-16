import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import HomePage from './pages/HomePage.jsx';
import CategoriesPage from './pages/CategoriesPage.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
import useFavorites from './hooks/useFavorites.js';
import { listarCategorias } from './services/CategoriaService';
import { listarProdutos } from './services/ProdutoService';

export default function App() {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useFavorites();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const goHome = () => navigate('/');
  const goCategories = () => navigate('/categorias');
  const goProducts = (categoryId) => navigate(`/categorias/${categoryId}`);

  const formatPrice = (value) => {
    if (value == null) return '';
    const number = typeof value === 'number' ? value : Number(value);
    if (Number.isNaN(number)) return String(value);
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(number);
  };

  useEffect(() => {
    async function loadData() {
      try {
        const resCats = await listarCategorias();
        console.log('DEBUG - resCats bruto:', resCats);
        const cats = (resCats.data || resCats || []).map((c) => ({
          id: String(c.id),
          name: c.nome || c.name,
          description: c.descricao || c.description || '',
          accentColor: c.accentColor || '#9c5cff',
        }));
        console.log('DEBUG - cats mapeados:', cats);
        setCategories(cats);
      } catch (error) {
        console.error('Erro ao carregar categorias', error);
      }

      try {
        const resProds = await listarProdutos();
        const prods = (resProds.data || resProds || []).map((p) => ({
          id: String(p.id),
          categoryId: String(p.categoria_id ?? p.category_id ?? p.categoryId ?? ''),
          name: p.nome || p.name,
          brand: p.marca || p.brand || '',
          price: formatPrice(p.preco ?? p.price),
          image: p.imagem || p.image || '',
        }));
        setProducts(prods);
      } catch (error) {
        console.error('Erro ao carregar produtos', error);
      }
    }

    loadData();
  }, []);

  return (
    <div className="app-shell">
      <Routes>
        <Route path="/" element={<HomePage onStart={goCategories} />} />
        <Route
          path="/categorias"
          element={
            <CategoriesPage
              categories={categories}
              onBack={goHome}
              onSelectCategory={goProducts}
            />
          }
        />
        <Route
          path="/categorias/:categoryId"
          element={
            <ProductsPage
              products={products}
              categories={categories}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              onBack={goCategories}
            />
          }
        />
      </Routes>
    </div>
  );
}
