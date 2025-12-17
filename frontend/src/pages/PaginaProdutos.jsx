
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import Cabecalho from '../components/Cabecalho.jsx';
import ProdutoCard from '../components/ProdutoCard.jsx';
import BarraBusca from '../components/BarraBusca.jsx';
import FormProduto from '../components/FormProduto.jsx';
import { criarProduto, editarProduto, excluirProduto } from '../services/ProdutoService';

export default function PaginaProdutos({
  produtos,
  categorias,
  favoritos,
  aoAlternarFavorito,
  aoVoltar,
  atualizarProdutos
}) {
  const { categoriaId } = useParams();
  const [termoBusca, setTermoBusca] = useState('');
  const [modoEdicao, setModoEdicao] = useState(null); // id do produto
  const [modoNovo, setModoNovo] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [menuAberto, setMenuAberto] = useState(null); // id do produto com menu aberto

  const categoria = useMemo(
    () => categorias.find((item) => item.id === categoriaId),
    [categorias, categoriaId]
  );

  const produtosFiltrados = useMemo(() => {
    return produtos
      .filter((produto) => produto.categoriaId === categoriaId)
      .filter((produto) =>
        produto.nome.toLowerCase().includes(termoBusca.trim().toLowerCase())
      )
      .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
  }, [produtos, categoriaId, termoBusca]);

  function abrirMenu(id) {
    setMenuAberto(id);
    document.addEventListener('click', fecharMenu);
  }
  function fecharMenu(e) {
    setMenuAberto(null);
    document.removeEventListener('click', fecharMenu);
  }

  async function handleCriarProduto(dados) {
    setCarregando(true);
    try {
      await criarProduto(dados);
      setModoNovo(false);
      atualizarProdutos && atualizarProdutos();
    } finally {
      setCarregando(false);
    }
  }

  async function handleEditarProduto(dados) {
    setCarregando(true);
    try {
      await editarProduto(modoEdicao, dados);
      setModoEdicao(null);
      atualizarProdutos && atualizarProdutos();
    } finally {
      setCarregando(false);
    }
  }

  async function handleExcluirProduto(id) {
    if (!window.confirm('Tem certeza que deseja excluir este produto?')) return;
    setCarregando(true);
    try {
      await excluirProduto(id);
      atualizarProdutos && atualizarProdutos();
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="page">
      <Cabecalho
        aoVoltar={aoVoltar}
        titulo={categoria?.nome || 'Produtos'}
        subtitulo="Busque, veja detalhes e salve nos favoritos"
      />

      <div className="panel">
        <BarraBusca valor={termoBusca} aoMudar={setTermoBusca} />
        <button
          className="btn-discreta"
          onClick={() => setModoNovo(true)}
          style={{ marginLeft: 12 }}
        >
          + Novo Produto
        </button>
        <p className="helper-text">
          Resultados encontrados: {produtosFiltrados.length}
        </p>
      </div>

      {modoNovo && (
        <FormProduto
          onSubmit={handleCriarProduto}
          onCancel={() => setModoNovo(false)}
          categorias={categorias}
        />
      )}

      {produtosFiltrados.length === 0 ? (
        <p className="empty">Nenhum produto encontrado.</p>
      ) : (
        <div className="grid grid-products">
          {produtosFiltrados.map((produto) => (
            <div key={produto.id} style={{ position: 'relative' }}>
              {modoEdicao === produto.id ? (
                <FormProduto
                  produtoInicial={produto}
                  onSubmit={handleEditarProduto}
                  onCancel={() => setModoEdicao(null)}
                  categorias={categorias}
                />
              ) : (
                <>
                  <ProdutoCard
                    produto={produto}
                    ehFavorito={favoritos.includes(produto.id)}
                    aoAlternarFavorito={aoAlternarFavorito}
                  >
                    <button
                      className="btn-discreta btn-menu"
                      style={{ position: 'absolute', top: 8, right: 8 }}
                      onClick={e => { e.stopPropagation(); abrirMenu(produto.id); }}
                      title="Mais opções"
                    >
                      <span style={{ fontSize: 22, lineHeight: 1 }}>⋮</span>
                    </button>
                    {menuAberto === produto.id && (
                      <div className="menu-opcoes-categoria" style={{ position: 'absolute', top: 36, right: 0 }}>
                        <button className="btn-discreta" onClick={() => { setModoEdicao(produto.id); setMenuAberto(null); }}>Editar</button>
                        <button className="btn-discreta btn-danger" onClick={() => { handleExcluirProduto(produto.id); setMenuAberto(null); }}>Remover</button>
                      </div>
                    )}
                  </ProdutoCard>
                </>
              )}
            </div>
          ))}
        </div>
      )}
      {carregando && <div style={{marginTop:16}}>Salvando...</div>}
    </main>
  );
}
