import CategoryCard from '../components/CategoryCard.jsx';
import Header from '../components/Header.jsx';

export default function CategoriesPage({ categories, onSelectCategory, onBack }) {
  return (
    <main className="page">
      <Header
        onBack={onBack}
        title="Categorias"
        subtitle="Escolha uma categoria para ver os produtos"
      />

      <div className="grid">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onSelect={onSelectCategory}
          />
        ))}
      </div>
    </main>
  );
}
