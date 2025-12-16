import { useEffect, useState } from 'react';

const CHAVE_ARMAZENAMENTO = 'mix-catalogo-favoritos';

export default function useFavoritos() {
  const [favoritos, setFavoritos] = useState(() => {
    try {
      const salvo = localStorage.getItem(CHAVE_ARMAZENAMENTO);
      return salvo ? JSON.parse(salvo) : [];
    } catch (erro) {
      console.warn('Não foi possível carregar favoritos do localStorage', erro);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(CHAVE_ARMAZENAMENTO, JSON.stringify(favoritos));
  }, [favoritos]);

  const alternarFavorito = (idProduto) => {
    setFavoritos((anterior) =>
      anterior.includes(idProduto)
        ? anterior.filter((id) => id !== idProduto)
        : [...anterior, idProduto]
    );
  };

  return { favoritos, alternarFavorito };
}
