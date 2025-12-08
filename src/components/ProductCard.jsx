export default function ProductCard({ product, isFavorite, onToggleFavorite }) {
  return (
    <div className="card product-card">
      <div className="product-card__image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-card__body">
        <div>
          <p className="eyebrow">{product.brand}</p>
          <h3>{product.name}</h3>
          <p className="price">{product.price}</p>
        </div>
        <button
          className={`favorite-button ${isFavorite ? 'is-active' : ''}`}
          onClick={() => onToggleFavorite(product.id)}
          aria-pressed={isFavorite}
        >
          {isFavorite ? '★ Favorito' : '☆ Favoritar'}
        </button>
      </div>
    </div>
  );
}
