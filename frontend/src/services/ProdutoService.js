export const editarProduto = (id, dadosProduto) => {
  return api.put(`/produtos/${id}`, dadosProduto);
};

export const excluirProduto = (id) => {
  return api.delete(`/produtos/${id}`);
};
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
