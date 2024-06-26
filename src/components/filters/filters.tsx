import React from "react";
import styles from "./filters.module.css"; // Import CSS module
import { Product } from "../../types";

interface Category {
  category: string;
  products: Product[];
}
interface FiltersProps {
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  setFiltersOpen: (open: boolean) => void;
}

const Filters: React.FC<FiltersProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  setFiltersOpen,
}) => {
  const handlePhoneClose = () => {
    
  }
  // console.log(categories)
  return (
    <div className={styles.categoriesContainer} >
      <h2 id={styles.categoryTitle}>Categorias</h2>
      <ul>
        <li
          key="all"
          onClick={() => {
            setSelectedCategory("");
            setFiltersOpen(false);
          }}
          style={{
            fontFamily:
              selectedCategory === "" ? "Quicksand-Bold" : "Quicksand",
          }}
        >
          TODOS LOS PRODUCTOS
        </li>
        {categories.map((category) => (
          <li
            key={category.category}
            onClick={() => {
              setSelectedCategory(category.category);
              handlePhoneClose();
              setFiltersOpen(false);
            }}
            style={{
              fontFamily:
                selectedCategory === category.category
                  ? "Quicksand-Bold"
                  : "Quicksand",
            }}
          >
            {category.category}
            <span className={styles.categoryCount}>
              ({category.products.length})
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Filters;
