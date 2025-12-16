export default function BarraBusca({ valor, aoMudar, placeholder = 'Buscar produtos' }) {
  return (
    <div className="search-bar">
      <span aria-hidden>🔍</span>
      <input
        type="search"
        value={valor}
        onChange={(evento) => aoMudar(evento.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}
