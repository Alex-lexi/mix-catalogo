import api from './api';

export const listarProdutos = () => {
  return api.get('/produtos');
};

export const listarProdutosPorCategoria = (categoriaId) => {
  return api.get(`/produtos/categoria/${categoriaId}`);
};

export const buscarProdutoPorId = (produtoId) => {
  return api.get(`/produtos/${produtoId}`);
};

export const criarProduto = (dadosProduto) => {
  return api.post('/produtos', dadosProduto);
};
