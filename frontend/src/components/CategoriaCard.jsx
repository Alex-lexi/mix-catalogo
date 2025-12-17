import '../styles/CategoriaCard.css';

export default function CategoriaCard({ categoria, aoSelecionarCategoria, children }) {
  return (
    <div className="card category-card" style={{ position: 'relative' }}>
      <button
        className="card-category-overlay"
        onClick={() => aoSelecionarCategoria(categoria.id)}
        tabIndex={-1}
        aria-label={categoria.nome}
      />
      <div className="card-category-menu">
        {children}
      </div>
      <div>
        <h3>{categoria.nome}</h3>
        <p>{categoria.descricao}</p>
      </div>
    </div>
  );
}
