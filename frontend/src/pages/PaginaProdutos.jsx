import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import Cabecalho from '../components/Cabecalho.jsx';
import CartaoProduto from '../components/CartaoProduto.jsx';
import BarraBusca from '../components/BarraBusca.jsx';

export default function PaginaProdutos({
  produtos,
  categorias,
  favoritos,
  aoAlternarFavorito,
  aoVoltar,
}) {
  const { categoriaId } = useParams();
  const [termoBusca, setTermoBusca] = useState('');

  const categoria = useMemo(
    () => categorias.find((item) => item.id === categoriaId),
    [categorias, categoriaId]
  );

  const produtosFiltrados = useMemo(() => {
    return produtos
      .filter((produto) => produto.categoriaId === categoriaId)
      .filter((produto) =>
        produto.nome.toLowerCase().includes(termoBusca.trim().toLowerCase())
      );
  }, [produtos, categoriaId, termoBusca]);

  return (
    <main className="page">
      <Cabecalho
        aoVoltar={aoVoltar}
        titulo={categoria?.nome || 'Produtos'}
        subtitulo="Busque, veja detalhes e salve nos favoritos"
      />

      <div className="panel">
        <BarraBusca valor={termoBusca} aoMudar={setTermoBusca} />
        <p className="helper-text">
          Resultados encontrados: {produtosFiltrados.length}
        </p>
      </div>

      {produtosFiltrados.length === 0 ? (
        <p className="empty">Nenhum produto encontrado.</p>
      ) : (
        <div className="grid grid-products">
          {produtosFiltrados.map((produto) => (
            <CartaoProduto
              key={produto.id}
              produto={produto}
              ehFavorito={favoritos.includes(produto.id)}
              aoAlternarFavorito={aoAlternarFavorito}
            />
          ))}
        </div>
      )}
    </main>
  );
}
