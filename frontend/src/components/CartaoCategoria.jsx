import '../styles/Categoria.css';

export default function CartaoCategoria({ categoria, aoSelecionarCategoria }) {
  return (
    <button
      className="card category-card"
      onClick={() => aoSelecionarCategoria(categoria.id)}
      style={{ borderColor: categoria.corDestaque }}>
      <div
        className="category-card__badge"
        style={{ background: categoria.corDestaque }}>
        {categoria.nome.slice(0, 1)}
      </div>

      <div>
        <h3>{categoria.nome}</h3>
        <p>{categoria.descricao}</p>
      </div>
    </button>
  );
}
