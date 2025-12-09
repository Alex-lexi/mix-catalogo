export default function SearchBar({ value, onChange, placeholder = 'Buscar produtos' }) {
  return (
    <div className="search-bar">
      <span aria-hidden>🔍</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}
