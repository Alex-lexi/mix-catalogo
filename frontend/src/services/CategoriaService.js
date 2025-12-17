
import api from './api';

export function listarCategorias() {
  return api.get('/categorias');
}

export function criarCategoria(dados) {
  return api.post('/categorias', dados);
}

export function editarCategoria(id, dados) {
  return api.put(`/categorias/${id}`, dados);
}

export function excluirCategoria(id) {
  return api.delete(`/categorias/${id}`);
}
