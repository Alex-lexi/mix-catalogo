export default function Cabecalho({ aoVoltar, titulo, subtitulo }) {
  return (
    <header className="header">
      <div className="header__left">
        {aoVoltar && (
          <button className="ghost-button" onClick={aoVoltar}>
            ← Voltar
          </button>
        )}
        <div>
          <h1 className="header__title">{titulo}</h1>
          {subtitulo && <p className="header__subtitle">{subtitulo}</p>}
        </div>
      </div>
      <div className="header__logo">
        <img src="/logo.png" alt="Mix Catálogo Digital" />
      </div>
    </header>
  );
}
