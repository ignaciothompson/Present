import React from 'react';
import styles from './filters.module.css'; // Import CSS module

interface FiltersProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (id: string) => void; // Change parameter name to 'id'
}

const Filters: React.FC<FiltersProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className={styles.categoriesContainer}> 
      <h2 id={styles.categoryTitle}>Categorias</h2> 
      <ul>
        <li key="all" onClick={() => setSelectedCategory('')}>
          All
        </li>
        {categories.map((category) => (
          <li
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              fontWeight: selectedCategory === category ? 'bold' : 'normal',
            }}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Filters;