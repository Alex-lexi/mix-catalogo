export default function Header({ onBack, title, subtitle }) {
  return (
    <header className="header">
      <div className="header__left">
        {onBack && (
          <button className="ghost-button" onClick={onBack}>
            ← Voltar
          </button>
        )}
        <div>
          <h1 className="header__title">{title}</h1>
          {subtitle && <p className="header__subtitle">{subtitle}</p>}
        </div>
      </div>
      <div className="header__logo">
        {/* Substitua o arquivo public/logo.png pela sua logomarca real */}
        <img src="/logo.png" alt="Mix Catálogo Digital" />
      </div>
    </header>
  );
}
