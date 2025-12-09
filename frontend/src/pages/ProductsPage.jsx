import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header.jsx';
import ProductCard from '../components/ProductCard.jsx';
import SearchBar from '../components/SearchBar.jsx';

export default function ProductsPage({
  products,
  categories,
  favorites,
  onToggleFavorite,
  onBack,
}) {
  const { categoryId } = useParams();
  const [searchTerm, setSearchTerm] = useState('');

  const category = useMemo(
    () => categories.find((item) => item.id === categoryId),
    [categories, categoryId]
  );

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => product.categoryId === categoryId)
      .filter((product) =>
        product.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
      );
  }, [products, categoryId, searchTerm]);

  return (
    <main className="page">
      <Header
        onBack={onBack}
        title={category?.name || 'Produtos'}
        subtitle="Busque, veja detalhes e salve nos favoritos"
      />

      <div className="panel">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <p className="helper-text">Resultados encontrados: {filteredProducts.length}</p>
      </div>

      {filteredProducts.length === 0 ? (
        <p className="empty">Nenhum produto encontrado.</p>
      ) : (
        <div className="grid grid-products">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={favorites.includes(product.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      )}
    </main>
  );
}
