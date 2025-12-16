import CategoriaCard from '../components/CategoriaCard.jsx';
import Cabecalho from '../components/Cabecalho.jsx';

export default function PaginaCategorias({ categorias, aoSelecionarCategoria, aoVoltar }) {
  return (
    <main className="page">
      <Cabecalho
        aoVoltar={aoVoltar}
        titulo="Categorias"
        subtitulo="Escolha uma categoria para ver os produtos"
      />

      <div className="grid">
        {categorias.map((categoria) => (
          <CategoriaCard
            key={categoria.id}
            categoria={categoria}
            aoSelecionarCategoria={aoSelecionarCategoria}
          />
        ))}
      </div>
    </main>
  );
}
