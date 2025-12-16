export default function CartaoProduto({
  produto,
  ehFavorito,
  aoAlternarFavorito,
}) {
  return (
    <div className="card product-card">
      <div className="product-card__image">
        <img src={produto.imagem} alt={produto.nome} />
      </div>

      <div className="product-card__body">
        <div>
          <p className="eyebrow">{produto.marca}</p>
          <h3>{produto.nome}</h3>
          <p className="price">{produto.preco}</p>
        </div>

        <button
          className={`favorite-button ${ehFavorito ? 'is-active' : ''}`}
          onClick={() => aoAlternarFavorito(produto.id)}
          aria-pressed={ehFavorito}
        >
          {ehFavorito ? '★ Favorito' : '☆ Favoritar'}
        </button>
      </div>
    </div>
  );
}
