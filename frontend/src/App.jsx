import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PaginaInicial from './pages/PaginaInicial.jsx';
import PaginaCategorias from './pages/PaginaCategorias.jsx';
import PaginaProdutos from './pages/PaginaProdutos.jsx';
import useFavoritos from './hooks/useFavoritos.js';
import { listarCategorias } from './services/CategoriaService';
import { listarProdutos } from './services/ProdutoService';

export default function App() {
  const navigate = useNavigate();
  const { favoritos, alternarFavorito } = useFavoritos();
  const [categorias, setCategorias] = useState([]);
  const [produtos, setProdutos] = useState([]);

  const irParaInicio = () => navigate('/');
  const irParaCategorias = () => navigate('/categorias');
  const irParaProdutos = (idCategoria) => navigate(`/categorias/${idCategoria}`);

  const formatarPreco = (valor) => {
    if (valor == null) return '';
    const numero = typeof valor === 'number' ? valor : Number(valor);
    if (Number.isNaN(numero)) return String(valor);
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(numero);
  };

  useEffect(() => {
    async function carregarDados() {
      try {
        const resCategoriasRaw = await listarCategorias();
        console.log('DEBUG - resCategoriasRaw bruto:', resCategoriasRaw);
      const categoriasProcessadas = (resCategoriasRaw.data || resCategoriasRaw || []).map((c) => ({
        id: String(c.id),
        nome: c.nome || c.name,
        descricao: c.descricao || c.description || '',
        corDestaque: c.corDestaque || c.accentColor || '#9c5cff',
      }));
        console.log('DEBUG - categoriasProcessadas mapeadas:', categoriasProcessadas);
        setCategorias(categoriasProcessadas);
      } catch (erro) {
        console.error('Erro ao carregar categorias', erro);
      }

      try {
        const resProdutosRaw = await listarProdutos();
        const produtosProcessados = (resProdutosRaw.data || resProdutosRaw || []).map((p) => ({
          id: String(p.id),
          categoriaId: String(p.categoria_id ?? p.category_id ?? p.categoryId ?? ''),
          nome: p.nome || p.name,
          marca: p.marca || p.brand || '',
          preco: formatarPreco(p.preco ?? p.price),
          imagem: p.imagem || p.image || '',
        }));
        setProdutos(produtosProcessados);
      } catch (erro) {
        console.error('Erro ao carregar produtos', erro);
      }
    }

    carregarDados();
  }, []);

  return (
    <div className="app-shell">
      <Routes>
        <Route path="/" element={<PaginaInicial aoIniciar={irParaCategorias} />} />
        <Route
          path="/categorias"
          element={
            <PaginaCategorias
              categorias={categorias}
              aoVoltar={irParaInicio}
              aoSelecionarCategoria={irParaProdutos}
            />
          }
        />
        <Route
          path="/categorias/:categoriaId"
          element={
            <PaginaProdutos
              produtos={produtos}
              categorias={categorias}
              favoritos={favoritos}
              aoAlternarFavorito={alternarFavorito}
              aoVoltar={irParaCategorias}
            />
          }
        />
      </Routes>
    </div>
  );
}
