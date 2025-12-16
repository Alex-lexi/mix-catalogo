import api from './api';

export const adicionarAoCarrinho = (dadosCarrinho) => {
  return api.post('/carrinho', dadosCarrinho);
};

export const listarCarrinho = (usuarioId) => {
  return api.get(`/carrinho/${usuarioId}`);
};

export const calcularTotal = (usuarioId) => {
  return api.get(`/carrinho/${usuarioId}/total`);
};
