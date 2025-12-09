export default function CategoryCard({ category, onSelect }) {
  return (
    <button
      className="card category-card"
      onClick={() => onSelect(category.id)}
      style={{ borderColor: category.accentColor }}
    >
      <div className="category-card__badge" style={{ background: category.accentColor }}>
        {category.name.slice(0, 1)}
      </div>
      <div>
        <h3>{category.name}</h3>
        <p>{category.description}</p>
      </div>
    </button>
  );
}
