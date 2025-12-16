import api from './api';

export function listarCategorias() {
  return api.get('/categorias');
}
