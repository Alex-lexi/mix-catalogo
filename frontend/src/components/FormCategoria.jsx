import { useState } from 'react';

export default function FormCategoria({ onSubmit, categoriaInicial, onCancel }) {
  const [nome, setNome] = useState(categoriaInicial?.nome || '');
  const [descricao, setDescricao] = useState(categoriaInicial?.descricao || '');

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ nome, descricao });
  }

  return (
    <form className="form-categoria" onSubmit={handleSubmit}>
      <input
        className="input-categoria"
        type="text"
        placeholder="Nome da categoria"
        value={nome}
        onChange={e => setNome(e.target.value)}
        required
      />
      <input
        className="input-categoria"
        type="text"
        placeholder="Descrição"
        value={descricao}
        onChange={e => setDescricao(e.target.value)}
      />
      <div className="form-categoria-botoes">
        <button type="submit" className="primary-button">Salvar</button>
        {onCancel && <button type="button" className="ghost-button" onClick={onCancel}>Cancelar</button>}
      </div>
    </form>
  );
}
