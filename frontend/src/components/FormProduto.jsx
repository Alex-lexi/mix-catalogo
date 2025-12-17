import { useState } from 'react';

export default function FormProduto({ onSubmit, produtoInicial = {}, onCancel, categorias }) {
  const [nome, setNome] = useState(produtoInicial.nome || '');
  const [marca, setMarca] = useState(produtoInicial.marca || '');
  const [preco, setPreco] = useState(produtoInicial.preco || '');
  const [imagem, setImagem] = useState(produtoInicial.imagem || '');

  const [categoriaId, setCategoriaId] = useState(produtoInicial.categoriaId || produtoInicial.categoria_id || (categorias[0]?.id || ''));

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      nome,
      marca,
      preco: Number(preco),
      imagem,
      categoria_id: categoriaId
    });
  }

  return (
    <form className="form-categoria" onSubmit={handleSubmit}>
      <select
        className="input-categoria"
        value={categoriaId}
        onChange={e => setCategoriaId(e.target.value)}
        required
      >
        {categorias.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.nome}</option>
        ))}
      </select>
      <input
        className="input-categoria"
        type="text"
        placeholder="Nome do produto"
        value={nome}
        onChange={e => setNome(e.target.value)}
        required
      />
      <input
        className="input-categoria"
        type="text"
        placeholder="Marca"
        value={marca}
        onChange={e => setMarca(e.target.value)}
      />
      <input
        className="input-categoria"
        type="number"
        placeholder="Preço"
        value={preco}
        onChange={e => setPreco(e.target.value)}
        min="0"
        step="0.01"
        required
      />
      <input
        className="input-categoria"
        type="text"
        placeholder="URL da imagem"
        value={imagem}
        onChange={e => setImagem(e.target.value)}
      />
      <div className="form-categoria-botoes">
        <button type="submit" className="primary-button">Salvar</button>
        {onCancel && <button type="button" className="ghost-button" onClick={onCancel}>Cancelar</button>}
      </div>
    </form>
  );
}
