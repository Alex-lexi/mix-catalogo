import { Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import CategoriesPage from './pages/CategoriesPage.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
import categoriesData from './data/categories.json';
import productsData from './data/products.json';
import useFavorites from './hooks/useFavorites.js';

export default function App() {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useFavorites();

  const goHome = () => navigate('/');
  const goCategories = () => navigate('/categorias');
  const goProducts = (categoryId) => navigate(`/categorias/${categoryId}`);

  return (
    <div className="app-shell">
      <Routes>
        <Route path="/" element={<HomePage onStart={goCategories} />} />
        <Route
          path="/categorias"
          element={
            <CategoriesPage
              categories={categoriesData}
              onBack={goHome}
              onSelectCategory={goProducts}
            />
          }
        />
        <Route
          path="/categorias/:categoryId"
          element={
            <ProductsPage
              products={productsData}
              categories={categoriesData}
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
