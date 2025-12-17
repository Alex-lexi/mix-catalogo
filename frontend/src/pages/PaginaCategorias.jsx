import { useState } from 'react';
import CategoriaCard from '../components/CategoriaCard.jsx';
import Cabecalho from '../components/Cabecalho.jsx';
import FormCategoria from '../components/FormCategoria.jsx';
import { criarCategoria, editarCategoria, excluirCategoria } from '../services/CategoriaService';

export default function PaginaCategorias({ categorias, aoSelecionarCategoria, aoVoltar, atualizarCategorias }) {
  const [modoEdicao, setModoEdicao] = useState(null); 
  const [modoNovo, setModoNovo] = useState(false);
  const [carregando, setCarregando] = useState(false);

  async function handleCriarCategoria(dados) {
    setCarregando(true);
    try {
      await criarCategoria(dados);
      setModoNovo(false);
      atualizarCategorias && atualizarCategorias();
    } finally {
      setCarregando(false);
    }
  }

  async function handleEditarCategoria(dados) {
    setCarregando(true);
    try {
      await editarCategoria(modoEdicao, dados);
      setModoEdicao(null);
      atualizarCategorias && atualizarCategorias();
    } finally {
      setCarregando(false);
    }
  }

  async function handleExcluirCategoria(id) {
    if (!window.confirm('Tem certeza que deseja excluir esta categoria?')) return;
    setCarregando(true);
    try {
      await excluirCategoria(id);
      atualizarCategorias && atualizarCategorias();
    } finally {
      setCarregando(false);
    }
  }

  // Ordenar categorias por nome
  const categoriasOrdenadas = [...categorias].sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));

  // Menu de opções (3 pontinhos)
  const [menuAberto, setMenuAberto] = useState(null); // id da categoria com menu aberto

  function abrirMenu(id) {
    setMenuAberto(id);
    document.addEventListener('click', fecharMenu);
  }
  function fecharMenu(e) {
    setMenuAberto(null);
    document.removeEventListener('click', fecharMenu);
  }

  return (
    <main className="page">
      <Cabecalho
        aoVoltar={aoVoltar}
        titulo="Categorias"
        subtitulo="Escolha uma categoria para ver os produtos"
      />

      <button
        className="btn-discreta"
        onClick={() => setModoNovo(true)}
        style={{ marginBottom: 16 }}
      >
        + Nova Categoria
      </button>

      {modoNovo && (
        <FormCategoria
          onSubmit={handleCriarCategoria}
          onCancel={() => setModoNovo(false)}
        />
      )}

      <div className="grid">
        {categoriasOrdenadas.map((categoria) => (
          <div key={categoria.id} style={{ position: 'relative' }}>
            {modoEdicao === categoria.id ? (
              <FormCategoria
                categoriaInicial={categoria}
                onSubmit={handleEditarCategoria}
                onCancel={() => setModoEdicao(null)}
              />
            ) : (
              <>
                <CategoriaCard
                  categoria={categoria}
                  aoSelecionarCategoria={aoSelecionarCategoria}
                >
                  <button
                    className="btn-discreta btn-menu"
                    style={{ position: 'absolute', top: 8, right: 8 }}
                    onClick={e => { e.stopPropagation(); abrirMenu(categoria.id); }}
                    title="Mais opções"
                  >
                    <span style={{ fontSize: 22, lineHeight: 1 }}>⋮</span>
                  </button>
                  {menuAberto === categoria.id && (
                    <div className="menu-opcoes-categoria" style={{ position: 'absolute', top: 36, right: 0 }}>
                      <button className="btn-discreta" onClick={() => { setModoEdicao(categoria.id); setMenuAberto(null); }}>Editar</button>
                      <button className="btn-discreta btn-danger" onClick={() => { handleExcluirCategoria(categoria.id); setMenuAberto(null); }}>Remover</button>
                    </div>
                  )}
                </CategoriaCard>
              </>
            )}
          </div>
        ))}
      </div>
      {carregando && <div style={{marginTop:16}}>Salvando...</div>}
    </main>
  );
}