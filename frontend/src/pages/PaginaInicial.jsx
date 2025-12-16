export default function PaginaInicial({ aoIniciar }) {
  return (
    <main className="page home">
      <section className="hero">
        <div className="hero__content">
          <p className="eyebrow">Mix Catálogo Digital</p>
          <h1>Catálogo rápido para lojas com muitas opções</h1>
          <p className="lead">
            Organize categorias, encontre produtos em segundos e salve seus favoritos.
            Tudo isso com um visual simples em tons de rosa e roxo.
          </p>
          <button className="primary-button" onClick={aoIniciar}>
            Explorar categorias
          </button>
        </div>
        <div className="hero__visual">
          <div className="hero__card">
            <p className="eyebrow">Logo</p>
            <div className="hero__logo-box">
              <img src="/logo.png" alt="Logo da loja" />
            </div>
            <p>Apresente sua marca de forma elegante e clara.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
