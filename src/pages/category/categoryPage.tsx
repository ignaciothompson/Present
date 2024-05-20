import React from 'react';
import { useParams } from 'react-router-dom';
import Products from '../../components/products/products'; // Import Products component
import { Product } from '../../types';

const CategoryPage: React.FC<{ products: Product[] }> = ({ products }) => {
  const { categoryName } = useParams<{ categoryName: string }>();

  // Fetch category data based on categoryName or use it to filter products

  return (
    <div>
      <h1>Category: {categoryName}</h1>
      <Products products={products} /> {/* Display products here, assuming products are fetched and passed as props */}
    </div>
  );
};

export default CategoryPage;